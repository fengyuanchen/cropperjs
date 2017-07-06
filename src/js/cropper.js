import DEFAULTS from './defaults';
import TEMPLATE from './template';
import render from './render';
import preview from './preview';
import events from './events';
import handlers from './handlers';
import change from './change';
import methods from './methods';
import * as $ from './utilities';

// Constants
const NAMESPACE = 'cropper';

// Classes
const CLASS_HIDDEN = `${NAMESPACE}-hidden`;

// Events
const EVENT_ERROR = 'error';
const EVENT_LOAD = 'load';
const EVENT_READY = 'ready';
const EVENT_CROP = 'crop';

// RegExps
const REGEXP_DATA_URL = /^data:/;
const REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;

let AnotherCropper;

class Cropper {
  constructor(element, options) {
    const self = this;

    self.element = element;
    self.options = $.extend({}, DEFAULTS, $.isPlainObject(options) && options);
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
    self.pointers = {};
    self.init();
  }

  init() {
    const self = this;
    const element = self.element;
    const tagName = element.tagName.toLowerCase();
    let url;

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

  load(url) {
    const self = this;
    const options = self.options;
    const element = self.element;

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
      if (REGEXP_DATA_URL_JPEG.test(url)) {
        self.read($.dataURLToArrayBuffer(url));
      } else {
        self.clone();
      }
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.onerror = xhr.onabort = () => {
      self.clone();
    };

    xhr.onload = () => {
      self.read(xhr.response);
    };

    if (options.checkCrossOrigin && $.isCrossOriginURL(url) && element.crossOrigin) {
      url = $.addTimestamp(url);
    }

    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.withCredentials = element.crossOrigin === 'use-credentials';
    xhr.send();
  }

  read(arrayBuffer) {
    const self = this;
    const options = self.options;
    const orientation = $.getOrientation(arrayBuffer);
    const imageData = self.imageData;
    let rotate = 0;
    let scaleX = 1;
    let scaleY = 1;

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

  clone() {
    const self = this;
    const element = self.element;
    const url = self.url;
    let crossOrigin;
    let crossOriginUrl;
    let start;
    let stop;

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

    const image = $.createElement('img');

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

  start(event) {
    const self = this;
    const image = self.isImg ? self.element : self.image;

    if (event) {
      $.removeListener(image, EVENT_LOAD, self.onStart);
      $.removeListener(image, EVENT_ERROR, self.onStop);
    }

    $.getImageSize(image, (naturalWidth, naturalHeight) => {
      $.extend(self.imageData, {
        naturalWidth,
        naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
      });

      self.loaded = true;
      self.build();
    });
  }

  stop() {
    const self = this;
    const image = self.image;

    $.removeListener(image, EVENT_LOAD, self.onStart);
    $.removeListener(image, EVENT_ERROR, self.onStop);

    $.removeChild(image);
    self.image = null;
  }

  build() {
    const self = this;
    const options = self.options;
    const element = self.element;
    const image = self.image;
    let container;
    let cropper;
    let canvas;
    let dragBox;
    let cropBox;
    let face;

    if (!self.loaded) {
      return;
    }

    // Unbuild first when replace
    if (self.ready) {
      self.unbuild();
    }

    const template = $.createElement('div');
    template.innerHTML = TEMPLATE;

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

    self.cropped = options.autoCrop;

    if (options.autoCrop) {
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
    self.completing = setTimeout(() => {
      if ($.isFunction(options.ready)) {
        $.addListener(element, EVENT_READY, options.ready, true);
      }

      $.dispatchEvent(element, EVENT_READY);
      $.dispatchEvent(element, EVENT_CROP, self.getData());

      self.complete = true;
    }, 0);
  }

  unbuild() {
    const self = this;

    if (!self.ready) {
      return;
    }

    if (!self.complete) {
      clearTimeout(self.completing);
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

  static noConflict() {
    window.Cropper = AnotherCropper;
    return Cropper;
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, $.isPlainObject(options) && options);
  }
}

$.extend(Cropper.prototype, render);
$.extend(Cropper.prototype, preview);
$.extend(Cropper.prototype, events);
$.extend(Cropper.prototype, handlers);
$.extend(Cropper.prototype, change);
$.extend(Cropper.prototype, methods);

if (typeof window !== 'undefined') {
  AnotherCropper = window.Cropper;
  window.Cropper = Cropper;
}

export default Cropper;
