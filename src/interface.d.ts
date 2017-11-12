export type ICallbackArgs = {
  wavesurfer: any;
  originalArgs: any[];
};

export type IWavesurferProps = {
  children?: (ws: object) => any;
  playing?: boolean;
  pos?: number;
  audioFile?: string | Blob | File;
  mediaElt?: string | HTMLMediaElement;
  audioPeaks?: number[] | number[][];
  volume?: number;
  zoom?: number;
  options?: IWavesurferParams;
  onPosChange?: (e: ICallbackArgs) => any;
  onAudioprocess?: (e: ICallbackArgs) => any;
  onError?: (e: ICallbackArgs) => any;
  onFinish?: (e: ICallbackArgs) => any;
  onLoading?: (e: ICallbackArgs) => any;
  onMouseup?: (e: ICallbackArgs) => any;
  onPause?: (e: ICallbackArgs) => any;
  onPlay?: (e: ICallbackArgs) => any;
  onReady?: (e: ICallbackArgs) => any;
  onScroll?: (e: ICallbackArgs) => any;
  onSeek?: (e: ICallbackArgs) => any;
  onZoom?: (e: ICallbackArgs) => any;
};

/**
 * @see https://wavesurfer-js.org/doc/typedef/index.html#static-typedef-WavesurferParams
 * @todo Put this into core wavesurfer
 */
export type IWavesurferParams = {
  audioContext?: AudioContext;
  audioRate?: number;
  autoCenter?: boolean;
  backend?: 'WebAudio' | 'MediaElement';
  barWidth?: number;
  closeAudioContext?: boolean;
  cursorColor?: string;
  cursorWidth?: number;
  fillParent?: boolean;
  forceDecode?: boolean;
  height?: number;
  hideScrollbar?: boolean;
  interact?: boolean;
  loopSelection?: boolean;
  maxCanvasWidth?: number;
  mediaControls?: boolean;
  mediaType?: string;
  minPxPerSec?: number;
  normalize?: boolean;
  partialRender?: boolean;
  pixelRatio?: number;
  progressColor?: string;
  renderer?: (wavesurfer?: object, params?: IWavesurferParams) => any;
  responsive?: number | boolean;
  scrollParent?: boolean;
  skipLength?: number;
  splitChannels?: boolean;
  waveColor?: string | CanvasGradient;
  container?: string | HTMLElement;
};
