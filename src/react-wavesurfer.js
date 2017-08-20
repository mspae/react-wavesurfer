import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'deep-assign';

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
  return string
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * @description Throws an error if the prop is defined and not an integer or not positive
 */
function positiveIntegerProptype(props, propName, componentName) {
  const n = props[propName];
  if (
    n !== undefined &&
    (typeof n !== 'number' || n !== parseInt(n, 10) || n < 0)
  ) {
    return new Error(`Invalid ${propName} supplied to ${componentName},
      expected a positive integer`);
  }

  return null;
}

const resizeThrottler = fn => () => {
  let resizeTimeout;

  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      fn();
    }, 66);
  }
};

class Wavesurfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };

    if (typeof WaveSurfer === undefined) {
      throw new Error('WaveSurfer is undefined!');
    }

    this._wavesurfer = Object.create(WaveSurfer);
    this._loadMediaElt = this._loadMediaElt.bind(this);
    this._loadAudio = this._loadAudio.bind(this);
    this._seekTo = this._seekTo.bind(this);

    if (this.props.responsive) {
      this._handleResize = resizeThrottler(() => {
        // pause playback for resize operation
        if (this.props.playing) {
          this._wavesurfer.pause();
        }

        // resize the waveform
        this._wavesurfer.drawBuffer();

        // We allow resize before file isloaded, since we can get wave data from outside,
        // so there might not be a file loaded when resizing
        if (this.state.isReady) {
          // restore previous position
          this._seekTo(this.props.pos);
        }

        // restore playback
        if (this.props.playing) {
          this._wavesurfer.play();
        }
      });
    }
  }

  componentDidMount() {
    const options = assign({}, this.props.options, {
      container: this.wavesurferEl
    });

    // media element loading is only supported by MediaElement backend
    if (this.props.mediaElt) {
      options.backend = 'MediaElement';
    }

    this._wavesurfer.init(options);

    // file was loaded, wave was drawn
    this._wavesurfer.on('ready', () => {
      this.setState({
        isReady: true,
        pos: this.props.pos
      });

      // set initial position
      if (this.props.pos) {
        this._seekTo(this.props.pos);
      }

      // set initial volume
      if (this.props.volume) {
        this._wavesurfer.setVolume(this.props.volume);
      }

      // set initial playing state
      if (this.props.playing) {
        this._wavesurfer.play();
      }

      // set initial zoom
      if (this.props.zoom) {
        this._wavesurfer.zoom(this.props.zoom);
      }
    });

    this._wavesurfer.on('audioprocess', pos => {
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
    this._wavesurfer.on('seek', pos => {
      if (this.state.isReady) {
        const formattedPos = this._posToSec(pos);
        this.setState({
          formattedPos
        });
        this.props.onPosChange({
          wavesurfer: this._wavesurfer,
          originalArgs: [formattedPos]
        });
      }
    });

    // hook up events to callback handlers passed in as props
    EVENTS.forEach(e => {
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
      this._loadMediaElt(this.props.mediaElt, this.props.audioPeaks);
    }

    if (this.props.responsive) {
      window.addEventListener('resize', this._handleResize, false);
    }
  }

  // update wavesurfer rendering manually
  componentWillReceiveProps(nextProps) {
    let newSource = false;
    let seekToInNewFile;

    // update audioFile
    if (this.props.audioFile !== nextProps.audioFile) {
      this.setState({
        isReady: false
      });
      this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
      newSource = true;
    }

    // update mediaElt
    if (this.props.mediaElt !== nextProps.mediaElt) {
      this.setState({
        isReady: false
      });
      this._loadMediaElt(nextProps.mediaElt, nextProps.audioPeaks);
      newSource = true;
    }

    // update peaks
    if (this.props.audioPeaks !== nextProps.audioPeaks) {
      if (nextProps.mediaElt) {
        this._loadMediaElt(nextProps.mediaElt, nextProps.audioPeaks);
      } else {
        this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
      }
    }

    // update position
    if (
      nextProps.pos !== undefined &&
      this.state.isReady &&
      nextProps.pos !== this.props.pos &&
      nextProps.pos !== this.state.pos
    ) {
      if (newSource) {
        seekToInNewFile = this._wavesurfer.on('ready', () => {
          this._seekTo(nextProps.pos);
          seekToInNewFile.un();
        });
      } else {
        this._seekTo(nextProps.pos);
      }
    }

    // update playing state
    if (
      !newSource &&
      (this.props.playing !== nextProps.playing ||
        this._wavesurfer.isPlaying() !== nextProps.playing)
    ) {
      if (nextProps.playing) {
        this._wavesurfer.play();
      } else {
        this._wavesurfer.pause();
      }
    }

    // update volume
    if (this.props.volume !== nextProps.volume) {
      this._wavesurfer.setVolume(nextProps.volume);
    }

    // update volume
    if (this.props.zoom !== nextProps.zoom) {
      this._wavesurfer.zoom(nextProps.zoom);
    }

    // update audioRate
    if (this.props.options.audioRate !== nextProps.options.audioRate) {
      this._wavesurfer.setPlaybackRate(nextProps.options.audioRate);
    }

    // turn responsive on
    if (
      nextProps.responsive &&
      this.props.responsive !== nextProps.responsive
    ) {
      window.addEventListener('resize', this._handleResize, false);
    }

    // turn responsive off
    if (
      !nextProps.responsive &&
      this.props.responsive !== nextProps.responsive
    ) {
      window.removeEventListener('resize', this._handleResize);
    }
  }

  componentWillUnmount() {
    // remove listeners
    EVENTS.forEach(e => {
      this._wavesurfer.un(e);
    });

    // destroy wavesurfer instance
    this._wavesurfer.destroy();

    if (this.props.responsive) {
      window.removeEventListener('resize', this._handleResize);
    }
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

  // load a media element selector or HTML element
  // if selector, get the HTML element for it
  // and pass to _loadAudio
  _loadMediaElt(selectorOrElt, audioPeaks) {
    if (selectorOrElt instanceof window.HTMLElement) {
      this._loadAudio(selectorOrElt, audioPeaks);
    } else {
      if (!window.document.querySelector(selectorOrElt)) {
        throw new Error('Media Element not found!');
      }

      this._loadAudio(window.document.querySelector(selectorOrElt), audioPeaks);
    }
  }

  // pass audio data to wavesurfer
  _loadAudio(audioFileOrElt, audioPeaks) {
    if (audioFileOrElt instanceof window.HTMLElement) {
      // media element
      this._wavesurfer.loadMediaElement(audioFileOrElt, audioPeaks);
    } else if (typeof audioFileOrElt === 'string') {
      // bog-standard string is handled by load method and ajax call
      this._wavesurfer.load(audioFileOrElt, audioPeaks);
    } else if (
      audioFileOrElt instanceof window.Blob ||
      audioFileOrElt instanceof window.File
    ) {
      // blob or file is loaded with loadBlob method
      this._wavesurfer.loadBlob(audioFileOrElt, audioPeaks);
    } else {
      throw new Error(`Wavesurfer._loadAudio expects prop audioFile
        to be either HTMLElement, string or file/blob`);
    }
  }

  render() {
    const childrenWithProps = this.props.children
      ? React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            wavesurfer: this._wavesurfer,
            isReady: this.state.isReady
          })
        )
      : false;
    return (
      <div>
        <div
          ref={c => {
            this.wavesurferEl = c;
          }}
        />
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
    if (
      prop &&
      typeof prop !== 'string' &&
      !(prop instanceof window.Blob) &&
      !(prop instanceof window.File)
    ) {
      return new Error(`Invalid ${propName} supplied to ${componentName}
        expected either string or file/blob`);
    }

    return null;
  },

  mediaElt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(window.HTMLElement)
  ]),
  audioPeaks: PropTypes.array,
  volume: PropTypes.number,
  zoom: PropTypes.number,
  responsive: PropTypes.bool,
  onPosChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
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
    waveColor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(window.CanvasGradient)
    ]),
    autoCenter: PropTypes.bool
  })
};

Wavesurfer.defaultProps = {
  playing: false,
  pos: 0,
  options: WaveSurfer.defaultParams,
  responsive: true,
  onPosChange: () => {}
};

export default Wavesurfer;
