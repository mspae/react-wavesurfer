import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'deep-assign';
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';

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

class Wavesurfer extends Component {
  constructor(props) {
    super(props);
    /** @private wavesurfer instance */
    this._ws = null;
    /** @private playback position */
    this._pos = null;
    /** @private ready/audio is playable */
    this._ready = false;
    /** @private wavesurfer element */
    this._el = null;
  }

  componentDidMount() {
    const options = assign({}, this.props.options, {
      container: this.wavesurferEl
    });

    // media element loading is only supported by MediaElement backend
    if (this.props.mediaElt) {
      options.backend = 'MediaElement';
    }

    this._ws = WaveSurfer.create(options);

    // file was loaded, wave was drawn
    this._ws.on('ready', () => {
      // set initial position
      if (this.props.pos) {
        this._seekTo(this.props.pos);
      }

      // set initial volume
      if (this.props.volume) {
        this._ws.setVolume(this.props.volume);
      }

      // set initial playing state
      if (this.props.playing) {
        this._ws.play();
      }

      // set initial zoom
      if (this.props.zoom) {
        this._ws.zoom(this.props.zoom);
      }
    });

    this._ws.on('audioprocess', pos => {
      this._pos = pos;
      this.props.onPosChange({
        wavesurfer: this._ws,
        originalArgs: [pos]
      });
    });

    // `audioprocess` is not fired when seeking, so we have to plug into the
    // `seek` event and calculate the equivalent in seconds (seek event
    // receives a position float 0-1) – See the README.md for explanation why we
    // need this
    this._ws.on('seek', pos => {
      if (this._ready) {
        const formattedPos = this._posToSec(pos);
        this._pos = formattedPos;
        this.props.onPosChange({
          wavesurfer: this._ws,
          originalArgs: [formattedPos]
        });
      }
    });

    // hook up events to callback handlers passed in as props
    EVENTS.forEach(e => {
      const propCallback = this.props[`on${capitaliseFirstLetter(e)}`];
      const wavesurfer = this._ws;
      if (propCallback) {
        this._ws.on(e, (...originalArgs) => {
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
  }

  // update wavesurfer rendering manually
  componentWillReceiveProps(nextProps) {
    // if we are loading a new audio file we need to seek again
    let newSource = false;
    let seekToInNewFile;

    // update audioFile
    if (this.props.audioFile !== nextProps.audioFile) {
      this._ready = false;
      this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
      newSource = true;
    }

    // update mediaElt
    if (this.props.mediaElt !== nextProps.mediaElt) {
      this._ready = false;
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
      this._ready &&
      nextProps.pos !== this.props.pos &&
      nextProps.pos !== this._pos
    ) {
      if (newSource) {
        seekToInNewFile = this._ws.on('ready', () => {
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
        this._ws.isPlaying() !== nextProps.playing)
    ) {
      if (nextProps.playing) {
        this._ws.play();
      } else {
        this._ws.pause();
      }
    }

    // update volume
    if (this.props.volume !== nextProps.volume) {
      this._ws.setVolume(nextProps.volume);
    }

    // update volume
    if (this.props.zoom !== nextProps.zoom) {
      this._ws.zoom(nextProps.zoom);
    }

    // update audioRate
    if (
      nextProps.options &&
      this.props.options.audioRate !== nextProps.options.audioRate
    ) {
      this._ws.setPlaybackRate(nextProps.options.audioRate);
    }
  }

  componentWillUnmount() {
    // remove listeners
    EVENTS.forEach(e => {
      this._ws.un(e);
    });

    // destroy wavesurfer instance
    this._ws.destroy();
  }

  // receives seconds and transforms this to the position as a float 0-1
  _secToPos(sec) {
    return 1 / this._ws.getDuration() * sec;
  }

  // receives position as a float 0-1 and transforms this to seconds
  _posToSec(pos) {
    return pos * this._ws.getDuration();
  }

  // pos is in seconds, the 0-1 proportional position we calculate here …
  _seekTo(sec) {
    const pos = this._secToPos(sec);
    if (this.props.options.autoCenter) {
      this._ws.seekAndCenter(pos);
    } else {
      this._ws.seekTo(pos);
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
      this._ws.loadMediaElement(audioFileOrElt, audioPeaks);
    } else if (typeof audioFileOrElt === 'string') {
      // bog-standard string is handled by load method and ajax call
      this._ws.load(audioFileOrElt, audioPeaks);
    } else if (
      audioFileOrElt instanceof window.Blob ||
      audioFileOrElt instanceof window.File
    ) {
      // blob or file is loaded with loadBlob method
      this._ws.loadBlob(audioFileOrElt, audioPeaks);
    } else {
      throw new Error(`Wavesurfer._loadAudio expects prop audioFile
        to be either HTMLElement, string or file/blob`);
    }
  }

  render() {
    const childrenWithProps = this.props.children
      ? React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            wavesurfer: this._ws
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
  onPosChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  /**
   * @see https://wavesurfer-js.org/doc/typedef/index.html#static-typedef-WavesurferParams
   */
  options: PropTypes.shape({
    audioContext: PropTypes.instanceOf(AudioContext),
    audioRate: PropTypes.number,
    autoCenter: PropTypes.bool,
    backend: PropTypes.oneOf(['WebAudio', 'MediaElement']),
    barWidth: (props, propName, componentName) => {
      const prop = props[propName];
      if (prop !== undefined && typeof prop !== 'number') {
        return new Error(`Invalid ${propName} supplied to ${componentName}
          expected either undefined or number`);
      }

      return null;
    },
    closeAudioContext: PropTypes.bool,
    cursorColor: PropTypes.string,
    cursorWidth: positiveIntegerProptype,
    fillParent: PropTypes.bool,
    forceDecode: PropTypes.bool,
    height: positiveIntegerProptype,
    hideScrollbar: PropTypes.bool,
    interact: PropTypes.bool,
    loopSelection: PropTypes.bool,
    maxCanvasWidth: positiveIntegerProptype,
    mediaControls: PropTypes.bool,
    mediaType: (props, propName, componentName) => {
      const prop = props[propName];
      const backend = props['backend'] || 'WebAudio';
      if (backend !== 'MediaElement' && prop) {
        return new Error(`Invalid ${propName} supplied to ${componentName}
          This prop type expects the backend to be of type 'MediaElement'`);
      }
    },
    minPxPerSec: positiveIntegerProptype,
    normalize: PropTypes.bool,
    partialRender: PropTypes.bool,
    pixelRatio: PropTypes.number,
    progressColor: PropTypes.string,
    renderer: PropTypes.func,
    responsive: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    scrollParent: PropTypes.bool,
    skipLength: positiveIntegerProptype,
    splitChannels: PropTypes.bool,
    waveColor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(window.CanvasGradient)
    ])
  })
};

Wavesurfer.defaultProps = {
  playing: false,
  pos: 0,
  options: WaveSurfer.defaultParams,
  onPosChange: () => {}
};

export default Wavesurfer;
