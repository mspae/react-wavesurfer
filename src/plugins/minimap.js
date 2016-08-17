import React, { Component, PropTypes } from 'react';
require('imports?define=>false,exports=>false!wavesurfer.js/dist/plugin/wavesurfer.minimap.js');

class Minimap extends Component {

  componentDidMount() {
    this._init = this._init.bind(this);
    this._map = undefined;

    if (this.props.isReady) this._init();
    this.props.wavesurfer.on('ready', this._init);
  }

  _init() {
    this._map = this.props.wavesurfer.initMinimap(this.props.options);
    this._map.render();
  }

  render() {
    return (
      <div></div>
    );
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
