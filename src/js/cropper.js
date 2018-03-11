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
  CLASS_MOVE,
  DATA_ACTION,
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
  assign,
  dataURLToArrayBuffer,
  dispatchEvent,
  getData,
  getOrientation,
  isCrossOriginURL,
  isFunction,
  isPlainObject,
  parseOrientation,
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
    this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    this.cropped = false;
    this.disabled = false;
    this.pointers = {};
    this.ready = false;
    this.reloading = false;
    this.replaced = false;
    this.sized = false;
    this.sizing = false;
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

    this.reloading = true;
    this.xhr = xhr;

    const done = () => {
      this.reloading = false;
      this.xhr = null;
    };

    xhr.ontimeout = done;
    xhr.onabort = done;
    xhr.onerror = () => {
      done();
      this.clone();
    };

    xhr.onload = () => {
      done();
      this.read(xhr.response);
    };

    // Bust cache when there is a "crossOrigin" property
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

    const start = this.start.bind(this);
    const stop = this.stop.bind(this);

    this.image = image;
    this.onStart = start;
    this.onStop = stop;

    if (this.isImg) {
      if (element.complete) {
        // start asynchronously to keep `this.cropper` is accessible in `ready` event handler.
        this.timeout = setTimeout(start, 0);
      } else {
        addListener(element, EVENT_LOAD, start, {
          once: true,
        });
      }
    } else {
      image.onload = start;
      image.onerror = stop;
      addClass(image, CLASS_HIDE);
      element.parentNode.insertBefore(image, element.nextSibling);
    }
  }

  start(event) {
    const image = this.isImg ? this.element : this.image;

    if (event) {
      image.onload = null;
      image.onerror = null;
    }

    this.sizing = true;

    const IS_SAFARI = WINDOW.navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(WINDOW.navigator.userAgent);
    const done = (naturalWidth, naturalHeight) => {
      assign(this.imageData, {
        naturalWidth,
        naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
      });
      this.sizing = false;
      this.sized = true;
      this.build();
    };

    // Modern browsers (except Safari)
    if (image.naturalWidth && !IS_SAFARI) {
      done(image.naturalWidth, image.naturalHeight);
      return;
    }

    const sizingImage = document.createElement('img');
    const body = document.body || document.documentElement;

    this.sizingImage = sizingImage;

    sizingImage.onload = () => {
      done(sizingImage.width, sizingImage.height);

      if (!IS_SAFARI) {
        body.removeChild(sizingImage);
      }
    };

    sizingImage.src = image.src;

    // iOS Safari will convert the image automatically
    // with its orientation once append it into DOM (#279)
    if (!IS_SAFARI) {
      sizingImage.style.cssText = (
        'left:0;' +
        'max-height:none!important;' +
        'max-width:none!important;' +
        'min-height:0!important;' +
        'min-width:0!important;' +
        'opacity:0;' +
        'position:absolute;' +
        'top:0;' +
        'z-index:-1;'
      );
      body.appendChild(sizingImage);
    }
  }

  stop() {
    const { image } = this;

    image.onload = null;
    image.onerror = null;
    image.parentNode.removeChild(image);
    this.image = null;
  }

  build() {
    if (!this.sized || this.ready) {
      return;
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

    addClass(cropBox, CLASS_HIDDEN);

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

    this.render();
    this.ready = true;
    this.setDragMode(options.dragMode);

    if (options.autoCrop) {
      this.crop();
    }

    this.setData(options.data);

    if (isFunction(options.ready)) {
      addListener(element, EVENT_READY, options.ready, {
        once: true,
      });
    }

    dispatchEvent(element, EVENT_READY);
  }

  unbuild() {
    if (!this.ready) {
      return;
    }

    this.ready = false;
    this.unbind();
    this.resetPreview();
    this.cropper.parentNode.removeChild(this.cropper);
    removeClass(this.element, CLASS_HIDDEN);
  }

  uncreate() {
    const { element } = this;

    if (this.ready) {
      this.unbuild();
      this.ready = false;
      this.cropped = false;
    } else if (this.sizing) {
      this.sizingImage.onload = null;
      this.sizing = false;
      this.sized = false;
    } else if (this.reloading) {
      this.xhr.abort();
    } else if (this.isImg) {
      if (element.complete) {
        clearTimeout(this.timeout);
      } else {
        removeListener(element, EVENT_LOAD, this.onStart);
      }
    } else if (this.image) {
      this.stop();
    }
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
    assign(DEFAULTS, isPlainObject(options) && options);
  }
}

assign(Cropper.prototype, render, preview, events, handlers, change, methods);

export default Cropper;
