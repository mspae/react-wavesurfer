import React from 'react';
import Wavesurfer from '../../lib/react-wavesurfer';
import Regions from '../../lib/plugins/regions';

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
    this.handleRegionClick = this.handleRegionClick.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handleRegionClick(e) {
    this.setState({
      activeRegion: e.originalArgs[0].id
    });
  }
  render() {
    return (
      <div className='example col-xs-12'>
        <h3>Regions</h3>
        <div className='form-group'>
          <label>Clicked region with ID:</label>
          <input className='form-control prop-value' type='text' placeholder={this.state.activeRegion} readOnly />
        </div>
        <Wavesurfer
          audioFile={this.props.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
        >
          <Regions
            regions={this.state.regions}
            onRegionClick={this.handleRegionClick}
          />
        </Wavesurfer>
      </div>
    );
  }
}

module.exports = RegionsExample;
