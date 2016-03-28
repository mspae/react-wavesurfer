import React, { Component, PropTypes } from 'react';
require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');

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
  return string.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

class Regions extends Component {
  constructor(props) {
    super(props);

    // this is so that jscs does not force us to go functional
    this.state = {};
  }

  componentDidMount() {
    if (this.props.isReady) {
      this.init();
    }

    this.props.wavesurfer.on('ready', this._init.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    // cache reference to old regions
    const oldRegions = Object.create(this.props.wavesurfer.regions.list);
    let newRegion;
    let oldRegion;

    for (newRegion of nextProps.regions) {
      // remove from oldRegions
      delete oldRegions[newRegion.id];

      // new regions
      if (!this.props.wavesurfer.regions.list[newRegion.id]) {
        this._hookUpRegionEvents(nextProps.wavesurfer.addRegion(newRegion));

      // update regions
      } else if (this.props.wavesurfer.regions.list[newRegion.id] && (
        this.props.wavesurfer.regions.list[newRegion.id].start !== newRegion.start ||
        this.props.wavesurfer.regions.list[newRegion.id].end !== newRegion.end)) {
        nextProps.wavesurfer.regions.list[newRegion.id].update({
          start: newRegion.start,
          end: newRegion.end
        });
      }
    }

    // remove any old regions
    for (oldRegion of oldRegions) {
      nextProps.wavesurfer.regions.list[oldRegion.id].remove();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    REGION_EVENTS.forEach((e) => {
      this.props.wavesurfer.un(e);
    });
  }

  _init() {
    let newRegion;

    REGIONS_EVENTS.forEach((e) => {
      const propCallback = this.props[`on${capitaliseFirstLetter(e)}`];
      const wavesurfer = this.props.wavesurfer;
      if (propCallback) {
        this._wavesurfer.on(e, (...originalArgs) => {
          propCallback({
            wavesurfer,
            originalArgs
          });
        });
      }
    });

    // add regions and hook up callbacks to region objects
    for (newRegion of this.props.regions) {
      this._hookUpRegionEvents(this.props.wavesurfer.addRegion(newRegion));
    }
  }

  _hookUpRegionEvents(region) {
    REGION_EVENTS.forEach((e) => {
      const propCallback = this.props[`onSingleRegion${capitaliseFirstLetter(e)}`];
      const wavesurfer = this.props.wavesurfer;
      if (propCallback) {
        this._wavesurfer.on(e, (...originalArgs) => {
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
    return (<div></div>);
  }
}

Regions.propTypes = {
  isReady: PropTypes.bool,
  regions: PropTypes.object,
  wavesurfer: PropTypes.object.isRequired
};

Regions.defaultProps = {
  regions: []
};

export default Regions;
