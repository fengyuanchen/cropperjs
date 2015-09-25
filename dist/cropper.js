/*!
 * Cropper v0.1.0
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2015-09-25T09:19:59.321Z
 */

(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error('Cropper requires a window with a document');
      }

      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  'use strict';

  // Globals
  var document = window.document;
  var location = window.location;

  // Constants
  var NAMESPACE = 'cropper';

  // Classes
  var CLASS_MODAL = 'cropper-modal';
  var CLASS_HIDE = 'cropper-hide';
  var CLASS_HIDDEN = 'cropper-hidden';
  var CLASS_INVISIBLE = 'cropper-invisible';
  var CLASS_MOVE = 'cropper-move';
  var CLASS_CROP = 'cropper-crop';
  var CLASS_DISABLED = 'cropper-disabled';
  var CLASS_BG = 'cropper-bg';

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
  var REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;
  var REGEXP_SPACES = /\s+/;
  var REGEXP_TYPES = /\s([a-zA-Z]+)/;
  var REGEXP_TRIM = /^\s+(.*)\s+^/;

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
  var sqrt = Math.sqrt;
  var min = Math.min;
  var max = Math.max;
  var abs = Math.abs;
  var sin = Math.sin;
  var cos = Math.cos;
  var num = parseFloat;

  // Prototype
  var prototype = {
    version: '0.1.0'
  };

  // Utilities
  var EMPTY_OBJECT = {};
  var toString = EMPTY_OBJECT.toString;
  var hasOwnProperty = EMPTY_OBJECT.hasOwnProperty;

  function typeOf(obj) {
    return toString.call(obj).match(REGEXP_TYPES)[1].toLowerCase();
  }

  function isString(str) {
    return typeof str === 'string';
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
    var args = [];

    // This is necessary for IE8
    if (isNumber(offset)) {
      args.push(offset);
    }

    return args.slice.apply(obj, args);
  }

  function inArray(value, arr) {
    var index = -1;

    each(arr, function (n, i) {
      if (n === value) {
        index = i;
        return false;
      }
    });

    return index;
  }

  function trim(str) {
    if (!isString(str)) {
      str = String(str);
    }

    if (str.trim) {
      str = str.trim();
    } else {
      str = str.replace(REGEXP_TRIM, '$1');
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
          if (hasOwnProperty.call(obj, i)) {
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
    var args = toArray(arguments);

    if (args.length > 1) {
      args.shift();
    }

    each(args, function (arg) {
      each(arg, function (prop, i) {
        obj[i] = prop;
      });
    });

    return obj;
  }

  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
    };
  }

  function parseClass(className) {
    return trim(className).split(REGEXP_SPACES);
  }

  function hasClass(element, value) {
    return element.className.indexOf(value) > -1;
  }

  function addClass(element, value) {
    var classes;

    if (isNumber(element.length)) {
      return each(element, function (elem) {
        addClass(elem, value);
      });
    }

    classes = parseClass(element.className);

    each(parseClass(value), function (n) {
      if (inArray(n, classes) < 0) {
        classes.push(n);
      }
    });

    element.className = classes.join(' ');
  }

  function removeClass(element, value) {
    var classes;

    if (isNumber(element.length)) {
      return each(element, function (elem) {
        removeClass(elem, value);
      });
    }

    classes = parseClass(element.className);

    each(parseClass(value), function (n, i) {
      if ((i = inArray(n, classes)) > -1) {
        classes.splice(i, 1);
      }
    });

    element.className = classes.join(' ');
  }

  function toggleClass(element, value, added) {
    return added ? addClass(element, value) : removeClass(element, value);
  }

  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    } else if (element.dataset) {
      return element.dataset[name];
    } else {
      return element.getAttribute('data-' + name);
    }
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
    var types;

    if (!isFunction(handler)) {
      return;
    }

    types = trim(type).split(REGEXP_SPACES);

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
    var types;

    if (!isFunction(handler)) {
      return;
    }

    types = trim(type).split(REGEXP_SPACES);

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
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
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
      top: box.top  + (window.scrollY || doc && doc.scrollTop || 0)  - (doc && doc.clientTop  || 0)
    };
  }

  function querySelector(element, selector) {
    return element.querySelector(selector);
  }

  function querySelectorAll(element, selector) {
    return element.querySelectorAll(selector);
  }

  function insertBefore(element, elem) {
    element.parentNode.insertBefore(elem, element);
  }

  function appendChild(element, elem) {
    element.appendChild(elem);
  }

  function removeChild(element) {
    element.parentNode.removeChild(element);
  }

  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function isCrossOriginURL(url) {
    var parts = url.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);

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
    newImage = document.createElement('img');

    newImage.onload = function () {
      callback(this.width, this.height);
    };

    newImage.src = image.src;
  }

  function getTransform(options) {
    var transforms = [];
    var rotate = options.rotate;
    var scaleX = options.scaleX;
    var scaleY = options.scaleY;

    if (isNumber(rotate)) {
      transforms.push('rotate(' + rotate + 'deg)');
    }

    if (isNumber(scaleX) && isNumber(scaleY)) {
      transforms.push('scale(' + scaleX + ',' + scaleY + ')');
    }

    return transforms.length ? transforms.join(' ') : 'none';
  }

  function getRotatedSizes(data, reverse) {
    var deg = abs(data.degree) % 180;
    var arc = (deg > 90 ? (180 - deg) : deg) * Math.PI / 180;
    var sinArc = sin(arc);
    var cosArc = cos(arc);
    var width = data.width;
    var height = data.height;
    var aspectRatio = data.aspectRatio;
    var newWidth;
    var newHeight;

    if (!reverse) {
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
    var canvas = document.createElement('canvas');
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
      context.rotate(rotate * Math.PI / 180);
    }

    // Should call `scale` after rotated
    if (scalable) {
      context.scale(scaleX, scaleY);
    }

    context.drawImage(image, x, y, width, height);

    if (advanced) {
      context.restore();
    }

    return canvas;
  }

  function Cropper(element, options) {
    this.element = element;
    this.options = extend({}, Cropper.DEFAULTS, isPlainObject(options) && options);
    this.ready = false;
    this.built = false;
    this.complete = false;
    this.rotated = false;
    this.cropped = false;
    this.disabled = false;
    this.replaced = false;
    this.isImg = false;
    this.originalUrl = '';
    this.canvasData = null;
    this.cropBoxData = null;
    this.previews = null;
    this.init();
  }

  extend(prototype, {
    init: function () {
      var element = this.element;
      var tagName = element.tagName.toLowerCase();
      var url;

      if (getData(element, NAMESPACE)) {
        return;
      }

      setData(element, NAMESPACE, this);

      if (tagName === 'img') {
        this.isImg = true;

        // Should use `fn.attr` here. e.g.: "img/picture.jpg"
        this.originalUrl = url = element.getAttribute('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // Should use `fn.prop` here. e.g.: "http://example.com/img/picture.jpg"
        url = element.src;
      } else if (tagName === 'canvas' && SUPPORT_CANVAS) {
        url = element.toDataURL();
      }

      this.load(url);
    },

    load: function (url) {
      var options = this.options;
      var element = this.element;
      var crossOrigin;
      var bustCacheUrl;
      var image;
      var start;
      var stop;

      if (!url) {
        return;
      }

      this.url = url;

      if (isFunction(options.build) && options.build.call(element) === false) {
        return;
      }

      if (options.checkImageOrigin && isCrossOriginURL(url)) {
        crossOrigin = 'anonymous';

        if (!element.crossOrigin) {
          bustCacheUrl = addTimestamp(url);
        }
      }

      image = document.createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = bustCacheUrl || url;
      this.image = image;
      this._start = start = proxy(this.start, this);
      this._stop = stop = proxy(this.stop, this);

      if (this.isImg) {
        if (element.complete) {
          this.start();
        } else {
          addListener(element, EVENT_LOAD, start);
        }
      } else {
        addListener(image, EVENT_LOAD, start);
        addListener(image, EVENT_ERROR, stop);
        addClass(image, CLASS_HIDE);
        insertBefore(element, image);
      }
    },

    start: function (event) {
      var image = this.isImg ? this.element : this.image;

      if (event) {
        removeListener(image, EVENT_LOAD, this._start);
        removeListener(image, EVENT_ERROR, this._stop);
      }

      getImageSize(image, proxy(function (naturalWidth, naturalHeight) {
        this.imageData = {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        };

        this.ready = true;
        this.build();
      }, this));
    },

    stop: function () {
      var image = this.image;

      removeListener(image, EVENT_LOAD, this._start);
      removeListener(image, EVENT_ERROR, this._stop);

      removeChild(image);
      this.image = null;
    }
  });

  extend(prototype, {
    build: function () {
      var options = this.options;
      var element = this.element;
      var image = this.image;
      var template;
      var cropper;
      var canvas;
      var dragBox;
      var cropBox;
      var face;

      if (!this.ready) {
        return;
      }

      // Unbuild first when replace
      if (this.built) {
        this.unbuild();
      }

      template = document.createElement('div');
      template.innerHTML = Cropper.TEMPLATE;

      // Create cropper elements
      this.container = element.parentNode;
      this.cropper = cropper = querySelector(template, '.cropper-container');
      this.canvas = canvas = querySelector(cropper, '.cropper-canvas');
      this.dragBox = dragBox = querySelector(cropper, '.cropper-drag-box');
      this.cropBox = cropBox = querySelector(cropper, '.cropper-crop-box');
      this.viewBox = querySelector(cropper, '.cropper-view-box');
      this.face = face = querySelector(cropBox, '.cropper-face');

      appendChild(canvas, image);

      // Hide the original image
      addClass(element, CLASS_HIDDEN);
      insertBefore(element, cropper);

      // Show the image if is hidden
      if (!this.isImg) {
        removeClass(image, CLASS_HIDE);
      }

      this.initPreview();
      this.bind();

      // Format aspect ratio (0 -> NaN)
      options.aspectRatio = num(options.aspectRatio) || NaN;

      if (options.autoCrop) {
        this.cropped = true;

        if (options.modal) {
          addClass(dragBox, CLASS_MODAL);
        }
      } else {
        addClass(cropBox, CLASS_HIDDEN);
      }

      if (!options.guides) {
        addClass(querySelectorAll(cropBox, '.cropper-dashed'), CLASS_HIDDEN);
      }

      if (!options.center) {
        addClass(querySelector(cropBox, '.cropper-center'), CLASS_HIDDEN);
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
        addClass(querySelectorAll(cropBox, '.cropper-line'), CLASS_HIDDEN);
        addClass(querySelectorAll(cropBox, '.cropper-point'), CLASS_HIDDEN);
      }

      this.setDragMode(
        options.dragCrop ? ACTION_CROP :
        options.movable ? ACTION_MOVE :
        ACTION_NONE
      );

      this.render();
      this.built = true;
      this.setData(options.data);

      // Call the built asynchronously to keep "image.cropper" is defined
      setTimeout(proxy(function () {
        if (isFunction(options.built)) {
          options.built.call(element);
        }

        if (isFunction(options.crop)) {
          options.crop.call(element, this.getData());
        }

        this.complete = true;
      }, this), 0);
    },

    unbuild: function () {
      if (!this.built) {
        return;
      }

      this.built = false;
      this.initialImageData = null;

      // Clear `initialCanvasData` is necessary when replace
      this.initialCanvasData = null;
      this.initialCropBoxData = null;
      this.containerData = null;
      this.canvasData = null;

      // Clear `cropBoxData` is necessary when replace
      this.cropBoxData = null;
      this.unbind();

      this.resetPreview();
      this.previews = null;

      this.viewBox = null;
      this.cropBox = null;
      this.dragBox = null;
      this.canvas = null;
      this.container = null;

      removeChild(this.cropper);
      this.cropper = null;
    }
  });

  extend(prototype, {
    render: function () {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();

      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    initContainer: function () {
      var options = this.options;
      var element = this.element;
      var container = this.container;
      var cropper = this.cropper;
      var containerData;

      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);

      this.containerData = containerData = {
        width: max(container.offsetWidth, num(options.minContainerWidth) || 200),
        height: max(container.offsetHeight, num(options.minContainerHeight) || 100)
      };

      cropper.style.cssText = (
        'width:' + containerData.width + 'px;' +
        'height:' + containerData.height + 'px'
      );

      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },

    // Canvas (image wrapper)
    initCanvas: function () {
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var imageData = this.imageData;
      var aspectRatio = imageData.aspectRatio;
      var canvasData = {
            aspectRatio: aspectRatio,
            width: containerWidth,
            height: containerHeight
          };

      if (containerHeight * aspectRatio > containerWidth) {
        canvasData.height = containerWidth / aspectRatio;
      } else {
        canvasData.width = containerHeight * aspectRatio;
      }

      canvasData.oldLeft = canvasData.left = (containerWidth - canvasData.width) / 2;
      canvasData.oldTop = canvasData.top = (containerHeight - canvasData.height) / 2;

      this.canvasData = canvasData;
      this.limitCanvas(true, true);
      this.initialImageData = extend({}, imageData);
      this.initialCanvasData = extend({}, canvasData);
    },

    limitCanvas: function (size, position) {
      var options = this.options;
      var strict = options.strict;
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      var cropBoxData = this.cropBoxData;
      var cropped = this.cropped && cropBoxData;
      var initialCanvasData = this.initialCanvasData || canvasData;
      var initialCanvasWidth = initialCanvasData.width;
      var initialCanvasHeight = initialCanvasData.height;
      var minCanvasWidth;
      var minCanvasHeight;

      if (size) {
        minCanvasWidth = num(options.minCanvasWidth) || 0;
        minCanvasHeight = num(options.minCanvasHeight) || 0;

        if (minCanvasWidth) {
          if (strict) {
            minCanvasWidth = max(
              cropped ? cropBoxData.width : initialCanvasWidth,
              minCanvasWidth
            );
          }

          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else if (minCanvasHeight) {
          if (strict) {
            minCanvasHeight = max(
              cropped ? cropBoxData.height : initialCanvasHeight,
              minCanvasHeight
            );
          }

          minCanvasWidth = minCanvasHeight * aspectRatio;
        } else if (strict) {
          if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;

            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          } else {
            minCanvasWidth = initialCanvasWidth;
            minCanvasHeight = initialCanvasHeight;
          }
        }

        extend(canvasData, {
          minWidth: minCanvasWidth,
          minHeight: minCanvasHeight,
          maxWidth: Infinity,
          maxHeight: Infinity
        });
      }

      if (position) {
        if (strict) {
          if (cropped) {
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
          } else {
            canvasData.minLeft = min(0, containerWidth - canvasData.width);
            canvasData.minTop = min(0, containerHeight - canvasData.height);
            canvasData.maxLeft = max(0, containerWidth - canvasData.width);
            canvasData.maxTop = max(0, containerHeight - canvasData.height);
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerWidth;
          canvasData.maxTop = containerHeight;
        }
      }
    },

    renderCanvas: function (changed) {
      var options = this.options;
      var canvasData = this.canvasData;
      var imageData = this.imageData;
      var aspectRatio;
      var rotated;

      if (this.rotated) {
        this.rotated = false;

        // Computes rotated sizes with image sizes
        rotated = getRotatedSizes({
          width: imageData.width,
          height: imageData.height,
          degree: imageData.rotate
        });

        aspectRatio = rotated.width / rotated.height;

        if (aspectRatio !== canvasData.aspectRatio) {
          canvasData.left -= (rotated.width - canvasData.width) / 2;
          canvasData.top -= (rotated.height - canvasData.height) / 2;
          canvasData.width = rotated.width;
          canvasData.height = rotated.height;
          canvasData.aspectRatio = aspectRatio;
          this.limitCanvas(true, false);
        }
      }

      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }

      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
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

      this.limitCanvas(false, true);

      canvasData.oldLeft = canvasData.left = min(
        max(canvasData.left, canvasData.minLeft),
        canvasData.maxLeft
      );
      canvasData.oldTop = canvasData.top = min(
        max(canvasData.top, canvasData.minTop),
        canvasData.maxTop
      );

      this.canvas.style.cssText = (
        'width:' + canvasData.width + 'px;' +
        'height:' + canvasData.height + 'px;' +
        'left:' + canvasData.left + 'px;' +
        'top:' + canvasData.top + 'px;'
      );

      this.renderImage();

      if (this.cropped && options.strict) {
        this.limitCropBox(true, true);
      }

      if (changed) {
        this.output();
      }
    },

    renderImage: function (changed) {
      var canvasData = this.canvasData;
      var imageData = this.imageData;
      var reversed;

      if (imageData.rotate) {
        reversed = getRotatedSizes({
          width: canvasData.width,
          height: canvasData.height,
          degree: imageData.rotate,
          aspectRatio: imageData.aspectRatio
        }, true);
      }

      extend(imageData, reversed ? {
        width: reversed.width,
        height: reversed.height,
        left: (canvasData.width - reversed.width) / 2,
        top: (canvasData.height - reversed.height) / 2
      } : {
        width: canvasData.width,
        height: canvasData.height,
        left: 0,
        top: 0
      });

      this.image.style.cssText = (
        'width:' + imageData.width + 'px;' +
        'height:' + imageData.height + 'px;' +
        'margin-left:' + imageData.left + 'px;' +
        'margin-top:' + imageData.top + 'px;' +
        'transform:' + getTransform(imageData)
      );

      if (changed) {
        this.output();
      }
    },

    initCropBox: function () {
      var options = this.options;
      var aspectRatio = options.aspectRatio;
      var autoCropArea = num(options.autoCropArea) || 0.8;
      var canvasData = this.canvasData;
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

      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true);

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
      cropBoxData.oldLeft = cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.oldTop = cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;

      this.initialCropBoxData = extend({}, cropBoxData);
    },

    limitCropBox: function (size, position) {
      var options = this.options;
      var strict = options.strict;
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
      var aspectRatio = options.aspectRatio;
      var minCropBoxWidth;
      var minCropBoxHeight;

      if (size) {
        minCropBoxWidth = num(options.minCropBoxWidth) || 0;
        minCropBoxHeight = num(options.minCropBoxHeight) || 0;

        // The "min/maxCropBoxWidth/Height" must less than container width/height
        cropBoxData.minWidth = min(containerWidth, minCropBoxWidth);
        cropBoxData.minHeight = min(containerHeight, minCropBoxHeight);
        cropBoxData.maxWidth = min(
          containerWidth,
          strict ? canvasData.width : containerWidth
        );
        cropBoxData.maxHeight = min(
          containerHeight,
          strict ? canvasData.height : containerHeight
        );

        if (aspectRatio) {

          // Compare crop box size with container first
          if (cropBoxData.maxHeight * aspectRatio > cropBoxData.maxWidth) {
            cropBoxData.minHeight = cropBoxData.minWidth / aspectRatio;
            cropBoxData.maxHeight = cropBoxData.maxWidth / aspectRatio;
          } else {
            cropBoxData.minWidth = cropBoxData.minHeight * aspectRatio;
            cropBoxData.maxWidth = cropBoxData.maxHeight * aspectRatio;
          }
        }

        // The "minWidth/Height" must be less than "maxWidth/Height"
        cropBoxData.minWidth = min(cropBoxData.maxWidth, cropBoxData.minWidth);
        cropBoxData.minHeight = min(cropBoxData.maxHeight, cropBoxData.minHeight);
      }

      if (position) {
        if (strict) {
          cropBoxData.minLeft = max(0, canvasData.left);
          cropBoxData.minTop = max(0, canvasData.top);
          cropBoxData.maxLeft = min(containerWidth, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = min(containerHeight, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerWidth - cropBoxData.width;
          cropBoxData.maxTop = containerHeight - cropBoxData.height;
        }
      }
    },

    renderCropBox: function () {
      var options = this.options;
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var cropBoxData = this.cropBoxData;

      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }

      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
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

      this.limitCropBox(false, true);

      cropBoxData.oldLeft = cropBoxData.left = min(
        max(cropBoxData.left, cropBoxData.minLeft),
        cropBoxData.maxLeft
      );
      cropBoxData.oldTop = cropBoxData.top = min(
        max(cropBoxData.top, cropBoxData.minTop),
        cropBoxData.maxTop
      );

      if (options.movable && options.cropBoxDataMovable) {

        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, (cropBoxData.width === containerWidth && cropBoxData.height === containerHeight) ? ACTION_MOVE : ACTION_ALL);
      }

      this.cropBox.style.cssText = (
        'width:' + cropBoxData.width + 'px;' +
        'height:' + cropBoxData.height + 'px;' +
        'left:' + cropBoxData.left + 'px;' +
        'top:' + cropBoxData.top + 'px;'
      );

      if (this.cropped && options.strict) {
        this.limitCanvas(true, true);
      }

      if (!this.disabled) {
        this.output();
      }
    },

    output: function () {
      var options = this.options;

      this.preview();

      if (this.complete && isFunction(options.crop)) {
        options.crop.call(this.element, this.getData());
      }
    }
  });

  extend(prototype, {
    initPreview: function () {
      var preview = this.options.preview;
      var url = this.url;
      var image = document.createElement('img');
      var previews;

      image.src = url;
      appendChild(this.viewBox, image);

      if (!preview) {
        return;
      }

      this.previews = previews = querySelectorAll(document, preview);
      each(previews, function (element) {
        var image = document.createElement('img');

        // Save the original size for recover
        setData(element, DATA_PREVIEW, {
          width: element.offsetWidth,
          height: element.offsetHeight,
          html: element.innerHTML
        });

        image.src = url;

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */
        image.style.cssText = (
          'display:block;width:100%;height:auto;' +
          'min-width:0!important;min-height:0!important;' +
          'max-width:none!important;max-height:none!important;' +
          'image-orientation:0deg!important"'
        );

        empty(element);
        appendChild(element, image);
      });
    },

    resetPreview: function () {
      each(this.previews, function (element) {
        element.innerHTML = getData(element, DATA_PREVIEW).html;
        removeData(element, DATA_PREVIEW);
      });
    },

    preview: function () {
      var imageData = this.imageData;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width;
      var cropBoxHeight = cropBoxData.height;
      var width = imageData.width;
      var height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;

      if (!this.cropped || this.disabled) {
        return;
      }

      querySelector(this.viewBox, 'img').style.cssText = (
        'width:' + width + 'px;' +
        'height:' + height + 'px;' +
        'margin-left:' + -left + 'px;' +
        'margin-top:' + -top + 'px;' +
        'transform:' + getTransform(imageData)
      );

      each(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;
        var elementStyle = element.style;
        var imageStyle = querySelector(element, 'img').style;

        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }

        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }

        elementStyle.width = newWidth + 'px';
        elementStyle.height = newHeight + 'px';
        imageStyle.width = width * ratio + 'px';
        imageStyle.height = height * ratio + 'px';
        imageStyle.marginLeft = -left * ratio + 'px';
        imageStyle.marginTop = -top * ratio + 'px';
        imageStyle.transform = getTransform(imageData);
      });
    }
  });

  extend(prototype, {
    bind: function () {
      var options = this.options;
      var cropper = this.cropper;

      addListener(cropper, EVENT_MOUSE_DOWN, proxy(this.cropStart, this));

      if (options.zoomable && options.mouseWheelZoom) {
        addListener(cropper, EVENT_WHEEL, proxy(this.wheel, this));
      }

      if (options.doubleClickToggle) {
        addListener(cropper, EVENT_DBLCLICK, proxy(this.dblclick, this));
      }

      addListener(document, EVENT_MOUSE_MOVE, (this._cropMove = proxy(this.cropMove, this)));
      addListener(document, EVENT_MOUSE_UP, (this._cropEnd = proxy(this.cropEnd, this)));

      if (options.responsive) {
        addListener(window, EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
      }
    },

    unbind: function () {
      var options = this.options;
      var cropper = this.cropper;

      removeListener(cropper, EVENT_MOUSE_DOWN, this.cropStart);

      if (options.zoomable && options.mouseWheelZoom) {
        removeListener(cropper, EVENT_WHEEL, this.wheel);
      }

      if (options.doubleClickToggle) {
        removeListener(cropper, EVENT_DBLCLICK, this.dblclick);
      }

      removeListener(document, EVENT_MOUSE_MOVE, this._cropMove);
      removeListener(document, EVENT_MOUSE_UP, this._cropEnd);

      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this._resize);
      }
    }
  });

  extend(prototype, {
    resize: function () {
      var container = this.container;
      var containerData = this.containerData;
      var canvasData;
      var cropBoxData;
      var ratio;

      // Check `container` is necessary for IE8
      if (this.disabled || !containerData) {
        return;
      }

      ratio = container.offsetWidth / containerData.width;

      // Resize when width changed or height changed
      if (ratio !== 1 || container.offsetHeight !== containerData.height) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();

        this.render();
        this.setCanvasData(each(canvasData, function (n, i) {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData(each(cropBoxData, function (n, i) {
          cropBoxData[i] = n * ratio;
        }));
      }
    },

    dblclick: function () {
      if (this.disabled) {
        return;
      }

      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? ACTION_MOVE : ACTION_CROP);
    },

    wheel: function (event) {
      var e = getEvent(event);
      var ratio = num(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (this.disabled) {
        return;
      }

      preventDefault(e);

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, e);
    },

    cropStart: function (event) {
      var options = this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var touchesLength;
      var touch;
      var action;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            touch = touches[1];
            this.startX2 = touch.pageX;
            this.startY2 = touch.pageY;
            action = ACTION_ZOOM;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      action = action || getData(e.target, DATA_ACTION);

      if (REGEXP_ACTIONS.test(action)) {
        if (isFunction(options.cropstart) && options.cropstart.call(this.element, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        this.action = action;
        this.cropping = false;

        this.startX = touch ? touch.pageX : e.pageX;
        this.startY = touch ? touch.pageY : e.pageY;

        if (action === ACTION_CROP) {
          this.cropping = true;
          addClass(this.dragBox, CLASS_MODAL);
        }
      }
    },

    cropMove: function (event) {
      var options = this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var action = this.action;
      var touchesLength;
      var touch;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            touch = touches[1];
            this.endX2 = touch.pageX;
            this.endY2 = touch.pageY;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      if (action) {
        if (isFunction(options.cropmove) && options.cropmove.call(this.element, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        this.endX = touch ? touch.pageX : e.pageX;
        this.endY = touch ? touch.pageY : e.pageY;

        this.change(e.shiftKey, action === ACTION_ZOOM ? e : null);
      }
    },

    cropEnd: function (event) {
      var options = this.options;
      var e = getEvent(event);
      var action = this.action;

      if (this.disabled) {
        return;
      }

      if (action) {
        preventDefault(e);

        if (this.cropping) {
          this.cropping = false;
          toggleClass(this.dragBox, CLASS_MODAL, this.cropped && options.modal);
        }

        this.action = '';

        if (isFunction(options.cropend)) {
          options.cropend.call(this.element, {
            originalEvent: e,
            action: action
          });
        }
      }
    }
  });

  extend(prototype, {
    change: function (shiftKey, originalEvent) {
      var options = this.options;
      var aspectRatio = options.aspectRatio;
      var action = this.action;
      var containerData = this.containerData;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
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

      if (options.strict) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + min(containerData.width, canvasData.width);
        maxHeight = minTop + min(containerData.height, canvasData.height);
      }

      range = {
        x: this.endX - this.startX,
        y: this.endY - this.startY
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
          this.move(range.x, range.y);
          renderable = false;
          break;

        // Zoom canvas
        case ACTION_ZOOM:
          this.zoom((function (x1, y1, x2, y2) {
            var z1 = sqrt(x1 * x1 + y1 * y1);
            var z2 = sqrt(x2 * x2 + y2 * y2);

            return (z2 - z1) / z1;
          })(
            abs(this.startX - this.startX2),
            abs(this.startY - this.startY2),
            abs(this.endX - this.endX2),
            abs(this.endY - this.endY2)
          ), originalEvent);
          this.startX2 = this.endX2;
          this.startY2 = this.endY2;
          renderable = false;
          break;

        // Create crop box
        case ACTION_CROP:
          if (range.x && range.y) {
            offset = getOffset(this.cropper);
            left = this.startX - offset.left;
            top = this.startY - offset.top;
            width = cropBoxData.minWidth;
            height = cropBoxData.minHeight;

            if (range.x > 0) {
              if (range.y > 0) {
                action = ACTION_SOUTH_EAST;
              } else {
                action = ACTION_NORTH_EAST;
                top -= height;
              }
            } else {
              if (range.y > 0) {
                action = ACTION_SOUTH_WEST;
                left -= width;
              } else {
                action = ACTION_NORTH_WEST;
                left -= width;
                top -= height;
              }
            }

            // Show the crop box if is hidden
            if (!this.cropped) {
              this.cropped = true;
              removeClass(this.cropBox, CLASS_HIDDEN);
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
        this.action = action;

        this.renderCropBox();
      }

      // Override
      this.startX = this.endX;
      this.startY = this.endY;
    }
  });

  extend(prototype, {

    // Show the crop box manually
    crop: function () {
      if (this.built && !this.disabled) {
        if (!this.cropped) {
          this.cropped = true;
          this.limitCropBox(true, true);

          if (this.options.modal) {
            addClass(this.dragBox, CLASS_MODAL);
          }

          removeClass(this.cropBox, CLASS_HIDDEN);
        }

        this.setCropBoxData(this.initialCropBoxData);
      }

      return this;
    },

    // Reset the image and crop box to their initial states
    reset: function () {
      if (this.built && !this.disabled) {
        this.imageData = extend({}, this.initialImageData);
        this.canvasData = extend({}, this.initialCanvasData);

        // Required for strict mode
        this.cropBoxData = extend({}, this.initialCropBoxData);

        this.renderCanvas();

        if (this.cropped) {
          this.renderCropBox();
        }
      }

      return this;
    },

    // Clear the crop box
    clear: function () {
      if (this.cropped && !this.disabled) {
        extend(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });

        this.cropped = false;
        this.renderCropBox();

        this.limitCanvas();

        // Render canvas after crop box rendered
        this.renderCanvas();

        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }

      return this;
    },

    /**
     * Replace the image's src and rebuild the cropper
     *
     * @param {String} url
     */
    replace: function (url) {
      if (!this.disabled && url) {
        if (this.isImg) {
          this.replaced = true;
          this.element.src = url;
        }

        // Clear previous data
        this.options.data = null;
        this.load(url);
      }

      return this;
    },

    // Enable (unfreeze) the cropper
    enable: function () {
      if (this.built) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },

    // Disable (freeze) the cropper
    disable: function () {
      if (this.built) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },

    // Destroy the cropper and remove the instance from the image
    destroy: function () {
      var element = this.element;
      var image = this.image;

      if (this.ready) {
        if (this.isImg && this.replaced) {
          element.asrc = this.originalUrl;
        }

        this.unbuild();
        removeClass(element, CLASS_HIDDEN);
      } else {
        if (this.isImg) {
          element.off(EVENT_LOAD, this.start);
        } else if (image) {
          removeChild(image);
        }
      }

      removeData(element, NAMESPACE);

      return this;
    },

    /**
     * Move the canvas
     *
     * @param {Number} offsetX
     * @param {Number} offsetY (optional)
     */
    move: function (offsetX, offsetY) {
      var canvasData = this.canvasData;

      // If "offsetY" is not present, its default value is "offsetX"
      if (isUndefined(offsetY)) {
        offsetY = offsetX;
      }

      offsetX = num(offsetX);
      offsetY = num(offsetY);

      if (this.built && !this.disabled && this.options.movable) {
        canvasData.left += isNumber(offsetX) ? offsetX : 0;
        canvasData.top += isNumber(offsetY) ? offsetY : 0;
        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Zoom the canvas
     *
     * @param {Number} ratio
     * @param {Event} _originalEvent (private)
     */
    zoom: function (ratio, _originalEvent) {
      var options = this.options;
      var canvasData = this.canvasData;
      var width;
      var height;

      ratio = num(ratio);

      if (ratio && this.built && !this.disabled && options.zoomable) {
        if (isFunction(options.zoom) && options.zoom.call(this.element, {
          originalEvent: _originalEvent,
          ratio: ratio
        }) === false) {
          return this;
        }

        if (ratio < 0) {
          ratio =  1 / (1 - ratio);
        } else {
          ratio = 1 + ratio;
        }

        width = canvasData.width * ratio;
        height = canvasData.height * ratio;
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        this.renderCanvas(true);
        this.setDragMode(ACTION_MOVE);
      }

      return this;
    },

    /**
     * Rotate the canvas
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
     *
     * @param {Number} degree
     */
    rotate: function (degree) {
      var imageData = this.imageData;
      var rotate = imageData.rotate || 0;

      degree = num(degree) || 0;

      if (this.built && !this.disabled && this.options.rotatable) {
        imageData.rotate = (rotate + degree) % 360;
        this.rotated = true;
        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Scale the image
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
     *
     * @param {Number} scaleX
     * @param {Number} scaleY (optional)
     */
    scale: function (scaleX, scaleY) {
      var imageData = this.imageData;

      // If "scaleY" is not present, its default value is "scaleX"
      if (isUndefined(scaleY)) {
        scaleY = scaleX;
      }

      scaleX = num(scaleX);
      scaleY = num(scaleY);

      if (this.built && !this.disabled && this.options.scalable) {
        imageData.scaleX = isNumber(scaleX) ? scaleX : 1;
        imageData.scaleY = isNumber(scaleY) ? scaleY : 1;
        this.renderImage(true);
      }

      return this;
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     *
     * @param {Boolean} rounded (optional)
     * @return {Object} data
     */
    getData: function (rounded) {
      var options = this.options;
      var imageData = this.imageData;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
      var ratio;
      var data;

      if (this.built && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };

        ratio = imageData.width / imageData.naturalWidth;

        each(data, function (n, i) {
          n = n / ratio;
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
    setData: function (data) {
      var options = this.options;
      var imageData = this.imageData;
      var canvasData = this.canvasData;
      var cropBoxData = {};
      var rotated;
      var scaled;
      var ratio;

      if (isFunction(data)) {
        data = data.call(this.element);
      }

      if (this.built && !this.disabled && isPlainObject(data)) {
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            this.rotated = rotated = true;
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
          this.renderCanvas();
        } else if (scaled) {
          this.renderImage();
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

        this.setCropBoxData(cropBoxData);
      }

      return this;
    },

    /**
     * Get the container size data
     *
     * @return {Object} data
     */
    getContainerData: function () {
      return this.built ? this.containerData : {};
    },

    /**
     * Get the image position and size data
     *
     * @return {Object} data
     */
    getImageData: function () {
      return this.ready ? this.imageData : {};
    },

    /**
     * Get the canvas position and size data
     *
     * @return {Object} data
     */
    getCanvasData: function () {
      var canvasData = this.canvasData;
      var data;

      if (this.built) {
        data = {
          left: canvasData.left,
          top: canvasData.top,
          width: canvasData.width,
          height: canvasData.height
        };
      }

      return data || {};
    },

    /**
     * Set the canvas position and size with new data
     *
     * @param {Object} data
     */
    setCanvasData: function (data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;

      if (isFunction(data)) {
        data = data.call(this.element);
      }

      if (this.built && !this.disabled && isPlainObject(data)) {
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

        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Get the crop box position and size data
     *
     * @return {Object} data
     */
    getCropBoxData: function () {
      var cropBoxData = this.cropBoxData;
      var data;

      if (this.built && this.cropped) {
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
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;

      if (isFunction(data)) {
        data = data.call(this.element);
      }

      if (this.built && this.cropped && !this.disabled && isPlainObject(data)) {

        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }

        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }

        if (isNumber(data.height) && data.height !== cropBoxData.height) {
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

        this.renderCropBox();
      }

      return this;
    },

    /**
     * Get a canvas drawn the cropped image
     *
     * @param {Object} options (optional)
     * @return {HTMLCanvasElement} canvas
     */
    getCroppedCanvas: function (options) {
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

      if (!this.built || !this.cropped || !SUPPORT_CANVAS) {
        return;
      }

      if (!isPlainObject(options)) {
        options = {};
      }

      data = this.getData();
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

      canvasWidth = scaledWidth || originalWidth;
      canvasHeight = scaledHeight || originalHeight;

      canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context = canvas.getContext('2d');

      if (options.fillColor) {
        context.fillStyle = options.fillColor;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
      context.drawImage.apply(context, (function () {
        var source = getSourceCanvas(this.image, this.imageData);
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

        args.push(srcX, srcY, srcWidth, srcHeight);

        // Scale destination sizes
        if (scaledRatio) {
          dstX *= scaledRatio;
          dstY *= scaledRatio;
          dstWidth *= scaledRatio;
          dstHeight *= scaledRatio;
        }

        // Avoid "IndexSizeError" in IE and Firefox
        if (dstWidth > 0 && dstHeight > 0) {
          args.push(dstX, dstY, dstWidth, dstHeight);
        }

        return args;
      }).call(this));

      return canvas;
    },

    /**
     * Change the aspect ratio of the crop box
     *
     * @param {Number} aspectRatio
     */
    setAspectRatio: function (aspectRatio) {
      var options = this.options;

      if (!this.disabled && !isUndefined(aspectRatio)) {

        // 0 -> NaN
        options.aspectRatio = num(aspectRatio) || NaN;

        if (this.built) {
          this.initCropBox();

          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }

      return this;
    },

    /**
     * Change the drag mode
     *
     * @param {String} mode (optional)
     */
    setDragMode: function (mode) {
      var options = this.options;
      var dragBox = this.dragBox;
      var face = this.face;
      var croppable;
      var movable;

      if (this.ready && !this.disabled) {
        croppable = options.dragCrop && mode === ACTION_CROP;
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

      return this;
    }
  });

  extend(Cropper.prototype, prototype);

  Cropper.DEFAULTS = {

    // Define the aspect ratio of the crop box
    aspectRatio: NaN,

    // An object with the previous cropping result data
    data: null,

    // A selector for adding extra containers to preview
    preview: '',

    // Strict mode, the image cannot zoom out less than the container
    strict: true,

    // Rebuild when resize the window
    responsive: true,

    // Check if the target image is cross origin
    checkImageOrigin: true,

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

    // Enable to create new crop box by dragging over the image
    dragCrop: true,

    // Enable to move the image
    movable: true,

    // Enable to rotate the image
    rotatable: true,

    // Enable to scale the image
    scalable: true,

    // Enable to zoom the image
    zoomable: true,

    // Enable to zoom the image by wheeling mouse
    mouseWheelZoom: true,

    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,

    // Enable to zoom the image by dragging touch
    touchDragZoom: true,

    // Enable to move the crop box
    cropBoxMovable: true,

    // Enable to resize the crop box
    cropBoxResizable: true,

    // Toggle drag mode between "crop" and "move" when double click on the cropper
    doubleClickToggle: true,

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

  Cropper.TEMPLATE = (
    '<div class="cropper-container">' +
      '<div class="cropper-canvas"></div>' +
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
  );

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

  if (typeof noGlobal === 'undefined') {
    window.Cropper = Cropper;
  }

  return Cropper;

});
