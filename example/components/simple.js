import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

/**
 * Simple example of a React component with a Wavesurfer
 */
class SimpleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile: '../resources/demo.wav',
      playing: false,
      pos: 0,
      volume: 0.5,
      audioRate: 1
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleAudioRateChange = this.handleAudioRateChange.bind(this);
  }

  handleAudioRateChange(e) {
    this.setState({
      audioRate: +e.target.value
    });
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs ? e.originalArgs[0] : +e.target.value
    });
  }

  handleReady() {
    this.setState({
      pos: 5
    });
  }

  handleVolumeChange(e) {
    this.setState({
      volume: +e.target.value
    });
  }

  render() {
    const waveOptions = {
      scrollParent: true,
      height: 140,
      progressColor: '#6c718c',
      waveColor: '#c4c8dc',
      normalize: true,
      barWidth: 4,
      audioRate: this.state.audioRate
    };
    return (
      <div className="example col-xs-12">
        <h3>State & UI</h3>
        <div className="row">
          <div className="form-group col-xs-4">
            <label htmlFor="simple-volume">Volume:</label>
            <input
              name="simple-volume"
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              className="form-control"
            />
            <input
              className="form-control prop-value"
              type="text"
              placeholder={String(this.state.volume)}
              readOnly
            />
          </div>

          <div className="form-group col-xs-4">
            <label htmlFor="simple-playing">Playing:</label>
            <button onClick={this.handleTogglePlay} className="btn btn-primary btn-block">
              toggle play
            </button>
            <input
              name="simple-playing"
              className="form-control prop-value"
              type="text"
              placeholder={String(this.state.playing)}
              readOnly
            />
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="simple-pos">Position:</label>
            <input
              name="simple-pos"
              type="number"
              step="0.01"
              value={this.state.pos}
              onChange={this.handlePosChange}
              className="form-control"
            />
            <p>Should set to 5 seconds on load.</p>
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="simple-audiorate">Audio rate:</label>
            <input
              name="simple-audiorate"
              type="range"
              min="0"
              max="10"
              step="0.001"
              value={this.state.audioRate}
              onChange={this.handleAudioRateChange}
              className="form-control"
            />
            <p>Should set to 5 seconds on load.</p>
          </div>
        </div>
        <Wavesurfer
          volume={this.state.volume}
          pos={this.state.pos}
          options={waveOptions}
          onPosChange={this.handlePosChange}
          audioFile={this.state.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
        />
      </div>
    );
  }
}

module.exports = SimpleExample;
