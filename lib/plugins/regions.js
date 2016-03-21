(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["plugins/regions"] = factory(require("react"));
	else
		root["ReactWavesurfer"] = root["ReactWavesurfer"] || {}, root["ReactWavesurfer"]["plugins/regions"] = factory(root["React"]);
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WaveSurferRegions = __webpack_require__(2);

	var Regions = function (_Component) {
	  _inherits(Regions, _Component);

	  function Regions(props) {
	    _classCallCheck(this, Regions);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Regions).call(this, props));
	  }

	  _createClass(Regions, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props._isReady) {
	        console.log('init');
	        this.init();
	      }
	      this.props.wavesurfer.on('ready', this._init.bind(this));
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      var _this2 = this;

	      this.props.regions.map(function (region) {
	        console.log(_this2.props.wavesurfer);
	        return _this2.props.wavesurfer.addRegion(region);
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