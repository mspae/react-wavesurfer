import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import capitaliseFirstLetter from '../util/capitalise-first-letter';
import * as WaveSurferRegions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';

const REGIONS_EVENTS = [
  'region-created',
  'region-in',
  'region-out',
  'region-removed',
  'region-updated',
  'region-update-end',
  'region-play',
  'region-click',
  'region-dblclick',
  'region-mouseenter',
  'region-mouseleave'
];

const REGION_EVENTS = [
  'in',
  'out',
  'remove',
  'update',
  'update-end',
  'play',
  'click',
  'dblclick',
  'mouseenter',
  'mouseleave'
];

export type IRegionsProps = {
  wavesurfer: any;
  regions?: {
    [regionId: string]: {
      id: string;
      start: number;
      end: number;
      loop?: boolean;
      resize?: boolean;
      color?: string;
    };
  };
  options?: object;
  onSingleRegionIn?: () => any;
  onSingleRegionOut?: () => any;
  onSingleRegionRemove?: () => any;
  onSingleRegionUpdate?: () => any;
  onSingleRegionUpdateEnd?: () => any;
  onSingleRegionPlay?: () => any;
  onSingleRegionClick?: () => any;
  onSingleRegionDblclick?: () => any;
  onSingleRegionMouseenter?: () => any;
  onSingleRegionMouseleave?: () => any;
  onRegionCreated?: (region: any) => any;
  onRegionIn?: (region: any) => any;
  onRegionOut?: (region: any) => any;
  onRegionRemoved?: (region: any) => any;
  onRegionUpdated?: (region: any) => any;
  onRegionUpdateEnd?: (region: any) => any;
  onRegionPlay?: (region: any) => any;
  onRegionClick?: (region: any, e: MouseEvent) => any;
  onRegionDblclick?: (region: any, e: MouseEvent) => any;
  onRegionMouseenter?: (region: any, e: MouseEvent) => any;
  onRegionMouseleave?: (region: any, e: MouseEvent) => any;
};

export default class Regions extends Component<IRegionsProps, {}> {
  private _initialised: boolean;

  static defaultProps = {
    regions: [],
    options: {}
  };

  static propTypes = {
    regions: PropTypes.object,
    options: PropTypes.object,
    onSingleRegionIn: PropTypes.func,
    onSingleRegionOut: PropTypes.func,
    onSingleRegionRemove: PropTypes.func,
    onSingleRegionUpdate: PropTypes.func,
    onSingleRegionUpdateEnd: PropTypes.func,
    onSingleRegionPlay: PropTypes.func,
    onSingleRegionClick: PropTypes.func,
    onSingleRegionDblclick: PropTypes.func,
    onSingleRegionMouseenter: PropTypes.func,
    onSingleRegionMouseleave: PropTypes.func,
    onRegionCreated: PropTypes.func,
    onRegionIn: PropTypes.func,
    onRegionOut: PropTypes.func,
    onRegionRemoved: PropTypes.func,
    onRegionUpdated: PropTypes.func,
    onRegionUpdateEnd: PropTypes.func,
    onRegionPlay: PropTypes.func,
    onRegionClick: PropTypes.func,
    onRegionDblclick: PropTypes.func,
    onRegionMouseenter: PropTypes.func,
    onRegionMouseleave: PropTypes.func
  };

  constructor(props: IRegionsProps) {
    super(props);
    this._initialised = false;
  }

  componentDidMount(): void {
    this._init(this.props);
    this._updateProps(this.props);
  }

  componentWillReceiveProps(nextProps: IRegionsProps): void {
    // only update if the wavesurfer instance has been ready
    if (!nextProps.wavesurfer) {
      return;
    }

    if (!this._initialised) {
      this._init(nextProps);
    }

    this._updateProps(nextProps);
  }

  componentWillUnmount() {
    this.props.wavesurfer.destroyPlugin('regions');
    REGION_EVENTS.forEach(e => {
      this.props.wavesurfer.un(e);
    });
  }

  /**
   * Initialise the plugin
   *
   * @private
   * @param {IRegionsProps} props
   * @returns {void}
   * @memberof Regions
   */
  private _init(props: IRegionsProps): void {
    const { regions, wavesurfer, options } = props;
    if (!wavesurfer) {
      return;
    }

    wavesurfer
      .addPlugin(WaveSurferRegions.create(options))
      .initPlugin('regions');

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
    this._initialised = true;
  }

  private _updateProps(props: IRegionsProps): void {
    // cache reference to old regions
    const oldRegions = { ...props.wavesurfer.regions.list };

    Object.keys(props.regions).forEach(regionId => {
      const region = props.regions[regionId];
      // remove from oldRegions
      // new regions
      if (!props.wavesurfer.regions.list[regionId]) {
        this._hookUpRegionEvents(props.wavesurfer.addRegion(region));
        // update regions
      } else if (
        oldRegions[regionId] &&
        (oldRegions[regionId].start !== region.start ||
          oldRegions[regionId].end !== region.end)
      ) {
        props.wavesurfer.regions.list[regionId].update(region);
      }
      delete oldRegions[regionId];
    });

    Object.keys(oldRegions).forEach(regionId => {
      props.wavesurfer.regions.list[regionId].remove();
    });
  }

  /**
   * Hook up the events of the regions after they are created
   *
   * @private
   * @param {*} region
   * @memberof Regions
   */
  private _hookUpRegionEvents(region: any): void {
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
