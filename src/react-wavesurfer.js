/* global WaveSurfer */
import React, {PropTypes} from 'react';

const WaveSurfer = WaveSurfer || {};

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
    console.log(WaveSurfer);
    if (typeof WaveSurfer === undefined) {
      throw new Error('WaveSurfer is undefined! Either include the Wavesurfer file(s) in a script tag before the react-wavesurfer component or require/import it (but be sure to append module.exports = WaveSurfer; to the Wavesurfer bundle file as it only exports to window.WaveSurfer by default)');
    }
    this._wavesurfer = Object.create(WaveSurfer);
  }

  componentDidMount() {
    let options = Object.assign({}, {
      container: this.refs.wavesurfer
    }, this.props.options);
    this._wavesurfer.init(options);

    EVENTS.forEach((e) => {
      let callbackPropName = 'on' + capitaliseFirstLetter(e);
      this._wavesurfer.on(e, this.props[callbackPropName]);
    });
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
