import React, { Component, PropTypes } from 'react';
import assign from 'deep-assign';

const WaveSurfer = require('wavesurfer.js');

const EVENTS = [
  'audioprocess',
  'error',
  'finish',
  'loading',
  'mouseup',
  'pause',
  'play',
  'ready',
  'scroll',
  'seek',
  'zoom'
];

/**
 * @description Capitalise the first letter of a string
 */
function capitaliseFirstLetter(string) {
  return string.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * @description Throws an error if the prop is defined and not an integer or not positive
 */
function positiveIntegerProptype(props, propName, componentName) {
  const n = props[propName];
  if (n !== undefined && (typeof n !== 'number' || n !== parseInt(n, 10) || n < 0)) {
    return new Error(`Invalid ${propName} supplied to ${componentName},
      expected a positive integer`);
  }

  return null;
}

class Wavesurfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: 0
    };

    if (typeof WaveSurfer === undefined) {
      throw new Error('WaveSurfer is undefined!');
    }

    this._wavesurfer = Object.create(WaveSurfer);
    this._isReady = false;
    this._playing = false;

    this._loadAudio = this._loadAudio.bind(this);
    this._seekTo = this._seekTo.bind(this);
  }

  componentDidMount() {
    const options = assign({}, this.props.options, {
      container: this.refs.wavesurfer
    });

    this._wavesurfer.init(options);

    // file was loaded, wave was drawn
    this._wavesurfer.on('ready', () => {
      this._isReady = true;

      // set initial position
      if (this.props.pos) {
        this._seekTo(this.props.pos);
      }

      // set initial volume
      if (this.props.volume) {
        this._wavesurfer.setVolume(this.props.volume);
      }

      // set initial zoom
      if (this.props.zoom) {
        this._wavesurfer.zoom(this.props.zoom);
      }
    });

    this._wavesurfer.on('audioprocess', (pos) => {
      this.setState({
        pos
      });
      this.props.onPosChange({
        wavesurfer: this._wavesurfer,
        originalArgs: [pos]
      });
    });

    // `audioprocess` is not fired when seeking, so we have to plug into the
    // `seek` event and calculate the equivalent in seconds (seek event
    // receives a position float 0-1) – See the README.md for explanation why we
    // need this
    this._wavesurfer.on('seek', (pos) => {
      const formattedPos = this._posToSec(pos);
      this.setState({
        formattedPos
      });
      this.props.onPosChange({
        wavesurfer: this._wavesurfer,
        originalArgs: [formattedPos]
      });
    });

    // hook up events to callback handlers passed in as props
    EVENTS.forEach((e) => {
      const propCallback = this.props[`on${capitaliseFirstLetter(e)}`];
      const wavesurfer = this._wavesurfer;
      if (propCallback) {
        this._wavesurfer.on(e, (...originalArgs) => {
          propCallback({
            wavesurfer,
            originalArgs
          });
        });
      }
    });

    // if audioFile prop, load file
    if (this.props.audioFile) {
      this._loadAudio(this.props.audioFile, this.props.audioPeaks);
    }

    // if mediaElt prop, load media Element
    if (this.props.mediaElt) {
      if (!document.querySelector(this.props.mediaElt)) {
        throw new Error('Media Element not found!');
      }

      const mediaElt = document.querySelector(this.props.mediaElt);
      this._loadAudio(mediaElt, this.props.audioPeaks);
    }
  }

  // update wavesurfer rendering manually
  componentWillReceiveProps(nextProps) {
    if (this.props.audioFile !== nextProps.audioFile) {
      this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
    }

    if (this.props.audioPeaks !== nextProps.audioPeaks) {
      const mediaElt = document.getElementById(this.props.mediaEltId);
      this._loadAudio(mediaElt, nextProps.audioPeaks);
    }

    if (nextProps.pos &&
        this._isReady &&
        nextProps.pos !== this.props.pos &&
        nextProps.pos !== this.state.pos) {
      this._seekTo(nextProps.pos);
    }

    if (this.props.playing !== nextProps.playing ||
      this._wavesurfer.isPlaying() !== nextProps.playing) {
      if (nextProps.playing) {
        this._wavesurfer.play();
        this._playing = true;
      } else {
        this._wavesurfer.pause();
        this._playing = false;
      }
    }

    if (this.props.volume !== nextProps.volume) {
      this._wavesurfer.setVolume(nextProps.volume);
    }

    if (this.props.zoom !== nextProps.zoom) {
      this._wavesurfer.zoom(nextProps.zoom);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // remove listeners
    EVENTS.forEach((e) => {
      this._wavesurfer.un(e);
    });

    // destroy wavesurfer instance
    this._wavesurfer.destroy();
  }

  // receives seconds and transforms this to the position as a float 0-1
  _secToPos(sec) {
    return 1 / this._wavesurfer.getDuration() * sec;
  }

  // receives position as a float 0-1 and transforms this to seconds
  _posToSec(pos) {
    return pos * this._wavesurfer.getDuration();
  }

  // pos is in seconds, the 0-1 proportional position we calculate here …
  _seekTo(sec) {
    const pos = this._secToPos(sec);
    if (this.props.options.autoCenter) {
      this._wavesurfer.seekAndCenter(pos);
    } else {
      this._wavesurfer.seekTo(pos);
    }
  }

  _loadAudio(audioFileOrElt, audioPeaks) {
    if (audioFileOrElt instanceof HTMLElement) {
      // media element
      this._wavesurfer.loadMediaElement(audioFileOrElt, audioPeaks);
    } else if (typeof audioFileOrElt === 'string') {
      // bog-standard string is handled by load method and ajax call
      this._wavesurfer.load(audioFileOrElt, audioPeaks);
    } else if (audioFileOrElt instanceof Blob || audioFileOrElt instanceof File) {
      // blob or file is loaded with loadBlob method
      this._wavesurfer.loadBlob(audioFileOrElt, audioPeaks);
    } else {
      throw new Error(`Wavesurfer._loadAudio expects prop audioFile
        to be either HTMLElement, string or file/blob`);
    }
  }

  render() {
    let childrenWithProps = (this.props.children)
      ? React.Children.map(
        this.props.children,
        child => React.cloneElement(child, {
          wavesurfer: this._wavesurfer,
          isReady: this._isReady
        }))
      : false;
    return (
      <div>
        <div ref="wavesurfer" />
        {childrenWithProps}
      </div>
    );
  }
}

Wavesurfer.propTypes = {
  playing: PropTypes.bool,
  pos: PropTypes.number,
  audioFile: (props, propName, componentName) => {
    const prop = props[propName];
    if (prop && typeof prop !== 'string' && !prop instanceof Blob && !prop instanceof File) {
      return new Error(`Invalid ${propName} supplied to ${componentName}
        expected either string or file/blob`);
    }

    return null;
  },

  mediaElt: PropTypes.string,
  audioPeaks: PropTypes.array,
  volume: PropTypes.number,
  zoom: PropTypes.number,
  onPosChange: PropTypes.func,
  children: PropTypes.element,
  options: PropTypes.shape({
    audioRate: PropTypes.number,
    backend: PropTypes.oneOf(['WebAudio', 'MediaElement']),
    barWidth: (props, propName, componentName) => {
      const prop = props[propName];
      if (prop !== undefined && typeof prop !== 'number') {
        return new Error(`Invalid ${propName} supplied to ${componentName}
          expected either undefined or number`);
      }

      return null;
    },

    cursorColor: PropTypes.string,
    cursorWidth: positiveIntegerProptype,
    dragSelection: PropTypes.bool,
    fillParent: PropTypes.bool,
    height: positiveIntegerProptype,
    hideScrollbar: PropTypes.bool,
    interact: PropTypes.bool,
    loopSelection: PropTypes.bool,
    mediaControls: PropTypes.bool,
    minPxPerSec: positiveIntegerProptype,
    normalize: PropTypes.bool,
    pixelRatio: PropTypes.number,
    progressColor: PropTypes.string,
    scrollParent: PropTypes.bool,
    skipLength: PropTypes.number,
    waveColor: PropTypes.string,
    autoCenter: PropTypes.bool
  })
};

Wavesurfer.defaultProps = {
  playing: false,
  pos: 0,
  mediaEltId: undefined,
  audioFile: undefined,
  audioPeaks: undefined,
  options: WaveSurfer.defaultParams,
  onPosChange: () => {}
};

export default Wavesurfer;
