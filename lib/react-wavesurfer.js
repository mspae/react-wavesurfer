(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Wavesurfer"] = factory(require("react"));
	else
		root["Wavesurfer"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global WaveSurfer */


	var WaveSurfer = __webpack_require__(3);

	var EVENTS = ['audioprocess', 'error', 'finish', 'loading', 'mouseup', 'pause', 'play', 'ready', 'scroll', 'seek', 'zoom'];

	/**
	 * @description Capitalise the first letter of a string
	 */
	function capitaliseFirstLetter(string) {
	  return string.split('-').map(function (string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }).join('');
	}

	/**
	 * @description Throws an error if the prop is defined and not an integer or not positive
	 */
	function positiveIntegerProptype(props, propName, componentName) {
	  var n = props[propName];
	  if (n !== undefined && (typeof n !== 'number' || n !== parseInt(n, 10) || n < 0)) {
	    return new Error('Invalid `' + propName + '` supplied to `' + componentName + '`' + ', expected a positive integer');
	  }
	}

	var Wavesurfer = function (_Component) {
	  _inherits(Wavesurfer, _Component);

	  function Wavesurfer(props) {
	    _classCallCheck(this, Wavesurfer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wavesurfer).call(this, props));

	    _this.state = {
	      pos: 0
	    };

	    if ((typeof WaveSurfer === 'undefined' ? 'undefined' : _typeof(WaveSurfer)) === undefined) {
	      throw new Error('WaveSurfer is undefined!');
	    }

	    _this._wavesurfer = Object.create(WaveSurfer);
	    _this._isReady = false;
	    _this._playing = false;
	    _this._loadAudio = _this._loadAudio.bind(_this);
	    _this._seekTo = _this._seekTo.bind(_this);
	    return _this;
	  }

	  _createClass(Wavesurfer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var options = (0, _objectAssign2.default)({}, this.props.options, {
	        container: this.refs.wavesurfer
	      });

	      this._wavesurfer.init(options);

	      // file was loaded, wave was drawn, update the _fileLoaded flag
	      this._wavesurfer.on('ready', function () {
	        _this2._isReady = true;
	        // if there is a position set via prop, go there …
	        if (_this2.props.pos) {
	          _this2._seekTo(_this2.props.pos);
	        }
	        if (_this2.props.volume) {
	          _this2._wavesurfer.setVolume(_this2.props.volume);
	        }
	        if (_this2.props.zoom) {
	          _this2._wavesurfer.zoom(_this2.props.zoom);
	        }
	      });

	      this._wavesurfer.on('audioprocess', function (pos) {
	        _this2.setState({
	          pos: pos
	        });
	        _this2.props.onPosChange({
	          wavesurfer: _this2._wavesurfer,
	          originalArgs: [pos]
	        });
	      });

	      // `audioprocess` is not fired when seeking, so we have to plug into the
	      // `seek` event and calculate the equivalent in seconds (seek event
	      // receives a position float 0-1) – See the README.md for explanation why we
	      // need this
	      this._wavesurfer.on('seek', function (pos) {
	        pos = _this2._posToSec(pos);
	        _this2.setState({
	          pos: pos
	        });
	        _this2.props.onPosChange({
	          wavesurfer: _this2._wavesurfer,
	          originalArgs: [pos]
	        });
	      });

	      // hook up events to callback handlers passed in as props
	      EVENTS.forEach(function (e) {
	        var propCallback = _this2.props['on' + capitaliseFirstLetter(e)];
	        var wavesurfer = _this2._wavesurfer;
	        if (propCallback) {
	          _this2._wavesurfer.on(e, function () {
	            propCallback({
	              wavesurfer: wavesurfer,
	              originalArgs: [].concat(Array.prototype.slice.call(arguments))
	            });
	          });
	        }
	      });

	      // if audioFile prop, load file
	      if (this.props.audioFile) {
	        this._loadAudio(this.props.audioFile);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      // remove listeners
	      EVENTS.forEach(function (e) {
	        _this3._wavesurfer.un(e);
	      });

	      // destroy wavesurfer instance
	      this._wavesurfer.destroy();
	    }

	    // update wavesurfer rendering manually

	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.audioFile !== nextProps.audioFile) {
	        this._loadAudio(nextProps.audioFile);
	      }

	      if (nextProps.pos && this._isReady && nextProps.pos !== this.props.pos && nextProps.pos !== this.state.pos) {
	        this._seekTo(nextProps.pos);
	      }
	      if (this.props.playing !== nextProps.playing || this._wavesurfer.isPlaying() !== nextProps.playing) {
	        if (nextProps.playing) {
	          this._wavesurfer.play();
	          this._playing = true;
	        } else {
	          this._wavesurfer.pause();
	          this._playing = false;
	        }
	      }

	      if (this.props.volume !== nextProps.volume) {
	        this._wavesurfer.setVolume(nextProps.volume);
	      }

	      if (this.props.zoom !== nextProps.zoom) {
	        this._wavesurfer.zoom(nextProps.zoom);
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return false;
	    }

	    // receives seconds and transforms this to the position as a float 0-1

	  }, {
	    key: '_secToPos',
	    value: function _secToPos(sec) {
	      return 1 / this._wavesurfer.getDuration() * sec;
	    }

	    // receives position as a float 0-1 and transforms this to seconds

	  }, {
	    key: '_posToSec',
	    value: function _posToSec(pos) {
	      return pos * this._wavesurfer.getDuration();
	    }

	    // pos is in seconds, the 0-1 proportional position we calculate here …

	  }, {
	    key: '_seekTo',
	    value: function _seekTo(sec) {
	      var pos = this._secToPos(sec);
	      if (this.props.autoCenter) {
	        this._wavesurfer.seekAndCenter(pos);
	      } else {
	        this._wavesurfer.seekTo(pos);
	      }
	    }
	  }, {
	    key: '_loadAudio',
	    value: function _loadAudio(audioFile) {
	      // bog-standard string is handled by load method and ajax call
	      if (typeof audioFile === 'string') {
	        this._wavesurfer.load(audioFile);
	      } else if (audioFile instanceof Blob || audioFile instanceof File) {
	        // blob or file is loaded with loadBlob method
	        this._wavesurfer.loadBlob(audioFile);
	      } else {
	        throw new Error('Wavesurfer._loadAudio expexts prop audioFile to be either string or file/blob');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var childrenWithProps = this.props.children ? _react2.default.Children.map(this.props.children, function (child) {
	        return _react2.default.cloneElement(child, (0, _objectAssign2.default)({}, {
	          wavesurfer: _this4._wavesurfer,
	          isReady: _this4._isReady
	        }, _this4.props));
	      }) : false;
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('div', { ref: 'wavesurfer' }),
	        childrenWithProps
	      );
	    }
	  }]);

	  return Wavesurfer;
	}(_react.Component);

	Wavesurfer.propTypes = {
	  playing: _react.PropTypes.bool,
	  pos: _react.PropTypes.number,
	  audioFile: function audioFile(props, propName, componentName) {
	    var prop = props[propName];
	    if (prop && typeof prop !== 'string' && !prop instanceof Blob && !prop instanceof File) {
	      return new Error('Invalid `' + propName + '` supplied to `' + componentName + '` expected either string or file/blob');
	    }
	  },
	  regions: _react.PropTypes.array,
	  volume: _react.PropTypes.number,
	  zoom: _react.PropTypes.number,
	  options: _react.PropTypes.shape({
	    audioRate: _react.PropTypes.number,
	    backend: _react.PropTypes.oneOf(['WebAudio', 'MediaElement']),
	    barWidth: function barWidth(props, propName, componentName) {
	      var prop = props[propName];
	      if (prop !== undefined && typeof prop !== 'number') {
	        return new Error('Invalid `' + propName + '` supplied to `' + componentName + '` expected either undefined or number');
	      }
	    },
	    cursorColor: _react.PropTypes.string,
	    cursorWidth: positiveIntegerProptype,
	    dragSelection: _react.PropTypes.bool,
	    fillParent: _react.PropTypes.bool,
	    height: positiveIntegerProptype,
	    hideScrollbar: _react.PropTypes.bool,
	    interact: _react.PropTypes.bool,
	    loopSelection: _react.PropTypes.bool,
	    mediaControls: _react.PropTypes.bool,
	    minPxPerSec: positiveIntegerProptype,
	    normalize: _react.PropTypes.bool,
	    pixelRatio: _react.PropTypes.number,
	    progressColor: _react.PropTypes.string,
	    scrollParent: _react.PropTypes.bool,
	    skipLength: _react.PropTypes.number,
	    waveColor: _react.PropTypes.string,
	    autoCenter: _react.PropTypes.bool
	  })
	};

	Wavesurfer.defaultProps = {
	  playing: false,
	  pos: 0,
	  audioFile: undefined,
	  options: WaveSurfer.defaultParams,
	  onPosChange: function onPosChange() {}
	};

	exports.default = Wavesurfer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! wavesurfer.js 1.0.58 (Sun, 28 Feb 2016 19:39:50 GMT)
	* https://github.com/katspaugh/wavesurfer.js
	* @license CC-BY-3.0 */
	!function (a, b) {
	   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return a.WaveSurfer = b();
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = b() : a.WaveSurfer = b();
	}(undefined, function () {
	  "use strict";
	  var a = { defaultParams: { height: 128, waveColor: "#999", progressColor: "#555", cursorColor: "#333", cursorWidth: 1, skipLength: 2, minPxPerSec: 20, pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI, fillParent: !0, scrollParent: !1, hideScrollbar: !1, normalize: !1, audioContext: null, container: null, dragSelection: !0, loopSelection: !0, audioRate: 1, interact: !0, splitChannels: !1, mediaContainer: null, mediaControls: !1, renderer: "Canvas", backend: "WebAudio", mediaType: "audio", autoCenter: !0 }, init: function init(b) {
	      if (this.params = a.util.extend({}, this.defaultParams, b), this.container = "string" == typeof b.container ? document.querySelector(this.params.container) : this.params.container, !this.container) throw new Error("Container element not found");if (null == this.params.mediaContainer ? this.mediaContainer = this.container : "string" == typeof this.params.mediaContainer ? this.mediaContainer = document.querySelector(this.params.mediaContainer) : this.mediaContainer = this.params.mediaContainer, !this.mediaContainer) throw new Error("Media Container element not found");this.savedVolume = 0, this.isMuted = !1, this.tmpEvents = [], this.createDrawer(), this.createBackend();
	    }, createDrawer: function createDrawer() {
	      var b = this;this.drawer = Object.create(a.Drawer[this.params.renderer]), this.drawer.init(this.container, this.params), this.drawer.on("redraw", function () {
	        b.drawBuffer(), b.drawer.progress(b.backend.getPlayedPercents());
	      }), this.drawer.on("click", function (a, c) {
	        setTimeout(function () {
	          b.seekTo(c);
	        }, 0);
	      }), this.drawer.on("scroll", function (a) {
	        b.fireEvent("scroll", a);
	      });
	    }, createBackend: function createBackend() {
	      var b = this;this.backend && this.backend.destroy(), "AudioElement" == this.params.backend && (this.params.backend = "MediaElement"), "WebAudio" != this.params.backend || a.WebAudio.supportsWebAudio() || (this.params.backend = "MediaElement"), this.backend = Object.create(a[this.params.backend]), this.backend.init(this.params), this.backend.on("finish", function () {
	        b.fireEvent("finish");
	      }), this.backend.on("play", function () {
	        b.fireEvent("play");
	      }), this.backend.on("pause", function () {
	        b.fireEvent("pause");
	      }), this.backend.on("audioprocess", function (a) {
	        b.fireEvent("audioprocess", a);
	      });
	    }, startAnimationLoop: function startAnimationLoop() {
	      var a = this,
	          b = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
	          c = function c() {
	        if (!a.backend.isPaused()) {
	          var d = a.backend.getPlayedPercents();a.drawer.progress(d), a.fireEvent("audioprocess", a.getCurrentTime()), b(c);
	        }
	      };c();
	    }, getDuration: function getDuration() {
	      return this.backend.getDuration();
	    }, getCurrentTime: function getCurrentTime() {
	      return this.backend.getCurrentTime();
	    }, play: function play(a, b) {
	      this.backend.play(a, b), this.startAnimationLoop();
	    }, pause: function pause() {
	      this.backend.pause();
	    }, playPause: function playPause() {
	      this.backend.isPaused() ? this.play() : this.pause();
	    }, isPlaying: function isPlaying() {
	      return !this.backend.isPaused();
	    }, skipBackward: function skipBackward(a) {
	      this.skip(-a || -this.params.skipLength);
	    }, skipForward: function skipForward(a) {
	      this.skip(a || this.params.skipLength);
	    }, skip: function skip(a) {
	      var b = this.getCurrentTime() || 0,
	          c = this.getDuration() || 1;b = Math.max(0, Math.min(c, b + (a || 0))), this.seekAndCenter(b / c);
	    }, seekAndCenter: function seekAndCenter(a) {
	      this.seekTo(a), this.drawer.recenter(a);
	    }, seekTo: function seekTo(a) {
	      var b = this.backend.isPaused(),
	          c = this.params.scrollParent;b && (this.params.scrollParent = !1), this.backend.seekTo(a * this.getDuration()), this.drawer.progress(this.backend.getPlayedPercents()), b || (this.backend.pause(), this.backend.play()), this.params.scrollParent = c, this.fireEvent("seek", a);
	    }, stop: function stop() {
	      this.pause(), this.seekTo(0), this.drawer.progress(0);
	    }, setVolume: function setVolume(a) {
	      this.backend.setVolume(a);
	    }, setPlaybackRate: function setPlaybackRate(a) {
	      this.backend.setPlaybackRate(a);
	    }, toggleMute: function toggleMute() {
	      this.isMuted ? (this.backend.setVolume(this.savedVolume), this.isMuted = !1) : (this.savedVolume = this.backend.getVolume(), this.backend.setVolume(0), this.isMuted = !0);
	    }, toggleScroll: function toggleScroll() {
	      this.params.scrollParent = !this.params.scrollParent, this.drawBuffer();
	    }, toggleInteraction: function toggleInteraction() {
	      this.params.interact = !this.params.interact;
	    }, drawBuffer: function drawBuffer() {
	      var a = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio),
	          b = this.drawer.getWidth(),
	          c = a;this.params.fillParent && (!this.params.scrollParent || b > a) && (c = b);var d = this.backend.getPeaks(c);this.drawer.drawPeaks(d, c), this.fireEvent("redraw", d, c);
	    }, zoom: function zoom(a) {
	      this.params.minPxPerSec = a, this.params.scrollParent = !0, this.drawBuffer(), this.seekAndCenter(this.getCurrentTime() / this.getDuration()), this.fireEvent("zoom", a);
	    }, loadArrayBuffer: function loadArrayBuffer(a) {
	      this.decodeArrayBuffer(a, function (a) {
	        this.loadDecodedBuffer(a);
	      }.bind(this));
	    }, loadDecodedBuffer: function loadDecodedBuffer(a) {
	      this.backend.load(a), this.drawBuffer(), this.fireEvent("ready");
	    }, loadBlob: function loadBlob(a) {
	      var b = this,
	          c = new FileReader();c.addEventListener("progress", function (a) {
	        b.onProgress(a);
	      }), c.addEventListener("load", function (a) {
	        b.loadArrayBuffer(a.target.result);
	      }), c.addEventListener("error", function () {
	        b.fireEvent("error", "Error reading file");
	      }), c.readAsArrayBuffer(a), this.empty();
	    }, load: function load(a, b) {
	      switch (this.params.backend) {case "WebAudio":
	          return this.loadBuffer(a);case "MediaElement":
	          return this.loadMediaElement(a, b);}
	    }, loadBuffer: function loadBuffer(a) {
	      return this.empty(), this.getArrayBuffer(a, this.loadArrayBuffer.bind(this));
	    }, loadMediaElement: function loadMediaElement(a, b) {
	      this.empty(), this.backend.load(a, this.mediaContainer, b), this.tmpEvents.push(this.backend.once("canplay", function () {
	        this.drawBuffer(), this.fireEvent("ready");
	      }.bind(this)), this.backend.once("error", function (a) {
	        this.fireEvent("error", a);
	      }.bind(this))), !b && this.backend.supportsWebAudio() && this.getArrayBuffer(a, function (a) {
	        this.decodeArrayBuffer(a, function (a) {
	          this.backend.buffer = a, this.drawBuffer();
	        }.bind(this));
	      }.bind(this));
	    }, decodeArrayBuffer: function decodeArrayBuffer(a, b) {
	      this.backend.decodeArrayBuffer(a, this.fireEvent.bind(this, "decoded"), this.fireEvent.bind(this, "error", "Error decoding audiobuffer")), this.tmpEvents.push(this.once("decoded", b));
	    }, getArrayBuffer: function getArrayBuffer(b, c) {
	      var d = this,
	          e = a.util.ajax({ url: b, responseType: "arraybuffer" });return this.tmpEvents.push(e.on("progress", function (a) {
	        d.onProgress(a);
	      }), e.on("success", c), e.on("error", function (a) {
	        d.fireEvent("error", "XHR error: " + a.target.statusText);
	      })), e;
	    }, onProgress: function onProgress(a) {
	      if (a.lengthComputable) var b = a.loaded / a.total;else b = a.loaded / (a.loaded + 1e6);this.fireEvent("loading", Math.round(100 * b), a.target);
	    }, exportPCM: function exportPCM(a, b, c) {
	      a = a || 1024, b = b || 1e4, c = c || !1;var d = this.backend.getPeaks(a, b),
	          e = [].map.call(d, function (a) {
	        return Math.round(a * b) / b;
	      }),
	          f = JSON.stringify(e);return c || window.open("data:application/json;charset=utf-8," + encodeURIComponent(f)), f;
	    }, clearTmpEvents: function clearTmpEvents() {
	      this.tmpEvents.forEach(function (a) {
	        a.un();
	      });
	    }, empty: function empty() {
	      this.backend.isPaused() || (this.stop(), this.backend.disconnectSource()), this.clearTmpEvents(), this.drawer.progress(0), this.drawer.setWidth(0), this.drawer.drawPeaks({ length: this.drawer.getWidth() }, 0);
	    }, destroy: function destroy() {
	      this.fireEvent("destroy"), this.clearTmpEvents(), this.unAll(), this.backend.destroy(), this.drawer.destroy();
	    } };return a.create = function (b) {
	    var c = Object.create(a);return c.init(b), c;
	  }, a.util = { extend: function extend(a) {
	      var b = Array.prototype.slice.call(arguments, 1);return b.forEach(function (b) {
	        Object.keys(b).forEach(function (c) {
	          a[c] = b[c];
	        });
	      }), a;
	    }, getId: function getId() {
	      return "wavesurfer_" + Math.random().toString(32).substring(2);
	    }, ajax: function ajax(b) {
	      var c = Object.create(a.Observer),
	          d = new XMLHttpRequest(),
	          e = !1;return d.open(b.method || "GET", b.url, !0), d.responseType = b.responseType || "json", d.addEventListener("progress", function (a) {
	        c.fireEvent("progress", a), a.lengthComputable && a.loaded == a.total && (e = !0);
	      }), d.addEventListener("load", function (a) {
	        e || c.fireEvent("progress", a), c.fireEvent("load", a), 200 == d.status || 206 == d.status ? c.fireEvent("success", d.response, a) : c.fireEvent("error", a);
	      }), d.addEventListener("error", function (a) {
	        c.fireEvent("error", a);
	      }), d.send(), c.xhr = d, c;
	    } }, a.Observer = { on: function on(a, b) {
	      this.handlers || (this.handlers = {});var c = this.handlers[a];return c || (c = this.handlers[a] = []), c.push(b), { name: a, callback: b, un: this.un.bind(this, a, b) };
	    }, un: function un(a, b) {
	      if (this.handlers) {
	        var c = this.handlers[a];if (c) if (b) for (var d = c.length - 1; d >= 0; d--) {
	          c[d] == b && c.splice(d, 1);
	        } else c.length = 0;
	      }
	    }, unAll: function unAll() {
	      this.handlers = null;
	    }, once: function once(a, b) {
	      var c = this,
	          d = function d() {
	        b.apply(this, arguments), setTimeout(function () {
	          c.un(a, d);
	        }, 0);
	      };return this.on(a, d);
	    }, fireEvent: function fireEvent(a) {
	      if (this.handlers) {
	        var b = this.handlers[a],
	            c = Array.prototype.slice.call(arguments, 1);b && b.forEach(function (a) {
	          a.apply(null, c);
	        });
	      }
	    } }, a.util.extend(a, a.Observer), a.WebAudio = { scriptBufferSize: 256, PLAYING_STATE: 0, PAUSED_STATE: 1, FINISHED_STATE: 2, supportsWebAudio: function supportsWebAudio() {
	      return !(!window.AudioContext && !window.webkitAudioContext);
	    }, getAudioContext: function getAudioContext() {
	      return a.WebAudio.audioContext || (a.WebAudio.audioContext = new (window.AudioContext || window.webkitAudioContext)()), a.WebAudio.audioContext;
	    }, getOfflineAudioContext: function getOfflineAudioContext(b) {
	      return a.WebAudio.offlineAudioContext || (a.WebAudio.offlineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, b)), a.WebAudio.offlineAudioContext;
	    }, init: function init(b) {
	      this.params = b, this.ac = b.audioContext || this.getAudioContext(), this.lastPlay = this.ac.currentTime, this.startPosition = 0, this.scheduledPause = null, this.states = [Object.create(a.WebAudio.state.playing), Object.create(a.WebAudio.state.paused), Object.create(a.WebAudio.state.finished)], this.createVolumeNode(), this.createScriptNode(), this.createAnalyserNode(), this.setState(this.PAUSED_STATE), this.setPlaybackRate(this.params.audioRate);
	    }, disconnectFilters: function disconnectFilters() {
	      this.filters && (this.filters.forEach(function (a) {
	        a && a.disconnect();
	      }), this.filters = null, this.analyser.connect(this.gainNode));
	    }, setState: function setState(a) {
	      this.state !== this.states[a] && (this.state = this.states[a], this.state.init.call(this));
	    }, setFilter: function setFilter() {
	      this.setFilters([].slice.call(arguments));
	    }, setFilters: function setFilters(a) {
	      this.disconnectFilters(), a && a.length && (this.filters = a, this.analyser.disconnect(), a.reduce(function (a, b) {
	        return a.connect(b), b;
	      }, this.analyser).connect(this.gainNode));
	    }, createScriptNode: function createScriptNode() {
	      this.ac.createScriptProcessor ? this.scriptNode = this.ac.createScriptProcessor(this.scriptBufferSize) : this.scriptNode = this.ac.createJavaScriptNode(this.scriptBufferSize), this.scriptNode.connect(this.ac.destination);
	    }, addOnAudioProcess: function addOnAudioProcess() {
	      var a = this;this.scriptNode.onaudioprocess = function () {
	        var b = a.getCurrentTime();b >= a.getDuration() ? (a.setState(a.FINISHED_STATE), a.fireEvent("pause")) : b >= a.scheduledPause ? (a.setState(a.PAUSED_STATE), a.fireEvent("pause")) : a.state === a.states[a.PLAYING_STATE] && a.fireEvent("audioprocess", b);
	      };
	    }, removeOnAudioProcess: function removeOnAudioProcess() {
	      this.scriptNode.onaudioprocess = null;
	    }, createAnalyserNode: function createAnalyserNode() {
	      this.analyser = this.ac.createAnalyser(), this.analyser.connect(this.gainNode);
	    }, createVolumeNode: function createVolumeNode() {
	      this.ac.createGain ? this.gainNode = this.ac.createGain() : this.gainNode = this.ac.createGainNode(), this.gainNode.connect(this.ac.destination);
	    }, setVolume: function setVolume(a) {
	      this.gainNode.gain.value = a;
	    }, getVolume: function getVolume() {
	      return this.gainNode.gain.value;
	    }, decodeArrayBuffer: function decodeArrayBuffer(a, b, c) {
	      this.offlineAc || (this.offlineAc = this.getOfflineAudioContext(this.ac ? this.ac.sampleRate : 44100)), this.offlineAc.decodeAudioData(a, function (a) {
	        b(a);
	      }.bind(this), c);
	    }, getPeaks: function getPeaks(a) {
	      for (var b = this.buffer.length / a, c = ~ ~(b / 10) || 1, d = this.buffer.numberOfChannels, e = [], f = [], g = 0; d > g; g++) {
	        for (var h = e[g] = [], i = this.buffer.getChannelData(g), j = 0; a > j; j++) {
	          for (var k = ~ ~(j * b), l = ~ ~(k + b), m = i[0], n = i[0], o = k; l > o; o += c) {
	            var p = i[o];p > n && (n = p), m > p && (m = p);
	          }h[2 * j] = n, h[2 * j + 1] = m, (0 == g || n > f[2 * j]) && (f[2 * j] = n), (0 == g || m < f[2 * j + 1]) && (f[2 * j + 1] = m);
	        }
	      }return this.params.splitChannels ? e : f;
	    }, getPlayedPercents: function getPlayedPercents() {
	      return this.state.getPlayedPercents.call(this);
	    }, disconnectSource: function disconnectSource() {
	      this.source && this.source.disconnect();
	    }, destroy: function destroy() {
	      this.isPaused() || this.pause(), this.unAll(), this.buffer = null, this.disconnectFilters(), this.disconnectSource(), this.gainNode.disconnect(), this.scriptNode.disconnect(), this.analyser.disconnect();
	    }, load: function load(a) {
	      this.startPosition = 0, this.lastPlay = this.ac.currentTime, this.buffer = a, this.createSource();
	    }, createSource: function createSource() {
	      this.disconnectSource(), this.source = this.ac.createBufferSource(), this.source.start = this.source.start || this.source.noteGrainOn, this.source.stop = this.source.stop || this.source.noteOff, this.source.playbackRate.value = this.playbackRate, this.source.buffer = this.buffer, this.source.connect(this.analyser);
	    }, isPaused: function isPaused() {
	      return this.state !== this.states[this.PLAYING_STATE];
	    }, getDuration: function getDuration() {
	      return this.buffer ? this.buffer.duration : 0;
	    }, seekTo: function seekTo(a, b) {
	      return this.scheduledPause = null, null == a && (a = this.getCurrentTime(), a >= this.getDuration() && (a = 0)), null == b && (b = this.getDuration()), this.startPosition = a, this.lastPlay = this.ac.currentTime, this.state === this.states[this.FINISHED_STATE] && this.setState(this.PAUSED_STATE), { start: a, end: b };
	    }, getPlayedTime: function getPlayedTime() {
	      return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
	    }, play: function play(a, b) {
	      this.createSource();var c = this.seekTo(a, b);a = c.start, b = c.end, this.scheduledPause = b, this.source.start(0, a, b - a), this.setState(this.PLAYING_STATE), this.fireEvent("play");
	    }, pause: function pause() {
	      this.scheduledPause = null, this.startPosition += this.getPlayedTime(), this.source && this.source.stop(0), this.setState(this.PAUSED_STATE), this.fireEvent("pause");
	    }, getCurrentTime: function getCurrentTime() {
	      return this.state.getCurrentTime.call(this);
	    }, setPlaybackRate: function setPlaybackRate(a) {
	      a = a || 1, this.isPaused() ? this.playbackRate = a : (this.pause(), this.playbackRate = a, this.play());
	    } }, a.WebAudio.state = {}, a.WebAudio.state.playing = { init: function init() {
	      this.addOnAudioProcess();
	    }, getPlayedPercents: function getPlayedPercents() {
	      var a = this.getDuration();return this.getCurrentTime() / a || 0;
	    }, getCurrentTime: function getCurrentTime() {
	      return this.startPosition + this.getPlayedTime();
	    } }, a.WebAudio.state.paused = { init: function init() {
	      this.removeOnAudioProcess();
	    }, getPlayedPercents: function getPlayedPercents() {
	      var a = this.getDuration();return this.getCurrentTime() / a || 0;
	    }, getCurrentTime: function getCurrentTime() {
	      return this.startPosition;
	    } }, a.WebAudio.state.finished = { init: function init() {
	      this.removeOnAudioProcess(), this.fireEvent("finish");
	    }, getPlayedPercents: function getPlayedPercents() {
	      return 1;
	    }, getCurrentTime: function getCurrentTime() {
	      return this.getDuration();
	    } }, a.util.extend(a.WebAudio, a.Observer), a.MediaElement = Object.create(a.WebAudio), a.util.extend(a.MediaElement, { init: function init(a) {
	      this.params = a, this.media = { currentTime: 0, duration: 0, paused: !0, playbackRate: 1, play: function play() {}, pause: function pause() {} }, this.mediaType = a.mediaType.toLowerCase(), this.elementPosition = a.elementPosition, this.setPlaybackRate(this.params.audioRate);
	    }, load: function load(a, b, c) {
	      var d = this,
	          e = document.createElement(this.mediaType);e.controls = this.params.mediaControls, e.autoplay = this.params.autoplay || !1, e.preload = "auto", e.src = a, e.style.width = "100%", e.addEventListener("error", function () {
	        d.fireEvent("error", "Error loading media element");
	      }), e.addEventListener("canplay", function () {
	        d.fireEvent("canplay");
	      }), e.addEventListener("ended", function () {
	        d.fireEvent("finish");
	      }), e.addEventListener("timeupdate", function () {
	        d.fireEvent("audioprocess", d.getCurrentTime());
	      });var f = b.querySelector(this.mediaType);f && b.removeChild(f), b.appendChild(e), this.media = e, this.peaks = c, this.onPlayEnd = null, this.buffer = null, this.setPlaybackRate(this.playbackRate);
	    }, isPaused: function isPaused() {
	      return !this.media || this.media.paused;
	    }, getDuration: function getDuration() {
	      var a = this.media.duration;return a >= 1 / 0 && (a = this.media.seekable.end()), a;
	    }, getCurrentTime: function getCurrentTime() {
	      return this.media && this.media.currentTime;
	    }, getPlayedPercents: function getPlayedPercents() {
	      return this.getCurrentTime() / this.getDuration() || 0;
	    }, setPlaybackRate: function setPlaybackRate(a) {
	      this.playbackRate = a || 1, this.media.playbackRate = this.playbackRate;
	    }, seekTo: function seekTo(a) {
	      null != a && (this.media.currentTime = a), this.clearPlayEnd();
	    }, play: function play(a, b) {
	      this.seekTo(a), this.media.play(), b && this.setPlayEnd(b), this.fireEvent("play");
	    }, pause: function pause() {
	      this.media && this.media.pause(), this.clearPlayEnd(), this.fireEvent("pause");
	    }, setPlayEnd: function setPlayEnd(a) {
	      var b = this;this.onPlayEnd = function (c) {
	        c >= a && (b.pause(), b.seekTo(a));
	      }, this.on("audioprocess", this.onPlayEnd);
	    }, clearPlayEnd: function clearPlayEnd() {
	      this.onPlayEnd && (this.un("audioprocess", this.onPlayEnd), this.onPlayEnd = null);
	    }, getPeaks: function getPeaks(b) {
	      return this.buffer ? a.WebAudio.getPeaks.call(this, b) : this.peaks || [];
	    }, getVolume: function getVolume() {
	      return this.media.volume;
	    }, setVolume: function setVolume(a) {
	      this.media.volume = a;
	    }, destroy: function destroy() {
	      this.pause(), this.unAll(), this.media && this.media.parentNode && this.media.parentNode.removeChild(this.media), this.media = null;
	    } }), a.AudioElement = a.MediaElement, a.Drawer = { init: function init(a, b) {
	      this.container = a, this.params = b, this.width = 0, this.height = b.height * this.params.pixelRatio, this.lastPos = 0, this.createWrapper(), this.createElements();
	    }, createWrapper: function createWrapper() {
	      this.wrapper = this.container.appendChild(document.createElement("wave")), this.style(this.wrapper, { display: "block", position: "relative", userSelect: "none", webkitUserSelect: "none", height: this.params.height + "px" }), (this.params.fillParent || this.params.scrollParent) && this.style(this.wrapper, { width: "100%", overflowX: this.params.hideScrollbar ? "hidden" : "auto", overflowY: "hidden" }), this.setupWrapperEvents();
	    }, handleEvent: function handleEvent(a) {
	      a.preventDefault();var b = this.wrapper.getBoundingClientRect();return (a.clientX - b.left + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0;
	    }, setupWrapperEvents: function setupWrapperEvents() {
	      var a = this;this.wrapper.addEventListener("click", function (b) {
	        var c = a.wrapper.offsetHeight - a.wrapper.clientHeight;if (0 != c) {
	          var d = a.wrapper.getBoundingClientRect();if (b.clientY >= d.bottom - c) return;
	        }a.params.interact && a.fireEvent("click", b, a.handleEvent(b));
	      }), this.wrapper.addEventListener("scroll", function (b) {
	        a.fireEvent("scroll", b);
	      });
	    }, drawPeaks: function drawPeaks(a, b) {
	      this.resetScroll(), this.setWidth(b), this.params.barWidth ? this.drawBars(a) : this.drawWave(a);
	    }, style: function style(a, b) {
	      return Object.keys(b).forEach(function (c) {
	        a.style[c] !== b[c] && (a.style[c] = b[c]);
	      }), a;
	    }, resetScroll: function resetScroll() {
	      null !== this.wrapper && (this.wrapper.scrollLeft = 0);
	    }, recenter: function recenter(a) {
	      var b = this.wrapper.scrollWidth * a;this.recenterOnPosition(b, !0);
	    }, recenterOnPosition: function recenterOnPosition(a, b) {
	      var c = this.wrapper.scrollLeft,
	          d = ~ ~(this.wrapper.clientWidth / 2),
	          e = a - d,
	          f = e - c,
	          g = this.wrapper.scrollWidth - this.wrapper.clientWidth;if (0 != g) {
	        if (!b && f >= -d && d > f) {
	          var h = 5;f = Math.max(-h, Math.min(h, f)), e = c + f;
	        }e = Math.max(0, Math.min(g, e)), e != c && (this.wrapper.scrollLeft = e);
	      }
	    }, getWidth: function getWidth() {
	      return Math.round(this.container.clientWidth * this.params.pixelRatio);
	    }, setWidth: function setWidth(a) {
	      a != this.width && (this.width = a, this.params.fillParent || this.params.scrollParent ? this.style(this.wrapper, { width: "" }) : this.style(this.wrapper, { width: ~ ~(this.width / this.params.pixelRatio) + "px" }), this.updateSize());
	    }, setHeight: function setHeight(a) {
	      a != this.height && (this.height = a, this.style(this.wrapper, { height: ~ ~(this.height / this.params.pixelRatio) + "px" }), this.updateSize());
	    }, progress: function progress(a) {
	      var b = 1 / this.params.pixelRatio,
	          c = Math.round(a * this.width) * b;if (c < this.lastPos || c - this.lastPos >= b) {
	        if (this.lastPos = c, this.params.scrollParent && this.params.autoCenter) {
	          var d = ~ ~(this.wrapper.scrollWidth * a);this.recenterOnPosition(d);
	        }this.updateProgress(a);
	      }
	    }, destroy: function destroy() {
	      this.unAll(), this.wrapper && (this.container.removeChild(this.wrapper), this.wrapper = null);
	    }, createElements: function createElements() {}, updateSize: function updateSize() {}, drawWave: function drawWave(a, b) {}, clearWave: function clearWave() {}, updateProgress: function updateProgress(a) {} }, a.util.extend(a.Drawer, a.Observer), a.Drawer.Canvas = Object.create(a.Drawer), a.util.extend(a.Drawer.Canvas, { createElements: function createElements() {
	      var a = this.wrapper.appendChild(this.style(document.createElement("canvas"), { position: "absolute", zIndex: 1, left: 0, top: 0, bottom: 0 }));if (this.waveCc = a.getContext("2d"), this.progressWave = this.wrapper.appendChild(this.style(document.createElement("wave"), { position: "absolute", zIndex: 2, left: 0, top: 0, bottom: 0, overflow: "hidden", width: "0", display: "none", boxSizing: "border-box", borderRightStyle: "solid", borderRightWidth: this.params.cursorWidth + "px", borderRightColor: this.params.cursorColor })), this.params.waveColor != this.params.progressColor) {
	        var b = this.progressWave.appendChild(document.createElement("canvas"));this.progressCc = b.getContext("2d");
	      }
	    }, updateSize: function updateSize() {
	      var a = Math.round(this.width / this.params.pixelRatio);this.waveCc.canvas.width = this.width, this.waveCc.canvas.height = this.height, this.style(this.waveCc.canvas, { width: a + "px" }), this.style(this.progressWave, { display: "block" }), this.progressCc && (this.progressCc.canvas.width = this.width, this.progressCc.canvas.height = this.height, this.style(this.progressCc.canvas, { width: a + "px" })), this.clearWave();
	    }, clearWave: function clearWave() {
	      this.waveCc.clearRect(0, 0, this.width, this.height), this.progressCc && this.progressCc.clearRect(0, 0, this.width, this.height);
	    }, drawBars: function drawBars(a, b) {
	      if (a[0] instanceof Array) {
	        var c = a;if (this.params.splitChannels) return this.setHeight(c.length * this.params.height * this.params.pixelRatio), void c.forEach(this.drawBars, this);a = c[0];
	      }var d = [].some.call(a, function (a) {
	        return 0 > a;
	      });d && (a = [].filter.call(a, function (a, b) {
	        return b % 2 == 0;
	      }));var e = .5 / this.params.pixelRatio,
	          f = this.width,
	          g = this.params.height * this.params.pixelRatio,
	          h = g * b || 0,
	          i = g / 2,
	          j = a.length,
	          k = this.params.barWidth * this.params.pixelRatio,
	          l = Math.max(this.params.pixelRatio, ~ ~(k / 2)),
	          m = k + l,
	          n = 1;this.params.normalize && (n = Math.max.apply(Math, a));var o = j / f;this.waveCc.fillStyle = this.params.waveColor, this.progressCc && (this.progressCc.fillStyle = this.params.progressColor), [this.waveCc, this.progressCc].forEach(function (b) {
	        if (b) for (var c = 0; f > c; c += m) {
	          var d = Math.round(a[Math.floor(c * o)] / n * i);b.fillRect(c + e, i - d + h, k + e, 2 * d);
	        }
	      }, this);
	    }, drawWave: function drawWave(a, b) {
	      if (a[0] instanceof Array) {
	        var c = a;if (this.params.splitChannels) return this.setHeight(c.length * this.params.height * this.params.pixelRatio), void c.forEach(this.drawWave, this);a = c[0];
	      }var d = [].some.call(a, function (a) {
	        return 0 > a;
	      });if (!d) {
	        for (var e = [], f = 0, g = a.length; g > f; f++) {
	          e[2 * f] = a[f], e[2 * f + 1] = -a[f];
	        }a = e;
	      }var h = .5 / this.params.pixelRatio,
	          i = this.params.height * this.params.pixelRatio,
	          j = i * b || 0,
	          k = i / 2,
	          l = ~ ~(a.length / 2),
	          m = 1;this.params.fillParent && this.width != l && (m = this.width / l);var n = 1;if (this.params.normalize) {
	        var o = Math.max.apply(Math, a),
	            p = Math.min.apply(Math, a);n = -p > o ? -p : o;
	      }this.waveCc.fillStyle = this.params.waveColor, this.progressCc && (this.progressCc.fillStyle = this.params.progressColor), [this.waveCc, this.progressCc].forEach(function (b) {
	        if (b) {
	          b.beginPath(), b.moveTo(h, k + j);for (var c = 0; l > c; c++) {
	            var d = Math.round(a[2 * c] / n * k);b.lineTo(c * m + h, k - d + j);
	          }for (var c = l - 1; c >= 0; c--) {
	            var d = Math.round(a[2 * c + 1] / n * k);b.lineTo(c * m + h, k - d + j);
	          }b.closePath(), b.fill(), b.fillRect(0, k + j - h, this.width, h);
	        }
	      }, this);
	    }, updateProgress: function updateProgress(a) {
	      var b = Math.round(this.width * a) / this.params.pixelRatio;this.style(this.progressWave, { width: b + "px" });
	    } }), function () {
	    var b = function b() {
	      var b = document.querySelectorAll("wavesurfer");Array.prototype.forEach.call(b, function (b) {
	        var c = a.util.extend({ container: b, backend: "MediaElement", mediaControls: !0 }, b.dataset);b.style.display = "block";var d = a.create(c);if (b.dataset.peaks) var e = JSON.parse(b.dataset.peaks);d.load(b.dataset.url, e);
	      });
	    };"complete" === document.readyState ? b() : window.addEventListener("load", b);
	  }(), a;
	});
	//# sourceMappingURL=wavesurfer.min.js.map

/***/ }
/******/ ])
});
;