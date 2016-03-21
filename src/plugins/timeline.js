import React, {Component, PropTypes} from 'react';
const WaveSurfer = require('wavesurfer.js');
const WaveSurferTimeline = require('wavesurfer.js/dist/plugin/wavesurfer.timeline.js');

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.timeline = null;
  }

  componentDidMount() {
    if (this.props._isReady) {
      this.init();
    }
    this.props.wavesurfer.on('ready', this._init.bind(this));
  }

  _init() {

    this.timeline = Object.create(WaveSurfer.Timeline);

    this.timeline.init({
      wavesurfer: this.props.wavesurfer,
      container: this.refs.timeline
    });
  }

  render() {
    return (
      <div>
        <div ref='timeline'></div>
      </div>
    );
  }
}

Timeline.propTypes = {
  isReady: PropTypes.bool
};

Timeline.defaultProps = {};

export default Timeline;
