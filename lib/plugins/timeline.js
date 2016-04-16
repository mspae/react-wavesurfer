(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("wavesurfer.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "wavesurfer"], factory);
	else if(typeof exports === 'object')
		exports["plugins/timeline"] = factory(require("react"), require("wavesurfer.js"));
	else
		root["Wavesurfer"] = root["Wavesurfer"] || {}, root["Wavesurfer"]["plugins/timeline"] = factory(root["React"], root["WaveSurfer"]);
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _deepAssign = __webpack_require__(4);

	var _deepAssign2 = _interopRequireDefault(_deepAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WaveSurfer = __webpack_require__(3);
	__webpack_require__(6);

	var Timeline = function (_Component) {
	  _inherits(Timeline, _Component);

	  function Timeline(props) {
	    _classCallCheck(this, Timeline);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timeline).call(this, props));

	    _this.timeline = null;
	    return _this;
	  }

	  _createClass(Timeline, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.isReady) this.init();
	      this.props.wavesurfer.on('ready', this._init.bind(this));
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      this.timeline = Object.create(WaveSurfer.Timeline);

	      this.timeline.init((0, _deepAssign2.default)({}, this.props.options, {
	        container: this.refs.timeline,
	        wavesurfer: this.props.wavesurfer
	      }));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('div', { ref: 'timeline' })
	      );
	    }
	  }]);

	  return Timeline;
	}(_react.Component);

	Timeline.propTypes = {
	  isReady: _react.PropTypes.bool.isRequired,
	  options: _react.PropTypes.object.isRequired,
	  wavesurfer: _react.PropTypes.object
	};

	Timeline.defaultProps = {
	  isReady: false,
	  options: {}
	};

	exports.default = Timeline;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObj = __webpack_require__(5);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Sources cannot be null or undefined');
		}

		return Object(val);
	}

	function assignKey(to, from, key) {
		var val = from[key];

		if (val === undefined || val === null) {
			return;
		}

		if (hasOwnProperty.call(to, key)) {
			if (to[key] === undefined || to[key] === null) {
				throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
			}
		}

		if (!hasOwnProperty.call(to, key) || !isObj(val)) {
			to[key] = val;
		} else {
			to[key] = assign(Object(to[key]), from[key]);
		}
	}

	function assign(to, from) {
		if (to === from) {
			return to;
		}

		from = Object(from);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				assignKey(to, from, key);
			}
		}

		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(from);

			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					assignKey(to, from, symbols[i]);
				}
			}
		}

		return to;
	}

	module.exports = function deepAssign(target) {
		target = toObject(target);

		for (var s = 1; s < arguments.length; s++) {
			assign(target, arguments[s]);
		}

		return target;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function (x) {
		var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
		return x !== null && (type === 'object' || type === 'function');
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module unless amdModuleId is set
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (a0) {
	            return factory(a0);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = factory(require("wavesurfer.js"));
	    } else {
	        factory(WaveSurfer);
	    }
	})(undefined, function (WaveSurfer) {

	    'use strict';

	    WaveSurfer.Timeline = {
	        init: function init(params) {
	            this.params = params;
	            var wavesurfer = this.wavesurfer = params.wavesurfer;

	            if (!this.wavesurfer) {
	                throw Error('No WaveSurfer intance provided');
	            }

	            var drawer = this.drawer = this.wavesurfer.drawer;

	            this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;

	            if (!this.container) {
	                throw Error('No container for WaveSurfer timeline');
	            }

	            this.width = drawer.width;
	            this.height = this.params.height || 20;
	            this.notchPercentHeight = this.params.notchPercentHeight || 90;
	            this.primaryColor = this.params.primaryColor || '#000';
	            this.secondaryColor = this.params.secondaryColor || '#c0c0c0';
	            this.primaryFontColor = this.params.primaryFontColor || '#000';
	            this.secondaryFontColor = this.params.secondaryFontColor || '#000';
	            this.fontFamily = this.params.fontFamily || 'Arial';
	            this.fontSize = this.params.fontSize || 10;
	            this.timeInterval = this.params.timeInterval;
	            this.primaryLabelInterval = this.params.primaryLabelInterval;
	            this.secondaryLabelInterval = this.params.secondaryLabelInterval;
	            this.formatTimeCallback = this.params.formatTimeCallback;

	            this.createWrapper();
	            this.createCanvas();
	            this.render();

	            wavesurfer.drawer.wrapper.onscroll = this.updateScroll.bind(this);
	            wavesurfer.on('redraw', this.render.bind(this));
	            wavesurfer.on('destroy', this.destroy.bind(this));
	        },

	        destroy: function destroy() {
	            this.unAll();
	            if (this.wrapper && this.wrapper.parentNode) {
	                this.wrapper.parentNode.removeChild(this.wrapper);
	                this.wrapper = null;
	            }
	        },

	        createWrapper: function createWrapper() {
	            var prevTimeline = this.container.querySelector('timeline');
	            if (prevTimeline) {
	                this.container.removeChild(prevTimeline);
	            }

	            var wsParams = this.wavesurfer.params;
	            this.wrapper = this.container.appendChild(document.createElement('timeline'));
	            this.drawer.style(this.wrapper, {
	                display: 'block',
	                position: 'relative',
	                userSelect: 'none',
	                webkitUserSelect: 'none',
	                height: this.height + 'px'
	            });

	            if (wsParams.fillParent || wsParams.scrollParent) {
	                this.drawer.style(this.wrapper, {
	                    width: '100%',
	                    overflowX: 'hidden',
	                    overflowY: 'hidden'
	                });
	            }

	            var my = this;
	            this.wrapper.addEventListener('click', function (e) {
	                e.preventDefault();
	                var relX = 'offsetX' in e ? e.offsetX : e.layerX;
	                my.fireEvent('click', relX / my.wrapper.scrollWidth || 0);
	            });
	        },

	        createCanvas: function createCanvas() {
	            var canvas = this.canvas = this.wrapper.appendChild(document.createElement('canvas'));

	            this.timeCc = canvas.getContext('2d');

	            this.wavesurfer.drawer.style(canvas, {
	                position: 'absolute',
	                zIndex: 4
	            });
	        },

	        render: function render() {
	            this.updateCanvasStyle();
	            this.drawTimeCanvas();
	        },

	        updateCanvasStyle: function updateCanvasStyle() {
	            var width = this.drawer.wrapper.scrollWidth;
	            this.canvas.width = width * this.wavesurfer.params.pixelRatio;
	            this.canvas.height = this.height * this.wavesurfer.params.pixelRatio;
	            this.canvas.style.width = width + 'px';
	            this.canvas.style.height = this.height + 'px';
	        },

	        drawTimeCanvas: function drawTimeCanvas() {
	            var backend = this.wavesurfer.backend,
	                wsParams = this.wavesurfer.params,
	                duration = backend.getDuration(),
	                self = this;

	            if (wsParams.fillParent && !wsParams.scrollParent) {
	                var width = this.drawer.getWidth();
	            } else {
	                width = this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
	            }
	            var pixelsPerSecond = width / duration;

	            if (duration <= 0) {
	                return;
	            }

	            var curPixel = 0,
	                curSeconds = 0,
	                totalSeconds = parseInt(duration, 10) + 1,
	                formatTime = function formatTime(seconds) {
	                if (typeof self.formatTimeCallback === 'function') {
	                    return self.formatTimeCallback(seconds);
	                }

	                if (seconds / 60 > 1) {
	                    var minutes = parseInt(seconds / 60),
	                        seconds = parseInt(seconds % 60);
	                    seconds = seconds < 10 ? '0' + seconds : seconds;
	                    return '' + minutes + ':' + seconds;
	                } else {
	                    return seconds;
	                }
	            };

	            if (pixelsPerSecond * 1 >= 25) {
	                var timeInterval = 1;
	                var primaryLabelInterval = 10;
	                var secondaryLabelInterval = 5;
	            } else if (pixelsPerSecond * 5 >= 25) {
	                var timeInterval = 5;
	                var primaryLabelInterval = 6;
	                var secondaryLabelInterval = 2;
	            } else if (pixelsPerSecond * 15 >= 25) {
	                var timeInterval = 15;
	                var primaryLabelInterval = 4;
	                var secondaryLabelInterval = 2;
	            } else {
	                var timeInterval = 60;
	                var primaryLabelInterval = 4;
	                var secondaryLabelInterval = 2;
	            }

	            timeInterval = this.timeInterval || timeInterval;
	            primaryLabelInterval = this.primaryLabelInterval || primaryLabelInterval;
	            secondaryLabelInterval = this.secondaryLabelInterval || secondaryLabelInterval;

	            var height1 = this.height - 4,
	                height2 = this.height * (this.notchPercentHeight / 100.0) - 4,
	                fontSize = this.fontSize * wsParams.pixelRatio;

	            for (var i = 0; i < totalSeconds / timeInterval; i++) {
	                if (i % primaryLabelInterval == 0) {
	                    this.timeCc.fillStyle = this.primaryColor;
	                    this.timeCc.fillRect(curPixel, 0, 1, height1);
	                    this.timeCc.font = fontSize + 'px ' + this.fontFamily;
	                    this.timeCc.fillStyle = this.primaryFontColor;
	                    this.timeCc.fillText(formatTime(curSeconds), curPixel + 5, height1);
	                } else if (i % secondaryLabelInterval == 0) {
	                    this.timeCc.fillStyle = this.secondaryColor;
	                    this.timeCc.fillRect(curPixel, 0, 1, height1);
	                    this.timeCc.font = fontSize + 'px ' + this.fontFamily;
	                    this.timeCc.fillStyle = this.secondaryFontColor;
	                    this.timeCc.fillText(formatTime(curSeconds), curPixel + 5, height1);
	                } else {
	                    this.timeCc.fillStyle = this.secondaryColor;
	                    this.timeCc.fillRect(curPixel, 0, 1, height2);
	                }

	                curSeconds += timeInterval;
	                curPixel += pixelsPerSecond * timeInterval;
	            }
	        },

	        updateScroll: function updateScroll() {
	            this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft;
	        }
	    };

	    WaveSurfer.util.extend(WaveSurfer.Timeline, WaveSurfer.Observer);
	});

/***/ }
/******/ ])
});
;