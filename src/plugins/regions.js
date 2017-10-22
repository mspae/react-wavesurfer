import { Component } from 'react';
import PropTypes from 'prop-types';
import WaveSurferRegions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';

const REGIONS_EVENTS = [
  'region-in',
  'region-out',
  'region-mouseenter',
  'region-mouseleave',
  'region-click',
  'region-dblclick',
  'region-updated',
  'region-update-end',
  'region-removed',
  'region-play'
];

const REGION_EVENTS = [
  'in',
  'out',
  'remove',
  'update',
  'click',
  'dbclick',
  'over',
  'leave'
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

class Regions extends Component {
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

    // cache reference to old regions
    const oldRegions = { ...nextProps.wavesurfer.regions.list };

    Object.keys(nextProps.regions).forEach(regionId => {
      const region = nextProps.regions[regionId];
      // remove from oldRegions
      delete oldRegions[regionId];
      // new regions
      if (!nextProps.wavesurfer.regions.list[regionId]) {
        this._hookUpRegionEvents(nextProps.wavesurfer.addRegion(region));
        // update regions
      } else if (
        oldRegions[regionId] &&
        (oldRegions[regionId].start !== region.start ||
          oldRegions[regionId].end !== region.end)
      ) {
        nextProps.wavesurfer.regions.list[regionId].update(region);
      }
    });

    Object.keys(oldRegions).forEach(regionId => {
      nextProps.wavesurfer.regions.list[regionId].remove();
    });
  }

  componentWillUnmount() {
    this.props.wavesurfer.destroyPlugin('regions');
    REGION_EVENTS.forEach(e => {
      this.props.wavesurfer.un(e);
    });
  }

  _init(props) {
    const { regions, wavesurfer } = props;
    if (!wavesurfer) {
      return;
    }

    wavesurfer.addPlugin(WaveSurferRegions.create()).initPlugin('regions');

    REGIONS_EVENTS.forEach(e => {
      const propCallback = this.props[`on${capitaliseFirstLetter(e)}`];
      if (!propCallback) return;

      wavesurfer.on(e, (...originalArgs) => {
        propCallback({
          wavesurfer,
          originalArgs
        });
      });
    });

    // add regions and hook up callbacks to region objects
    Object.keys(regions).forEach(regionId => {
      const region = regions[regionId];
      this._hookUpRegionEvents(wavesurfer.addRegion(region));
    });
    this.setState({
      isInitialised: true
    });
  }

  _hookUpRegionEvents(region) {
    REGION_EVENTS.forEach(e => {
      const propCallback = this.props[
        `onSingleRegion${capitaliseFirstLetter(e)}`
      ];
      const { wavesurfer } = this.props;
      if (propCallback) {
        region.on(e, (...originalArgs) => {
          propCallback({
            wavesurfer,
            originalArgs,
            region
          });
        });
      }
    });

    region.on('remove', () => {
      REGION_EVENTS.forEach(e => {
        region.un(e);
      });
    });
  }

  render() {
    return false;
  }
}

Regions.propTypes = {
  regions: PropTypes.object,
  wavesurfer: PropTypes.object
};

Regions.defaultProps = {
  regions: []
};

export default Regions;
