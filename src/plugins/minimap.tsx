import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import * as WaveSurferMinimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';

export type IMinimapProps = {
  options: object;
  wavesurfer: any;
};

export default class Minimap extends PureComponent<IMinimapProps, {}> {
  private _initialised: boolean;
  static propTypes = {
    options: PropTypes.object.isRequired,
    wavesurfer: PropTypes.object
  };

  static defaultProps = {
    options: {}
  };

  /**
 * Creates an instance of Minimap.
 * @param {IMinimapProps} props
 * @memberof Minimap
 */
  constructor(props: IMinimapProps) {
    super(props);
    this._initialised = false;
  }

  componentDidMount(): void {
    this._init(this.props);
  }

  /**
   * Update the plugin
   *
   * @param {IMinimapProps} nextProps
   * @returns {void}
   * @memberof Minimap
   */
  componentWillReceiveProps(nextProps: IMinimapProps): void {
    // only update if the wavesurfer instance has been ready
    if (!nextProps.wavesurfer) {
      return;
    }

    if (!this._initialised) {
      this._init(nextProps);
    }
  }

  /**
   * Unmount the component
   *
   * @memberof Minimap
   */
  componentWillUnmount(): void {
    this.props.wavesurfer.destroyPlugin('minimap');
  }

  /**
   * Initialise the plugin
   *
   * @param {IMinimapProps} props
   * @returns {void}
   * @memberof Minimap
   */
  _init(props: IMinimapProps): void {
    const { options, wavesurfer } = props;
    if (!wavesurfer) {
      return;
    }

    wavesurfer.addPlugin(WaveSurferMinimap.create(options));
    setTimeout(() => wavesurfer.initPlugin('minimap'));

    this._initialised = true;
  }

  render() {
    return null;
  }
}
