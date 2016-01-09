import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from '../src/react-wavesurfer';

class WavesurferParent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile: '../resources/demo.wav',
      pos: 20,
      playing: false
    };
  }
  render() {
    let props = this.state;
    return (
      <div>
        <Wavesurfer {...props} />
      </div>
      );
  }
}

ReactDOM.render(<WavesurferParent />, document.getElementById('app'));
