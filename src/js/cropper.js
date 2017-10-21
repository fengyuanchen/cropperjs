import DEFAULTS from './defaults';
import TEMPLATE from './template';
import render from './render';
import preview from './preview';
import events from './events';
import handlers from './handlers';
import change from './change';
import methods from './methods';
import {
  ACTION_ALL,
  CLASS_HIDDEN,
  CLASS_HIDE,
  CLASS_INVISIBLE,
  CLASS_MODAL,
  CLASS_MOVE,
  DATA_ACTION,
  EVENT_CROP,
  EVENT_ERROR,
  EVENT_LOAD,
  EVENT_READY,
  NAMESPACE,
  REGEXP_DATA_URL,
  REGEXP_DATA_URL_JPEG,
  REGEXP_TAG_NAME,
  WINDOW,
} from './constants';
import {
  addClass,
  addListener,
  addTimestamp,
  arrayBufferToDataURL,
  dataURLToArrayBuffer,
  dispatchEvent,
  extend,
  getData,
  getImageNaturalSizes,
  getOrientation,
  isCrossOriginURL,
  isFunction,
  isPlainObject,
  parseOrientation,
  proxy,
  removeClass,
  removeListener,
  setData,
} from './utilities';

const AnotherCropper = WINDOW.Cropper;

class Cropper {
  /**
   * Create a new Cropper.
   * @param {Element} element - The target element for cropping.
   * @param {Object} [options={}] - The configuration options.
   */
  constructor(element, options = {}) {
    if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
      throw new Error('The first argument is required and must be an <img> or <canvas> element.');
    }

    this.element = element;
    this.options = extend({}, DEFAULTS, isPlainObject(options) && options);
    this.complete = false;
    this.cropped = false;
    this.disabled = false;
    this.isImg = false;
    this.limited = false;
    this.loaded = false;
    this.ready = false;
    this.replaced = false;
    this.wheeling = false;
    this.originalUrl = '';
    this.canvasData = null;
    this.cropBoxData = null;
    this.previews = null;
    this.pointers = {};
    this.init();
  }

  init() {
    const { element } = this;
    const tagName = element.tagName.toLowerCase();
    let url;

    if (getData(element, NAMESPACE)) {
      return;
    }

    setData(element, NAMESPACE, this);

    if (tagName === 'img') {
      this.isImg = true;

      // e.g.: "img/picture.jpg"
      url = element.getAttribute('src') || '';
      this.originalUrl = url;

      // Stop when it's a blank image
      if (!url) {
        return;
      }

      // e.g.: "http://example.com/img/picture.jpg"
      url = element.src;
    } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
      url = element.toDataURL();
    }

    this.load(url);
  }

  load(url) {
    if (!url) {
      return;
    }

    this.url = url;
    this.imageData = {};

    const { element, options } = this;

    if (!options.checkOrientation || !window.ArrayBuffer) {
      this.clone();
      return;
    }

    // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
    if (REGEXP_DATA_URL.test(url)) {
      if (REGEXP_DATA_URL_JPEG.test(url)) {
        this.read(dataURLToArrayBuffer(url));
      } else {
        this.clone();
      }

      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.onerror = () => {
      this.clone();
    };

    xhr.onload = () => {
      this.read(xhr.response);
    };

    if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
      url = addTimestamp(url);
    }

    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.withCredentials = element.crossOrigin === 'use-credentials';
    xhr.send();
  }

  read(arrayBuffer) {
    const { options, imageData } = this;
    const orientation = getOrientation(arrayBuffer);
    let rotate = 0;
    let scaleX = 1;
    let scaleY = 1;

    if (orientation > 1) {
      this.url = arrayBufferToDataURL(arrayBuffer, 'image/jpeg');
      ({ rotate, scaleX, scaleY } = parseOrientation(orientation));
    }

    if (options.rotatable) {
      imageData.rotate = rotate;
    }

    if (options.scalable) {
      imageData.scaleX = scaleX;
      imageData.scaleY = scaleY;
    }

    this.clone();
  }

  clone() {
    const { element, url } = this;
    let crossOrigin;
    let crossOriginUrl;

    if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
      ({ crossOrigin } = element);

      if (crossOrigin) {
        crossOriginUrl = url;
      } else {
        crossOrigin = 'anonymous';

        // Bust cache when there is not a "crossOrigin" property
        crossOriginUrl = addTimestamp(url);
      }
    }

    this.crossOrigin = crossOrigin;
    this.crossOriginUrl = crossOriginUrl;

    const image = document.createElement('img');

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = crossOriginUrl || url;

    const start = proxy(this.start, this);
    const stop = proxy(this.stop, this);

    this.image = image;
    this.onStart = start;
    this.onStop = stop;

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
      element.parentNode.insertBefore(image, element.nextSibling);
    }
  }

  start(event) {
    const image = this.isImg ? this.element : this.image;

    if (event) {
      removeListener(image, EVENT_LOAD, this.onStart);
      removeListener(image, EVENT_ERROR, this.onStop);
    }

    getImageNaturalSizes(image, (naturalWidth, naturalHeight) => {
      extend(this.imageData, {
        naturalWidth,
        naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
      });
      this.loaded = true;
      this.build();
    });
  }

  stop() {
    const { image } = this;

    removeListener(image, EVENT_LOAD, this.onStart);
    removeListener(image, EVENT_ERROR, this.onStop);
    image.parentNode.removeChild(image);
    this.image = null;
  }

  build() {
    if (!this.loaded) {
      return;
    }

    // Unbuild first when replace
    if (this.ready) {
      this.unbuild();
    }

    const { element, options, image } = this;

    // Create cropper elements
    const container = element.parentNode;
    const template = document.createElement('div');

    template.innerHTML = TEMPLATE;

    const cropper = template.querySelector(`.${NAMESPACE}-container`);
    const canvas = cropper.querySelector(`.${NAMESPACE}-canvas`);
    const dragBox = cropper.querySelector(`.${NAMESPACE}-drag-box`);
    const cropBox = cropper.querySelector(`.${NAMESPACE}-crop-box`);
    const face = cropBox.querySelector(`.${NAMESPACE}-face`);

    this.container = container;
    this.cropper = cropper;
    this.canvas = canvas;
    this.dragBox = dragBox;
    this.cropBox = cropBox;
    this.viewBox = cropper.querySelector(`.${NAMESPACE}-view-box`);
    this.face = face;

    canvas.appendChild(image);

    // Hide the original image
    addClass(element, CLASS_HIDDEN);

    // Inserts the cropper after to the current image
    container.insertBefore(cropper, element.nextSibling);

    // Show the image if is hidden
    if (!this.isImg) {
      removeClass(image, CLASS_HIDE);
    }

    this.initPreview();
    this.bind();

    options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
    options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;

    this.cropped = options.autoCrop;

    if (options.autoCrop) {
      if (options.modal) {
        addClass(dragBox, CLASS_MODAL);
      }
    } else {
      addClass(cropBox, CLASS_HIDDEN);
    }

    if (!options.guides) {
      addClass(cropBox.getElementsByClassName(`${NAMESPACE}-dashed`), CLASS_HIDDEN);
    }

    if (!options.center) {
      addClass(cropBox.getElementsByClassName(`${NAMESPACE}-center`), CLASS_HIDDEN);
    }

    if (options.background) {
      addClass(cropper, `${NAMESPACE}-bg`);
    }

    if (!options.highlight) {
      addClass(face, CLASS_INVISIBLE);
    }

    if (options.cropBoxMovable) {
      addClass(face, CLASS_MOVE);
      setData(face, DATA_ACTION, ACTION_ALL);
    }

    if (!options.cropBoxResizable) {
      addClass(cropBox.getElementsByClassName(`${NAMESPACE}-line`), CLASS_HIDDEN);
      addClass(cropBox.getElementsByClassName(`${NAMESPACE}-point`), CLASS_HIDDEN);
    }

    this.setDragMode(options.dragMode);
    this.render();
    this.ready = true;
    this.setData(options.data);

    // Call the "ready" option asynchronously to keep "image.cropper" is defined
    this.completing = setTimeout(() => {
      if (isFunction(options.ready)) {
        addListener(element, EVENT_READY, options.ready, {
          once: true,
        });
      }

      dispatchEvent(element, EVENT_READY);
      dispatchEvent(element, EVENT_CROP, this.getData());

      this.complete = true;
    }, 0);
  }

  unbuild() {
    if (!this.ready) {
      return;
    }

    if (!this.complete) {
      clearTimeout(this.completing);
    }

    this.ready = false;
    this.complete = false;
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
    this.cropper.parentNode.removeChild(this.cropper);
    this.cropper = null;
  }

  /**
   * Get the no conflict cropper class.
   * @returns {Cropper} The cropper class.
   */
  static noConflict() {
    window.Cropper = AnotherCropper;
    return Cropper;
  }

  /**
   * Change the default options.
   * @param {Object} options - The new default options.
   */
  static setDefaults(options) {
    extend(DEFAULTS, isPlainObject(options) && options);
  }
}

extend(Cropper.prototype, render, preview, events, handlers, change, methods);

export default Cropper;
