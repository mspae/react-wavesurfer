import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';
import Timeline from '../../src/plugins/timeline';

class TimelineExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    return (
      <div className='example col-xs-12'>
        <h3>Timeline</h3>
        <Wavesurfer
          audioFile={this.props.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
        >
          <Timeline />
        </Wavesurfer>
      </div>
    );
  }
}

module.exports = TimelineExample;
