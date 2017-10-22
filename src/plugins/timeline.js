import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'deep-assign';
import WaveSurferTimeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this._timelineEl = null;
    this.state = {
      isInitialised: false
    };
  }

  componentDidMount() {
    this._init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isInitialised) {
      this._init(nextProps);
    }
  }

  _init(props) {
    const { options, wavesurfer } = props;
    if (!wavesurfer) {
      return;
    }

    wavesurfer
      .addPlugin(
        WaveSurferTimeline.create(
          assign({}, options, {
            container: this._timelineEl
          })
        )
      )
      .initPlugin('timeline');

    this.setState({
      isInitialised: true
    });
  }

  componentWillUnmount() {
    this.props.wavesurfer.destroyPlugin('timeline');
  }

  render() {
    return (
      <div
        className="timeline"
        ref={c => {
          this._timelineEl = c;
        }}
      />
    );
  }
}

Timeline.propTypes = {
  options: PropTypes.object.isRequired,
  wavesurfer: PropTypes.object
};

Timeline.defaultProps = {
  options: {}
};

export default Timeline;
