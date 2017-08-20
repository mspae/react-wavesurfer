import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'deep-assign';

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

    this.timeline.init(
      assign({}, this.props.options, {
        container: this.timelineEl,
        wavesurfer: this.props.wavesurfer
      })
    );
  }

  render() {
    return (
      <div
        ref={c => {
          this.timelineEl = c;
        }}
      />
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
