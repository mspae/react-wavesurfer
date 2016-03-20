import React, {Component, PropTypes} from 'react';
const WaveSurferRegions = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');

class Regions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props._isReady) {
      console.log('init');
      this.init();
    }
    this.props.wavesurfer.on('ready', this._init.bind(this));
  }

  _init() {


    this.props.regions.map(region => {
      console.log(this.props.wavesurfer);
      return this.props.wavesurfer.addRegion(region);
    });
  }

  render() {
    return (<div></div>);
  }
}

Regions.propTypes = {
  isReady: PropTypes.bool,
  regions: PropTypes.array
};

Regions.defaultProps = {
  regions: []
};

export default Regions;
