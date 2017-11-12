import * as React from 'react';
import { PureComponent } from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

export default class MediaElementExample extends PureComponent {
  _el?: HTMLMediaElement;

  constructor(props) {
    super(props);
    this._getEl = this._getEl.bind(this);
  }

  // only after the initial render the audio source element exists,
  // so force a rerender
  componentDidMount() {
    this.forceUpdate();
  }

  private _getEl() {
    return this._el;
  }

  // if audio source dom element exists (after first render),
  // render the wavesurfer component
  render() {
    return (
      <div className="example col-xs-12">
        <h3>Media element audio source</h3>

        <audio
          src="../resources/demo.wav"
          id="audioSource"
          ref={(c) => { this._el = c; }}
        />
        <p>Passing in the media element as a ref:</p>
        {(this._getEl())
        ? <Wavesurfer mediaElt={this._getEl()} />
        : null}

        <p>Passing in the media element as a selector:</p>
        <Wavesurfer mediaElt="#audioSource" />
      </div>
    );
  }
}