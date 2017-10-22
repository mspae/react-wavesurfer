import { Component } from 'react';
import PropTypes from 'prop-types';
import WaveSurferMinimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';

class Minimap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitialised: false
    };
  }

  componentDidMount() {
    this._init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // only update if the wavesurfer instance has been ready
    if (!nextProps.wavesurfer) {
      return;
    }

    if (!this.state.isInitialised) {
      this._init(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.wavesurfer.destroyPlugin('minimap');
  }

  _init(props) {
    const { options, wavesurfer } = props;
    if (!wavesurfer) {
      return;
    }

    wavesurfer
      .addPlugin(WaveSurferMinimap.create(options))
      .initPlugin('minimap');
    this.setState({
      isInitialised: true
    });
  }

  render() {
    return null;
  }
}

Minimap.propTypes = {
  options: PropTypes.object.isRequired,
  wavesurfer: PropTypes.object
};

Minimap.defaultProps = {
  options: {}
};

export default Minimap;
