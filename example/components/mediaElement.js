import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

class MediaElementExample extends React.Component {
  constructor(props) {
    super(props);
    this._getAudioSourceEl = this._getAudioSourceEl.bind(this);
  }

  // only after the initial render the audio source element exists,
  // so force a rerender
  componentDidMount() {
    this.forceUpdate();
  }

  _getAudioSourceEl() {
    return this.audioSourceEl;
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
          ref={(c) => { this.audioSourceEl = c; }}
        />
        <p>Passing in the media element as a ref:</p>
        {(this._getAudioSourceEl())
        ? <Wavesurfer mediaElt={this._getAudioSourceEl()} />
        : null}

        <p>Passing in the media element as a selector:</p>
        <Wavesurfer mediaElt="#audioSource" />
      </div>
    );
  }
}

module.exports = MediaElementExample;
