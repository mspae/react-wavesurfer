import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as WaveSurferTimeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';

export type ITimelineProps = {
  wavesurfer: any;
  options: object;
};

export default class Timeline extends Component<ITimelineProps, {}> {
  private _el?: HTMLElement;
  private _initialised: boolean;

  static propTypes = {
    options: PropTypes.object.isRequired,
    wavesurfer: PropTypes.object
  };

  static defaultProps = {
    options: {}
  };

  constructor(props: ITimelineProps) {
    super(props);
    this._el = null;
    this._initialised = false;
  }

  componentDidMount() {
    this._init(this.props);
  }

  componentWillReceiveProps(nextProps: ITimelineProps) {
    if (!this._initialised) {
      this._init(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.wavesurfer.destroyPlugin('timeline');
  }

  /**
   * Initialise the plugin
   *
   * @private
   * @param {ITimelineProps} props
   * @returns {void}
   * @memberof Timeline
   */
  private _init(props: ITimelineProps): void {
    const { options, wavesurfer } = props;
    if (!wavesurfer) {
      return;
    }

    // @todo fix the bug which stops initialisation from working without
    // setTimeout
    wavesurfer.addPlugin(
      WaveSurferTimeline.create({ ...options, container: this._el })
    );
    setTimeout(() => wavesurfer.initPlugin('timeline'));

    this._initialised = true;
  }

  render() {
    return (
      <div
        className="timeline"
        ref={c => {
          this._el = c;
        }}
      />
    );
  }
}
