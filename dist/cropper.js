/*!
 * Cropper.js v0.8.0
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-08-18T03:01:29.515Z
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _defaults = __webpack_require__(1);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _template = __webpack_require__(2);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _render = __webpack_require__(3);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _preview = __webpack_require__(5);
	
	var _preview2 = _interopRequireDefault(_preview);
	
	var _events = __webpack_require__(6);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _handlers = __webpack_require__(7);
	
	var _handlers2 = _interopRequireDefault(_handlers);
	
	var _change = __webpack_require__(8);
	
	var _change2 = _interopRequireDefault(_change);
	
	var _methods = __webpack_require__(9);
	
	var _methods2 = _interopRequireDefault(_methods);
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Constants
	var NAMESPACE = 'cropper';
	
	// Classes
	var CLASS_HIDDEN = NAMESPACE + '-hidden';
	
	// Events
	var EVENT_ERROR = 'error';
	var EVENT_LOAD = 'load';
	var EVENT_READY = 'ready';
	var EVENT_CROP = 'crop';
	
	// RegExps
	var REGEXP_DATA_URL = /^data:/;
	var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg.*;base64,/;
	
	var AnotherCropper = void 0;
	
	var Cropper = function () {
	  function Cropper(element, options) {
	    _classCallCheck(this, Cropper);
	
	    var self = this;
	
	    self.element = element;
	    self.options = $.extend({}, _defaults2.default, $.isPlainObject(options) && options);
	    self.loaded = false;
	    self.ready = false;
	    self.complete = false;
	    self.rotated = false;
	    self.cropped = false;
	    self.disabled = false;
	    self.replaced = false;
	    self.limited = false;
	    self.wheeling = false;
	    self.isImg = false;
	    self.originalUrl = '';
	    self.canvasData = null;
	    self.cropBoxData = null;
	    self.previews = null;
	    self.init();
	  }
	
	  _createClass(Cropper, [{
	    key: 'init',
	    value: function init() {
	      var self = this;
	      var element = self.element;
	      var tagName = element.tagName.toLowerCase();
	      var url = void 0;
	
	      if ($.getData(element, NAMESPACE)) {
	        return;
	      }
	
	      $.setData(element, NAMESPACE, self);
	
	      if (tagName === 'img') {
	        self.isImg = true;
	
	        // e.g.: "img/picture.jpg"
	        self.originalUrl = url = element.getAttribute('src');
	
	        // Stop when it's a blank image
	        if (!url) {
	          return;
	        }
	
	        // e.g.: "http://example.com/img/picture.jpg"
	        url = element.src;
	      } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
	        url = element.toDataURL();
	      }
	
	      self.load(url);
	    }
	  }, {
	    key: 'load',
	    value: function load(url) {
	      var self = this;
	      var options = self.options;
	      var element = self.element;
	
	      if (!url) {
	        return;
	      }
	
	      self.url = url;
	      self.imageData = {};
	
	      if (!options.checkOrientation || !window.ArrayBuffer) {
	        self.clone();
	        return;
	      }
	
	      // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
	      if (REGEXP_DATA_URL.test(url)) {
	        if (REGEXP_DATA_URL_JPEG) {
	          self.read($.dataURLToArrayBuffer(url));
	        } else {
	          self.clone();
	        }
	        return;
	      }
	
	      var xhr = new XMLHttpRequest();
	
	      xhr.onerror = xhr.onabort = function () {
	        self.clone();
	      };
	
	      xhr.onload = function () {
	        self.read(xhr.response);
	      };
	
	      if (options.checkCrossOrigin && $.isCrossOriginURL(url) && element.crossOrigin) {
	        url = $.addTimestamp(url);
	      }
	
	      xhr.open('get', url);
	      xhr.responseType = 'arraybuffer';
	      xhr.send();
	    }
	  }, {
	    key: 'read',
	    value: function read(arrayBuffer) {
	      var self = this;
	      var options = self.options;
	      var orientation = $.getOrientation(arrayBuffer);
	      var imageData = self.imageData;
	      var rotate = 0;
	      var scaleX = 1;
	      var scaleY = 1;
	
	      if (orientation > 1) {
	        self.url = $.arrayBufferToDataURL(arrayBuffer);
	
	        switch (orientation) {
	
	          // flip horizontal
	          case 2:
	            scaleX = -1;
	            break;
	
	          // rotate left 180°
	          case 3:
	            rotate = -180;
	            break;
	
	          // flip vertical
	          case 4:
	            scaleY = -1;
	            break;
	
	          // flip vertical + rotate right 90°
	          case 5:
	            rotate = 90;
	            scaleY = -1;
	            break;
	
	          // rotate right 90°
	          case 6:
	            rotate = 90;
	            break;
	
	          // flip horizontal + rotate right 90°
	          case 7:
	            rotate = 90;
	            scaleX = -1;
	            break;
	
	          // rotate left 90°
	          case 8:
	            rotate = -90;
	            break;
	        }
	      }
	
	      if (options.rotatable) {
	        imageData.rotate = rotate;
	      }
	
	      if (options.scalable) {
	        imageData.scaleX = scaleX;
	        imageData.scaleY = scaleY;
	      }
	
	      self.clone();
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var self = this;
	      var element = self.element;
	      var url = self.url;
	      var crossOrigin = void 0;
	      var crossOriginUrl = void 0;
	      var start = void 0;
	      var stop = void 0;
	
	      if (self.options.checkCrossOrigin && $.isCrossOriginURL(url)) {
	        crossOrigin = element.crossOrigin;
	
	        if (crossOrigin) {
	          crossOriginUrl = url;
	        } else {
	          crossOrigin = 'anonymous';
	
	          // Bust cache when there is not a "crossOrigin" property
	          crossOriginUrl = $.addTimestamp(url);
	        }
	      }
	
	      self.crossOrigin = crossOrigin;
	      self.crossOriginUrl = crossOriginUrl;
	
	      var image = $.createElement('img');
	
	      if (crossOrigin) {
	        image.crossOrigin = crossOrigin;
	      }
	
	      image.src = crossOriginUrl || url;
	      self.image = image;
	      self.onStart = start = $.proxy(self.start, self);
	      self.onStop = stop = $.proxy(self.stop, self);
	
	      if (self.isImg) {
	        if (element.complete) {
	          self.start();
	        } else {
	          $.addListener(element, EVENT_LOAD, start);
	        }
	      } else {
	        $.addListener(image, EVENT_LOAD, start);
	        $.addListener(image, EVENT_ERROR, stop);
	        $.addClass(image, 'cropper-hide');
	        element.parentNode.insertBefore(image, element.nextSibling);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start(event) {
	      var self = this;
	      var image = self.isImg ? self.element : self.image;
	
	      if (event) {
	        $.removeListener(image, EVENT_LOAD, self.onStart);
	        $.removeListener(image, EVENT_ERROR, self.onStop);
	      }
	
	      $.getImageSize(image, function (naturalWidth, naturalHeight) {
	        $.extend(self.imageData, {
	          naturalWidth: naturalWidth,
	          naturalHeight: naturalHeight,
	          aspectRatio: naturalWidth / naturalHeight
	        });
	
	        self.loaded = true;
	        self.build();
	      });
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var self = this;
	      var image = self.image;
	
	      $.removeListener(image, EVENT_LOAD, self.onStart);
	      $.removeListener(image, EVENT_ERROR, self.onStop);
	
	      $.removeChild(image);
	      self.image = null;
	    }
	  }, {
	    key: 'build',
	    value: function build() {
	      var self = this;
	      var options = self.options;
	      var element = self.element;
	      var image = self.image;
	      var container = void 0;
	      var cropper = void 0;
	      var canvas = void 0;
	      var dragBox = void 0;
	      var cropBox = void 0;
	      var face = void 0;
	
	      if (!self.loaded) {
	        return;
	      }
	
	      // Unbuild first when replace
	      if (self.ready) {
	        self.unbuild();
	      }
	
	      var template = $.createElement('div');
	      template.innerHTML = _template2.default;
	
	      // Create cropper elements
	      self.container = container = element.parentNode;
	      self.cropper = cropper = $.getByClass(template, 'cropper-container')[0];
	      self.canvas = canvas = $.getByClass(cropper, 'cropper-canvas')[0];
	      self.dragBox = dragBox = $.getByClass(cropper, 'cropper-drag-box')[0];
	      self.cropBox = cropBox = $.getByClass(cropper, 'cropper-crop-box')[0];
	      self.viewBox = $.getByClass(cropper, 'cropper-view-box')[0];
	      self.face = face = $.getByClass(cropBox, 'cropper-face')[0];
	
	      $.appendChild(canvas, image);
	
	      // Hide the original image
	      $.addClass(element, CLASS_HIDDEN);
	
	      // Inserts the cropper after to the current image
	      container.insertBefore(cropper, element.nextSibling);
	
	      // Show the image if is hidden
	      if (!self.isImg) {
	        $.removeClass(image, 'cropper-hide');
	      }
	
	      self.initPreview();
	      self.bind();
	
	      options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
	      options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
	
	      if (options.autoCrop) {
	        self.cropped = true;
	
	        if (options.modal) {
	          $.addClass(dragBox, 'cropper-modal');
	        }
	      } else {
	        $.addClass(cropBox, CLASS_HIDDEN);
	      }
	
	      if (!options.guides) {
	        $.addClass($.getByClass(cropBox, 'cropper-dashed'), CLASS_HIDDEN);
	      }
	
	      if (!options.center) {
	        $.addClass($.getByClass(cropBox, 'cropper-center'), CLASS_HIDDEN);
	      }
	
	      if (options.background) {
	        $.addClass(cropper, 'cropper-bg');
	      }
	
	      if (!options.highlight) {
	        $.addClass(face, 'cropper-invisible');
	      }
	
	      if (options.cropBoxMovable) {
	        $.addClass(face, 'cropper-move');
	        $.setData(face, 'action', 'all');
	      }
	
	      if (!options.cropBoxResizable) {
	        $.addClass($.getByClass(cropBox, 'cropper-line'), CLASS_HIDDEN);
	        $.addClass($.getByClass(cropBox, 'cropper-point'), CLASS_HIDDEN);
	      }
	
	      self.setDragMode(options.dragMode);
	      self.render();
	      self.ready = true;
	      self.setData(options.data);
	
	      // Call the "ready" option asynchronously to keep "image.cropper" is defined
	      setTimeout(function () {
	        if ($.isFunction(options.ready)) {
	          $.addListener(element, EVENT_READY, options.ready, true);
	        }
	
	        $.dispatchEvent(element, EVENT_READY);
	        $.dispatchEvent(element, EVENT_CROP, self.getData());
	
	        self.complete = true;
	      }, 0);
	    }
	  }, {
	    key: 'unbuild',
	    value: function unbuild() {
	      var self = this;
	
	      if (!self.ready) {
	        return;
	      }
	
	      self.ready = false;
	      self.complete = false;
	      self.initialImageData = null;
	
	      // Clear `initialCanvasData` is necessary when replace
	      self.initialCanvasData = null;
	      self.initialCropBoxData = null;
	      self.containerData = null;
	      self.canvasData = null;
	
	      // Clear `cropBoxData` is necessary when replace
	      self.cropBoxData = null;
	      self.unbind();
	
	      self.resetPreview();
	      self.previews = null;
	
	      self.viewBox = null;
	      self.cropBox = null;
	      self.dragBox = null;
	      self.canvas = null;
	      self.container = null;
	
	      $.removeChild(self.cropper);
	      self.cropper = null;
	    }
	  }], [{
	    key: 'noConflict',
	    value: function noConflict() {
	      window.Cropper = AnotherCropper;
	      return Cropper;
	    }
	  }, {
	    key: 'setDefaults',
	    value: function setDefaults(options) {
	      $.extend(_defaults2.default, $.isPlainObject(options) && options);
	    }
	  }]);
	
	  return Cropper;
	}();
	
	$.extend(Cropper.prototype, _render2.default);
	$.extend(Cropper.prototype, _preview2.default);
	$.extend(Cropper.prototype, _events2.default);
	$.extend(Cropper.prototype, _handlers2.default);
	$.extend(Cropper.prototype, _change2.default);
	$.extend(Cropper.prototype, _methods2.default);
	
	if (typeof window !== 'undefined') {
	  AnotherCropper = window.Cropper;
	  window.Cropper = Cropper;
	}
	
	exports.default = Cropper;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  // Define the view mode of the cropper
	  viewMode: 0, // 0, 1, 2, 3
	
	  // Define the dragging mode of the cropper
	  dragMode: 'crop', // 'crop', 'move' or 'none'
	
	  // Define the aspect ratio of the crop box
	  aspectRatio: NaN,
	
	  // An object with the previous cropping result data
	  data: null,
	
	  // A selector for adding extra containers to preview
	  preview: '',
	
	  // Re-render the cropper when resize the window
	  responsive: true,
	
	  // Restore the cropped area after resize the window
	  restore: true,
	
	  // Check if the current image is a cross-origin image
	  checkCrossOrigin: true,
	
	  // Check the current image's Exif Orientation information
	  checkOrientation: true,
	
	  // Show the black modal
	  modal: true,
	
	  // Show the dashed lines for guiding
	  guides: true,
	
	  // Show the center indicator for guiding
	  center: true,
	
	  // Show the white modal to highlight the crop box
	  highlight: true,
	
	  // Show the grid background
	  background: true,
	
	  // Enable to crop the image automatically when initialize
	  autoCrop: true,
	
	  // Define the percentage of automatic cropping area when initializes
	  autoCropArea: 0.8,
	
	  // Enable to move the image
	  movable: true,
	
	  // Enable to rotate the image
	  rotatable: true,
	
	  // Enable to scale the image
	  scalable: true,
	
	  // Enable to zoom the image
	  zoomable: true,
	
	  // Enable to zoom the image by dragging touch
	  zoomOnTouch: true,
	
	  // Enable to zoom the image by wheeling mouse
	  zoomOnWheel: true,
	
	  // Define zoom ratio when zoom the image by wheeling mouse
	  wheelZoomRatio: 0.1,
	
	  // Enable to move the crop box
	  cropBoxMovable: true,
	
	  // Enable to resize the crop box
	  cropBoxResizable: true,
	
	  // Toggle drag mode between "crop" and "move" when click twice on the cropper
	  toggleDragModeOnDblclick: true,
	
	  // Size limitation
	  minCanvasWidth: 0,
	  minCanvasHeight: 0,
	  minCropBoxWidth: 0,
	  minCropBoxHeight: 0,
	  minContainerWidth: 200,
	  minContainerHeight: 100,
	
	  // Shortcuts of events
	  ready: null,
	  cropstart: null,
	  cropmove: null,
	  cropend: null,
	  crop: null,
	  zoom: null
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '<div class="cropper-container">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-action="e"></span>' + '<span class="cropper-line line-n" data-action="n"></span>' + '<span class="cropper-line line-w" data-action="w"></span>' + '<span class="cropper-line line-s" data-action="s"></span>' + '<span class="cropper-point point-e" data-action="e"></span>' + '<span class="cropper-point point-n" data-action="n"></span>' + '<span class="cropper-point point-w" data-action="w"></span>' + '<span class="cropper-point point-s" data-action="s"></span>' + '<span class="cropper-point point-ne" data-action="ne"></span>' + '<span class="cropper-point point-nw" data-action="nw"></span>' + '<span class="cropper-point point-sw" data-action="sw"></span>' + '<span class="cropper-point point-se" data-action="se"></span>' + '</div>' + '</div>';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  render: function render() {
	    var self = this;
	
	    self.initContainer();
	    self.initCanvas();
	    self.initCropBox();
	
	    self.renderCanvas();
	
	    if (self.cropped) {
	      self.renderCropBox();
	    }
	  },
	  initContainer: function initContainer() {
	    var self = this;
	    var options = self.options;
	    var element = self.element;
	    var container = self.container;
	    var cropper = self.cropper;
	    var containerData = void 0;
	
	    $.addClass(cropper, 'cropper-hidden');
	    $.removeClass(element, 'cropper-hidden');
	
	    self.containerData = containerData = {
	      width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
	      height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
	    };
	
	    $.setStyle(cropper, {
	      width: containerData.width,
	      height: containerData.height
	    });
	
	    $.addClass(element, 'cropper-hidden');
	    $.removeClass(cropper, 'cropper-hidden');
	  },
	
	
	  // Canvas (image wrapper)
	  initCanvas: function initCanvas() {
	    var self = this;
	    var viewMode = self.options.viewMode;
	    var containerData = self.containerData;
	    var imageData = self.imageData;
	    var rotated = Math.abs(imageData.rotate) === 90;
	    var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
	    var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
	    var aspectRatio = naturalWidth / naturalHeight;
	    var canvasWidth = containerData.width;
	    var canvasHeight = containerData.height;
	
	    if (containerData.height * aspectRatio > containerData.width) {
	      if (viewMode === 3) {
	        canvasWidth = containerData.height * aspectRatio;
	      } else {
	        canvasHeight = containerData.width / aspectRatio;
	      }
	    } else if (viewMode === 3) {
	      canvasHeight = containerData.width / aspectRatio;
	    } else {
	      canvasWidth = containerData.height * aspectRatio;
	    }
	
	    var canvasData = {
	      naturalWidth: naturalWidth,
	      naturalHeight: naturalHeight,
	      aspectRatio: aspectRatio,
	      width: canvasWidth,
	      height: canvasHeight
	    };
	
	    canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
	    canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;
	
	    self.canvasData = canvasData;
	    self.limited = viewMode === 1 || viewMode === 2;
	    self.limitCanvas(true, true);
	    self.initialImageData = $.extend({}, imageData);
	    self.initialCanvasData = $.extend({}, canvasData);
	  },
	  limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
	    var self = this;
	    var options = self.options;
	    var viewMode = options.viewMode;
	    var containerData = self.containerData;
	    var canvasData = self.canvasData;
	    var aspectRatio = canvasData.aspectRatio;
	    var cropBoxData = self.cropBoxData;
	    var cropped = self.cropped && cropBoxData;
	    var minCanvasWidth = void 0;
	    var minCanvasHeight = void 0;
	    var newCanvasLeft = void 0;
	    var newCanvasTop = void 0;
	
	    if (sizeLimited) {
	      minCanvasWidth = Number(options.minCanvasWidth) || 0;
	      minCanvasHeight = Number(options.minCanvasHeight) || 0;
	
	      if (viewMode > 1) {
	        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
	        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
	
	        if (viewMode === 3) {
	          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
	            minCanvasWidth = minCanvasHeight * aspectRatio;
	          } else {
	            minCanvasHeight = minCanvasWidth / aspectRatio;
	          }
	        }
	      } else if (viewMode > 0) {
	        if (minCanvasWidth) {
	          minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
	        } else if (minCanvasHeight) {
	          minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
	        } else if (cropped) {
	          minCanvasWidth = cropBoxData.width;
	          minCanvasHeight = cropBoxData.height;
	
	          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
	            minCanvasWidth = minCanvasHeight * aspectRatio;
	          } else {
	            minCanvasHeight = minCanvasWidth / aspectRatio;
	          }
	        }
	      }
	
	      if (minCanvasWidth && minCanvasHeight) {
	        if (minCanvasHeight * aspectRatio > minCanvasWidth) {
	          minCanvasHeight = minCanvasWidth / aspectRatio;
	        } else {
	          minCanvasWidth = minCanvasHeight * aspectRatio;
	        }
	      } else if (minCanvasWidth) {
	        minCanvasHeight = minCanvasWidth / aspectRatio;
	      } else if (minCanvasHeight) {
	        minCanvasWidth = minCanvasHeight * aspectRatio;
	      }
	
	      canvasData.minWidth = minCanvasWidth;
	      canvasData.minHeight = minCanvasHeight;
	      canvasData.maxWidth = Infinity;
	      canvasData.maxHeight = Infinity;
	    }
	
	    if (positionLimited) {
	      if (viewMode) {
	        newCanvasLeft = containerData.width - canvasData.width;
	        newCanvasTop = containerData.height - canvasData.height;
	
	        canvasData.minLeft = Math.min(0, newCanvasLeft);
	        canvasData.minTop = Math.min(0, newCanvasTop);
	        canvasData.maxLeft = Math.max(0, newCanvasLeft);
	        canvasData.maxTop = Math.max(0, newCanvasTop);
	
	        if (cropped && self.limited) {
	          canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
	          canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
	          canvasData.maxLeft = cropBoxData.left;
	          canvasData.maxTop = cropBoxData.top;
	
	          if (viewMode === 2) {
	            if (canvasData.width >= containerData.width) {
	              canvasData.minLeft = Math.min(0, newCanvasLeft);
	              canvasData.maxLeft = Math.max(0, newCanvasLeft);
	            }
	
	            if (canvasData.height >= containerData.height) {
	              canvasData.minTop = Math.min(0, newCanvasTop);
	              canvasData.maxTop = Math.max(0, newCanvasTop);
	            }
	          }
	        }
	      } else {
	        canvasData.minLeft = -canvasData.width;
	        canvasData.minTop = -canvasData.height;
	        canvasData.maxLeft = containerData.width;
	        canvasData.maxTop = containerData.height;
	      }
	    }
	  },
	  renderCanvas: function renderCanvas(changed) {
	    var self = this;
	    var canvasData = self.canvasData;
	    var imageData = self.imageData;
	    var rotate = imageData.rotate;
	    var aspectRatio = void 0;
	    var rotatedData = void 0;
	
	    if (self.rotated) {
	      self.rotated = false;
	
	      // Computes rotated sizes with image sizes
	      rotatedData = $.getRotatedSizes({
	        width: imageData.width,
	        height: imageData.height,
	        degree: rotate
	      });
	
	      aspectRatio = rotatedData.width / rotatedData.height;
	
	      if (aspectRatio !== canvasData.aspectRatio) {
	        canvasData.left -= (rotatedData.width - canvasData.width) / 2;
	        canvasData.top -= (rotatedData.height - canvasData.height) / 2;
	        canvasData.width = rotatedData.width;
	        canvasData.height = rotatedData.height;
	        canvasData.aspectRatio = aspectRatio;
	        canvasData.naturalWidth = imageData.naturalWidth;
	        canvasData.naturalHeight = imageData.naturalHeight;
	
	        // Computes rotated sizes with natural image sizes
	        if (rotate % 180) {
	          rotatedData = $.getRotatedSizes({
	            width: imageData.naturalWidth,
	            height: imageData.naturalHeight,
	            degree: rotate
	          });
	
	          canvasData.naturalWidth = rotatedData.width;
	          canvasData.naturalHeight = rotatedData.height;
	        }
	
	        self.limitCanvas(true, false);
	      }
	    }
	
	    if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
	      canvasData.left = canvasData.oldLeft;
	    }
	
	    if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
	      canvasData.top = canvasData.oldTop;
	    }
	
	    canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
	    canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
	
	    self.limitCanvas(false, true);
	
	    canvasData.oldLeft = canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
	    canvasData.oldTop = canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
	
	    $.setStyle(self.canvas, {
	      width: canvasData.width,
	      height: canvasData.height,
	      left: canvasData.left,
	      top: canvasData.top
	    });
	
	    self.renderImage();
	
	    if (self.cropped && self.limited) {
	      self.limitCropBox(true, true);
	    }
	
	    if (changed) {
	      self.output();
	    }
	  },
	  renderImage: function renderImage(changed) {
	    var self = this;
	    var canvasData = self.canvasData;
	    var imageData = self.imageData;
	    var newImageData = void 0;
	    var reversedData = void 0;
	    var reversedWidth = void 0;
	    var reversedHeight = void 0;
	
	    if (imageData.rotate) {
	      reversedData = $.getRotatedSizes({
	        width: canvasData.width,
	        height: canvasData.height,
	        degree: imageData.rotate,
	        aspectRatio: imageData.aspectRatio
	      }, true);
	
	      reversedWidth = reversedData.width;
	      reversedHeight = reversedData.height;
	
	      newImageData = {
	        width: reversedWidth,
	        height: reversedHeight,
	        left: (canvasData.width - reversedWidth) / 2,
	        top: (canvasData.height - reversedHeight) / 2
	      };
	    }
	
	    $.extend(imageData, newImageData || {
	      width: canvasData.width,
	      height: canvasData.height,
	      left: 0,
	      top: 0
	    });
	
	    var transform = $.getTransform(imageData);
	
	    $.setStyle(self.image, {
	      width: imageData.width,
	      height: imageData.height,
	      marginLeft: imageData.left,
	      marginTop: imageData.top,
	      WebkitTransform: transform,
	      msTransform: transform,
	      transform: transform
	    });
	
	    if (changed) {
	      self.output();
	    }
	  },
	  initCropBox: function initCropBox() {
	    var self = this;
	    var options = self.options;
	    var aspectRatio = options.aspectRatio;
	    var autoCropArea = Number(options.autoCropArea) || 0.8;
	    var canvasData = self.canvasData;
	    var cropBoxData = {
	      width: canvasData.width,
	      height: canvasData.height
	    };
	
	    if (aspectRatio) {
	      if (canvasData.height * aspectRatio > canvasData.width) {
	        cropBoxData.height = cropBoxData.width / aspectRatio;
	      } else {
	        cropBoxData.width = cropBoxData.height * aspectRatio;
	      }
	    }
	
	    self.cropBoxData = cropBoxData;
	    self.limitCropBox(true, true);
	
	    // Initialize auto crop area
	    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
	    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
	
	    // The width/height of auto crop area must large than "minWidth/Height"
	    cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
	    cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
	    cropBoxData.oldLeft = cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
	    cropBoxData.oldTop = cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
	
	    self.initialCropBoxData = $.extend({}, cropBoxData);
	  },
	  limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
	    var self = this;
	    var options = self.options;
	    var aspectRatio = options.aspectRatio;
	    var containerData = self.containerData;
	    var canvasData = self.canvasData;
	    var cropBoxData = self.cropBoxData;
	    var limited = self.limited;
	    var minCropBoxWidth = void 0;
	    var minCropBoxHeight = void 0;
	    var maxCropBoxWidth = void 0;
	    var maxCropBoxHeight = void 0;
	
	    if (sizeLimited) {
	      minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
	      minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
	
	      // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
	      minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
	      minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
	      maxCropBoxWidth = Math.min(containerData.width, limited ? canvasData.width : containerData.width);
	      maxCropBoxHeight = Math.min(containerData.height, limited ? canvasData.height : containerData.height);
	
	      if (aspectRatio) {
	        if (minCropBoxWidth && minCropBoxHeight) {
	          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
	            minCropBoxHeight = minCropBoxWidth / aspectRatio;
	          } else {
	            minCropBoxWidth = minCropBoxHeight * aspectRatio;
	          }
	        } else if (minCropBoxWidth) {
	          minCropBoxHeight = minCropBoxWidth / aspectRatio;
	        } else if (minCropBoxHeight) {
	          minCropBoxWidth = minCropBoxHeight * aspectRatio;
	        }
	
	        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
	          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
	        } else {
	          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
	        }
	      }
	
	      // The minWidth/Height must be less than maxWidth/Height
	      cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
	      cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
	      cropBoxData.maxWidth = maxCropBoxWidth;
	      cropBoxData.maxHeight = maxCropBoxHeight;
	    }
	
	    if (positionLimited) {
	      if (limited) {
	        cropBoxData.minLeft = Math.max(0, canvasData.left);
	        cropBoxData.minTop = Math.max(0, canvasData.top);
	        cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
	        cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
	      } else {
	        cropBoxData.minLeft = 0;
	        cropBoxData.minTop = 0;
	        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
	        cropBoxData.maxTop = containerData.height - cropBoxData.height;
	      }
	    }
	  },
	  renderCropBox: function renderCropBox() {
	    var self = this;
	    var options = self.options;
	    var containerData = self.containerData;
	    var cropBoxData = self.cropBoxData;
	
	    if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
	      cropBoxData.left = cropBoxData.oldLeft;
	    }
	
	    if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
	      cropBoxData.top = cropBoxData.oldTop;
	    }
	
	    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
	    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
	
	    self.limitCropBox(false, true);
	
	    cropBoxData.oldLeft = cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
	    cropBoxData.oldTop = cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
	
	    if (options.movable && options.cropBoxMovable) {
	      // Turn to move the canvas when the crop box is equal to the container
	      $.setData(self.face, 'action', cropBoxData.width === containerData.width && cropBoxData.height === containerData.height ? 'move' : 'all');
	    }
	
	    $.setStyle(self.cropBox, {
	      width: cropBoxData.width,
	      height: cropBoxData.height,
	      left: cropBoxData.left,
	      top: cropBoxData.top
	    });
	
	    if (self.cropped && self.limited) {
	      self.limitCanvas(true, true);
	    }
	
	    if (!self.disabled) {
	      self.output();
	    }
	  },
	  output: function output() {
	    var self = this;
	
	    self.preview();
	
	    if (self.complete) {
	      $.dispatchEvent(self.element, 'crop', self.getData());
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.typeOf = typeOf;
	exports.isNumber = isNumber;
	exports.isUndefined = isUndefined;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.isFunction = isFunction;
	exports.isArray = isArray;
	exports.toArray = toArray;
	exports.trim = trim;
	exports.each = each;
	exports.extend = extend;
	exports.proxy = proxy;
	exports.setStyle = setStyle;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.toggleClass = toggleClass;
	exports.hyphenate = hyphenate;
	exports.getData = getData;
	exports.setData = setData;
	exports.removeData = removeData;
	exports.removeListener = removeListener;
	exports.dispatchEvent = dispatchEvent;
	exports.getEvent = getEvent;
	exports.getOffset = getOffset;
	exports.getTouchesCenter = getTouchesCenter;
	exports.getByTag = getByTag;
	exports.getByClass = getByClass;
	exports.createElement = createElement;
	exports.appendChild = appendChild;
	exports.removeChild = removeChild;
	exports.empty = empty;
	exports.isCrossOriginURL = isCrossOriginURL;
	exports.addTimestamp = addTimestamp;
	exports.getImageSize = getImageSize;
	exports.getTransform = getTransform;
	exports.getRotatedSizes = getRotatedSizes;
	exports.getSourceCanvas = getSourceCanvas;
	exports.getStringFromCharCode = getStringFromCharCode;
	exports.getOrientation = getOrientation;
	exports.dataURLToArrayBuffer = dataURLToArrayBuffer;
	exports.arrayBufferToDataURL = arrayBufferToDataURL;
	// RegExps
	var REGEXP_DATA_URL_HEAD = /^data:([^;]+);base64,/;
	var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
	var REGEXP_ORIGINS = /^(https?:)\/\/([^:\/\?#]+):?(\d*)/i;
	var REGEXP_SPACES = /\s+/;
	var REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
	var REGEXP_TRIM = /^\s+(.*)\s+$/;
	var REGEXP_USERAGENT = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;
	var navigator = window.navigator;
	var IS_SAFARI_OR_UIWEBVIEW = navigator && REGEXP_USERAGENT.test(navigator.userAgent);
	
	// Utilities
	var objectProto = Object.prototype;
	var toString = objectProto.toString;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var slice = Array.prototype.slice;
	var fromCharCode = String.fromCharCode;
	
	function typeOf(obj) {
	  return toString.call(obj).slice(8, -1).toLowerCase();
	}
	
	function isNumber(num) {
	  return typeof num === 'number' && !isNaN(num);
	}
	
	function isUndefined(obj) {
	  return typeof obj === 'undefined';
	}
	
	function isObject(obj) {
	  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
	}
	
	function isPlainObject(obj) {
	  if (!isObject(obj)) {
	    return false;
	  }
	
	  try {
	    var _constructor = obj.constructor;
	    var prototype = _constructor.prototype;
	
	    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
	  } catch (e) {
	    return false;
	  }
	}
	
	function isFunction(fn) {
	  return typeOf(fn) === 'function';
	}
	
	function isArray(arr) {
	  return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
	}
	
	function toArray(obj, offset) {
	  offset = offset >= 0 ? offset : 0;
	
	  if (Array.from) {
	    return Array.from(obj).slice(offset);
	  }
	
	  return slice.call(obj, offset);
	}
	
	function trim(str) {
	  if (typeof str === 'string') {
	    str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '$1');
	  }
	
	  return str;
	}
	
	function each(obj, callback) {
	  if (obj && isFunction(callback)) {
	    var i = void 0;
	
	    if (isArray(obj) || isNumber(obj.length) /* array-like */) {
	        var length = obj.length;
	
	        for (i = 0; i < length; i++) {
	          if (callback.call(obj, obj[i], i, obj) === false) {
	            break;
	          }
	        }
	      } else if (isObject(obj)) {
	      Object.keys(obj).forEach(function (key) {
	        callback.call(obj, obj[key], key, obj);
	      });
	    }
	  }
	
	  return obj;
	}
	
	function extend() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var deep = args[0] === true;
	  var data = deep ? args[1] : args[0];
	
	  if (args.length > 1) {
	    // if (Object.assign) {
	    //   return Object.assign.apply(Object, args);
	    // }
	
	    args.shift();
	
	    args.forEach(function (arg) {
	      if (isObject(arg)) {
	        Object.keys(arg).forEach(function (key) {
	          if (deep && isObject(data[key])) {
	            extend(true, data[key], arg[key]);
	          } else {
	            data[key] = arg[key];
	          }
	        });
	      }
	    });
	  }
	
	  return data;
	}
	
	function proxy(fn, context) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	    args[_key2 - 2] = arguments[_key2];
	  }
	
	  return function () {
	    for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args2[_key3] = arguments[_key3];
	    }
	
	    return fn.apply(context, args.concat(args2));
	  };
	}
	
	function setStyle(element, styles) {
	  var style = element.style;
	
	  each(styles, function (value, property) {
	    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
	      value += 'px';
	    }
	
	    style[property] = value;
	  });
	}
	
	function hasClass(element, value) {
	  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
	}
	
	function addClass(element, value) {
	  if (isNumber(element.length)) {
	    each(element, function (elem) {
	      addClass(elem, value);
	    });
	    return;
	  }
	
	  if (element.classList) {
	    element.classList.add(value);
	    return;
	  }
	
	  var className = trim(element.className);
	
	  if (!className) {
	    element.className = value;
	  } else if (className.indexOf(value) < 0) {
	    element.className = className + ' ' + value;
	  }
	}
	
	function removeClass(element, value) {
	  if (isNumber(element.length)) {
	    each(element, function (elem) {
	      removeClass(elem, value);
	    });
	    return;
	  }
	
	  if (element.classList) {
	    element.classList.remove(value);
	    return;
	  }
	
	  if (element.className.indexOf(value) >= 0) {
	    element.className = element.className.replace(value, '');
	  }
	}
	
	function toggleClass(element, value, added) {
	  if (isNumber(element.length)) {
	    each(element, function (elem) {
	      toggleClass(elem, value, added);
	    });
	    return;
	  }
	
	  // IE10-11 doesn't support the second parameter of `classList.toggle`
	  if (added) {
	    addClass(element, value);
	  } else {
	    removeClass(element, value);
	  }
	}
	
	function hyphenate(str) {
	  return str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
	}
	
	function getData(element, name) {
	  if (isObject(element[name])) {
	    return element[name];
	  } else if (element.dataset) {
	    return element.dataset[name];
	  }
	
	  return element.getAttribute('data-' + hyphenate(name));
	}
	
	function setData(element, name, data) {
	  if (isObject(data)) {
	    element[name] = data;
	  } else if (element.dataset) {
	    element.dataset[name] = data;
	  } else {
	    element.setAttribute('data-' + hyphenate(name), data);
	  }
	}
	
	function removeData(element, name) {
	  if (isObject(element[name])) {
	    delete element[name];
	  } else if (element.dataset) {
	    delete element.dataset[name];
	  } else {
	    element.removeAttribute('data-' + hyphenate(name));
	  }
	}
	
	function removeListener(element, type, handler) {
	  var types = trim(type).split(REGEXP_SPACES);
	
	  if (types.length > 1) {
	    each(types, function (t) {
	      removeListener(element, t, handler);
	    });
	    return;
	  }
	
	  if (element.removeEventListener) {
	    element.removeEventListener(type, handler, false);
	  } else if (element.detachEvent) {
	    element.detachEvent('on' + type, handler);
	  }
	}
	
	function addListener(element, type, _handler, once) {
	  var types = trim(type).split(REGEXP_SPACES);
	  var originalHandler = _handler;
	
	  if (types.length > 1) {
	    each(types, function (t) {
	      addListener(element, t, _handler);
	    });
	    return;
	  }
	
	  if (once) {
	    _handler = function handler() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      removeListener(element, type, _handler);
	
	      return originalHandler.apply(element, args);
	    };
	  }
	
	  if (element.addEventListener) {
	    element.addEventListener(type, _handler, false);
	  } else if (element.attachEvent) {
	    element.attachEvent('on${type}', _handler);
	  }
	}
	
	exports.addListener = addListener;
	function dispatchEvent(element, type, data) {
	  if (element.dispatchEvent) {
	    var event = void 0;
	
	    // Event and CustomEvent on IE9-11 are global objects, not constructors
	    if (isFunction(Event) && isFunction(CustomEvent)) {
	      if (isUndefined(data)) {
	        event = new Event(type, {
	          bubbles: true,
	          cancelable: true
	        });
	      } else {
	        event = new CustomEvent(type, {
	          detail: data,
	          bubbles: true,
	          cancelable: true
	        });
	      }
	    } else if (isUndefined(data)) {
	      event = document.createEvent('Event');
	      event.initEvent(type, true, true);
	    } else {
	      event = document.createEvent('CustomEvent');
	      event.initCustomEvent(type, true, true, data);
	    }
	
	    // IE9+
	    return element.dispatchEvent(event);
	  } else if (element.fireEvent) {
	    // IE6-10 (native events only)
	    return element.fireEvent('on' + type);
	  }
	
	  return true;
	}
	
	function getEvent(event) {
	  var e = event || window.event;
	
	  // Fix target property (IE8)
	  if (!e.target) {
	    e.target = e.srcElement || document;
	  }
	
	  if (!isNumber(e.pageX) && isNumber(e.clientX)) {
	    var eventDoc = event.target.ownerDocument || document;
	    var doc = eventDoc.documentElement;
	    var body = eventDoc.body;
	
	    e.pageX = e.clientX + ((doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
	    e.pageY = e.clientY + ((doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0));
	  }
	
	  return e;
	}
	
	function getOffset(element) {
	  var doc = document.documentElement;
	  var box = element.getBoundingClientRect();
	
	  return {
	    left: box.left + ((window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0)),
	    top: box.top + ((window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0))
	  };
	}
	
	function getTouchesCenter(touches) {
	  var length = touches.length;
	  var pageX = 0;
	  var pageY = 0;
	
	  if (length) {
	    each(touches, function (touch) {
	      pageX += touch.pageX;
	      pageY += touch.pageY;
	    });
	
	    pageX /= length;
	    pageY /= length;
	  }
	
	  return {
	    pageX: pageX,
	    pageY: pageY
	  };
	}
	
	function getByTag(element, tagName) {
	  return element.getElementsByTagName(tagName);
	}
	
	function getByClass(element, className) {
	  return element.getElementsByClassName ? element.getElementsByClassName(className) : element.querySelectorAll('.' + className);
	}
	
	function createElement(tagName) {
	  return document.createElement(tagName);
	}
	
	function appendChild(element, elem) {
	  element.appendChild(elem);
	}
	
	function removeChild(element) {
	  if (element.parentNode) {
	    element.parentNode.removeChild(element);
	  }
	}
	
	function empty(element) {
	  while (element.firstChild) {
	    element.removeChild(element.firstChild);
	  }
	}
	
	function isCrossOriginURL(url) {
	  var parts = url.match(REGEXP_ORIGINS);
	
	  return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
	}
	
	function addTimestamp(url) {
	  var timestamp = 'timestamp=' + new Date().getTime();
	
	  return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
	}
	
	function getImageSize(image, callback) {
	  // Modern browsers (ignore Safari)
	  if (image.naturalWidth && !IS_SAFARI_OR_UIWEBVIEW) {
	    callback(image.naturalWidth, image.naturalHeight);
	    return;
	  }
	
	  // IE8: Don't use `new Image()` here
	  var newImage = createElement('img');
	
	  newImage.onload = function load() {
	    callback(this.width, this.height);
	  };
	
	  newImage.src = image.src;
	}
	
	function getTransform(data) {
	  var transforms = [];
	  var rotate = data.rotate;
	  var scaleX = data.scaleX;
	  var scaleY = data.scaleY;
	
	  // Rotate should come first before scale to match orientation transform
	  if (isNumber(rotate) && rotate !== 0) {
	    transforms.push('rotate(' + rotate + 'deg)');
	  }
	
	  if (isNumber(scaleX) && scaleX !== 1) {
	    transforms.push('scaleX(' + scaleX + ')');
	  }
	
	  if (isNumber(scaleY) && scaleY !== 1) {
	    transforms.push('scaleY(' + scaleY + ')');
	  }
	
	  return transforms.length ? transforms.join(' ') : 'none';
	}
	
	function getRotatedSizes(data, reversed) {
	  var deg = Math.abs(data.degree) % 180;
	  var arc = (deg > 90 ? 180 - deg : deg) * Math.PI / 180;
	  var sinArc = Math.sin(arc);
	  var cosArc = Math.cos(arc);
	  var width = data.width;
	  var height = data.height;
	  var aspectRatio = data.aspectRatio;
	  var newWidth = void 0;
	  var newHeight = void 0;
	
	  if (!reversed) {
	    newWidth = width * cosArc + height * sinArc;
	    newHeight = width * sinArc + height * cosArc;
	  } else {
	    newWidth = width / (cosArc + sinArc / aspectRatio);
	    newHeight = newWidth / aspectRatio;
	  }
	
	  return {
	    width: newWidth,
	    height: newHeight
	  };
	}
	
	function getSourceCanvas(image, data) {
	  var canvas = createElement('canvas');
	  var context = canvas.getContext('2d');
	  var dstX = 0;
	  var dstY = 0;
	  var dstWidth = data.naturalWidth;
	  var dstHeight = data.naturalHeight;
	  var rotate = data.rotate;
	  var scaleX = data.scaleX;
	  var scaleY = data.scaleY;
	  var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
	  var rotatable = isNumber(rotate) && rotate !== 0;
	  var advanced = rotatable || scalable;
	  var canvasWidth = dstWidth * Math.abs(scaleX);
	  var canvasHeight = dstHeight * Math.abs(scaleY);
	  var translateX = void 0;
	  var translateY = void 0;
	  var rotated = void 0;
	
	  if (scalable) {
	    translateX = canvasWidth / 2;
	    translateY = canvasHeight / 2;
	  }
	
	  if (rotatable) {
	    rotated = getRotatedSizes({
	      width: canvasWidth,
	      height: canvasHeight,
	      degree: rotate
	    });
	
	    canvasWidth = rotated.width;
	    canvasHeight = rotated.height;
	    translateX = canvasWidth / 2;
	    translateY = canvasHeight / 2;
	  }
	
	  canvas.width = canvasWidth;
	  canvas.height = canvasHeight;
	
	  if (advanced) {
	    dstX = -dstWidth / 2;
	    dstY = -dstHeight / 2;
	
	    context.save();
	    context.translate(translateX, translateY);
	  }
	
	  // Rotate should come first before scale as in the "getTransform" function
	  if (rotatable) {
	    context.rotate(rotate * Math.PI / 180);
	  }
	
	  if (scalable) {
	    context.scale(scaleX, scaleY);
	  }
	
	  context.drawImage(image, Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
	
	  if (advanced) {
	    context.restore();
	  }
	
	  return canvas;
	}
	
	function getStringFromCharCode(dataView, start, length) {
	  var str = '';
	  var i = start;
	
	  for (length += start; i < length; i++) {
	    str += fromCharCode(dataView.getUint8(i));
	  }
	
	  return str;
	}
	
	function getOrientation(arrayBuffer) {
	  var dataView = new DataView(arrayBuffer);
	  var length = dataView.byteLength;
	  var orientation = void 0;
	  var exifIDCode = void 0;
	  var tiffOffset = void 0;
	  var firstIFDOffset = void 0;
	  var littleEndian = void 0;
	  var endianness = void 0;
	  var app1Start = void 0;
	  var ifdStart = void 0;
	  var offset = void 0;
	  var i = void 0;
	
	  // Only handle JPEG image (start by 0xFFD8)
	  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
	    offset = 2;
	
	    while (offset < length) {
	      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
	        app1Start = offset;
	        break;
	      }
	
	      offset++;
	    }
	  }
	
	  if (app1Start) {
	    exifIDCode = app1Start + 4;
	    tiffOffset = app1Start + 10;
	
	    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
	      endianness = dataView.getUint16(tiffOffset);
	      littleEndian = endianness === 0x4949;
	
	      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
	          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
	            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
	
	            if (firstIFDOffset >= 0x00000008) {
	              ifdStart = tiffOffset + firstIFDOffset;
	            }
	          }
	        }
	    }
	  }
	
	  if (ifdStart) {
	    length = dataView.getUint16(ifdStart, littleEndian);
	
	    for (i = 0; i < length; i++) {
	      offset = ifdStart + i * 12 + 2;
	
	      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
	          // 8 is the offset of the current tag's value
	          offset += 8;
	
	          // Get the original orientation value
	          orientation = dataView.getUint16(offset, littleEndian);
	
	          // Override the orientation with its default value for Safari
	          if (IS_SAFARI_OR_UIWEBVIEW) {
	            dataView.setUint16(offset, 1, littleEndian);
	          }
	
	          break;
	        }
	    }
	  }
	
	  return orientation;
	}
	
	function dataURLToArrayBuffer(dataURL) {
	  var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
	  var binary = atob(base64);
	  var length = binary.length;
	  var arrayBuffer = new ArrayBuffer(length);
	  var dataView = new Uint8Array(arrayBuffer);
	  var i = void 0;
	
	  for (i = 0; i < length; i++) {
	    dataView[i] = binary.charCodeAt(i);
	  }
	
	  return arrayBuffer;
	}
	
	// Only available for JPEG image
	function arrayBufferToDataURL(arrayBuffer) {
	  var dataView = new Uint8Array(arrayBuffer);
	  var length = dataView.length;
	  var base64 = '';
	  var i = void 0;
	
	  for (i = 0; i < length; i++) {
	    base64 += fromCharCode(dataView[i]);
	  }
	
	  return 'data:image/jpeg;base64,' + btoa(base64);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var DATA_PREVIEW = 'preview';
	
	exports.default = {
	  initPreview: function initPreview() {
	    var self = this;
	    var preview = self.options.preview;
	    var image = $.createElement('img');
	    var crossOrigin = self.crossOrigin;
	    var url = crossOrigin ? self.crossOriginUrl : self.url;
	
	    if (crossOrigin) {
	      image.crossOrigin = crossOrigin;
	    }
	
	    image.src = url;
	    $.appendChild(self.viewBox, image);
	    self.image2 = image;
	
	    if (!preview) {
	      return;
	    }
	
	    var previews = document.querySelectorAll(preview);
	
	    self.previews = previews;
	
	    $.each(previews, function (element) {
	      var img = $.createElement('img');
	
	      // Save the original size for recover
	      $.setData(element, DATA_PREVIEW, {
	        width: element.offsetWidth,
	        height: element.offsetHeight,
	        html: element.innerHTML
	      });
	
	      if (crossOrigin) {
	        img.crossOrigin = crossOrigin;
	      }
	
	      img.src = url;
	
	      /**
	       * Override img element styles
	       * Add `display:block` to avoid margin top issue
	       * Add `height:auto` to override `height` attribute on IE8
	       * (Occur only when margin-top <= -height)
	       */
	
	      img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
	
	      $.empty(element);
	      $.appendChild(element, img);
	    });
	  },
	  resetPreview: function resetPreview() {
	    $.each(this.previews, function (element) {
	      var data = $.getData(element, DATA_PREVIEW);
	
	      $.setStyle(element, {
	        width: data.width,
	        height: data.height
	      });
	
	      element.innerHTML = data.html;
	      $.removeData(element, DATA_PREVIEW);
	    });
	  },
	  preview: function preview() {
	    var self = this;
	    var imageData = self.imageData;
	    var canvasData = self.canvasData;
	    var cropBoxData = self.cropBoxData;
	    var cropBoxWidth = cropBoxData.width;
	    var cropBoxHeight = cropBoxData.height;
	    var width = imageData.width;
	    var height = imageData.height;
	    var left = cropBoxData.left - canvasData.left - imageData.left;
	    var top = cropBoxData.top - canvasData.top - imageData.top;
	    var transform = $.getTransform(imageData);
	    var transforms = {
	      WebkitTransform: transform,
	      msTransform: transform,
	      transform: transform
	    };
	
	    if (!self.cropped || self.disabled) {
	      return;
	    }
	
	    $.setStyle(self.image2, $.extend({
	      width: width,
	      height: height,
	      marginLeft: -left,
	      marginTop: -top
	    }, transforms));
	
	    $.each(self.previews, function (element) {
	      var data = $.getData(element, DATA_PREVIEW);
	      var originalWidth = data.width;
	      var originalHeight = data.height;
	      var newWidth = originalWidth;
	      var newHeight = originalHeight;
	      var ratio = 1;
	
	      if (cropBoxWidth) {
	        ratio = originalWidth / cropBoxWidth;
	        newHeight = cropBoxHeight * ratio;
	      }
	
	      if (cropBoxHeight && newHeight > originalHeight) {
	        ratio = originalHeight / cropBoxHeight;
	        newWidth = cropBoxWidth * ratio;
	        newHeight = originalHeight;
	      }
	
	      $.setStyle(element, {
	        width: newWidth,
	        height: newHeight
	      });
	
	      $.setStyle($.getByTag(element, 'img')[0], $.extend({
	        width: width * ratio,
	        height: height * ratio,
	        marginLeft: -left * ratio,
	        marginTop: -top * ratio
	      }, transforms));
	    });
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// Events
	var EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
	var EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
	var EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel' + ' MSPointerUp MSPointerCancel';
	var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
	var EVENT_DBLCLICK = 'dblclick';
	var EVENT_RESIZE = 'resize';
	var EVENT_CROP_START = 'cropstart';
	var EVENT_CROP_MOVE = 'cropmove';
	var EVENT_CROP_END = 'cropend';
	var EVENT_CROP = 'crop';
	var EVENT_ZOOM = 'zoom';
	
	exports.default = {
	  bind: function bind() {
	    var self = this;
	    var options = self.options;
	    var element = self.element;
	    var cropper = self.cropper;
	
	    if ($.isFunction(options.cropstart)) {
	      $.addListener(element, EVENT_CROP_START, options.cropstart);
	    }
	
	    if ($.isFunction(options.cropmove)) {
	      $.addListener(element, EVENT_CROP_MOVE, options.cropmove);
	    }
	
	    if ($.isFunction(options.cropend)) {
	      $.addListener(element, EVENT_CROP_END, options.cropend);
	    }
	
	    if ($.isFunction(options.crop)) {
	      $.addListener(element, EVENT_CROP, options.crop);
	    }
	
	    if ($.isFunction(options.zoom)) {
	      $.addListener(element, EVENT_ZOOM, options.zoom);
	    }
	
	    $.addListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart = $.proxy(self.cropStart, self));
	
	    if (options.zoomable && options.zoomOnWheel) {
	      $.addListener(cropper, EVENT_WHEEL, self.onWheel = $.proxy(self.wheel, self));
	    }
	
	    if (options.toggleDragModeOnDblclick) {
	      $.addListener(cropper, EVENT_DBLCLICK, self.onDblclick = $.proxy(self.dblclick, self));
	    }
	
	    $.addListener(document, EVENT_MOUSE_MOVE, self.onCropMove = $.proxy(self.cropMove, self));
	    $.addListener(document, EVENT_MOUSE_UP, self.onCropEnd = $.proxy(self.cropEnd, self));
	
	    if (options.responsive) {
	      $.addListener(window, EVENT_RESIZE, self.onResize = $.proxy(self.resize, self));
	    }
	  },
	  unbind: function unbind() {
	    var self = this;
	    var options = self.options;
	    var element = self.element;
	    var cropper = self.cropper;
	
	    if ($.isFunction(options.cropstart)) {
	      $.removeListener(element, EVENT_CROP_START, options.cropstart);
	    }
	
	    if ($.isFunction(options.cropmove)) {
	      $.removeListener(element, EVENT_CROP_MOVE, options.cropmove);
	    }
	
	    if ($.isFunction(options.cropend)) {
	      $.removeListener(element, EVENT_CROP_END, options.cropend);
	    }
	
	    if ($.isFunction(options.crop)) {
	      $.removeListener(element, EVENT_CROP, options.crop);
	    }
	
	    if ($.isFunction(options.zoom)) {
	      $.removeListener(element, EVENT_ZOOM, options.zoom);
	    }
	
	    $.removeListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart);
	
	    if (options.zoomable && options.zoomOnWheel) {
	      $.removeListener(cropper, EVENT_WHEEL, self.onWheel);
	    }
	
	    if (options.toggleDragModeOnDblclick) {
	      $.removeListener(cropper, EVENT_DBLCLICK, self.onDblclick);
	    }
	
	    $.removeListener(document, EVENT_MOUSE_MOVE, self.onCropMove);
	    $.removeListener(document, EVENT_MOUSE_UP, self.onCropEnd);
	
	    if (options.responsive) {
	      $.removeListener(window, EVENT_RESIZE, self.onResize);
	    }
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REGEXP_ACTIONS = undefined;
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var REGEXP_ACTIONS = exports.REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;
	
	exports.default = {
	  resize: function resize() {
	    var self = this;
	    var restore = self.options.restore;
	    var container = self.container;
	    var containerData = self.containerData;
	
	    // Check `container` is necessary for IE8
	    if (self.disabled || !containerData) {
	      return;
	    }
	
	    var ratio = container.offsetWidth / containerData.width;
	    var canvasData = void 0;
	    var cropBoxData = void 0;
	
	    // Resize when width changed or height changed
	    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
	      if (restore) {
	        canvasData = self.getCanvasData();
	        cropBoxData = self.getCropBoxData();
	      }
	
	      self.render();
	
	      if (restore) {
	        self.setCanvasData($.each(canvasData, function (n, i) {
	          canvasData[i] = n * ratio;
	        }));
	        self.setCropBoxData($.each(cropBoxData, function (n, i) {
	          cropBoxData[i] = n * ratio;
	        }));
	      }
	    }
	  },
	  dblclick: function dblclick() {
	    var self = this;
	
	    if (self.disabled) {
	      return;
	    }
	
	    self.setDragMode($.hasClass(self.dragBox, 'cropper-crop') ? 'move' : 'crop');
	  },
	  wheel: function wheel(event) {
	    var self = this;
	    var e = $.getEvent(event);
	    var ratio = Number(self.options.wheelZoomRatio) || 0.1;
	    var delta = 1;
	
	    if (self.disabled) {
	      return;
	    }
	
	    e.preventDefault();
	
	    // Limit wheel speed to prevent zoom too fast (#21)
	    if (self.wheeling) {
	      return;
	    }
	
	    self.wheeling = true;
	
	    setTimeout(function () {
	      self.wheeling = false;
	    }, 50);
	
	    if (e.deltaY) {
	      delta = e.deltaY > 0 ? 1 : -1;
	    } else if (e.wheelDelta) {
	      delta = -e.wheelDelta / 120;
	    } else if (e.detail) {
	      delta = e.detail > 0 ? 1 : -1;
	    }
	
	    self.zoom(-delta * ratio, e);
	  },
	  cropStart: function cropStart(event) {
	    var self = this;
	    var options = self.options;
	    var e = $.getEvent(event);
	    var touches = e.touches;
	    var touchesLength = void 0;
	    var touch = void 0;
	    var action = void 0;
	
	    if (self.disabled) {
	      return;
	    }
	
	    if (touches) {
	      touchesLength = touches.length;
	
	      if (touchesLength > 1) {
	        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
	          touch = touches[1];
	          self.startX2 = touch.pageX;
	          self.startY2 = touch.pageY;
	          action = 'zoom';
	        } else {
	          return;
	        }
	      }
	
	      touch = touches[0];
	    }
	
	    action = action || $.getData(e.target, 'action');
	
	    if (REGEXP_ACTIONS.test(action)) {
	      if ($.dispatchEvent(self.element, 'cropstart', {
	        originalEvent: e,
	        action: action
	      }) === false) {
	        return;
	      }
	
	      e.preventDefault();
	
	      self.action = action;
	      self.cropping = false;
	
	      self.startX = touch ? touch.pageX : e.pageX;
	      self.startY = touch ? touch.pageY : e.pageY;
	
	      if (action === 'crop') {
	        self.cropping = true;
	        $.addClass(self.dragBox, 'cropper-modal');
	      }
	    }
	  },
	  cropMove: function cropMove(event) {
	    var self = this;
	    var options = self.options;
	    var e = $.getEvent(event);
	    var touches = e.touches;
	    var action = self.action;
	    var touchesLength = void 0;
	    var touch = void 0;
	
	    if (self.disabled) {
	      return;
	    }
	
	    if (touches) {
	      touchesLength = touches.length;
	
	      if (touchesLength > 1) {
	        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
	          touch = touches[1];
	          self.endX2 = touch.pageX;
	          self.endY2 = touch.pageY;
	        } else {
	          return;
	        }
	      }
	
	      touch = touches[0];
	    }
	
	    if (action) {
	      if ($.dispatchEvent(self.element, 'cropmove', {
	        originalEvent: e,
	        action: action
	      }) === false) {
	        return;
	      }
	
	      e.preventDefault();
	
	      self.endX = touch ? touch.pageX : e.pageX;
	      self.endY = touch ? touch.pageY : e.pageY;
	
	      self.change(e.shiftKey, action === 'zoom' ? e : null);
	    }
	  },
	  cropEnd: function cropEnd(event) {
	    var self = this;
	    var options = self.options;
	    var e = $.getEvent(event);
	    var action = self.action;
	
	    if (self.disabled) {
	      return;
	    }
	
	    if (action) {
	      e.preventDefault();
	
	      if (self.cropping) {
	        self.cropping = false;
	        $.toggleClass(self.dragBox, 'cropper-modal', self.cropped && options.modal);
	      }
	
	      self.action = '';
	
	      $.dispatchEvent(self.element, 'cropend', {
	        originalEvent: e,
	        action: action
	      });
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// Actions
	var ACTION_EAST = 'e';
	var ACTION_WEST = 'w';
	var ACTION_SOUTH = 's';
	var ACTION_NORTH = 'n';
	var ACTION_SOUTH_EAST = 'se';
	var ACTION_SOUTH_WEST = 'sw';
	var ACTION_NORTH_EAST = 'ne';
	var ACTION_NORTH_WEST = 'nw';
	
	exports.default = {
	  change: function change(shiftKey, originalEvent) {
	    var self = this;
	    var options = self.options;
	    var containerData = self.containerData;
	    var canvasData = self.canvasData;
	    var cropBoxData = self.cropBoxData;
	    var aspectRatio = options.aspectRatio;
	    var action = self.action;
	    var width = cropBoxData.width;
	    var height = cropBoxData.height;
	    var left = cropBoxData.left;
	    var top = cropBoxData.top;
	    var right = left + width;
	    var bottom = top + height;
	    var minLeft = 0;
	    var minTop = 0;
	    var maxWidth = containerData.width;
	    var maxHeight = containerData.height;
	    var renderable = true;
	    var offset = void 0;
	
	    // Locking aspect ratio in "free mode" by holding shift key
	    if (!aspectRatio && shiftKey) {
	      aspectRatio = width && height ? width / height : 1;
	    }
	
	    if (self.limited) {
	      minLeft = cropBoxData.minLeft;
	      minTop = cropBoxData.minTop;
	      maxWidth = minLeft + Math.min(containerData.width, canvasData.left + canvasData.width);
	      maxHeight = minTop + Math.min(containerData.height, canvasData.top + canvasData.height);
	    }
	
	    var range = {
	      x: self.endX - self.startX,
	      y: self.endY - self.startY
	    };
	
	    if (aspectRatio) {
	      range.X = range.y * aspectRatio;
	      range.Y = range.x / aspectRatio;
	    }
	
	    switch (action) {
	      // Move crop box
	      case 'all':
	        left += range.x;
	        top += range.y;
	        break;
	
	      // Resize crop box
	      case ACTION_EAST:
	        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
	          renderable = false;
	          break;
	        }
	
	        width += range.x;
	
	        if (aspectRatio) {
	          height = width / aspectRatio;
	          top -= range.Y / 2;
	        }
	
	        if (width < 0) {
	          action = ACTION_WEST;
	          width = 0;
	        }
	
	        break;
	
	      case ACTION_NORTH:
	        if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
	          renderable = false;
	          break;
	        }
	
	        height -= range.y;
	        top += range.y;
	
	        if (aspectRatio) {
	          width = height * aspectRatio;
	          left += range.X / 2;
	        }
	
	        if (height < 0) {
	          action = ACTION_SOUTH;
	          height = 0;
	        }
	
	        break;
	
	      case ACTION_WEST:
	        if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
	          renderable = false;
	          break;
	        }
	
	        width -= range.x;
	        left += range.x;
	
	        if (aspectRatio) {
	          height = width / aspectRatio;
	          top += range.Y / 2;
	        }
	
	        if (width < 0) {
	          action = ACTION_EAST;
	          width = 0;
	        }
	
	        break;
	
	      case ACTION_SOUTH:
	        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
	          renderable = false;
	          break;
	        }
	
	        height += range.y;
	
	        if (aspectRatio) {
	          width = height * aspectRatio;
	          left -= range.X / 2;
	        }
	
	        if (height < 0) {
	          action = ACTION_NORTH;
	          height = 0;
	        }
	
	        break;
	
	      case ACTION_NORTH_EAST:
	        if (aspectRatio) {
	          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
	            renderable = false;
	            break;
	          }
	
	          height -= range.y;
	          top += range.y;
	          width = height * aspectRatio;
	        } else {
	          if (range.x >= 0) {
	            if (right < maxWidth) {
	              width += range.x;
	            } else if (range.y <= 0 && top <= minTop) {
	              renderable = false;
	            }
	          } else {
	            width += range.x;
	          }
	
	          if (range.y <= 0) {
	            if (top > minTop) {
	              height -= range.y;
	              top += range.y;
	            }
	          } else {
	            height -= range.y;
	            top += range.y;
	          }
	        }
	
	        if (width < 0 && height < 0) {
	          action = ACTION_SOUTH_WEST;
	          height = 0;
	          width = 0;
	        } else if (width < 0) {
	          action = ACTION_NORTH_WEST;
	          width = 0;
	        } else if (height < 0) {
	          action = ACTION_SOUTH_EAST;
	          height = 0;
	        }
	
	        break;
	
	      case ACTION_NORTH_WEST:
	        if (aspectRatio) {
	          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
	            renderable = false;
	            break;
	          }
	
	          height -= range.y;
	          top += range.y;
	          width = height * aspectRatio;
	          left += range.X;
	        } else {
	          if (range.x <= 0) {
	            if (left > minLeft) {
	              width -= range.x;
	              left += range.x;
	            } else if (range.y <= 0 && top <= minTop) {
	              renderable = false;
	            }
	          } else {
	            width -= range.x;
	            left += range.x;
	          }
	
	          if (range.y <= 0) {
	            if (top > minTop) {
	              height -= range.y;
	              top += range.y;
	            }
	          } else {
	            height -= range.y;
	            top += range.y;
	          }
	        }
	
	        if (width < 0 && height < 0) {
	          action = ACTION_SOUTH_EAST;
	          height = 0;
	          width = 0;
	        } else if (width < 0) {
	          action = ACTION_NORTH_EAST;
	          width = 0;
	        } else if (height < 0) {
	          action = ACTION_SOUTH_WEST;
	          height = 0;
	        }
	
	        break;
	
	      case ACTION_SOUTH_WEST:
	        if (aspectRatio) {
	          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
	            renderable = false;
	            break;
	          }
	
	          width -= range.x;
	          left += range.x;
	          height = width / aspectRatio;
	        } else {
	          if (range.x <= 0) {
	            if (left > minLeft) {
	              width -= range.x;
	              left += range.x;
	            } else if (range.y >= 0 && bottom >= maxHeight) {
	              renderable = false;
	            }
	          } else {
	            width -= range.x;
	            left += range.x;
	          }
	
	          if (range.y >= 0) {
	            if (bottom < maxHeight) {
	              height += range.y;
	            }
	          } else {
	            height += range.y;
	          }
	        }
	
	        if (width < 0 && height < 0) {
	          action = ACTION_NORTH_EAST;
	          height = 0;
	          width = 0;
	        } else if (width < 0) {
	          action = ACTION_SOUTH_EAST;
	          width = 0;
	        } else if (height < 0) {
	          action = ACTION_NORTH_WEST;
	          height = 0;
	        }
	
	        break;
	
	      case ACTION_SOUTH_EAST:
	        if (aspectRatio) {
	          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
	            renderable = false;
	            break;
	          }
	
	          width += range.x;
	          height = width / aspectRatio;
	        } else {
	          if (range.x >= 0) {
	            if (right < maxWidth) {
	              width += range.x;
	            } else if (range.y >= 0 && bottom >= maxHeight) {
	              renderable = false;
	            }
	          } else {
	            width += range.x;
	          }
	
	          if (range.y >= 0) {
	            if (bottom < maxHeight) {
	              height += range.y;
	            }
	          } else {
	            height += range.y;
	          }
	        }
	
	        if (width < 0 && height < 0) {
	          action = ACTION_NORTH_WEST;
	          height = 0;
	          width = 0;
	        } else if (width < 0) {
	          action = ACTION_SOUTH_WEST;
	          width = 0;
	        } else if (height < 0) {
	          action = ACTION_NORTH_EAST;
	          height = 0;
	        }
	
	        break;
	
	      // Move canvas
	      case 'move':
	        self.move(range.x, range.y);
	        renderable = false;
	        break;
	
	      // Zoom canvas
	      case 'zoom':
	        self.zoom(function (x1, y1, x2, y2) {
	          var z1 = Math.sqrt(x1 * x1 + y1 * y1);
	          var z2 = Math.sqrt(x2 * x2 + y2 * y2);
	
	          return (z2 - z1) / z1;
	        }(Math.abs(self.startX - self.startX2), Math.abs(self.startY - self.startY2), Math.abs(self.endX - self.endX2), Math.abs(self.endY - self.endY2)), originalEvent);
	        self.startX2 = self.endX2;
	        self.startY2 = self.endY2;
	        renderable = false;
	        break;
	
	      // Create crop box
	      case 'crop':
	        if (!range.x || !range.y) {
	          renderable = false;
	          break;
	        }
	
	        offset = $.getOffset(self.cropper);
	        left = self.startX - offset.left;
	        top = self.startY - offset.top;
	        width = cropBoxData.minWidth;
	        height = cropBoxData.minHeight;
	
	        if (range.x > 0) {
	          action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
	        } else if (range.x < 0) {
	          left -= width;
	          action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
	        }
	
	        if (range.y < 0) {
	          top -= height;
	        }
	
	        // Show the crop box if is hidden
	        if (!self.cropped) {
	          $.removeClass(self.cropBox, 'cropper-hidden');
	          self.cropped = true;
	
	          if (self.limited) {
	            self.limitCropBox(true, true);
	          }
	        }
	
	        break;
	
	      // No default
	    }
	
	    if (renderable) {
	      cropBoxData.width = width;
	      cropBoxData.height = height;
	      cropBoxData.left = left;
	      cropBoxData.top = top;
	      self.action = action;
	
	      self.renderCropBox();
	    }
	
	    // Override
	    self.startX = self.endX;
	    self.startY = self.endY;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(4);
	
	var $ = _interopRequireWildcard(_utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  // Show the crop box manually
	  crop: function crop() {
	    var self = this;
	
	    if (self.ready && !self.disabled) {
	      if (!self.cropped) {
	        self.cropped = true;
	        self.limitCropBox(true, true);
	
	        if (self.options.modal) {
	          $.addClass(self.dragBox, 'cropper-modal');
	        }
	
	        $.removeClass(self.cropBox, 'cropper-hidden');
	      }
	
	      self.setCropBoxData(self.initialCropBoxData);
	    }
	
	    return self;
	  },
	
	
	  // Reset the image and crop box to their initial states
	  reset: function reset() {
	    var self = this;
	
	    if (self.ready && !self.disabled) {
	      self.imageData = $.extend({}, self.initialImageData);
	      self.canvasData = $.extend({}, self.initialCanvasData);
	      self.cropBoxData = $.extend({}, self.initialCropBoxData);
	
	      self.renderCanvas();
	
	      if (self.cropped) {
	        self.renderCropBox();
	      }
	    }
	
	    return self;
	  },
	
	
	  // Clear the crop box
	  clear: function clear() {
	    var self = this;
	
	    if (self.cropped && !self.disabled) {
	      $.extend(self.cropBoxData, {
	        left: 0,
	        top: 0,
	        width: 0,
	        height: 0
	      });
	
	      self.cropped = false;
	      self.renderCropBox();
	
	      self.limitCanvas();
	
	      // Render canvas after crop box rendered
	      self.renderCanvas();
	
	      $.removeClass(self.dragBox, 'cropper-modal');
	      $.addClass(self.cropBox, 'cropper-hidden');
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Replace the image's src and rebuild the cropper
	   *
	   * @param {String} url
	   * @param {Boolean} onlyColorChanged (optional)
	   */
	  replace: function replace(url, onlyColorChanged) {
	    var self = this;
	
	    if (!self.disabled && url) {
	      if (self.isImg) {
	        self.element.src = url;
	      }
	
	      if (onlyColorChanged) {
	        self.url = url;
	        self.image.src = url;
	
	        if (self.ready) {
	          self.image2.src = url;
	
	          $.each(self.previews, function (element) {
	            $.getByTag(element, 'img')[0].src = url;
	          });
	        }
	      } else {
	        if (self.isImg) {
	          self.replaced = true;
	        }
	
	        // Clear previous data
	        self.options.data = null;
	        self.load(url);
	      }
	    }
	
	    return self;
	  },
	
	
	  // Enable (unfreeze) the cropper
	  enable: function enable() {
	    var self = this;
	
	    if (self.ready) {
	      self.disabled = false;
	      $.removeClass(self.cropper, 'cropper-disabled');
	    }
	
	    return self;
	  },
	
	
	  // Disable (freeze) the cropper
	  disable: function disable() {
	    var self = this;
	
	    if (self.ready) {
	      self.disabled = true;
	      $.addClass(self.cropper, 'cropper-disabled');
	    }
	
	    return self;
	  },
	
	
	  // Destroy the cropper and remove the instance from the image
	  destroy: function destroy() {
	    var self = this;
	    var element = self.element;
	    var image = self.image;
	
	    if (self.loaded) {
	      if (self.isImg && self.replaced) {
	        element.src = self.originalUrl;
	      }
	
	      self.unbuild();
	      $.removeClass(element, 'cropper-hidden');
	    } else if (self.isImg) {
	      $.removeListener(element, 'load', self.start);
	    } else if (image) {
	      $.removeChild(image);
	    }
	
	    $.removeData(element, 'cropper');
	
	    return self;
	  },
	
	
	  /**
	   * Move the canvas with relative offsets
	   *
	   * @param {Number} offsetX
	   * @param {Number} offsetY (optional)
	   */
	  move: function move(offsetX, offsetY) {
	    var self = this;
	    var canvasData = self.canvasData;
	
	    return self.moveTo($.isUndefined(offsetX) ? offsetX : canvasData.left + Number(offsetX), $.isUndefined(offsetY) ? offsetY : canvasData.top + Number(offsetY));
	  },
	
	
	  /**
	   * Move the canvas to an absolute point
	   *
	   * @param {Number} x
	   * @param {Number} y (optional)
	   */
	  moveTo: function moveTo(x, y) {
	    var self = this;
	    var canvasData = self.canvasData;
	    var changed = false;
	
	    // If "y" is not present, its default value is "x"
	    if ($.isUndefined(y)) {
	      y = x;
	    }
	
	    x = Number(x);
	    y = Number(y);
	
	    if (self.ready && !self.disabled && self.options.movable) {
	      if ($.isNumber(x)) {
	        canvasData.left = x;
	        changed = true;
	      }
	
	      if ($.isNumber(y)) {
	        canvasData.top = y;
	        changed = true;
	      }
	
	      if (changed) {
	        self.renderCanvas(true);
	      }
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Zoom the canvas with a relative ratio
	   *
	   * @param {Number} ratio
	   * @param {Event} _originalEvent (private)
	   */
	  zoom: function zoom(ratio, _originalEvent) {
	    var self = this;
	    var canvasData = self.canvasData;
	
	    ratio = Number(ratio);
	
	    if (ratio < 0) {
	      ratio = 1 / (1 - ratio);
	    } else {
	      ratio = 1 + ratio;
	    }
	
	    return self.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, _originalEvent);
	  },
	
	
	  /**
	   * Zoom the canvas to an absolute ratio
	   *
	   * @param {Number} ratio
	   * @param {Event} _originalEvent (private)
	   */
	  zoomTo: function zoomTo(ratio, _originalEvent) {
	    var self = this;
	    var options = self.options;
	    var canvasData = self.canvasData;
	    var width = canvasData.width;
	    var height = canvasData.height;
	    var naturalWidth = canvasData.naturalWidth;
	    var naturalHeight = canvasData.naturalHeight;
	    var newWidth = void 0;
	    var newHeight = void 0;
	    var offset = void 0;
	    var center = void 0;
	
	    ratio = Number(ratio);
	
	    if (ratio >= 0 && self.ready && !self.disabled && options.zoomable) {
	      newWidth = naturalWidth * ratio;
	      newHeight = naturalHeight * ratio;
	
	      if ($.dispatchEvent(self.element, 'zoom', {
	        originalEvent: _originalEvent,
	        oldRatio: width / naturalWidth,
	        ratio: newWidth / naturalWidth
	      }) === false) {
	        return self;
	      }
	
	      if (_originalEvent) {
	        offset = $.getOffset(self.cropper);
	        center = _originalEvent.touches ? $.getTouchesCenter(_originalEvent.touches) : {
	          pageX: _originalEvent.pageX,
	          pageY: _originalEvent.pageY
	        };
	
	        // Zoom from the triggering point of the event
	        canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
	        canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
	      } else {
	        // Zoom from the center of the canvas
	        canvasData.left -= (newWidth - width) / 2;
	        canvasData.top -= (newHeight - height) / 2;
	      }
	
	      canvasData.width = newWidth;
	      canvasData.height = newHeight;
	      self.renderCanvas(true);
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Rotate the canvas with a relative degree
	   *
	   * @param {Number} degree
	   */
	  rotate: function rotate(degree) {
	    var self = this;
	
	    return self.rotateTo((self.imageData.rotate || 0) + Number(degree));
	  },
	
	
	  /**
	   * Rotate the canvas to an absolute degree
	   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
	   *
	   * @param {Number} degree
	   */
	  rotateTo: function rotateTo(degree) {
	    var self = this;
	
	    degree = Number(degree);
	
	    if ($.isNumber(degree) && self.ready && !self.disabled && self.options.rotatable) {
	      self.imageData.rotate = degree % 360;
	      self.rotated = true;
	      self.renderCanvas(true);
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Scale the image
	   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
	   *
	   * @param {Number} scaleX
	   * @param {Number} scaleY (optional)
	   */
	  scale: function scale(scaleX, scaleY) {
	    var self = this;
	    var imageData = self.imageData;
	    var changed = false;
	
	    // If "scaleY" is not present, its default value is "scaleX"
	    if ($.isUndefined(scaleY)) {
	      scaleY = scaleX;
	    }
	
	    scaleX = Number(scaleX);
	    scaleY = Number(scaleY);
	
	    if (self.ready && !self.disabled && self.options.scalable) {
	      if ($.isNumber(scaleX)) {
	        imageData.scaleX = scaleX;
	        changed = true;
	      }
	
	      if ($.isNumber(scaleY)) {
	        imageData.scaleY = scaleY;
	        changed = true;
	      }
	
	      if (changed) {
	        self.renderImage(true);
	      }
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Scale the abscissa of the image
	   *
	   * @param {Number} scaleX
	   */
	  scaleX: function scaleX(_scaleX) {
	    var self = this;
	    var scaleY = self.imageData.scaleY;
	
	    return self.scale(_scaleX, $.isNumber(scaleY) ? scaleY : 1);
	  },
	
	
	  /**
	   * Scale the ordinate of the image
	   *
	   * @param {Number} scaleY
	   */
	  scaleY: function scaleY(_scaleY) {
	    var self = this;
	    var scaleX = self.imageData.scaleX;
	
	    return self.scale($.isNumber(scaleX) ? scaleX : 1, _scaleY);
	  },
	
	
	  /**
	   * Get the cropped area position and size data (base on the original image)
	   *
	   * @param {Boolean} rounded (optional)
	   * @return {Object} data
	   */
	  getData: function getData(rounded) {
	    var self = this;
	    var options = self.options;
	    var imageData = self.imageData;
	    var canvasData = self.canvasData;
	    var cropBoxData = self.cropBoxData;
	    var ratio = void 0;
	    var data = void 0;
	
	    if (self.ready && self.cropped) {
	      data = {
	        x: cropBoxData.left - canvasData.left,
	        y: cropBoxData.top - canvasData.top,
	        width: cropBoxData.width,
	        height: cropBoxData.height
	      };
	
	      ratio = imageData.width / imageData.naturalWidth;
	
	      $.each(data, function (n, i) {
	        n /= ratio;
	        data[i] = rounded ? Math.round(n) : n;
	      });
	    } else {
	      data = {
	        x: 0,
	        y: 0,
	        width: 0,
	        height: 0
	      };
	    }
	
	    if (options.rotatable) {
	      data.rotate = imageData.rotate || 0;
	    }
	
	    if (options.scalable) {
	      data.scaleX = imageData.scaleX || 1;
	      data.scaleY = imageData.scaleY || 1;
	    }
	
	    return data;
	  },
	
	
	  /**
	   * Set the cropped area position and size with new data
	   *
	   * @param {Object} data
	   */
	  setData: function setData(data) {
	    var self = this;
	    var options = self.options;
	    var imageData = self.imageData;
	    var canvasData = self.canvasData;
	    var cropBoxData = {};
	    var rotated = void 0;
	    var scaled = void 0;
	    var ratio = void 0;
	
	    if ($.isFunction(data)) {
	      data = data.call(self.element);
	    }
	
	    if (self.ready && !self.disabled && $.isPlainObject(data)) {
	      if (options.rotatable) {
	        if ($.isNumber(data.rotate) && data.rotate !== imageData.rotate) {
	          imageData.rotate = data.rotate;
	          self.rotated = rotated = true;
	        }
	      }
	
	      if (options.scalable) {
	        if ($.isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
	          imageData.scaleX = data.scaleX;
	          scaled = true;
	        }
	
	        if ($.isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
	          imageData.scaleY = data.scaleY;
	          scaled = true;
	        }
	      }
	
	      if (rotated) {
	        self.renderCanvas();
	      } else if (scaled) {
	        self.renderImage();
	      }
	
	      ratio = imageData.width / imageData.naturalWidth;
	
	      if ($.isNumber(data.x)) {
	        cropBoxData.left = data.x * ratio + canvasData.left;
	      }
	
	      if ($.isNumber(data.y)) {
	        cropBoxData.top = data.y * ratio + canvasData.top;
	      }
	
	      if ($.isNumber(data.width)) {
	        cropBoxData.width = data.width * ratio;
	      }
	
	      if ($.isNumber(data.height)) {
	        cropBoxData.height = data.height * ratio;
	      }
	
	      self.setCropBoxData(cropBoxData);
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Get the container size data
	   *
	   * @return {Object} data
	   */
	  getContainerData: function getContainerData() {
	    var self = this;
	
	    return self.ready ? self.containerData : {};
	  },
	
	
	  /**
	   * Get the image position and size data
	   *
	   * @return {Object} data
	   */
	  getImageData: function getImageData() {
	    var self = this;
	
	    return self.loaded ? self.imageData : {};
	  },
	
	
	  /**
	   * Get the canvas position and size data
	   *
	   * @return {Object} data
	   */
	  getCanvasData: function getCanvasData() {
	    var self = this;
	    var canvasData = self.canvasData;
	    var data = {};
	
	    if (self.ready) {
	      $.each(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
	        data[n] = canvasData[n];
	      });
	    }
	
	    return data;
	  },
	
	
	  /**
	   * Set the canvas position and size with new data
	   *
	   * @param {Object} data
	   */
	  setCanvasData: function setCanvasData(data) {
	    var self = this;
	    var canvasData = self.canvasData;
	    var aspectRatio = canvasData.aspectRatio;
	
	    if ($.isFunction(data)) {
	      data = data.call(self.element);
	    }
	
	    if (self.ready && !self.disabled && $.isPlainObject(data)) {
	      if ($.isNumber(data.left)) {
	        canvasData.left = data.left;
	      }
	
	      if ($.isNumber(data.top)) {
	        canvasData.top = data.top;
	      }
	
	      if ($.isNumber(data.width)) {
	        canvasData.width = data.width;
	        canvasData.height = data.width / aspectRatio;
	      } else if ($.isNumber(data.height)) {
	        canvasData.height = data.height;
	        canvasData.width = data.height * aspectRatio;
	      }
	
	      self.renderCanvas(true);
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Get the crop box position and size data
	   *
	   * @return {Object} data
	   */
	  getCropBoxData: function getCropBoxData() {
	    var self = this;
	    var cropBoxData = self.cropBoxData;
	    var data = void 0;
	
	    if (self.ready && self.cropped) {
	      data = {
	        left: cropBoxData.left,
	        top: cropBoxData.top,
	        width: cropBoxData.width,
	        height: cropBoxData.height
	      };
	    }
	
	    return data || {};
	  },
	
	
	  /**
	   * Set the crop box position and size with new data
	   *
	   * @param {Object} data
	   */
	  setCropBoxData: function setCropBoxData(data) {
	    var self = this;
	    var cropBoxData = self.cropBoxData;
	    var aspectRatio = self.options.aspectRatio;
	    var widthChanged = void 0;
	    var heightChanged = void 0;
	
	    if ($.isFunction(data)) {
	      data = data.call(self.element);
	    }
	
	    if (self.ready && self.cropped && !self.disabled && $.isPlainObject(data)) {
	      if ($.isNumber(data.left)) {
	        cropBoxData.left = data.left;
	      }
	
	      if ($.isNumber(data.top)) {
	        cropBoxData.top = data.top;
	      }
	
	      if ($.isNumber(data.width)) {
	        widthChanged = true;
	        cropBoxData.width = data.width;
	      }
	
	      if ($.isNumber(data.height)) {
	        heightChanged = true;
	        cropBoxData.height = data.height;
	      }
	
	      if (aspectRatio) {
	        if (widthChanged) {
	          cropBoxData.height = cropBoxData.width / aspectRatio;
	        } else if (heightChanged) {
	          cropBoxData.width = cropBoxData.height * aspectRatio;
	        }
	      }
	
	      self.renderCropBox();
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Get a canvas drawn the cropped image
	   *
	   * @param {Object} options (optional)
	   * @return {HTMLCanvasElement} canvas
	   */
	  getCroppedCanvas: function getCroppedCanvas(options) {
	    var self = this;
	
	    if (!self.ready || !window.HTMLCanvasElement) {
	      return null;
	    }
	
	    // Return the whole canvas if not cropped
	    if (!self.cropped) {
	      return $.getSourceCanvas(self.image, self.imageData);
	    }
	
	    if (!$.isPlainObject(options)) {
	      options = {};
	    }
	
	    var data = self.getData();
	    var originalWidth = data.width;
	    var originalHeight = data.height;
	    var aspectRatio = originalWidth / originalHeight;
	    var scaledWidth = void 0;
	    var scaledHeight = void 0;
	    var scaledRatio = void 0;
	
	    if ($.isPlainObject(options)) {
	      scaledWidth = options.width;
	      scaledHeight = options.height;
	
	      if (scaledWidth) {
	        scaledHeight = scaledWidth / aspectRatio;
	        scaledRatio = scaledWidth / originalWidth;
	      } else if (scaledHeight) {
	        scaledWidth = scaledHeight * aspectRatio;
	        scaledRatio = scaledHeight / originalHeight;
	      }
	    }
	
	    // The canvas element will use `Math.floor` on a float number, so floor first
	    var canvasWidth = Math.floor(scaledWidth || originalWidth);
	    var canvasHeight = Math.floor(scaledHeight || originalHeight);
	
	    var canvas = $.createElement('canvas');
	    var context = canvas.getContext('2d');
	
	    canvas.width = canvasWidth;
	    canvas.height = canvasHeight;
	
	    if (options.fillColor) {
	      context.fillStyle = options.fillColor;
	      context.fillRect(0, 0, canvasWidth, canvasHeight);
	    }
	
	    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
	    var parameters = function () {
	      var source = $.getSourceCanvas(self.image, self.imageData);
	      var sourceWidth = source.width;
	      var sourceHeight = source.height;
	      var canvasData = self.canvasData;
	      var params = [source];
	
	      // Source canvas
	      var srcX = data.x + canvasData.naturalWidth * (Math.abs(data.scaleX || 1) - 1) / 2;
	      var srcY = data.y + canvasData.naturalHeight * (Math.abs(data.scaleY || 1) - 1) / 2;
	      var srcWidth = void 0;
	      var srcHeight = void 0;
	
	      // Destination canvas
	      var dstX = void 0;
	      var dstY = void 0;
	      var dstWidth = void 0;
	      var dstHeight = void 0;
	
	      if (srcX <= -originalWidth || srcX > sourceWidth) {
	        srcX = srcWidth = dstX = dstWidth = 0;
	      } else if (srcX <= 0) {
	        dstX = -srcX;
	        srcX = 0;
	        srcWidth = dstWidth = Math.min(sourceWidth, originalWidth + srcX);
	      } else if (srcX <= sourceWidth) {
	        dstX = 0;
	        srcWidth = dstWidth = Math.min(originalWidth, sourceWidth - srcX);
	      }
	
	      if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
	        srcY = srcHeight = dstY = dstHeight = 0;
	      } else if (srcY <= 0) {
	        dstY = -srcY;
	        srcY = 0;
	        srcHeight = dstHeight = Math.min(sourceHeight, originalHeight + srcY);
	      } else if (srcY <= sourceHeight) {
	        dstY = 0;
	        srcHeight = dstHeight = Math.min(originalHeight, sourceHeight - srcY);
	      }
	
	      params.push(Math.floor(srcX), Math.floor(srcY), Math.floor(srcWidth), Math.floor(srcHeight));
	
	      // Scale destination sizes
	      if (scaledRatio) {
	        dstX *= scaledRatio;
	        dstY *= scaledRatio;
	        dstWidth *= scaledRatio;
	        dstHeight *= scaledRatio;
	      }
	
	      // Avoid "IndexSizeError" in IE and Firefox
	      if (dstWidth > 0 && dstHeight > 0) {
	        params.push(Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
	      }
	
	      return params;
	    }();
	
	    context.drawImage.apply(context, _toConsumableArray(parameters));
	
	    return canvas;
	  },
	
	
	  /**
	   * Change the aspect ratio of the crop box
	   *
	   * @param {Number} aspectRatio
	   */
	  setAspectRatio: function setAspectRatio(aspectRatio) {
	    var self = this;
	    var options = self.options;
	
	    if (!self.disabled && !$.isUndefined(aspectRatio)) {
	      // 0 -> NaN
	      options.aspectRatio = Math.max(0, aspectRatio) || NaN;
	
	      if (self.ready) {
	        self.initCropBox();
	
	        if (self.cropped) {
	          self.renderCropBox();
	        }
	      }
	    }
	
	    return self;
	  },
	
	
	  /**
	   * Change the drag mode
	   *
	   * @param {String} mode (optional)
	   */
	  setDragMode: function setDragMode(mode) {
	    var self = this;
	    var options = self.options;
	    var dragBox = self.dragBox;
	    var face = self.face;
	    var croppable = void 0;
	    var movable = void 0;
	
	    if (self.loaded && !self.disabled) {
	      croppable = mode === 'crop';
	      movable = options.movable && mode === 'move';
	      mode = croppable || movable ? mode : 'none';
	
	      $.setData(dragBox, 'action', mode);
	      $.toggleClass(dragBox, 'cropper-crop', croppable);
	      $.toggleClass(dragBox, 'cropper-move', movable);
	
	      if (!options.cropBoxMovable) {
	        // Sync drag mode to crop box when it is not movable
	        $.setData(face, 'action', mode);
	        $.toggleClass(face, 'cropper-crop', croppable);
	        $.toggleClass(face, 'cropper-move', movable);
	      }
	    }
	
	    return self;
	  }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cropper.js.map