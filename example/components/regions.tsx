import * as React from 'react';
import { PureComponent } from 'react';
import * as assign from 'deep-assign';
import Wavesurfer from '../../src/react-wavesurfer';
import Regions from '../../src/plugins/regions';
import { ICallbackArgs } from '../../src/interface';

export default class RegionsExample extends PureComponent {
  state: {
    playing: boolean;
    audioFile: string;
    activeRegion: string;
    regions: {
      [regionId: string]: {
        id: string;
        start: number,
        end: number
      }
    }
  }
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
    this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  handleRegionUpdate(e: ICallbackArgs): void {
    this.setState(assign({}, this.state, {
      regions: {
        [e.originalArgs[0].id]: {
          start: e.originalArgs[0].start,
          end: e.originalArgs[0].end
        }
      }
    }));
  }

  handleRegionChange(e) {
    this.setState(assign({}, this.state, {
      regions: {
        [this.state.activeRegion]: {
          [e.target.name]: +e.target.value
        }
      }
    }));
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

      console.log(this.state);
    return (
      <div className="example col-xs-12">
        <h3>Regions</h3>
        <button onClick={this.handleTogglePlay} className="btn btn-primary btn-block">
          toggle play
        </button>
        <button onClick={() => {
          const newState = assign({}, this.state, {
            regions: {
              'One': {
                'start': 2
              }
            }
          });
          this.setState(newState);
        }} className="btn btn-primary btn-block">
          move
        </button>
        <div className="row">
          <div className="form-group col-xs-4">
            <label htmlFor="region-id">ID:</label>
            <input
              name="id"
              className="form-control prop-value"
              type="text"
              placeholder={this.state.activeRegion}
              readOnly
            />
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="region-start">Start:</label>
            <input
              name="start"
              type="number"
              className="form-control prop-value"
              value={activeStart}
              onChange={this.handleRegionChange}
            />
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="region-end">End:</label>
            <input
              name="end"
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
        >
          {ws => (<Regions
            wavesurfer={ws}
            onRegionUpdated={this.handleRegionUpdate}
            onRegionClick={this.handleRegionClick}
            regions={this.state.regions}
          />)}
        </Wavesurfer>
      </div>
    );
  }
}
