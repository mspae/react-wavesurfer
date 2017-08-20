import React from 'react';
import ReactDOM from 'react-dom';

require('wavesurfer.js');
require('wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js');
require('wavesurfer.js/dist/plugin/wavesurfer.regions.min.js');
require('wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js');


import RegionsExample from './components/regions';
import ZoomExample from './components/zoom';
import SimpleExample from './components/simple';
import TimelineExample from './components/timeline';
import PeaksExample from './components/peaks';
import MediaElementExample from './components/mediaElement';
import MinimapExample from './components/minimap';

function ExampleParent() {
  return (
    <div className="container main-container">
      <div className="row">
        <h1 className="col-xs-12 col-lg-2">react-wavesurfer examples</h1>
        <div className="col-xs-12 col-lg-8 col-lg-push-1">
          <div className="row">
            <SimpleExample />
          </div>
          <div className="row">
            <RegionsExample />
          </div>
          <div className="row">
            <ZoomExample />
          </div>
          <div className="row">
            <TimelineExample />
          </div>

          <div className="row">
            <PeaksExample />
          </div>

          <div className="row">
            <MediaElementExample />
          </div>

          <div className="row">
            <MinimapExample />
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<ExampleParent />, window.document.getElementById('app'));
