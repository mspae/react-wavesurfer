import { Component, PropTypes } from 'react';
require('imports?define=>false,exports=>false!wavesurfer.js/dist/plugin/wavesurfer.minimap.js');

class Minimap extends Component {

  componentDidMount() {
    this._map = undefined;
    this.props.wavesurfer.on('ready', this._init.bind(this));
  }

  _init() {
    this._map = Object.create(WaveSurfer.Minimap);
    this._map.init(this.props.wavesurfer, this.props.options);
    this._map.render();
    console.log(this._map);
    //this._map.backend.drawer.empty();
    this._map.drawWave();
  }

  render() {
    return false;
  }
}

Minimap.propTypes = {
  isReady: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  wavesurfer: PropTypes.object
};

Minimap.defaultProps = {
  isReady: false,
  options: {}
};

export default Minimap;
