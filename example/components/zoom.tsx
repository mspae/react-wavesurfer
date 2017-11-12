import * as React from 'react';
import { PureComponent } from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

export default class ZoomExample extends PureComponent {
  state: {
    audioFile: string;
    playing: boolean;
    zoom: number
  };

  constructor(props) {
    super(props);

    this.state = {
      audioFile: '../resources/demo.wav',
      playing: false,
      zoom: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  handleZoom(e) {
    this.setState({
      zoom: Number(e.target.value)
    });
  }

  render() {
    return (
      <div className="example col-xs-12">
        <h3>Zoom</h3>
        <div className="form-group">
          <label htmlFor="zoom-value">Zoom:</label>
          <input
            name="zoom-value"
            type="range"
            value={this.state.zoom}
            onChange={this.handleZoom}
            className="form-control"
          />
          <input
            className="form-control prop-value"
            type="number"
            placeholder={String(this.state.zoom)}
            readOnly
          />
        </div>
        <Wavesurfer
          audioFile={this.state.audioFile}
          playing={this.state.playing}
          zoom={this.state.zoom}
        />
      </div>
    );
  }
}
