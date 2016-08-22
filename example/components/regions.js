import React from 'react';
import assign from 'deep-assign';
import Wavesurfer from '../../src/react-wavesurfer';
import Regions from '../../src/plugins/regions';

class RegionsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile: '../resources/demo.wav',
      playing: false,
      activeRegion: 'One',
      regions: {
        One: {
          id: 'One',
          start: 0,
          end: 3
        },
        Two: {
          id: 'Two',
          start: 4,
          end: 5.25
        },
        Three: {
          id: 'Three',
          start: 4.75,
          end: 6.2
        }
      }
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleRegionClick = this.handleRegionClick.bind(this);
    this.handleSingleRegionUpdate = this.handleSingleRegionUpdate.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  handleSingleRegionUpdate(e) {
    const newState = assign({}, this.state, {
      regions: {
        [e.region.id]: e.region
      }
    });
    this.setState(newState);
  }

  handleRegionChange(e) {
    const newState = assign({}, this.state, {
      regions: {
        [this.state.activeRegion]: {
          [e.target.name]: Number(e.target.value)
        }
      }
    });

    this.setState(newState);
  }

  handleRegionClick(e) {
    this.setState({
      activeRegion: e.originalArgs[0].id
    });
  }

  render() {
    const activeEnd = this.state.activeRegion && this.state.regions[this.state.activeRegion]
      ? this.state.regions[this.state.activeRegion].end
      : 0;
    const activeStart = this.state.activeRegion && this.state.regions[this.state.activeRegion]
      ? this.state.regions[this.state.activeRegion].start
      : 0;
    return (
      <div className="example col-xs-12">
        <h3>Regions</h3>
        <button onClick={this.handleTogglePlay} className="btn btn-primary btn-block">
          toggle play
        </button>
        <div className="row">
          <div className="form-group col-xs-4">
            <label htmlFor="region-id">ID:</label>
            <input
              name="region-id"
              className="form-control prop-value"
              type="text"
              placeholder={this.state.activeRegion}
              readOnly
            />
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="region-start">Start:</label>
            <input
              name="region-start"
              type="number"
              className="form-control prop-value"
              value={activeStart}
              onChange={this.handleRegionChange}
            />
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="region-end">End:</label>
            <input
              name="region-end"
              type="number"
              className="form-control prop-value"
              value={activeEnd}
              onChange={this.handleRegionChange}
            />
          </div>
        </div>
        <Wavesurfer
          audioFile={this.state.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
        >
          <Regions
            onSingleRegionUpdate={this.handleSingleRegionUpdate}
            onRegionClick={this.handleRegionClick}
            regions={this.state.regions}
          />
        </Wavesurfer>
      </div>
    );
  }
}

module.exports = RegionsExample;
