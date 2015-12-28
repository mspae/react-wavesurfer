/* global WaveSurfer */
import React, {PropTypes} from 'react';

// either use an already included WaveSurfer, or import it here
// the bundle file is built with `npm run wavesurfer`, this is
// necessary for testing
const WaveSurfer = WaveSurfer || require('../vendor/wavesurfer-bundle.js');

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

    this._loadAudio = this._loadAudio.bind(this);
  }

  componentDidMount() {
    let options = Object.assign({}, {
      container: this.refs.wavesurfer
    }, this.props.options);

    this._wavesurfer.init(options);

    EVENTS.forEach((e) => {
      let propCallback = this.props['on' + capitaliseFirstLetter(e)];
      if (propCallback) {
        this._wavesurfer.on(e, propCallback);
      }
    });

    if (this.props.audioFile) {
      this._loadAudio(this.props.audioFile);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.audioFile !== nextProps.audioFile) {
      this._loadAudio(nextProps.audioFile);
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
      this._wavesurfer.off(e);
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
