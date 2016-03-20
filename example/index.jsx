import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from '../src/react-wavesurfer';
import Regions from '../src/plugins/regions';

class RegionsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      regions: [{
        id: 'One',
        start: 0,
        end: 3
      }, {
        id: 'Two',
        start: 4,
        end: 7
      }, {
        id: 'Three',
        start: 9,
        end: 13
      }]
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleReady = this.handleReady.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handleReady({ originalArgs, wavesurfer }) {
    this.setState({
      pos: 5
    });
  }
  render() {
    return (
      <div className='example'>
        <Wavesurfer
          audioFile={this.props.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
        >
          <Regions regions={this.state.regions} />
        </Wavesurfer>
      </div>
    );
  }
}

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
      <div className='example'>

        <p>
          <strong>volume:</strong>
          <input type='range'
            min={0}
            max={1}
            step='0.01'
            value={this.state.volume}
            onChange={this.handleVolumeChange} />
          <span className='prop-val'>
            {this.state.volume + ''}
          </span>
        </p>
        <p>
          <strong>playing:</strong>
          <button onClick={this.handleTogglePlay}>toggle play</button>
          <span className='prop-val'>
            {this.state.playing + ''}
          </span>
        </p>
        <p>
          <strong>position:</strong>
          <input type='number'
            step='0.01'
            value={this.state.pos}
            onChange={this.handlePosChange} />
        </p>
        <p>Should set to 5 seconds on load.</p>
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



class ExampleParent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile:'../resources/demo.wav'
    };
  }
  render () {
    return (
      <div className='example-list'>
        <h1>react-wavesurfer examples</h1>
        <SimpleExample audioFile={this.state.audioFile} />

        <RegionsExample audioFile={this.state.audioFile} />
      </div>
    );
  }
}


ReactDOM.render(<ExampleParent />, document.getElementById('app'));
