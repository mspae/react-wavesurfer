import React, {Component, PropTypes} from 'react';
const WaveSurferRegions = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');

const REGION_EVENTS = [
  'region-in ',
  'region-out',
  'region-mouseenter',
  'region-mouseleave',
  'region-click',
  'region-dblclick',
  'region-created ',
  'region-updated ',
  'region-update-end ',
  'region-removed '
];

/**
 * @description Capitalise the first letter of a string
 */
function capitaliseFirstLetter(string) {
  return string.split('-').map(string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }).join('');
}

class Regions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props._isReady) {
      this.init();
    }
    this.props.wavesurfer.on('ready', this._init.bind(this));

    REGION_EVENTS.forEach((e) => {
      const propCallback = this.props['on' + capitaliseFirstLetter(e)];
      const wavesurfer = this.props.wavesurfer;
      if (propCallback) {
        this.props.wavesurfer.on(e, function() {
          propCallback({
            wavesurfer: wavesurfer,
            originalArgs: [...arguments]
          });
        });
      }
    });
  }

  _init() {
    this.props.regions.map(region => {
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
