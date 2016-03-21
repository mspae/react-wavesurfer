import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from '../src/react-wavesurfer';
import Regions from '../src/plugins/regions';
class ZoomExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      <div className='example col-xs-12'>
        <div className='form-group'>
          <label>Zoom:</label>
          <input
            type='range'
            value={this.state.zoom}
            onChange={this.handleZoom}
            className='form-control'
          />
          <input className='form-control prop-value' type='number' placeholder={this.state.zoom + ''} readOnly />
        </div>
        <Wavesurfer
          audioFile={this.props.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
          zoom={this.state.zoom}
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

/**
 * Simple example of a React component with a Wavesurfer
 */
class SimpleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      volume: 0.5
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
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
  handleVolumeChange(e) {
    this.setState({
      volume: +e.target.value
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
      <div className='example col-xs-12'>
        <div className='row'>
          <div className='form-group col-xs-4'>
            <label>Volume:</label>
            <input type='range'
              min={0}
              max={1}
              step='0.01'
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              className='form-control' />
            <input className='form-control prop-value' type='text' placeholder={this.state.volume + ''} readOnly />
          </div>

          <div className='form-group col-xs-4'>
            <label>Playing:</label>
            <button onClick={this.handleTogglePlay} className='btn btn-primary btn-block'>toggle play</button>
            <input className='form-control prop-value' type='text' placeholder={this.state.playing + ''} readOnly />
          </div>
          <div className='form-group col-xs-4'>
            <label>Position:</label>
            <input type='number'
              step='0.01'
              value={this.state.pos}
              onChange={this.handlePosChange}
              className='form-control' />
            <p>Should set to 5 seconds on load.</p>
          </div>
        </div>
        <Wavesurfer
          volume={this.state.volume}
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
      <div className='container main-container'>
        <div className='row'>
          <h1 className='col-xs-12 col-lg-2'>react-wavesurfer examples</h1>
          <div className='col-xs-12 col-lg-8 col-lg-push-1'>
            <div className='row'>
              <SimpleExample audioFile={this.state.audioFile} />
            </div>
            <div className='row'>
              <RegionsExample audioFile={this.state.audioFile} />
            </div>
            <div className='row'>
              <ZoomExample audioFile={this.state.audioFile} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<ExampleParent />, document.getElementById('app'));
