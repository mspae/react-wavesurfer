import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as WaveSurfer from 'wavesurfer.js';
import positiveIntegerProptype from './util/positive-integer-proptype';
import capitaliseFirstLetter from './util/capitalise-first-letter';

import {
  ICallbackArgs,
  IWavesurferProps,
  IWavesurferParams
} from './interface.d';

const EVENTS: string[] = [
  'audioprocess',
  'error',
  'finish',
  'loading',
  'mouseup',
  'pause',
  'play',
  'ready',
  'scroll',
  'seek',
  'zoom'
];

const propTypes = {
  children: PropTypes.func,
  playing: PropTypes.bool,
  pos: PropTypes.number,
  audioFile: PropTypes.oneOfType([
    PropTypes.instanceOf(Blob),
    PropTypes.instanceOf(File),
    PropTypes.string
  ]) as string | Blob | File,
  mediaElt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement)
  ]),
  audioPeaks: PropTypes.array,
  volume: PropTypes.number,
  zoom: PropTypes.number,
  onPosChange: PropTypes.func,
  onAudioprocess: PropTypes.func,
  onError: PropTypes.func,
  onFinish: PropTypes.func,
  onLoading: PropTypes.func,
  onMouseup: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onReady: PropTypes.func,
  onScroll: PropTypes.func,
  onSeek: PropTypes.func,
  onZoom: PropTypes.func,
  /**
   * @see https://wavesurfer-js.org/doc/typedef/index.html#static-typedef-WavesurferParams
   */
  options: PropTypes.shape({
    audioContext: PropTypes.instanceOf(AudioContext),
    audioRate: PropTypes.number,
    autoCenter: PropTypes.bool,
    backend: PropTypes.oneOf(['WebAudio', 'MediaElement']),
    barWidth: PropTypes.number,
    closeAudioContext: PropTypes.bool,
    cursorColor: PropTypes.string,
    cursorWidth: positiveIntegerProptype,
    fillParent: PropTypes.bool,
    forceDecode: PropTypes.bool,
    height: positiveIntegerProptype,
    hideScrollbar: PropTypes.bool,
    interact: PropTypes.bool,
    loopSelection: PropTypes.bool,
    maxCanvasWidth: positiveIntegerProptype,
    mediaControls: PropTypes.bool,
    mediaType: (props, propName, componentName) => {
      const prop = props[propName];
      const backend = props['backend'] || 'WebAudio';
      if (backend !== 'MediaElement' && prop) {
        return new Error(`Invalid ${propName} supplied to ${componentName}
          This prop type expects the backend to be of type 'MediaElement'`);
      }
    },
    minPxPerSec: positiveIntegerProptype,
    normalize: PropTypes.bool,
    partialRender: PropTypes.bool,
    pixelRatio: PropTypes.number,
    progressColor: PropTypes.string,
    renderer: PropTypes.func,
    responsive: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    scrollParent: PropTypes.bool,
    skipLength: positiveIntegerProptype,
    splitChannels: PropTypes.bool,
    waveColor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(CanvasGradient)
    ])
  })
};

const defaultProps = {
  playing: false,
  pos: 0,
  options: WaveSurfer.defaultParams,
  onPosChange: (e: ICallbackArgs) => {}
};

export default class Wavesurfer extends Component<IWavesurferProps, {}> {
  // @TODO add wavesurfer typedefs
  private _ws?: any;
  private _pos?: number;
  private _ready: boolean;
  private _initialised: boolean;
  private _el?: HTMLElement;
  private _appliedProps: {
    [objectId: string]: any;
  };
  private _options: IWavesurferParams;

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: IWavesurferProps) {
    super(props);
    this._ws = null;
    this._pos = null;
    this._ready = false;
    this._initialised = false;
    this._el = null;
    this._appliedProps = {};
  }

  componentDidMount() {
    if (!this._initialised) {
      this._init(this.props);
    }
  }

  /**
   * Update wavesurfer
   *
   * @param {IWavesurferProps} nextProps
   * @memberof Wavesurfer
   */
  componentWillReceiveProps(nextProps: IWavesurferProps) {
    if (this._initialised) {
      this._updateProps(nextProps);
    }
  }

  /**
   * Destroy and remove event listeners
   *
   * @memberof Wavesurfer
   */
  componentWillUnmount() {
    // remove listeners
    EVENTS.forEach(e => {
      this._ws.un(e);
    });

    // destroy wavesurfer instance
    this._initialised = false;
    this._ws.destroy();
  }

  /**
   * Cache an option value under a key to keep track of whether it is applied
   *
   * @private
   * @param {string} optionId
   * @param {*} optionVal
   * @memberof Wavesurfer
   */
  private _cacheAppliedProp(optionId: string, optionVal: any): void {
    this._appliedProps[optionId] = optionVal;
  }

  /**
   * Check whether an option has already been applied
   *
   * @private
   * @param {string} optionId
   * @param {*} newVal
   * @returns {boolean}
   * @memberof Wavesurfer
   */
  private _propIsNotApplied(optionId: string, newVal: any): boolean {
    return this._appliedProps[optionId] !== newVal;
  }

  /**
   * Build wavesurfer parameters
   *
   * @private
   * @param {IWavesurferProps} props
   * @memberof Wavesurfer
   */
  private _buildOptions(props: IWavesurferProps): void {
    this._options = {
      ...defaultProps.options,
      ...props.options,
      container: this._el
    };

    // media element loading is only supported by MediaElement backend
    if (props.mediaElt) {
      this._options.backend = 'MediaElement';
    }
  }

  /**
   * Initialise wavesurfer
   *
   * @private
   * @param {IWavesurferProps} props
   * @memberof Wavesurfer
   */
  private _init(props: IWavesurferProps): void {
    this._buildOptions(props);

    this._ws = WaveSurfer.create(this._options);
    this._initialised = true;

    this._hookupEvents(props);
    this._updateProps(props);
  }

  /**
   * Hookup wavesurfer instance events
   *
   * @private
   * @param {IWavesurferProps} props
   * @memberof Wavesurfer
   */
  private _hookupEvents(props: IWavesurferProps): void {
    // file was loaded, wave was drawn
    this._ws.on('ready', () => {
      this._ready = true;
      this._updateProps(props);
      this.forceUpdate();
    });

    this._ws.on('audioprocess', pos => {
      this._pos = pos;
      this.props.onPosChange({
        wavesurfer: this._ws,
        originalArgs: [pos]
      });
    });

    // `audioprocess` is not fired when seeking, so we have to plug into the
    // `seek` event and calculate the equivalent in seconds (seek event
    // receives a position float 0-1) – See the README.md for explanation why we
    // need this
    this._ws.on('seek', pos => {
      if (this._ready) {
        const formattedPos = this._posToSec(pos);
        this._pos = formattedPos;
        this.props.onPosChange({
          wavesurfer: this._ws,
          originalArgs: [formattedPos]
        });
      }
    });

    // hook up events to callback handlers passed in as props
    EVENTS.forEach(e => {
      const propCallback = this.props[`on${capitaliseFirstLetter(e)}`];
      const wavesurfer = this._ws;
      if (propCallback) {
        this._ws.on(e, (...originalArgs) => {
          propCallback(
            {
              wavesurfer,
              originalArgs
            } as ICallbackArgs
          );
        });
      }
    });
  }

  /**
   * Update the properties of the wavesurfer instance
   *
   * @private
   * @param {IWavesurferProps} props
   * @memberof Wavesurfer
   */
  private _updateProps(props: IWavesurferProps): void {
    if (props.options !== this.props.options) {
      this._buildOptions(props);
    }

    // update file/peaks
    if (this._propIsNotApplied('audioFile', props.audioFile)) {
      // update audioFile
      this._ready = false;
      this._cacheAppliedProp('audioFile', props.audioFile);
      this._loadAudio(props.audioFile, props.audioPeaks);
    } else if (this._propIsNotApplied('mediaElt', props.mediaElt)) {
      // update mediaElt
      this._ready = false;
      this._cacheAppliedProp('mediaElt', props.mediaElt);
      this._loadMediaElt(props.mediaElt, props.audioPeaks);
    } else if (this._propIsNotApplied('audioPeaks', props.audioPeaks)) {
      // update peaks
      this._ready = false;
      this._cacheAppliedProp('audioPeaks', props.audioPeaks);
      if (props.mediaElt) {
        this._loadMediaElt(props.mediaElt, props.audioPeaks);
      } else {
        this._loadAudio(props.audioFile, props.audioPeaks);
      }
    }

    // update position
    if (
      this._ready &&
      this._propIsNotApplied('pos', props.pos) &&
      props.pos !== this._pos
    ) {
      this._cacheAppliedProp('pos', props.pos);
      this._seekTo(props.pos);
    }

    // update playing state
    if (
      this._ready &&
      (this._propIsNotApplied('playing', props.playing) ||
        this._ws.isPlaying() !== props.playing)
    ) {
      this._cacheAppliedProp('playing', props.playing);
      if (props.playing) {
        this._ws.play();
      } else {
        this._ws.pause();
      }
    }

    // update volume
    if (this._propIsNotApplied('volume', props.volume)) {
      this._cacheAppliedProp('volume', props.volume);
      this._ws.setVolume(props.volume);
    }

    // update zoom
    if (this._ready && this._propIsNotApplied('zoom', props.zoom)) {
      this._cacheAppliedProp('zoom', props.zoom);
      this._ws.zoom(props.zoom);
    }

    // update audioRate
    if (
      props.options &&
      this._propIsNotApplied('options.audioRate', props.options.audioRate)
    ) {
      this._cacheAppliedProp('options.audioRate', props.options.audioRate);
      this._ws.setPlaybackRate(props.options.audioRate);
    }
  }

  /**
   * receives seconds and transforms this to the position as a float 0-1
   *
   * @private
   * @param {number} sec
   * @returns {number}
   * @memberof Wavesurfer
   */
  private _secToPos(sec: number): number {
    return 1 / this._ws.getDuration() * sec;
  }

  /**
   * receives position as a float 0-1 and transforms this to seconds
   *
   * @private
   * @param {number} pos
   * @returns {number}
   * @memberof Wavesurfer
   */
  private _posToSec(pos: number): number {
    return pos * this._ws.getDuration();
  }

  /**
   * pos is in seconds, the 0-1 proportional position we calculate here
   *
   * @private
   * @param {number} sec
   * @memberof Wavesurfer
   */
  private _seekTo(sec: number): void {
    const pos = this._secToPos(sec);
    if (this._options.autoCenter) {
      this._ws.seekAndCenter(pos);
    } else {
      this._ws.seekTo(pos);
    }
  }

  /**
   * load a media element selector or HTML element if selector, get the HTML
   * element for it and pass to _loadAudio
   *
   * @private
   * @param {(HTMLElement|string)} selectorOrElt
   * @param {(number[]|number[][])} [audioPeaks]
   * @memberof Wavesurfer
   */
  private _loadMediaElt(
    selectorOrElt: HTMLMediaElement | string,
    audioPeaks?: number[] | number[][]
  ) {
    if (selectorOrElt instanceof HTMLElement) {
      this._loadAudio(selectorOrElt, audioPeaks);
    } else {
      if (!window.document.querySelector(selectorOrElt)) {
        throw new Error('Media Element not found!');
      }

      this._loadAudio(
        window.document.querySelector(selectorOrElt) as HTMLMediaElement,
        audioPeaks
      );
    }
  }

  /**
   * Pass audio data to wavesurfer
   *
   * @private
   * @param {(HTMLMediaElement|File|Blob|string)} audioFileOrElt
   * @param {(number[]|number[][])} audioPeaks
   * @memberof Wavesurfer
   */
  private _loadAudio(
    audioFileOrElt: HTMLMediaElement | File | Blob | string,
    audioPeaks: number[] | number[][]
  ) {
    if (audioFileOrElt instanceof HTMLElement) {
      // media element
      this._ws.loadMediaElement(audioFileOrElt, audioPeaks);
    } else if (typeof audioFileOrElt === 'string') {
      // bog-standard string is handled by load method and ajax call
      this._ws.load(audioFileOrElt, audioPeaks);
    } else if (
      (audioFileOrElt as Blob) instanceof Blob ||
      (audioFileOrElt as File) instanceof File
    ) {
      // blob or file is loaded with loadBlob method
      this._ws.loadBlob(audioFileOrElt, audioPeaks);
    } else {
      throw new Error(`Wavesurfer._loadAudio expects prop audioFile
        to be either HTMLElement, string or file/blob`);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <div
          ref={c => {
            this._el = c;
          }}
        />
        {children && this._ws && children(this._ws)}
      </div>
    );
  }
}
