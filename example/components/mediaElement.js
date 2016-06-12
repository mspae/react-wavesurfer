import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

class MediaElementExample extends React.Component {
  constructor(props) {
    super(props);
    this._getAudioSource = this._getAudioSource.bind(this);
  }

  // only after the initial render the audio source element exists,
  // so force a rerender
  componentDidMount() {
    this.forceUpdate();
  }

  _getAudioSource() {
    return this.refs.audioSource;
  }

  // if audio source dom element exists (after first render),
  // render the wavesurfer component
  render() {
    return (
      <div className="example col-xs-12">
        <h3>Media element audio source</h3>
        <audio src="../resources/demo.wav" id="audioSource" ref="audioSource" />
        {(this._getAudioSource())
        ? <Wavesurfer mediaElt={this._getAudioSource()} />
        : null}
        <Wavesurfer mediaElt="#audioSource" />
      </div>
    );
  }
}

module.exports = MediaElementExample;
