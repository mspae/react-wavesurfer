import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from './src/react-wavesurfer';


ReactDOM.render(
  <div>
    <Wavesurfer audioFile='/resources/demo.wav' pos={20} />
  </div>
  , document.getElementById('app'));
