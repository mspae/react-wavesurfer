import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';
import Timeline from '../../src/plugins/timeline';

class TimelineExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile: '../resources/demo.wav',
      playing: false
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  render() {
    const timelineOptions = {
      timeInterval: 0.5,
      height: 30,
      primaryFontColor: '#00f',
      primaryColor: '#00f'
    };
    return (
      <div className="example col-xs-12">
        <h3>Timeline</h3>
        <Wavesurfer
          audioFile={this.state.audioFile}
          playing={this.state.playing}
        >
          <Timeline
            options={timelineOptions}
          />
        </Wavesurfer>
      </div>
    );
  }
}

module.exports = TimelineExample;
