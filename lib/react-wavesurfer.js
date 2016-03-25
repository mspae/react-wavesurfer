(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("wavesurfer.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "wavesurfer"], factory);
	else if(typeof exports === 'object')
		exports["Wavesurfer"] = factory(require("react"), require("wavesurfer.js"));
	else
		root["Wavesurfer"] = factory(root["React"], root["WaveSurfer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;