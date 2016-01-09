/* global WaveSurfer */
import React, {PropTypes} from 'react';

// import wavesurfer.js commonjs build
const WaveSurfer = require('wavesurfer.js/dist/wavesurfer.cjs.js');

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
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @description Throws an error if the prop is nonexistant, not an integer or not positive
 */
function positiveIntegerProptype(props, propName, componentName) {
  let n = props[propName];
  if (!n || typeof n !== 'number' || n !== parseInt(n, 10) || n < 0) {
    return new Error('Invalid `' + propName + '` supplied to `' + componentName + '`' +
      ', expected a positive integer');
  }
}


class Wavesurfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (typeof WaveSurfer === undefined) {
      throw new Error('WaveSurfer is undefined! Either include the Wavesurfer file(s) in a script tag before the react-wavesurfer component or require/import it (but be sure to append module.exports = WaveSurfer; to the Wavesurfer bundle file as it only exports to window.WaveSurfer by default)');
    }
    this._wavesurfer = Object.create(WaveSurfer);
    this._fileLoaded = false;
    this._loadAudio = this._loadAudio.bind(this);
    this._seekTo = this._seekTo.bind(this);
  }

  componentDidMount() {
    let options = Object.assign({}, {
      container: this.refs.wavesurfer
    }, this.props.options);

    this._wavesurfer.init(options);

    // file was loaded, wave was drawn, update the _fileLoaded flag
    this._wavesurfer.on('ready', () => {
      this._fileLoaded = true;
      // if there is a position set via prop, go there …
      if (this.props.pos) {
        this._seekTo(this.props.pos);
      }
    });

    // hook up events to callback handlers passed in as props
    EVENTS.forEach((e) => {
      let propCallback = this.props['on' + capitaliseFirstLetter(e)];
      if (propCallback) {
        this._wavesurfer.on(e, propCallback);
      }
    });

    // if audioFile prop, load file
    if (this.props.audioFile) {
      this._loadAudio(this.props.audioFile);
    }
  }

  // update wavesurfer rendering manually
  componentWillReceiveProps(nextProps) {
    if (this.props.audioFile !== nextProps.audioFile) {
      this._loadAudio(nextProps.audioFile);
    }
    if (typeof nextProps.pos === 'number' && this._fileLoaded) {
      this._seekTo(nextProps.pos);
    }
    if (this.props.playing !== nextProps.playing) {
      if (nextProps.playing) {
        this._wavesurfer.play();
      } else {
        this._wavesurfer.pause();
      }
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  // pos is in seconds, the 0-1 proportional position we calculate here …
  _seekTo(sec) {
    let pos = 1 / this._wavesurfer.getDuration() * sec;
    if (this.props.autoCenter) {
      this._wavesurfer.seekAndCenter(pos);
    } else {
      this._wavesurfer.seekTo(pos);
    }
  }

  _loadAudio(audioFile) {
    // bog-standard string is handled by load method and ajax call
    if (typeof audioFile === 'string') {
      this._wavesurfer.load(audioFile);
    } else if (audioFile instanceof Blob || audioFile instanceof File) {
      // blob or file is loaded with loadBlob method
      this._wavesurfer.loadBlob(audioFile);
    } else {
      throw new Error('Wavesurfer._loadAudio expexts prop audioFile to be either string or file/blob');
    }
  }

  componentWillUnmount() {
    // remove listeners
    EVENTS.forEach((e) => {
      this._wavesurfer.un(e);
    });
    // destroy wavesurfer instance
    this._wavesurfer.destroy();
  }

  render() {
    return (
      <div ref='wavesurfer' />
    );
  }
}

Wavesurfer.propTypes = {
  playing: PropTypes.bool,
  pos: PropTypes.number,
  audioFile: function(props, propName, componentName) {
    let prop = props[propName];

    if (prop && typeof prop !== 'string' && !prop instanceof Blob && !prop instanceof File) {
      return new Error('Invalid `' + propName + '` supplied to `' + componentName +
          '` expected either string or file/blob');
    }
  },
  options: PropTypes.shape({
    audioRate: PropTypes.number,
    backend: PropTypes.oneOf(['WebAudio', 'MediaElement']),
    barWidth: function(props, propName, componentName) {
      let prop = props[propName];
      if (prop !== undefined && typeof prop !== 'number') {
        return new Error('Invalid `' + propName + '` supplied to `' + componentName +
          '` expected either undefined or number');
      }
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
  audioFile: undefined,
  options: {
    audioRate: 1,
    backend: 'WebAudio',
    barWidth: undefined,
    cursorColor: '#333',
    cursorWidth: 1,
    fillParent: true,
    height: 128,
    hideScrollbar: false,
    interact: true,
    minPxPerSec: 50,
    normalize: false,
    pixelRatio: window.devicePixelRatio || 1,
    progressColor: '#555',
    scrollParent: false,
    skipLength: 2,
    waveColor: '#999',
    autoCenter: true
  }
};

export default Wavesurfer;
