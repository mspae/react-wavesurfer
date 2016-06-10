import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';

const MediaElementExample = () => (
      <div className="example col-xs-12">
        <h3>Media element audio source</h3>
        <audio src="../resources/demo.wav" id="audioSource" />
        <Wavesurfer
          mediaElt="#audioSource"
        />
      </div>
);

module.exports = MediaElementExample;
