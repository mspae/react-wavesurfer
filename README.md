# react-wavesurfer

[![npm version](https://badge.fury.io/js/react-wavesurfer.svg)](https://badge.fury.io/js/react-wavesurfer)
![code style](https://img.shields.io/badge/codestyle-airbnb-brightgreen.svg)

Wrapper component for [wavesurfer.js](http://wavesurfer-js.org/). Includes support for the timeline, minimap and regions plugins.

**Note:** This component expects `wavesurfer.js` to be installed. Read more about prerequisites and common pitfalls this at the bottom of this document.

## Basic Usage

For more advanced examples check the example directory.

You can also easily extend the core functionality by hooking into the wavesurfer.js callbacks (by defining callback props).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }
  render() {
    return (
      <div>
        <Wavesurfer
          audioFile={'path/to/audio/file.mp3'}
          pos={this.state.pos}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
        />
      </div>
      );
  }
}
```

## API

### Wavesurfer (Base component)

The base component includes core wavesurfer.js features without plugins. Any plugin components should be included as child components of the base component.

#### Props

##### playing [bool]

starts/stops playback

##### volume [float]

0-1

#### zoom [float]

#### responsive [bool]

(default: true) resize the waveform on browser resize events

##### pos [number]

position of playback in seconds

##### audioPeaks [array]

an array of peaks for use by wavesurfer

##### audioFile [string|blob]

the audio as file or url

##### mediaElt [string|HTMLElement]

the audio as a selector for a media element or the element itself

##### options [object]

The instantiation options for wavesurfer. See [documentation of wavesurfer.js](http://wavesurfer-js.org/docs/options.html). The defaults values are the default values of wavesurfer.js


##### onPosChange [function]

Is basically called on `audioprocess` and `seek` events and consolidates the received time formats into the same type of argument object as the `onAudioprocess` callback (time in seconds, not as a relative value):

```javascript
{
  wavesurfer: wavesurferInstance,
  originalArgs: [playBackPositionInSecs]
}
```

This is necessary to fix any inconsistencies between WebAudio and MediaElement APIs.

##### on[WaveSurferEvent] [function]

Callbacks passed in as props, which are fired when the event on the underlying wavesurfer.js instance is fired.

Possible callback prop names are: `onAudioprocess`, `onError`, `onFinish`, `onLoading`,  `onMouseup`, `onPause`, `onPlay`, `onReady`, `onScroll`, `onSeek`, `onZoom`

The callbacks receive an object as parameter:

```javascript
{
  wavesurfer: wavesurferInstance,
  originalArgs: [originalArgs]
}
```


### Regions (plugin child component)

#### Props

##### regions [object]

An object of region config objects which have the form:

```javascript
// ...
uniqueKey: {
  id: uniqueKey
  start: startInSeconds
  end: endInSeconds
},
// ...
```

#### on[RegionsEvent] [function]

Callbacks for the events the region plugin adds to the wavesurfer.js instance: `onRegionIn `, `onRegionOut`, `onRegionMouseenter`, `onRegionMouseleave`, `onRegionClick`, `onRegionDblclick`, `onRegionUpdated`, `onRegionUpdateEnd `, `onRegionRemoved `, `onRegionPlay`

They receive an object as parameter which has the same form as the base component callbacks.

#### on[RegionEvent] [function]

Callbacks for the events fired on the single region instances. The Prop names are prefixed with `Single`, the available props are:

`onSingleRegionIn`, `onSingleRegionOut`, `onSingleRegionRemove`, `onSingleRegionUpdate`, `onSingleRegionClick`, `onSingleRegionDbclick`, `onSingleRegionOver`, `onSingleRegionLeave`

They receive an object as parameter which has the same form as the other callbacks, but also includes a reference to the region which fired the event:

```javascript
{
  wavesurfer: wavesurferInstance,
  originalArgs: [originalArgs],
  region: regionInstance
}
```

### Timeline (plugin child component)

#### Props

##### options [object]

An object containing configuration for the timeline plugin. (See the [wavesurfer.js timeline example](http://wavesurfer-js.org/example/timeline/) for information about available options.

**Note**: the options `container` and `wavesurfer` need not be set, this is done by the plugin component.

### Minimap (plugin child component)

#### Props

##### options [object]

An object containing configuration for the minimap plugin. Example:

```javascript
{
  height: 30,
  waveColor: '#ddd',
  progressColor: '#999',
  cursorColor: '#999'
}
```

## Developing

* `npm run start` – Start development server (webpack-dev-server) at `localhost:8080/webpack-dev-server`
* `npm run lint` – Lint code (is done while running start task too)
* `npm run build` – Lint and build distributable files

Please make sure your code passes the linting task before submitting a pull request.

## Prerequisites and common pitfalls

This library does not include `wavesurfer.js` itself. You need to include it in your project yourself.

The (optional) plugin components do include the specific plugin code of wavesurfer.js. They augment the wavesurfer.js object, this is the reason why the root wavesurfer.js component does not include the wavesurfer.js code.

* **Webpack:** Expose the `wavesurfer.js` library with the expose-loader:
```
  {
    test: require.resolve("wavesurfer.js"),
    loader: "expose?WaveSurfer"
  }
```
* **Global objects:** Simply include the `wavesurfer.js` library and any plugins you want to include before you call the component code. (The component will be exposed as `window.Wavesurfer.default`)

I have not tested AMD or System.js, if you have any experience, please feel free to update this document, or file an issue.
