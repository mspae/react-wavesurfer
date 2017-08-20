import { Component } from 'react';
import PropTypes from 'prop-types';

class Minimap extends Component {
  componentDidMount() {
    this._map = undefined;

    // on('ready') returns an event descriptor which is an
    // object which has the property un, which is the un method
    // properly bound to this callback, we cache it and can call
    // it alter to just remove this event listener
    this._readyListener = this.props.wavesurfer.on('ready', () => {
      this._init();
    });
  }

  componentWillUnmount() {
    this._readyListener.un();
  }

  _init() {
    this._map = Object.create(WaveSurfer.Minimap);
    this._map.init(this.props.wavesurfer, this.props.options);
    this._map.render();
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
