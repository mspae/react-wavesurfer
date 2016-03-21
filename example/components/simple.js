import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

/**
 * Simple example of a React component with a Wavesurfer
 */
class SimpleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      volume: 0.5
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
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
  handleReady({ originalArgs, wavesurfer }) {
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
      normalize: true
    };
    return (
      <div className='example col-xs-12'>
        <h3>State & UI</h3>
        <div className='row'>
          <div className='form-group col-xs-4'>
            <label>Volume:</label>
            <input type='range'
              min={0}
              max={1}
              step='0.01'
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              className='form-control' />
            <input className='form-control prop-value' type='text' placeholder={this.state.volume + ''} readOnly />
          </div>

          <div className='form-group col-xs-4'>
            <label>Playing:</label>
            <button onClick={this.handleTogglePlay} className='btn btn-primary btn-block'>toggle play</button>
            <input className='form-control prop-value' type='text' placeholder={this.state.playing + ''} readOnly />
          </div>
          <div className='form-group col-xs-4'>
            <label>Position:</label>
            <input type='number'
              step='0.01'
              value={this.state.pos}
              onChange={this.handlePosChange}
              className='form-control' />
            <p>Should set to 5 seconds on load.</p>
          </div>
        </div>
        <Wavesurfer
          volume={this.state.volume}
          pos={this.state.pos}
          options={waveOptions}
          onPosChange={this.handlePosChange}
          audioFile={this.props.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
        />
      </div>
    );
  }
}

module.exports = SimpleExample;
