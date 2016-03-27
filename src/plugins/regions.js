import React, {Component, PropTypes} from 'react';
const WaveSurferRegions = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');

const REGIONS_EVENTS = [
  'region-in ',
  'region-out',
  'region-mouseenter',
  'region-mouseleave',
  'region-click',
  'region-dblclick',
  'region-updated ',
  'region-update-end ',
  'region-removed ',
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
  }

  _init() {
    REGIONS_EVENTS.forEach((e) => {
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

    // add regions and hook up callbacks to region objects
    for (let id in this.props.regions) {
      if (this.props.regions.hasOwnProperty(id))
        this._hookUpRegionEvents(this.props.wavesurfer.addRegion(this.props.regions[id]));
    }
  }

  _hookUpRegionEvents(region) {
    REGION_EVENTS.forEach((e) => {
      const propCallback = this.props['onSingleRegion' + capitaliseFirstLetter(e)];
      const wavesurfer = this.props.wavesurfer;
      if (propCallback) {
        region.on(e, function() {
          propCallback({
            wavesurfer: wavesurfer,
            originalArgs: [...arguments],
            region: region
          });
        });
      }
    });

    region.on('remove', () => {
      REGION_EVENTS.forEach(e => {
        region.un(e);
      });
    })
  }

  componentWillUnmount() {
    REGION_EVENTS.forEach((e) => {
      this.props.wavesurfer.un(e);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    // cache reference to old regions
    const oldRegions = Object.create(this.props.wavesurfer.regions.list);

    for (let regionId in nextProps.regions) {
      if (nextProps.regions.hasOwnProperty(regionId)) {
        const newRegion = nextProps.regions[regionId];

        // remove from oldRegions
        delete oldRegions[regionId];

        // new regions
        if (!this.props.wavesurfer.regions.list[regionId]) {
          this._hookUpRegionEvents(nextProps.wavesurfer.addRegion(newRegion));

        // update regions
        } else if (this.props.wavesurfer.regions.list[regionId] && (
          this.props.wavesurfer.regions.list[regionId].start !== newRegion.start ||
          this.props.wavesurfer.regions.list[regionId].end !== newRegion.end)) {
          nextProps.wavesurfer.regions.list[regionId].update({
            start: newRegion.start,
            end: newRegion.end
          });
        }
      }
    }

    // remove any old regions
    for (let regionId in oldRegions) {
      if (oldRegions.hasOwnProperty(regionId))
        nextProps.wavesurfer.regions.list[regionId].remove();
    }
  }

  render() {
    return (<div></div>);
  }
}

Regions.propTypes = {
  isReady: PropTypes.bool,
  regions: PropTypes.object,
};

Regions.defaultProps = {
  regions: []
};

export default Regions;
