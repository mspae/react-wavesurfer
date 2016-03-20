
import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer.js';


/**
 * Simple example of a React component with a Wavesurfer
 */
class SimpleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleReady = this.handleReady.bind(this);
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
        <p>Should set to 5 seconds on load.</p>
        <button onClick={this.handleTogglePlay}>toggle play</button>
        <p>playing: {this.state.playing + ''}</p>
        <p>position:
          <input type='number'
            step='0.01'
            value={this.state.pos}
            onChange={this.handlePosChange} />
        </p>
        <Wavesurfer
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
      </div>
    );
  }
}


ReactDOM.render(<ExampleParent />, document.getElementById('app'));
