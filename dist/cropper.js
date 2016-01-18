/*!
 * Cropper.js v0.5.6
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-01-18T05:33:43.542Z
 */

(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ? factory(global, true) : function (window) {
      if (!window.document) {
        throw new Error('Cropper requires a window with a document');
      }

      return factory(window);
    };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  'use strict';

  // Globals
  var document = window.document;
  var location = window.location;
  var ArrayBuffer = window.ArrayBuffer;
  var Object = window.Object;
  var Array = window.Array;
  var String = window.String;
  var Number = window.Number;
  var Math = window.Math;

  // Constants
  var NAMESPACE = 'cropper';

  // Classes
  var CLASS_MODAL = NAMESPACE + '-modal';
  var CLASS_HIDE = NAMESPACE + '-hide';
  var CLASS_HIDDEN = NAMESPACE + '-hidden';
  var CLASS_INVISIBLE = NAMESPACE + '-invisible';
  var CLASS_MOVE = NAMESPACE + '-move';
  var CLASS_CROP = NAMESPACE + '-crop';
  var CLASS_DISABLED = NAMESPACE + '-disabled';
  var CLASS_BG = NAMESPACE + '-bg';

  // Events
  var EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
  var EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
  var EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel';
  var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_RESIZE = 'resize';
  var EVENT_ERROR = 'error';
  var EVENT_LOAD = 'load';

  // RegExps
  var REGEXP_ACTIONS = /e|w|s|n|se|sw|ne|nw|all|crop|move|zoom/;
  var REGEXP_SUFFIX = /width|height|left|top|marginLeft|marginTop/;
  var REGEXP_ORIGINS = /^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i;
  var REGEXP_TRIM = /^\s+(.*)\s+$/;
  var REGEXP_SPACES = /\s+/;
  var REGEXP_DATA_URL = /^data\:/;
  var REGEXP_DATA_URL_HEAD = /^data\:([^\;]+)\;base64,/;
  var REGEXP_DATA_URL_JPEG = /^data\:image\/jpeg.*;base64,/;

  // Data
  var DATA_PREVIEW = 'preview';
  var DATA_ACTION = 'action';

  // Actions
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_NONE = 'none';

  // Supports
  var SUPPORT_CANVAS = !!document.createElement('canvas').getContext;

  // Maths
  var min = Math.min;
  var max = Math.max;
  var abs = Math.abs;
  var sin = Math.sin;
  var cos = Math.cos;
  var sqrt = Math.sqrt;
  var round = Math.round;
  var floor = Math.floor;
  var PI = Math.PI;

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
    return typeof obj === 'object' && obj !== null;
  }

  function isPlainObject(obj) {
    var constructor;
    var prototype;

    if (!isObject(obj)) {
      return false;
    }

    try {
      constructor = obj.constructor;
      prototype = constructor.prototype;

      return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
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
    var length;
    var i;

    if (obj && isFunction(callback)) {
      if (isArray(obj) || isNumber(obj.length)/* array-like */) {
        for (i = 0, length = obj.length; i < length; i++) {
          if (callback.call(obj, obj[i], i, obj) === false) {
            break;
          }
        }
      } else if (isObject(obj)) {
        for (i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (callback.call(obj, obj[i], i, obj) === false) {
              break;
            }
          }
        }
      }
    }

    return obj;
  }

  function extend(obj) {
    var args;

    if (arguments.length > 1) {
      args = toArray(arguments);

      if (Object.assign) {
        return Object.assign.apply(Object, args);
      }

      args.shift();

      each(args, function (arg) {
        each(arg, function (prop, i) {
          obj[i] = prop;
        });
      });
    }

    return obj;
  }

  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
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
    return element.classList ?
      element.classList.contains(value) :
      element.className.indexOf(value) > -1;
  }

  function addClass(element, value) {
    var className;

    if (isNumber(element.length)) {
      return each(element, function (elem) {
        addClass(elem, value);
      });
    }

    if (element.classList) {
      return element.classList.add(value);
    }

    className = trim(element.className);

    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = className + ' ' + value;
    }
  }

  function removeClass(element, value) {
    if (isNumber(element.length)) {
      return each(element, function (elem) {
        removeClass(elem, value);
      });
    }

    if (element.classList) {
      return element.classList.remove(value);
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }

  function toggleClass(element, value, added) {
    if (isNumber(element.length)) {
      return each(element, function (elem) {
        toggleClass(elem, value, added);
      });
    }

    // IE10-11 doesn't support the second parameter of `classList.toggle`
    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }

  function getData(element, name) {
    return isObject(element[name]) ?
      element[name] :
      element.dataset ?
        element.dataset[name] :
        element.getAttribute('data-' + name);
  }

  function setData(element, name, data) {
    if (isObject(data) && isUndefined(element[name])) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute('data-' + name, data);
    }
  }

  function removeData(element, name) {
    if (isObject(element[name])) {
      delete element[name];
    } else if (element.dataset) {
      delete element.dataset[name];
    } else {
      element.removeAttribute('data-' + name);
    }
  }

  function addListener(element, type, handler) {
    var types = trim(type).split(REGEXP_SPACES);

    if (types.length > 1) {
      return each(types, function (type) {
        addListener(element, type, handler);
      });
    }

    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }
  }

  function removeListener(element, type, handler) {
    var types = trim(type).split(REGEXP_SPACES);

    if (types.length > 1) {
      return each(types, function (type) {
        removeListener(element, type, handler);
      });
    }

    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    }
  }

  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  function getEvent(event) {
    var e = event || window.event;
    var doc;

    // Fix target property (IE8)
    if (!e.target) {
      e.target = e.srcElement || document;
    }

    if (!isNumber(e.pageX)) {
      doc = document.documentElement;
      e.pageX = e.clientX + (window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0);
      e.pageY = e.clientY + (window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0);
    }

    return e;
  }

  function getOffset(element) {
    var doc = document.documentElement;
    var box = element.getBoundingClientRect();

    return {
      left: box.left + (window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0),
      top: box.top + (window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0)
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
    return element.getElementsByClassName ?
      element.getElementsByClassName(className) :
      element.querySelectorAll('.' + className);
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

    return parts && (
      parts[1] !== location.protocol ||
      parts[2] !== location.hostname ||
      parts[3] !== location.port
    );
  }

  function addTimestamp(url) {
    var timestamp = 'timestamp=' + (new Date()).getTime();

    return (url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp);
  }

  function getImageSize(image, callback) {
    var newImage;

    // Modern browsers
    if (image.naturalWidth) {
      return callback(image.naturalWidth, image.naturalHeight);
    }

    // IE8: Don't use `new Image()` here
    newImage = createElement('img');

    newImage.onload = function () {
      callback(this.width, this.height);
    };

    newImage.src = image.src;
  }

  function getTransform(data) {
    var transforms = [];
    var rotate = data.rotate;
    var scaleX = data.scaleX;
    var scaleY = data.scaleY;

    if (isNumber(rotate)) {
      transforms.push('rotate(' + rotate + 'deg)');
    }

    if (isNumber(scaleX) && isNumber(scaleY)) {
      transforms.push('scale(' + scaleX + ',' + scaleY + ')');
    }

    return transforms.length ? transforms.join(' ') : 'none';
  }

  function getRotatedSizes(data, reversed) {
    var deg = abs(data.degree) % 180;
    var arc = (deg > 90 ? (180 - deg) : deg) * PI / 180;
    var sinArc = sin(arc);
    var cosArc = cos(arc);
    var width = data.width;
    var height = data.height;
    var aspectRatio = data.aspectRatio;
    var newWidth;
    var newHeight;

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
    var x = 0;
    var y = 0;
    var width = data.naturalWidth;
    var height = data.naturalHeight;
    var rotate = data.rotate;
    var scaleX = data.scaleX;
    var scaleY = data.scaleY;
    var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
    var rotatable = isNumber(rotate) && rotate !== 0;
    var advanced = rotatable || scalable;
    var canvasWidth = width;
    var canvasHeight = height;
    var translateX;
    var translateY;
    var rotated;

    if (scalable) {
      translateX = width / 2;
      translateY = height / 2;
    }

    if (rotatable) {
      rotated = getRotatedSizes({
        width: width,
        height: height,
        degree: rotate
      });

      canvasWidth = rotated.width;
      canvasHeight = rotated.height;
      translateX = rotated.width / 2;
      translateY = rotated.height / 2;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (advanced) {
      x = -width / 2;
      y = -height / 2;

      context.save();
      context.translate(translateX, translateY);
    }

    if (rotatable) {
      context.rotate(rotate * PI / 180);
    }

    // Should call `scale` after rotated
    if (scalable) {
      context.scale(scaleX, scaleY);
    }

    context.drawImage(image, floor(x), floor(y), floor(width), floor(height));

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
    var orientation;
    var exifIDCode;
    var tiffOffset;
    var firstIFDOffset;
    var littleEndian;
    var endianness;
    var app1Start;
    var ifdStart;
    var offset;
    var i;

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

          // Override the orientation with the default value: 1
          dataView.setUint16(offset, 1, littleEndian);
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
    var i;

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
    var i;

    for (i = 0; i < length; i++) {
      base64 += fromCharCode(dataView[i]);
    }

    return 'data:image/jpeg;base64,' + btoa(base64);
  }

  function Cropper(element, options) {
    var _this = this;

    _this.element = element;
    _this.options = extend({}, Cropper.DEFAULTS, isPlainObject(options) && options);
    _this.ready = false;
    _this.built = false;
    _this.complete = false;
    _this.rotated = false;
    _this.cropped = false;
    _this.disabled = false;
    _this.replaced = false;
    _this.limited = false;
    _this.wheeling = false;
    _this.isImg = false;
    _this.originalUrl = '';
    _this.canvasData = null;
    _this.cropBoxData = null;
    _this.previews = null;
    _this.init();
  }

  Cropper.prototype = {
    constructor: Cropper,

    init: function () {
      var _this = this;
      var element = _this.element;
      var tagName = element.tagName.toLowerCase();
      var url;

      if (getData(element, NAMESPACE)) {
        return;
      }

      setData(element, NAMESPACE, _this);

      if (tagName === 'img') {
        _this.isImg = true;

        // e.g.: "img/picture.jpg"
        _this.originalUrl = url = element.getAttribute('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // e.g.: "http://example.com/img/picture.jpg"
        url = element.src;
      } else if (tagName === 'canvas' && SUPPORT_CANVAS) {
        url = element.toDataURL();
      }

      _this.load(url);
    },

    load: function (url) {
      var _this = this;
      var options = _this.options;
      var xhr;

      if (!url) {
        return;
      }

      if (isFunction(options.build) && options.build.call(_this.element) === false) {
        return;
      }

      _this.url = url;
      _this.imageData = {};

      if (!options.checkOrientation || !ArrayBuffer) {
        return _this.clone();
      }

      // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
      if (REGEXP_DATA_URL.test(url)) {
        return REGEXP_DATA_URL_JPEG.test(url) ?
          _this.read(dataURLToArrayBuffer(url)) :
          _this.clone();
      }

      xhr = new XMLHttpRequest();

      xhr.onerror = xhr.onabort = function () {
        _this.clone();
      };

      xhr.onload = function () {
        _this.read(this.response);
      };

      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    },

    read: function (arrayBuffer) {
      var _this = this;
      var options = _this.options;
      var orientation = getOrientation(arrayBuffer);
      var imageData = _this.imageData;
      var rotate;
      var scaleX;
      var scaleY;

      if (orientation > 1) {
        _this.url = arrayBufferToDataURL(arrayBuffer);

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

      _this.clone();
    },

    clone: function () {
      var _this = this;
      var element = _this.element;
      var url = _this.url;
      var crossOrigin;
      var crossOriginUrl;
      var image;
      var start;
      var stop;

      if (_this.options.checkCrossOrigin && isCrossOriginURL(url)) {
        crossOrigin = element.crossOrigin;

        if (crossOrigin) {
          crossOriginUrl = url;
        } else {
          crossOrigin = 'anonymous';

          // Bust cache when there is not a "crossOrigin" property
          crossOriginUrl = addTimestamp(url);
        }
      }

      _this.crossOrigin = crossOrigin;
      _this.crossOriginUrl = crossOriginUrl;
      image = createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = crossOriginUrl || url;
      _this.image = image;
      _this._start = start = proxy(_this.start, _this);
      _this._stop = stop = proxy(_this.stop, _this);

      if (_this.isImg) {
        if (element.complete) {
          _this.start();
        } else {
          addListener(element, EVENT_LOAD, start);
        }
      } else {
        addListener(image, EVENT_LOAD, start);
        addListener(image, EVENT_ERROR, stop);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    },

    start: function (event) {
      var _this = this;
      var image = _this.isImg ? _this.element : _this.image;

      if (event) {
        removeListener(image, EVENT_LOAD, _this._start);
        removeListener(image, EVENT_ERROR, _this._stop);
      }

      getImageSize(image, function (naturalWidth, naturalHeight) {
        extend(_this.imageData, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        });

        _this.ready = true;
        _this.build();
      });
    },

    stop: function () {
      var _this = this;
      var image = _this.image;

      removeListener(image, EVENT_LOAD, _this._start);
      removeListener(image, EVENT_ERROR, _this._stop);

      removeChild(image);
      _this.image = null;
    },

    build: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var image = _this.image;
      var container;
      var template;
      var cropper;
      var canvas;
      var dragBox;
      var cropBox;
      var face;

      if (!_this.ready) {
        return;
      }

      // Unbuild first when replace
      if (_this.built) {
        _this.unbuild();
      }

      template = createElement('div');
      template.innerHTML = Cropper.TEMPLATE;

      // Create cropper elements
      _this.container = container = element.parentNode;
      _this.cropper = cropper = getByClass(template, 'cropper-container')[0];
      _this.canvas = canvas = getByClass(cropper, 'cropper-canvas')[0];
      _this.dragBox = dragBox = getByClass(cropper, 'cropper-drag-box')[0];
      _this.cropBox = cropBox = getByClass(cropper, 'cropper-crop-box')[0];
      _this.viewBox = getByClass(cropper, 'cropper-view-box')[0];
      _this.face = face = getByClass(cropBox, 'cropper-face')[0];

      appendChild(canvas, image);

      // Hide the original image
      addClass(element, CLASS_HIDDEN);

      // Inserts the cropper after to the current image
      container.insertBefore(cropper, element.nextSibling);

      // Show the image if is hidden
      if (!_this.isImg) {
        removeClass(image, CLASS_HIDE);
      }

      _this.initPreview();
      _this.bind();

      options.aspectRatio = max(0, options.aspectRatio) || NaN;
      options.viewMode = max(0, min(3, round(options.viewMode))) || 0;

      if (options.autoCrop) {
        _this.cropped = true;

        if (options.modal) {
          addClass(dragBox, CLASS_MODAL);
        }
      } else {
        addClass(cropBox, CLASS_HIDDEN);
      }

      if (!options.guides) {
        addClass(getByClass(cropBox, 'cropper-dashed'), CLASS_HIDDEN);
      }

      if (!options.center) {
        addClass(getByClass(cropBox, 'cropper-center'), CLASS_HIDDEN);
      }

      if (options.background) {
        addClass(cropper, CLASS_BG);
      }

      if (!options.highlight) {
        addClass(face, CLASS_INVISIBLE);
      }

      if (options.cropBoxMovable) {
        addClass(face, CLASS_MOVE);
        setData(face, DATA_ACTION, ACTION_ALL);
      }

      if (!options.cropBoxResizable) {
        addClass(getByClass(cropBox, 'cropper-line'), CLASS_HIDDEN);
        addClass(getByClass(cropBox, 'cropper-point'), CLASS_HIDDEN);
      }

      _this.setDragMode(options.dragMode);
      _this.render();
      _this.built = true;
      _this.setData(options.data);

      // Call the built asynchronously to keep "image.cropper" is defined
      setTimeout(function () {
        if (isFunction(options.built)) {
          options.built.call(element);
        }

        if (isFunction(options.crop)) {
          options.crop.call(element, _this.getData());
        }

        _this.complete = true;
      }, 0);
    },

    unbuild: function () {
      var _this = this;

      if (!_this.built) {
        return;
      }

      _this.built = false;
      _this.complete = false;
      _this.initialImageData = null;

      // Clear `initialCanvasData` is necessary when replace
      _this.initialCanvasData = null;
      _this.initialCropBoxData = null;
      _this.containerData = null;
      _this.canvasData = null;

      // Clear `cropBoxData` is necessary when replace
      _this.cropBoxData = null;
      _this.unbind();

      _this.resetPreview();
      _this.previews = null;

      _this.viewBox = null;
      _this.cropBox = null;
      _this.dragBox = null;
      _this.canvas = null;
      _this.container = null;

      removeChild(_this.cropper);
      _this.cropper = null;
    },

    render: function () {
      var _this = this;

      _this.initContainer();
      _this.initCanvas();
      _this.initCropBox();

      _this.renderCanvas();

      if (_this.cropped) {
        _this.renderCropBox();
      }
    },

    initContainer: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var container = _this.container;
      var cropper = _this.cropper;
      var containerData;

      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);

      _this.containerData = containerData = {
        width: max(
          container.offsetWidth,
          Number(options.minContainerWidth) || 200
        ),
        height: max(
          container.offsetHeight,
          Number(options.minContainerHeight) || 100
        )
      };

      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });

      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },

    // Canvas (image wrapper)
    initCanvas: function () {
      var _this = this;
      var viewMode = _this.options.viewMode;
      var containerData = _this.containerData;
      var imageData = _this.imageData;
      var rotated = abs(imageData.rotate) === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;
      var canvasData;

      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else {
        if (viewMode === 3) {
          canvasHeight = containerData.width / aspectRatio;
        } else {
          canvasWidth = containerData.height * aspectRatio;
        }
      }

      canvasData = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: aspectRatio,
        width: canvasWidth,
        height: canvasHeight
      };

      canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
      canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;

      _this.canvasData = canvasData;
      _this.limited = (viewMode === 1 || viewMode === 2);
      _this.limitCanvas(true, true);
      _this.initialImageData = extend({}, imageData);
      _this.initialCanvasData = extend({}, canvasData);
    },

    limitCanvas: function (sizeLimited, positionLimited) {
      var _this = this;
      var options = _this.options;
      var viewMode = options.viewMode;
      var containerData = _this.containerData;
      var canvasData = _this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      var cropBoxData = _this.cropBoxData;
      var cropped = _this.cropped && cropBoxData;
      var minCanvasWidth;
      var minCanvasHeight;
      var newCanvasLeft;
      var newCanvasTop;

      if (sizeLimited) {
        minCanvasWidth = Number(options.minCanvasWidth) || 0;
        minCanvasHeight = Number(options.minCanvasHeight) || 0;

        if (viewMode > 1) {
          minCanvasWidth = max(minCanvasWidth, containerData.width);
          minCanvasHeight = max(minCanvasHeight, containerData.height);

          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = max(
              minCanvasWidth,
              cropped ? cropBoxData.width : 0
            );
          } else if (minCanvasHeight) {
            minCanvasHeight = max(
              minCanvasHeight,
              cropped ? cropBoxData.height : 0
            );
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

          canvasData.minLeft = min(0, newCanvasLeft);
          canvasData.minTop = min(0, newCanvasTop);
          canvasData.maxLeft = max(0, newCanvasLeft);
          canvasData.maxTop = max(0, newCanvasTop);

          if (cropped && _this.limited) {
            canvasData.minLeft = min(
              cropBoxData.left,
              cropBoxData.left + cropBoxData.width - canvasData.width
            );
            canvasData.minTop = min(
              cropBoxData.top,
              cropBoxData.top + cropBoxData.height - canvasData.height
            );
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;

            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = min(0, newCanvasLeft);
                canvasData.maxLeft = max(0, newCanvasLeft);
              }

              if (canvasData.height >= containerData.height) {
                canvasData.minTop = min(0, newCanvasTop);
                canvasData.maxTop = max(0, newCanvasTop);
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

    renderCanvas: function (changed) {
      var _this = this;
      var canvasData = _this.canvasData;
      var imageData = _this.imageData;
      var rotate = imageData.rotate;
      var aspectRatio;
      var rotatedData;

      if (_this.rotated) {
        _this.rotated = false;

        // Computes rotated sizes with image sizes
        rotatedData = getRotatedSizes({
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
            rotatedData = getRotatedSizes({
              width: imageData.naturalWidth,
              height: imageData.naturalHeight,
              degree: rotate
            });

            canvasData.naturalWidth = rotatedData.width;
            canvasData.naturalHeight = rotatedData.height;
          }

          _this.limitCanvas(true, false);
        }
      }

      if (canvasData.width > canvasData.maxWidth ||
        canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }

      if (canvasData.height > canvasData.maxHeight ||
        canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }

      canvasData.width = min(
        max(canvasData.width, canvasData.minWidth),
        canvasData.maxWidth
      );
      canvasData.height = min(
        max(canvasData.height, canvasData.minHeight),
        canvasData.maxHeight
      );

      _this.limitCanvas(false, true);

      canvasData.oldLeft = canvasData.left = min(
        max(canvasData.left, canvasData.minLeft),
        canvasData.maxLeft
      );
      canvasData.oldTop = canvasData.top = min(
        max(canvasData.top, canvasData.minTop),
        canvasData.maxTop
      );

      setStyle(_this.canvas, {
        width: canvasData.width,
        height: canvasData.height,
        left: canvasData.left,
        top: canvasData.top
      });

      _this.renderImage();

      if (_this.cropped && _this.limited) {
        _this.limitCropBox(true, true);
      }

      if (changed) {
        _this.output();
      }
    },

    renderImage: function (changed) {
      var _this = this;
      var canvasData = _this.canvasData;
      var imageData = _this.imageData;
      var newImageData;
      var reversedData;
      var reversedWidth;
      var reversedHeight;
      var transform;

      if (imageData.rotate) {
        reversedData = getRotatedSizes({
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

      extend(imageData, newImageData || {
        width: canvasData.width,
        height: canvasData.height,
        left: 0,
        top: 0
      });

      transform = getTransform(imageData);

      setStyle(_this.image, {
        width: imageData.width,
        height: imageData.height,
        marginLeft: imageData.left,
        marginTop: imageData.top,
        WebkitTransform: transform,
        msTransform: transform,
        transform: transform
      });

      if (changed) {
        _this.output();
      }
    },

    initCropBox: function () {
      var _this = this;
      var options = _this.options;
      var aspectRatio = options.aspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var canvasData = _this.canvasData;
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

      _this.cropBoxData = cropBoxData;
      _this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBoxData.width = min(
        max(cropBoxData.width, cropBoxData.minWidth),
        cropBoxData.maxWidth
      );
      cropBoxData.height = min(
        max(cropBoxData.height, cropBoxData.minHeight),
        cropBoxData.maxHeight
      );

      // The width/height of auto crop area must large than "minWidth/Height"
      cropBoxData.width = max(
        cropBoxData.minWidth,
        cropBoxData.width * autoCropArea
      );
      cropBoxData.height = max(
        cropBoxData.minHeight,
        cropBoxData.height * autoCropArea
      );
      cropBoxData.oldLeft = cropBoxData.left = (
        canvasData.left + (canvasData.width - cropBoxData.width) / 2
      );
      cropBoxData.oldTop = cropBoxData.top = (
        canvasData.top + (canvasData.height - cropBoxData.height) / 2
      );

      _this.initialCropBoxData = extend({}, cropBoxData);
    },

    limitCropBox: function (sizeLimited, positionLimited) {
      var _this = this;
      var options = _this.options;
      var aspectRatio = options.aspectRatio;
      var containerData = _this.containerData;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
      var limited = _this.limited;
      var minCropBoxWidth;
      var minCropBoxHeight;
      var maxCropBoxWidth;
      var maxCropBoxHeight;

      if (sizeLimited) {
        minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        minCropBoxHeight = Number(options.minCropBoxHeight) || 0;

        // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
        minCropBoxWidth = min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = min(minCropBoxHeight, containerData.height);
        maxCropBoxWidth = min(
          containerData.width,
          limited ? canvasData.width : containerData.width
        );
        maxCropBoxHeight = min(
          containerData.height,
          limited ? canvasData.height : containerData.height
        );

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
        cropBoxData.minWidth = min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }

      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = max(0, canvasData.left);
          cropBoxData.minTop = max(0, canvasData.top);
          cropBoxData.maxLeft = min(
            containerData.width,
            canvasData.left + canvasData.width
          ) - cropBoxData.width;
          cropBoxData.maxTop = min(
            containerData.height,
            canvasData.top + canvasData.height
          ) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },

    renderCropBox: function () {
      var _this = this;
      var options = _this.options;
      var containerData = _this.containerData;
      var cropBoxData = _this.cropBoxData;

      if (cropBoxData.width > cropBoxData.maxWidth ||
        cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }

      if (cropBoxData.height > cropBoxData.maxHeight ||
        cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }

      cropBoxData.width = min(
        max(cropBoxData.width, cropBoxData.minWidth),
        cropBoxData.maxWidth
      );
      cropBoxData.height = min(
        max(cropBoxData.height, cropBoxData.minHeight),
        cropBoxData.maxHeight
      );

      _this.limitCropBox(false, true);

      cropBoxData.oldLeft = cropBoxData.left = min(
        max(cropBoxData.left, cropBoxData.minLeft),
        cropBoxData.maxLeft
      );
      cropBoxData.oldTop = cropBoxData.top = min(
        max(cropBoxData.top, cropBoxData.minTop),
        cropBoxData.maxTop
      );

      if (options.movable && options.cropBoxMovable) {

        // Turn to move the canvas when the crop box is equal to the container
        setData(_this.face, DATA_ACTION, cropBoxData.width === containerData.width &&
          cropBoxData.height === containerData.height ? ACTION_MOVE : ACTION_ALL);
      }

      setStyle(_this.cropBox, {
        width: cropBoxData.width,
        height: cropBoxData.height,
        left: cropBoxData.left,
        top: cropBoxData.top
      });

      if (_this.cropped && _this.limited) {
        _this.limitCanvas(true, true);
      }

      if (!_this.disabled) {
        _this.output();
      }
    },

    output: function () {
      var _this = this;
      var options = _this.options;

      _this.preview();

      if (_this.complete && isFunction(options.crop)) {
        options.crop.call(_this.element, _this.getData());
      }
    },

    initPreview: function () {
      var _this = this;
      var preview = _this.options.preview;
      var image = createElement('img');
      var crossOrigin = _this.crossOrigin;
      var url = crossOrigin ? _this.crossOriginUrl : _this.url;
      var previews;

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = url;
      appendChild(_this.viewBox, image);

      if (!preview) {
        return;
      }

      _this.previews = previews = document.querySelectorAll(preview);

      each(previews, function (element) {
        var image = createElement('img');

        // Save the original size for recover
        setData(element, DATA_PREVIEW, {
          width: element.offsetWidth,
          height: element.offsetHeight,
          html: element.innerHTML
        });

        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }

        image.src = url;

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */

        image.style.cssText = (
          'display:block;' +
          'width:100%;' +
          'height:auto;' +
          'min-width:0!important;' +
          'min-height:0!important;' +
          'max-width:none!important;' +
          'max-height:none!important;' +
          'image-orientation:0deg!important;"'
        );

        empty(element);
        appendChild(element, image);
      });
    },

    resetPreview: function () {
      each(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);

        setStyle(element, {
          width: data.width,
          height: data.height
        });

        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },

    preview: function () {
      var _this = this;
      var imageData = _this.imageData;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
      var cropBoxWidth = cropBoxData.width;
      var cropBoxHeight = cropBoxData.height;
      var width = imageData.width;
      var height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;
      var transform = getTransform(imageData);
      var transforms = {
            WebkitTransform: transform,
            msTransform: transform,
            transform: transform
          };

      if (!_this.cropped || _this.disabled) {
        return;
      }

      setStyle(getByTag(_this.viewBox, 'img')[0], extend({
        width: width,
        height: height,
        marginLeft: -left,
        marginTop: -top
      }, transforms));

      each(_this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
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

        setStyle(element, {
          width: newWidth,
          height: newHeight
        });

        setStyle(getByTag(element, 'img')[0], extend({
          width: width * ratio,
          height: height * ratio,
          marginLeft: -left * ratio,
          marginTop: -top * ratio
        }, transforms));
      });
    },

    bind: function () {
      var _this = this;
      var options = _this.options;
      var cropper = _this.cropper;

      addListener(cropper, EVENT_MOUSE_DOWN, (_this._cropStart = proxy(_this.cropStart, _this)));

      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, (_this._wheel = proxy(_this.wheel, _this)));
      }

      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, (_this._dblclick = proxy(_this.dblclick, _this)));
      }

      addListener(document, EVENT_MOUSE_MOVE, (_this._cropMove = proxy(_this.cropMove, _this)));
      addListener(document, EVENT_MOUSE_UP, (_this._cropEnd = proxy(_this.cropEnd, _this)));

      if (options.responsive) {
        addListener(window, EVENT_RESIZE, (_this._resize = proxy(_this.resize, _this)));
      }
    },

    unbind: function () {
      var _this = this;
      var options = _this.options;
      var cropper = _this.cropper;

      removeListener(cropper, EVENT_MOUSE_DOWN, _this._cropStart);

      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, _this._wheel);
      }

      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, _this._dblclick);
      }

      removeListener(document, EVENT_MOUSE_MOVE, _this._cropMove);
      removeListener(document, EVENT_MOUSE_UP, _this._cropEnd);

      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, _this._resize);
      }
    },

    resize: function () {
      var _this = this;
      var restore = _this.options.restore;
      var container = _this.container;
      var containerData = _this.containerData;
      var canvasData;
      var cropBoxData;
      var ratio;

      // Check `container` is necessary for IE8
      if (_this.disabled || !containerData) {
        return;
      }

      ratio = container.offsetWidth / containerData.width;

      // Resize when width changed or height changed
      if (ratio !== 1 || container.offsetHeight !== containerData.height) {
        if (restore) {
          canvasData = _this.getCanvasData();
          cropBoxData = _this.getCropBoxData();
        }

        _this.render();

        if (restore) {
          _this.setCanvasData(each(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          _this.setCropBoxData(each(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },

    dblclick: function () {
      var _this = this;

      if (_this.disabled) {
        return;
      }

      _this.setDragMode(hasClass(_this.dragBox, CLASS_CROP) ? ACTION_MOVE : ACTION_CROP);
    },

    wheel: function (event) {
      var _this = this;
      var e = getEvent(event);
      var ratio = Number(_this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (_this.disabled) {
        return;
      }

      preventDefault(e);

      // Limit wheel speed to prevent zoom too fast (#21)
      if (_this.wheeling) {
        return;
      }

      _this.wheeling = true;

      setTimeout(function () {
        _this.wheeling = false;
      }, 50);

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      _this.zoom(-delta * ratio, e);
    },

    cropStart: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var touchesLength;
      var touch;
      var action;

      if (_this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
            touch = touches[1];
            _this.startX2 = touch.pageX;
            _this.startY2 = touch.pageY;
            action = ACTION_ZOOM;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      action = action || getData(e.target, DATA_ACTION);

      if (REGEXP_ACTIONS.test(action)) {
        if (isFunction(options.cropstart) && options.cropstart.call(_this.element, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        _this.action = action;
        _this.cropping = false;

        _this.startX = touch ? touch.pageX : e.pageX;
        _this.startY = touch ? touch.pageY : e.pageY;

        if (action === ACTION_CROP) {
          _this.cropping = true;
          addClass(_this.dragBox, CLASS_MODAL);
        }
      }
    },

    cropMove: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var action = _this.action;
      var touchesLength;
      var touch;

      if (_this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
            touch = touches[1];
            _this.endX2 = touch.pageX;
            _this.endY2 = touch.pageY;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      if (action) {
        if (isFunction(options.cropmove) && options.cropmove.call(_this.element, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        _this.endX = touch ? touch.pageX : e.pageX;
        _this.endY = touch ? touch.pageY : e.pageY;

        _this.change(e.shiftKey, action === ACTION_ZOOM ? e : null);
      }
    },

    cropEnd: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var action = _this.action;

      if (_this.disabled) {
        return;
      }

      if (action) {
        preventDefault(e);

        if (_this.cropping) {
          _this.cropping = false;
          toggleClass(_this.dragBox, CLASS_MODAL, _this.cropped && options.modal);
        }

        _this.action = '';

        if (isFunction(options.cropend)) {
          options.cropend.call(_this.element, {
            originalEvent: e,
            action: action
          });
        }
      }
    },

    change: function (shiftKey, originalEvent) {
      var _this = this;
      var options = _this.options;
      var aspectRatio = options.aspectRatio;
      var action = _this.action;
      var containerData = _this.containerData;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
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
      var offset;
      var range;

      // Locking aspect ratio in "free mode" by holding shift key
      if (!aspectRatio && shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }

      if (_this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + min(containerData.width, canvasData.width);
        maxHeight = minTop + min(containerData.height, canvasData.height);
      }

      range = {
        x: _this.endX - _this.startX,
        y: _this.endY - _this.startY
      };

      if (aspectRatio) {
        range.X = range.y * aspectRatio;
        range.Y = range.x / aspectRatio;
      }

      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;

        // Resize crop box
        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio &&
            (top <= minTop || bottom >= maxHeight))) {

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
          if (range.y <= 0 && (top <= minTop || aspectRatio &&
            (left <= minLeft || right >= maxWidth))) {

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
          if (range.x <= 0 && (left <= minLeft || aspectRatio &&
            (top <= minTop || bottom >= maxHeight))) {

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
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio &&
            (left <= minLeft || right >= maxWidth))) {

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
        case ACTION_MOVE:
          _this.move(range.x, range.y);
          renderable = false;
          break;

        // Zoom canvas
        case ACTION_ZOOM:
          _this.zoom((function (x1, y1, x2, y2) {
            var z1 = sqrt(x1 * x1 + y1 * y1);
            var z2 = sqrt(x2 * x2 + y2 * y2);

            return (z2 - z1) / z1;
          })(
            abs(_this.startX - _this.startX2),
            abs(_this.startY - _this.startY2),
            abs(_this.endX - _this.endX2),
            abs(_this.endY - _this.endY2)
          ), originalEvent);
          _this.startX2 = _this.endX2;
          _this.startY2 = _this.endY2;
          renderable = false;
          break;

        // Create crop box
        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }

          offset = getOffset(_this.cropper);
          left = _this.startX - offset.left;
          top = _this.startY - offset.top;
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
          if (!_this.cropped) {
            removeClass(_this.cropBox, CLASS_HIDDEN);
            _this.cropped = true;

            if (_this.limited) {
              _this.limitCropBox(true, true);
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
        _this.action = action;

        _this.renderCropBox();
      }

      // Override
      _this.startX = _this.endX;
      _this.startY = _this.endY;
    },

    // Show the crop box manually
    crop: function () {
      var _this = this;

      if (_this.built && !_this.disabled) {
        if (!_this.cropped) {
          _this.cropped = true;
          _this.limitCropBox(true, true);

          if (_this.options.modal) {
            addClass(_this.dragBox, CLASS_MODAL);
          }

          removeClass(_this.cropBox, CLASS_HIDDEN);
        }

        _this.setCropBoxData(_this.initialCropBoxData);
      }

      return _this;
    },

    // Reset the image and crop box to their initial states
    reset: function () {
      var _this = this;

      if (_this.built && !_this.disabled) {
        _this.imageData = extend({}, _this.initialImageData);
        _this.canvasData = extend({}, _this.initialCanvasData);
        _this.cropBoxData = extend({}, _this.initialCropBoxData);

        _this.renderCanvas();

        if (_this.cropped) {
          _this.renderCropBox();
        }
      }

      return _this;
    },

    // Clear the crop box
    clear: function () {
      var _this = this;

      if (_this.cropped && !_this.disabled) {
        extend(_this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });

        _this.cropped = false;
        _this.renderCropBox();

        _this.limitCanvas();

        // Render canvas after crop box rendered
        _this.renderCanvas();

        removeClass(_this.dragBox, CLASS_MODAL);
        addClass(_this.cropBox, CLASS_HIDDEN);
      }

      return _this;
    },

    /**
     * Replace the image's src and rebuild the cropper
     *
     * @param {String} url
     */
    replace: function (url) {
      var _this = this;

      if (!_this.disabled && url) {
        if (_this.isImg) {
          _this.replaced = true;
          _this.element.src = url;
        }

        // Clear previous data
        _this.options.data = null;
        _this.load(url);
      }

      return _this;
    },

    // Enable (unfreeze) the cropper
    enable: function () {
      var _this = this;

      if (_this.built) {
        _this.disabled = false;
        removeClass(_this.cropper, CLASS_DISABLED);
      }

      return _this;
    },

    // Disable (freeze) the cropper
    disable: function () {
      var _this = this;

      if (_this.built) {
        _this.disabled = true;
        addClass(_this.cropper, CLASS_DISABLED);
      }

      return _this;
    },

    // Destroy the cropper and remove the instance from the image
    destroy: function () {
      var _this = this;
      var element = _this.element;
      var image = _this.image;

      if (_this.ready) {
        if (_this.isImg && _this.replaced) {
          element.src = _this.originalUrl;
        }

        _this.unbuild();
        removeClass(element, CLASS_HIDDEN);
      } else {
        if (_this.isImg) {
          removeListener(element, EVENT_LOAD, _this.start);
        } else if (image) {
          removeChild(image);
        }
      }

      removeData(element, NAMESPACE);

      return _this;
    },

    /**
     * Move the canvas with relative offsets
     *
     * @param {Number} offsetX
     * @param {Number} offsetY (optional)
     */
    move: function (offsetX, offsetY) {
      var _this = this;
      var canvasData = _this.canvasData;

      return _this.moveTo(
        isUndefined(offsetX) ? offsetX : canvasData.left + Number(offsetX),
        isUndefined(offsetY) ? offsetY : canvasData.top + Number(offsetY)
      );
    },

    /**
     * Move the canvas to an absolute point
     *
     * @param {Number} x
     * @param {Number} y (optional)
     */
    moveTo: function (x, y) {
      var _this = this;
      var canvasData = _this.canvasData;
      var changed = false;

      // If "y" is not present, its default value is "x"
      if (isUndefined(y)) {
        y = x;
      }

      x = Number(x);
      y = Number(y);

      if (_this.built && !_this.disabled && _this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }

        if (changed) {
          _this.renderCanvas(true);
        }
      }

      return _this;
    },

    /**
     * Zoom the canvas with a relative ratio
     *
     * @param {Number} ratio
     * @param {Event} _originalEvent (private)
     */
    zoom: function (ratio, _originalEvent) {
      var _this = this;
      var canvasData = _this.canvasData;

      ratio = Number(ratio);

      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      return _this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, _originalEvent);
    },

    /**
     * Zoom the canvas to an absolute ratio
     *
     * @param {Number} ratio
     * @param {Event} _originalEvent (private)
     */
    zoomTo: function (ratio, _originalEvent) {
      var _this = this;
      var options = _this.options;
      var canvasData = _this.canvasData;
      var width = canvasData.width;
      var height = canvasData.height;
      var naturalWidth = canvasData.naturalWidth;
      var naturalHeight = canvasData.naturalHeight;
      var newWidth;
      var newHeight;
      var offset;
      var center;

      ratio = Number(ratio);

      if (ratio >= 0 && _this.built && !_this.disabled && options.zoomable) {
        newWidth = naturalWidth * ratio;
        newHeight = naturalHeight * ratio;

        if (isFunction(options.zoom) && options.zoom.call(_this.element, {
          originalEvent: _originalEvent,
          oldRatio: width / naturalWidth,
          ratio: newWidth / naturalWidth
        }) === false) {
          return _this;
        }

        if (_originalEvent) {
          offset = getOffset(_this.cropper);
          center = _originalEvent.touches ? getTouchesCenter(_originalEvent.touches) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };

          // Zoom from the triggering point of the event
          canvasData.left -= (newWidth - width) * (
            ((center.pageX - offset.left) - canvasData.left) / width
          );
          canvasData.top -= (newHeight - height) * (
            ((center.pageY - offset.top) - canvasData.top) / height
          );
        } else {

          // Zoom from the center of the canvas
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }

        canvasData.width = newWidth;
        canvasData.height = newHeight;
        _this.renderCanvas(true);
      }

      return _this;
    },

    /**
     * Rotate the canvas with a relative degree
     *
     * @param {Number} degree
     */
    rotate: function (degree) {
      var _this = this;

      return _this.rotateTo((_this.imageData.rotate || 0) + Number(degree));
    },

    /**
     * Rotate the canvas to an absolute degree
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
     *
     * @param {Number} degree
     */
    rotateTo: function (degree) {
      var _this = this;

      degree = Number(degree);

      if (isNumber(degree) && _this.built && !_this.disabled && _this.options.rotatable) {
        _this.imageData.rotate = degree % 360;
        _this.rotated = true;
        _this.renderCanvas(true);
      }

      return _this;
    },

    /**
     * Scale the image
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
     *
     * @param {Number} scaleX
     * @param {Number} scaleY (optional)
     */
    scale: function (scaleX, scaleY) {
      var _this = this;
      var imageData = _this.imageData;
      var changed = false;

      // If "scaleY" is not present, its default value is "scaleX"
      if (isUndefined(scaleY)) {
        scaleY = scaleX;
      }

      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (_this.built && !_this.disabled && _this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          changed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          changed = true;
        }

        if (changed) {
          _this.renderImage(true);
        }
      }

      return _this;
    },

    /**
     * Scale the abscissa of the image
     *
     * @param {Number} scaleX
     */
    scaleX: function (scaleX) {
      var _this = this;
      var scaleY = _this.imageData.scaleY;

      return _this.scale(scaleX, isNumber(scaleY) ? scaleY : 1);
    },

    /**
     * Scale the ordinate of the image
     *
     * @param {Number} scaleY
     */
    scaleY: function (scaleY) {
      var _this = this;
      var scaleX = _this.imageData.scaleX;

      return _this.scale(isNumber(scaleX) ? scaleX : 1, scaleY);
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     *
     * @param {Boolean} rounded (optional)
     * @return {Object} data
     */
    getData: function (rounded) {
      var _this = this;
      var options = _this.options;
      var imageData = _this.imageData;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
      var ratio;
      var data;

      if (_this.built && _this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };

        ratio = imageData.width / imageData.naturalWidth;

        each(data, function (n, i) {
          n = n / ratio;
          data[i] = rounded ? round(n) : n;
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
    setData: function (data) {
      var _this = this;
      var options = _this.options;
      var imageData = _this.imageData;
      var canvasData = _this.canvasData;
      var cropBoxData = {};
      var rotated;
      var scaled;
      var ratio;

      if (isFunction(data)) {
        data = data.call(_this.element);
      }

      if (_this.built && !_this.disabled && isPlainObject(data)) {
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            _this.rotated = rotated = true;
          }
        }

        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            scaled = true;
          }

          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            scaled = true;
          }
        }

        if (rotated) {
          _this.renderCanvas();
        } else if (scaled) {
          _this.renderImage();
        }

        ratio = imageData.width / imageData.naturalWidth;

        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }

        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }

        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }

        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }

        _this.setCropBoxData(cropBoxData);
      }

      return _this;
    },

    /**
     * Get the container size data
     *
     * @return {Object} data
     */
    getContainerData: function () {
      var _this = this;

      return _this.built ? _this.containerData : {};
    },

    /**
     * Get the image position and size data
     *
     * @return {Object} data
     */
    getImageData: function () {
      var _this = this;

      return _this.ready ? _this.imageData : {};
    },

    /**
     * Get the canvas position and size data
     *
     * @return {Object} data
     */
    getCanvasData: function () {
      var _this = this;
      var canvasData = _this.canvasData;
      var data = {};

      if (_this.built) {
        each([
          'left',
          'top',
          'width',
          'height',
          'naturalWidth',
          'naturalHeight'
        ], function (n) {
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
    setCanvasData: function (data) {
      var _this = this;
      var canvasData = _this.canvasData;
      var aspectRatio = canvasData.aspectRatio;

      if (isFunction(data)) {
        data = data.call(_this.element);
      }

      if (_this.built && !_this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }

        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }

        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }

        _this.renderCanvas(true);
      }

      return _this;
    },

    /**
     * Get the crop box position and size data
     *
     * @return {Object} data
     */
    getCropBoxData: function () {
      var _this = this;
      var cropBoxData = _this.cropBoxData;
      var data;

      if (_this.built && _this.cropped) {
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
    setCropBoxData: function (data) {
      var _this = this;
      var cropBoxData = _this.cropBoxData;
      var aspectRatio = _this.options.aspectRatio;
      var widthChanged;
      var heightChanged;

      if (isFunction(data)) {
        data = data.call(_this.element);
      }

      if (_this.built && _this.cropped && !_this.disabled && isPlainObject(data)) {

        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }

        if (isNumber(data.width)) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }

        if (isNumber(data.height)) {
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

        _this.renderCropBox();
      }

      return _this;
    },

    /**
     * Get a canvas drawn the cropped image
     *
     * @param {Object} options (optional)
     * @return {HTMLCanvasElement} canvas
     */
    getCroppedCanvas: function (options) {
      var _this = this;
      var originalWidth;
      var originalHeight;
      var canvasWidth;
      var canvasHeight;
      var scaledWidth;
      var scaledHeight;
      var scaledRatio;
      var aspectRatio;
      var canvas;
      var context;
      var data;

      if (!_this.built || !_this.cropped || !SUPPORT_CANVAS) {
        return;
      }

      if (!isPlainObject(options)) {
        options = {};
      }

      data = _this.getData();
      originalWidth = data.width;
      originalHeight = data.height;
      aspectRatio = originalWidth / originalHeight;

      if (isPlainObject(options)) {
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
      canvasWidth = floor(scaledWidth || originalWidth);
      canvasHeight = floor(scaledHeight || originalHeight);

      canvas = createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context = canvas.getContext('2d');

      if (options.fillColor) {
        context.fillStyle = options.fillColor;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
      context.drawImage.apply(context, (function () {
        var source = getSourceCanvas(_this.image, _this.imageData);
        var sourceWidth = source.width;
        var sourceHeight = source.height;
        var args = [source];

        // Source canvas
        var srcX = data.x;
        var srcY = data.y;
        var srcWidth;
        var srcHeight;

        // Destination canvas
        var dstX;
        var dstY;
        var dstWidth;
        var dstHeight;

        if (srcX <= -originalWidth || srcX > sourceWidth) {
          srcX = srcWidth = dstX = dstWidth = 0;
        } else if (srcX <= 0) {
          dstX = -srcX;
          srcX = 0;
          srcWidth = dstWidth = min(sourceWidth, originalWidth + srcX);
        } else if (srcX <= sourceWidth) {
          dstX = 0;
          srcWidth = dstWidth = min(originalWidth, sourceWidth - srcX);
        }

        if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
          srcY = srcHeight = dstY = dstHeight = 0;
        } else if (srcY <= 0) {
          dstY = -srcY;
          srcY = 0;
          srcHeight = dstHeight = min(sourceHeight, originalHeight + srcY);
        } else if (srcY <= sourceHeight) {
          dstY = 0;
          srcHeight = dstHeight = min(originalHeight, sourceHeight - srcY);
        }

        args.push(floor(srcX), floor(srcY), floor(srcWidth), floor(srcHeight));

        // Scale destination sizes
        if (scaledRatio) {
          dstX *= scaledRatio;
          dstY *= scaledRatio;
          dstWidth *= scaledRatio;
          dstHeight *= scaledRatio;
        }

        // Avoid "IndexSizeError" in IE and Firefox
        if (dstWidth > 0 && dstHeight > 0) {
          args.push(floor(dstX), floor(dstY), floor(dstWidth), floor(dstHeight));
        }

        return args;
      }).call(_this));

      return canvas;
    },

    /**
     * Change the aspect ratio of the crop box
     *
     * @param {Number} aspectRatio
     */
    setAspectRatio: function (aspectRatio) {
      var _this = this;
      var options = _this.options;

      if (!_this.disabled && !isUndefined(aspectRatio)) {

        // 0 -> NaN
        options.aspectRatio = max(0, aspectRatio) || NaN;

        if (_this.built) {
          _this.initCropBox();

          if (_this.cropped) {
            _this.renderCropBox();
          }
        }
      }

      return _this;
    },

    /**
     * Change the drag mode
     *
     * @param {String} mode (optional)
     */
    setDragMode: function (mode) {
      var _this = this;
      var options = _this.options;
      var dragBox = _this.dragBox;
      var face = _this.face;
      var croppable;
      var movable;

      if (_this.ready && !_this.disabled) {
        croppable = mode === ACTION_CROP;
        movable = options.movable && mode === ACTION_MOVE;
        mode = (croppable || movable) ? mode : ACTION_NONE;

        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);

        if (!options.cropBoxMovable) {

          // Sync drag mode to crop box when it is not movable
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }

      return _this;
    }
  };

  Cropper.DEFAULTS = {

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
    build: null,
    built: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  Cropper.TEMPLATE = (function (source, words) {
    words = words.split(',');

    return source.replace(/\d+/g, function (i) {
      return words[i];
    });
  })('<0 6="5-container"><0 6="5-wrap-9"><0 6="5-canvas"></0></0><0 6="5-drag-9"></0><0 6="5-crop-9"><1 6="5-view-9"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-center"></1><1 6="5-face"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>', 'div,span,action,data,point,cropper,class,line,dashed,box');

  /*Cropper.TEMPLATE = (
    '<div class="cropper-container">' +
      '<div class="cropper-wrap-box">' +
        '<div class="cropper-canvas"></div>' +
      '</div>' +
      '<div class="cropper-drag-box"></div>' +
      '<div class="cropper-crop-box">' +
        '<span class="cropper-view-box"></span>' +
        '<span class="cropper-dashed dashed-h"></span>' +
        '<span class="cropper-dashed dashed-v"></span>' +
        '<span class="cropper-center"></span>' +
        '<span class="cropper-face"></span>' +
        '<span class="cropper-line line-e" data-action="e"></span>' +
        '<span class="cropper-line line-n" data-action="n"></span>' +
        '<span class="cropper-line line-w" data-action="w"></span>' +
        '<span class="cropper-line line-s" data-action="s"></span>' +
        '<span class="cropper-point point-e" data-action="e"></span>' +
        '<span class="cropper-point point-n" data-action="n"></span>' +
        '<span class="cropper-point point-w" data-action="w"></span>' +
        '<span class="cropper-point point-s" data-action="s"></span>' +
        '<span class="cropper-point point-ne" data-action="ne"></span>' +
        '<span class="cropper-point point-nw" data-action="nw"></span>' +
        '<span class="cropper-point point-sw" data-action="sw"></span>' +
        '<span class="cropper-point point-se" data-action="se"></span>' +
      '</div>' +
    '</div>'
  );*/

  var _Cropper = window.Cropper;

  Cropper.noConflict = function () {
    window.Cropper = _Cropper;
    return Cropper;
  };

  Cropper.setDefaults = function (options) {
    extend(Cropper.DEFAULTS, options);
  };

  if (typeof define === 'function' && define.amd) {
    define('cropper', [], function () {
      return Cropper;
    });
  }

  if (!noGlobal) {
    window.Cropper = Cropper;
  }

  return Cropper;

});
