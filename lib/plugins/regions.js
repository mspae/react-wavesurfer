(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("wavesurfer.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "wavesurfer"], factory);
	else if(typeof exports === 'object')
		exports["plugins/regions"] = factory(require("react"), require("wavesurfer.js"));
	else
		root["Wavesurfer"] = root["Wavesurfer"] || {}, root["Wavesurfer"]["plugins/regions"] = factory(root["React"], root["WaveSurfer"]);
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WaveSurferRegions = __webpack_require__(2);

	var REGION_EVENTS = ['region-in ', 'region-out', 'region-mouseenter', 'region-mouseleave', 'region-click', 'region-dblclick', 'region-created ', 'region-updated ', 'region-update-end ', 'region-removed '];

	/**
	 * @description Capitalise the first letter of a string
	 */
	function capitaliseFirstLetter(string) {
	  return string.split('-').map(function (string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }).join('');
	}

	var Regions = function (_Component) {
	  _inherits(Regions, _Component);

	  function Regions(props) {
	    _classCallCheck(this, Regions);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Regions).call(this, props));
	  }

	  _createClass(Regions, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (this.props._isReady) {
	        this.init();
	      }
	      this.props.wavesurfer.on('ready', this._init.bind(this));

	      REGION_EVENTS.forEach(function (e) {
	        var propCallback = _this2.props['on' + capitaliseFirstLetter(e)];
	        var wavesurfer = _this2.props.wavesurfer;
	        if (propCallback) {
	          _this2.props.wavesurfer.on(e, function () {
	            propCallback({
	              wavesurfer: wavesurfer,
	              originalArgs: [].concat(Array.prototype.slice.call(arguments))
	            });
	          });
	        }
	      });
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      var _this3 = this;

	      this.props.regions.map(function (region) {
	        return _this3.props.wavesurfer.addRegion(region);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('div', null);
	    }
	  }]);

	  return Regions;
	}(_react.Component);

	Regions.propTypes = {
	  isReady: _react.PropTypes.bool,
	  regions: _react.PropTypes.array
	};

	Regions.defaultProps = {
	  regions: []
	};

	exports.default = Regions;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
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

	    /* Regions manager */

	    WaveSurfer.Regions = {
	        init: function init(wavesurfer) {
	            this.wavesurfer = wavesurfer;
	            this.wrapper = this.wavesurfer.drawer.wrapper;

	            /* Id-based hash of regions. */
	            this.list = {};
	        },

	        /* Remove a region. */
	        add: function add(params) {
	            var region = Object.create(WaveSurfer.Region);
	            region.init(params, this.wavesurfer);

	            this.list[region.id] = region;

	            region.on('remove', function () {
	                delete this.list[region.id];
	            }.bind(this));

	            return region;
	        },

	        /* Remove all regions. */
	        clear: function clear() {
	            Object.keys(this.list).forEach(function (id) {
	                this.list[id].remove();
	            }, this);
	        },

	        enableDragSelection: function enableDragSelection(params) {
	            var my = this;
	            var drag;
	            var start;
	            var region;

	            function eventDown(e) {
	                drag = true;
	                if (typeof e.targetTouches !== 'undefined' && e.targetTouches.length === 1) {
	                    e.clientX = e.targetTouches[0].clientX;
	                }
	                start = my.wavesurfer.drawer.handleEvent(e);
	                region = null;
	            }
	            this.wrapper.addEventListener('mousedown', eventDown);
	            this.wrapper.addEventListener('touchstart', eventDown);
	            function eventUp(e) {
	                drag = false;

	                if (region) {
	                    region.fireEvent('update-end', e);
	                    my.wavesurfer.fireEvent('region-update-end', region, e);
	                }

	                region = null;
	            }
	            this.wrapper.addEventListener('mouseup', eventUp);
	            this.wrapper.addEventListener('touchend', eventUp);
	            function eventMove(e) {
	                if (!drag) {
	                    return;
	                }

	                if (!region) {
	                    region = my.add(params || {});
	                }

	                var duration = my.wavesurfer.getDuration();
	                if (typeof e.targetTouches !== 'undefined' && e.targetTouches.length === 1) {
	                    e.clientX = e.targetTouches[0].clientX;
	                }
	                var end = my.wavesurfer.drawer.handleEvent(e);
	                region.update({
	                    start: Math.min(end * duration, start * duration),
	                    end: Math.max(end * duration, start * duration)
	                });
	            }
	            this.wrapper.addEventListener('mousemove', eventMove);
	            this.wrapper.addEventListener('touchmove', eventMove);
	        }
	    };

	    WaveSurfer.Region = {
	        /* Helper function to assign CSS styles. */
	        style: WaveSurfer.Drawer.style,

	        init: function init(params, wavesurfer) {
	            this.wavesurfer = wavesurfer;
	            this.wrapper = wavesurfer.drawer.wrapper;

	            this.id = params.id == null ? WaveSurfer.util.getId() : params.id;
	            this.start = Number(params.start) || 0;
	            this.end = params.end == null ?
	            // small marker-like region
	            this.start + 4 / this.wrapper.scrollWidth * this.wavesurfer.getDuration() : Number(params.end);
	            this.resize = params.resize === undefined ? true : Boolean(params.resize);
	            this.drag = params.drag === undefined ? true : Boolean(params.drag);
	            this.loop = Boolean(params.loop);
	            this.color = params.color || 'rgba(0, 0, 0, 0.1)';
	            this.data = params.data || {};
	            this.attributes = params.attributes || {};

	            this.maxLength = params.maxLength;
	            this.minLength = params.minLength;

	            this.bindInOut();
	            this.render();
	            this.wavesurfer.on('zoom', this.updateRender.bind(this));
	            this.wavesurfer.fireEvent('region-created', this);
	        },

	        /* Update region params. */
	        update: function update(params) {
	            if (null != params.start) {
	                this.start = Number(params.start);
	            }
	            if (null != params.end) {
	                this.end = Number(params.end);
	            }
	            if (null != params.loop) {
	                this.loop = Boolean(params.loop);
	            }
	            if (null != params.color) {
	                this.color = params.color;
	            }
	            if (null != params.data) {
	                this.data = params.data;
	            }
	            if (null != params.resize) {
	                this.resize = Boolean(params.resize);
	            }
	            if (null != params.drag) {
	                this.drag = Boolean(params.drag);
	            }
	            if (null != params.maxLength) {
	                this.maxLength = Number(params.maxLength);
	            }
	            if (null != params.minLength) {
	                this.minLength = Number(params.minLength);
	            }
	            if (null != params.attributes) {
	                this.attributes = params.attributes;
	            }

	            this.updateRender();
	            this.fireEvent('update');
	            this.wavesurfer.fireEvent('region-updated', this);
	        },

	        /* Remove a single region. */
	        remove: function remove(region) {
	            if (this.element) {
	                this.wrapper.removeChild(this.element);
	                this.element = null;
	                this.fireEvent('remove');
	                this.wavesurfer.un('zoom', this.updateRender.bind(this));
	                this.wavesurfer.fireEvent('region-removed', this);
	            }
	        },

	        /* Play the audio region. */
	        play: function play() {
	            this.wavesurfer.play(this.start, this.end);
	            this.fireEvent('play');
	            this.wavesurfer.fireEvent('region-play', this);
	        },

	        /* Play the region in loop. */
	        playLoop: function playLoop() {
	            this.play();
	            this.once('out', this.playLoop.bind(this));
	        },

	        /* Render a region as a DOM element. */
	        render: function render() {
	            var regionEl = document.createElement('region');
	            regionEl.className = 'wavesurfer-region';
	            regionEl.title = this.formatTime(this.start, this.end);
	            regionEl.setAttribute('data-id', this.id);

	            for (var attrname in this.attributes) {
	                regionEl.setAttribute('data-region-' + attrname, this.attributes[attrname]);
	            }

	            var width = this.wrapper.scrollWidth;
	            this.style(regionEl, {
	                position: 'absolute',
	                zIndex: 2,
	                height: '100%',
	                top: '0px'
	            });

	            /* Resize handles */
	            if (this.resize) {
	                var handleLeft = regionEl.appendChild(document.createElement('handle'));
	                var handleRight = regionEl.appendChild(document.createElement('handle'));
	                handleLeft.className = 'wavesurfer-handle wavesurfer-handle-start';
	                handleRight.className = 'wavesurfer-handle wavesurfer-handle-end';
	                var css = {
	                    cursor: 'col-resize',
	                    position: 'absolute',
	                    left: '0px',
	                    top: '0px',
	                    width: '1%',
	                    maxWidth: '4px',
	                    height: '100%'
	                };
	                this.style(handleLeft, css);
	                this.style(handleRight, css);
	                this.style(handleRight, {
	                    left: '100%'
	                });
	            }

	            this.element = this.wrapper.appendChild(regionEl);
	            this.updateRender();
	            this.bindEvents(regionEl);
	        },

	        formatTime: function formatTime(start, end) {
	            return (start == end ? [start] : [start, end]).map(function (time) {
	                return [Math.floor(time % 3600 / 60), // minutes
	                ('00' + Math.floor(time % 60)).slice(-2) // seconds
	                ].join(':');
	            }).join('-');
	        },

	        /* Update element's position, width, color. */
	        updateRender: function updateRender(pxPerSec) {
	            var dur = this.wavesurfer.getDuration();
	            var width;
	            if (pxPerSec) {
	                width = Math.round(this.wavesurfer.getDuration() * pxPerSec);
	            } else {
	                width = this.wrapper.scrollWidth;
	            }

	            if (this.start < 0) {
	                this.start = 0;
	                this.end = this.end - this.start;
	            }
	            if (this.end > dur) {
	                this.end = dur;
	                this.start = dur - (this.end - this.start);
	            }

	            if (this.minLength != null) {
	                this.end = Math.max(this.start + this.minLength, this.end);
	            }

	            if (this.maxLength != null) {
	                this.end = Math.min(this.start + this.maxLength, this.end);
	            }

	            if (this.element != null) {
	                this.style(this.element, {
	                    left: ~ ~(this.start / dur * width) + 'px',
	                    width: ~ ~((this.end - this.start) / dur * width) + 'px',
	                    backgroundColor: this.color,
	                    cursor: this.drag ? 'move' : 'default'
	                });

	                for (var attrname in this.attributes) {
	                    this.element.setAttribute('data-region-' + attrname, this.attributes[attrname]);
	                }

	                this.element.title = this.formatTime(this.start, this.end);
	            }
	        },

	        /* Bind audio events. */
	        bindInOut: function bindInOut() {
	            var my = this;

	            my.firedIn = false;
	            my.firedOut = false;

	            var onProcess = function onProcess(time) {
	                if (!my.firedIn && my.start <= time && my.end > time) {
	                    my.firedIn = true;
	                    my.firedOut = false;
	                    my.fireEvent('in');
	                    my.wavesurfer.fireEvent('region-in', my);
	                }
	                if (!my.firedOut && my.firedIn && (my.start >= Math.round(time * 100) / 100 || my.end <= Math.round(time * 100) / 100)) {
	                    my.firedOut = true;
	                    my.firedIn = false;
	                    my.fireEvent('out');
	                    my.wavesurfer.fireEvent('region-out', my);
	                }
	            };

	            this.wavesurfer.backend.on('audioprocess', onProcess);

	            this.on('remove', function () {
	                my.wavesurfer.backend.un('audioprocess', onProcess);
	            });

	            /* Loop playback. */
	            this.on('out', function () {
	                if (my.loop) {
	                    my.wavesurfer.play(my.start);
	                }
	            });
	        },

	        /* Bind DOM events. */
	        bindEvents: function bindEvents() {
	            var my = this;

	            this.element.addEventListener('mouseenter', function (e) {
	                my.fireEvent('mouseenter', e);
	                my.wavesurfer.fireEvent('region-mouseenter', my, e);
	            });

	            this.element.addEventListener('mouseleave', function (e) {
	                my.fireEvent('mouseleave', e);
	                my.wavesurfer.fireEvent('region-mouseleave', my, e);
	            });

	            this.element.addEventListener('click', function (e) {
	                e.preventDefault();
	                my.fireEvent('click', e);
	                my.wavesurfer.fireEvent('region-click', my, e);
	            });

	            this.element.addEventListener('dblclick', function (e) {
	                e.stopPropagation();
	                e.preventDefault();
	                my.fireEvent('dblclick', e);
	                my.wavesurfer.fireEvent('region-dblclick', my, e);
	            });

	            /* Drag or resize on mousemove. */
	            (this.drag || this.resize) && function () {
	                var duration = my.wavesurfer.getDuration();
	                var drag;
	                var resize;
	                var startTime;

	                var onDown = function onDown(e) {
	                    e.stopPropagation();
	                    startTime = my.wavesurfer.drawer.handleEvent(e) * duration;

	                    if (e.target.tagName.toLowerCase() == 'handle') {
	                        if (e.target.classList.contains('wavesurfer-handle-start')) {
	                            resize = 'start';
	                        } else {
	                            resize = 'end';
	                        }
	                    } else {
	                        drag = true;
	                    }
	                };
	                var onUp = function onUp(e) {
	                    if (drag || resize) {
	                        drag = false;
	                        resize = false;
	                        e.stopPropagation();
	                        e.preventDefault();

	                        my.fireEvent('update-end', e);
	                        my.wavesurfer.fireEvent('region-update-end', my, e);
	                    }
	                };
	                var onMove = function onMove(e) {
	                    if (drag || resize) {
	                        var time = my.wavesurfer.drawer.handleEvent(e) * duration;
	                        var delta = time - startTime;
	                        startTime = time;

	                        // Drag
	                        if (my.drag && drag) {
	                            my.onDrag(delta);
	                        }

	                        // Resize
	                        if (my.resize && resize) {
	                            my.onResize(delta, resize);
	                        }
	                    }
	                };

	                my.element.addEventListener('mousedown', onDown);
	                my.wrapper.addEventListener('mousemove', onMove);
	                document.body.addEventListener('mouseup', onUp);

	                my.on('remove', function () {
	                    document.body.removeEventListener('mouseup', onUp);
	                    my.wrapper.removeEventListener('mousemove', onMove);
	                });

	                my.wavesurfer.on('destroy', function () {
	                    document.body.removeEventListener('mouseup', onUp);
	                });
	            }();
	        },

	        onDrag: function onDrag(delta) {
	            this.update({
	                start: this.start + delta,
	                end: this.end + delta
	            });
	        },

	        onResize: function onResize(delta, direction) {
	            if (direction == 'start') {
	                this.update({
	                    start: Math.min(this.start + delta, this.end),
	                    end: Math.max(this.start + delta, this.end)
	                });
	            } else {
	                this.update({
	                    start: Math.min(this.end + delta, this.start),
	                    end: Math.max(this.end + delta, this.start)
	                });
	            }
	        }
	    };

	    WaveSurfer.util.extend(WaveSurfer.Region, WaveSurfer.Observer);

	    /* Augment WaveSurfer with region methods. */
	    WaveSurfer.initRegions = function () {
	        if (!this.regions) {
	            this.regions = Object.create(WaveSurfer.Regions);
	            this.regions.init(this);
	        }
	    };

	    WaveSurfer.addRegion = function (options) {
	        this.initRegions();
	        return this.regions.add(options);
	    };

	    WaveSurfer.clearRegions = function () {
	        this.regions && this.regions.clear();
	    };

	    WaveSurfer.enableDragSelection = function (options) {
	        this.initRegions();
	        this.regions.enableDragSelection(options);
	    };
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;