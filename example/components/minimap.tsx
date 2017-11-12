import * as React from 'react';
import { PureComponent } from 'react';
import Wavesurfer from '../../src/react-wavesurfer';
import Minimap from '../../src/plugins/minimap';

export default class MinimapExample extends PureComponent {
  state: {
    playing: boolean;
    audioFile: string
  };  
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
    const minimapOptions = {
      height: 30,
      waveColor: '#ddd',
      progressColor: '#999',
      cursorColor: '#999'
    };
    return (
      <div className="example col-xs-12">
        <h3>Minimap</h3>
        <Wavesurfer
          audioFile={this.state.audioFile}
          playing={this.state.playing}
        >
        {ws => (
          <Minimap
            wavesurfer={ws}
            options={minimapOptions}
          />
        )}
        </Wavesurfer>
      </div>
    );
  }
}
