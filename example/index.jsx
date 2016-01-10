import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer, {Timeline} from '../src/react-wavesurfer';


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
        <TimelineExample audioFile={this.state.audioFile} />
      </div>
    );
  }
}

/**
 * Simple example of a React component with a Wavesurfer
 */
class SimpleExample extends React.Component {
  render() {
    return (
      <div className='example'>
        <p>Clean Example</p>
        <Wavesurfer
          audioFile={this.props.audioFile}
        />
      </div>
    );
  }
}

/**
 * Example with the timeline plugin
 */
class TimelineExample extends React.Component {
  constructor(props) {
    super(props);
  }
  addTimeline(e) {
    // Init Timeline plugin
    var timeline = Object.create(Timeline);
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
}


ReactDOM.render(<ExampleParent />, document.getElementById('app'));
