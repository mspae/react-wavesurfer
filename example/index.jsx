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
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
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
        <p>Clean Example</p>
        <button onClick={this.handleTogglePlay}>toggle play</button>
        <Wavesurfer
          pos={this.state.pos}
          options={waveOptions}
          onPosChange={this.handlePosChange}
          audioFile={this.props.audioFile}
          playing={this.state.playing}
        />
      </div>
    );
  }
}


/**
 * Example with the timeline plugin
 */
/*const WaveSurferTimeline = require('wavesurfer.js/plugin/wavesurfer.timeline.js');

class TimelineExample extends React.Component {
  constructor(props) {
    super(props);
  }
  addTimeline(e) {
    // Init Timeline plugin
    var timeline = Object.create(WaveSurferTimeline);
    timeline.init({
        wavesurfer: e.wavesurfer,
        container: '#wave-timeline'
    });
  }
  render() {
    return (
      <div className='example'>
        <p>With timeline plugin enabled and a few wavesurfer options set</p>
          <div id='wave-timeline' />
          <Wavesurfer
            audioFile={this.props.audioFile}
            onReady={this.addTimeline}
            options={{
              progressColor: '#906643',
              waveColor: '#eee',
              height: 50
            }}
          />
      </div>
    );
  }
}*/


/**
 * Example with the timeline plugin
 */
/*class RegionsExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  render() {
    return (
      <div className='example'>
        <p>With regions plugin enabled</p>
          <Wavesurfer
            audioFile={this.props.audioFile}
            regions={this.state.regions}
          />
      </div>
    );
  }
}*/


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
