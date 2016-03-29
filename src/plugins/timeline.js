import React, { Component, PropTypes } from 'react';
import assign from 'deep-assign';

const WaveSurfer = require('wavesurfer.js');
require('wavesurfer.js/dist/plugin/wavesurfer.timeline.js');

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.timeline = null;
  }

  componentDidMount() {
    if (this.props.isReady) this.init();
    this.props.wavesurfer.on('ready', this._init.bind(this));
  }

  _init() {
    this.timeline = Object.create(WaveSurfer.Timeline);

    this.timeline.init(assign({}, this.props.options, {
      container: this.refs.timeline,
      wavesurfer: this.props.wavesurfer
    }));
  }

  render() {
    return (
      <div>
        <div ref="timeline"></div>
      </div>
    );
  }
}

Timeline.propTypes = {
  isReady: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  wavesurfer: PropTypes.object
};

Timeline.defaultProps = {
  isReady: false,
  options: {}
};

export default Timeline;
