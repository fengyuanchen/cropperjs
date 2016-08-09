// RegExps
const REGEXP_DATA_URL_HEAD = /^data:([^;]+);base64,/;
const REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
const REGEXP_ORIGINS = /^(https?:)\/\/([^:\/\?#]+):?(\d*)/i;
const REGEXP_SPACES = /\s+/;
const REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
const REGEXP_TRIM = /^\s+(.*)\s+$/;
const REGEXP_USERAGENT = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;
const navigator = window.navigator;
const IS_SAFARI_OR_UIWEBVIEW = navigator && REGEXP_USERAGENT.test(navigator.userAgent);

// Utilities
const objectProto = Object.prototype;
const toString = objectProto.toString;
const hasOwnProperty = objectProto.hasOwnProperty;
const slice = Array.prototype.slice;
const fromCharCode = String.fromCharCode;

export function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

export function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

export function isUndefined(obj) {
  return typeof obj === 'undefined';
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function isPlainObject(obj) {
  if (!isObject(obj)) {
    return false;
  }

  try {
    const constructor = obj.constructor;
    const prototype = constructor.prototype;

    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (e) {
    return false;
  }
}

export function isFunction(fn) {
  return typeOf(fn) === 'function';
}

export function isArray(arr) {
  return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
}

export function toArray(obj, offset) {
  offset = offset >= 0 ? offset : 0;

  if (Array.from) {
    return Array.from(obj).slice(offset);
  }

  return slice.call(obj, offset);
}

export function trim(str) {
  if (typeof str === 'string') {
    str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '$1');
  }

  return str;
}

export function each(obj, callback) {
  if (obj && isFunction(callback)) {
    let i;

    if (isArray(obj) || isNumber(obj.length)/* array-like */) {
      const length = obj.length;

      for (i = 0; i < length; i++) {
        if (callback.call(obj, obj[i], i, obj) === false) {
          break;
        }
      }
    } else if (isObject(obj)) {
      Object.keys(obj).forEach((key) => {
        callback.call(obj, obj[key], key, obj);
      });
    }
  }

  return obj;
}

export function extend(...args) {
  const deep = args[0] === true;
  const data = deep ? args[1] : args[0];

  if (args.length > 1) {
    // if (Object.assign) {
    //   return Object.assign.apply(Object, args);
    // }

    args.shift();

    args.forEach((arg) => {
      if (isObject(arg)) {
        Object.keys(arg).forEach((key) => {
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

export function proxy(fn, context, ...args) {
  return (...args2) => {
    return fn.apply(context, args.concat(args2));
  };
}

export function setStyle(element, styles) {
  const style = element.style;

  each(styles, (value, property) => {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value += 'px';
    }

    style[property] = value;
  });
}

export function hasClass(element, value) {
  return element.classList ?
    element.classList.contains(value) :
    element.className.indexOf(value) > -1;
}

export function addClass(element, value) {
  if (isNumber(element.length)) {
    each(element, (elem) => {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  const className = trim(element.className);

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = `${className} ${value}`;
  }
}

export function removeClass(element, value) {
  if (isNumber(element.length)) {
    each(element, (elem) => {
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

export function toggleClass(element, value, added) {
  if (isNumber(element.length)) {
    each(element, (elem) => {
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

export function hyphenate(str) {
  return str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
}

export function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  } else if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute(`data-${hyphenate(name)}`);
}

export function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute(`data-${hyphenate(name)}`, data);
  }
}

export function removeData(element, name) {
  if (isObject(element[name])) {
    delete element[name];
  } else if (element.dataset) {
    delete element.dataset[name];
  } else {
    element.removeAttribute(`data-${hyphenate(name)}`);
  }
}

export function removeListener(element, type, handler) {
  const types = trim(type).split(REGEXP_SPACES);

  if (types.length > 1) {
    each(types, (t) => {
      removeListener(element, t, handler);
    });
    return;
  }

  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent(`on${type}`, handler);
  }
}

export function addListener(element, type, handler, once) {
  const types = trim(type).split(REGEXP_SPACES);
  const originalHandler = handler;

  if (types.length > 1) {
    each(types, (t) => {
      addListener(element, t, handler);
    });
    return;
  }

  if (once) {
    handler = (...args) => {
      removeListener(element, type, handler);

      return originalHandler.apply(element, args);
    };
  }

  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on${type}', handler);
  }
}

export function dispatchEvent(element, type, data) {
  if (element.dispatchEvent) {
    let event;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
      if (isUndefined(data)) {
        event = new Event(type, {
          bubbles: true,
          cancelable: true,
        });
      } else {
        event = new CustomEvent(type, {
          detail: data,
          bubbles: true,
          cancelable: true,
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
    return element.fireEvent(`on${type}`);
  }

  return true;
}

export function getEvent(event) {
  const e = event || window.event;

  // Fix target property (IE8)
  if (!e.target) {
    e.target = e.srcElement || document;
  }

  if (!isNumber(e.pageX) && isNumber(e.clientX)) {
    const eventDoc = event.target.ownerDocument || document;
    const doc = eventDoc.documentElement;
    const body = eventDoc.body;

    e.pageX = e.clientX + (
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
    );
    e.pageY = e.clientY + (
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    );
  }

  return e;
}

export function getOffset(element) {
  const doc = document.documentElement;
  const box = element.getBoundingClientRect();

  return {
    left: box.left + (
      (window.scrollX || (doc && doc.scrollLeft) || 0) - ((doc && doc.clientLeft) || 0)
    ),
    top: box.top + (
      (window.scrollY || (doc && doc.scrollTop) || 0) - ((doc && doc.clientTop) || 0)
    ),
  };
}

export function getTouchesCenter(touches) {
  const length = touches.length;
  let pageX = 0;
  let pageY = 0;

  if (length) {
    each(touches, (touch) => {
      pageX += touch.pageX;
      pageY += touch.pageY;
    });

    pageX /= length;
    pageY /= length;
  }

  return {
    pageX,
    pageY,
  };
}

export function getByTag(element, tagName) {
  return element.getElementsByTagName(tagName);
}

export function getByClass(element, className) {
  return element.getElementsByClassName ?
    element.getElementsByClassName(className) :
    element.querySelectorAll(`.${className}`);
}

export function createElement(tagName) {
  return document.createElement(tagName);
}

export function appendChild(element, elem) {
  element.appendChild(elem);
}

export function removeChild(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function isCrossOriginURL(url) {
  const parts = url.match(REGEXP_ORIGINS);

  return parts && (
    parts[1] !== location.protocol ||
    parts[2] !== location.hostname ||
    parts[3] !== location.port
  );
}

export function addTimestamp(url) {
  const timestamp = `timestamp=${(new Date()).getTime()}`;

  return (url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp);
}

export function getImageSize(image, callback) {
  // Modern browsers (ignore Safari)
  if (image.naturalWidth && !IS_SAFARI_OR_UIWEBVIEW) {
    callback(image.naturalWidth, image.naturalHeight);
    return;
  }

  // IE8: Don't use `new Image()` here
  const newImage = createElement('img');

  newImage.onload = function load() {
    callback(this.width, this.height);
  };

  newImage.src = image.src;
}

export function getTransform(data) {
  const transforms = [];
  const rotate = data.rotate;
  const scaleX = data.scaleX;
  const scaleY = data.scaleY;

  // Rotate should come first before scale to match orientation transform
  if (isNumber(rotate) && rotate !== 0) {
    transforms.push(`rotate(${rotate}deg)`);
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    transforms.push(`scaleX(${scaleX})`);
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    transforms.push(`scaleY(${scaleY})`);
  }

  return transforms.length ? transforms.join(' ') : 'none';
}

export function getRotatedSizes(data, reversed) {
  const deg = Math.abs(data.degree) % 180;
  const arc = ((deg > 90 ? (180 - deg) : deg) * Math.PI) / 180;
  const sinArc = Math.sin(arc);
  const cosArc = Math.cos(arc);
  const width = data.width;
  const height = data.height;
  const aspectRatio = data.aspectRatio;
  let newWidth;
  let newHeight;

  if (!reversed) {
    newWidth = (width * cosArc) + (height * sinArc);
    newHeight = (width * sinArc) + (height * cosArc);
  } else {
    newWidth = width / (cosArc + (sinArc / aspectRatio));
    newHeight = newWidth / aspectRatio;
  }

  return {
    width: newWidth,
    height: newHeight,
  };
}

export function getSourceCanvas(image, data) {
  const canvas = createElement('canvas');
  const context = canvas.getContext('2d');
  let dstX = 0;
  let dstY = 0;
  const dstWidth = data.naturalWidth;
  const dstHeight = data.naturalHeight;
  const rotate = data.rotate;
  const scaleX = data.scaleX;
  const scaleY = data.scaleY;
  const scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
  const rotatable = isNumber(rotate) && rotate !== 0;
  const advanced = rotatable || scalable;
  let canvasWidth = dstWidth * Math.abs(scaleX);
  let canvasHeight = dstHeight * Math.abs(scaleY);
  let translateX;
  let translateY;
  let rotated;

  if (scalable) {
    translateX = canvasWidth / 2;
    translateY = canvasHeight / 2;
  }

  if (rotatable) {
    rotated = getRotatedSizes({
      width: canvasWidth,
      height: canvasHeight,
      degree: rotate,
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
    context.rotate((rotate * Math.PI) / 180);
  }

  if (scalable) {
    context.scale(scaleX, scaleY);
  }

  context.drawImage(
    image,
    Math.floor(dstX),
    Math.floor(dstY),
    Math.floor(dstWidth),
    Math.floor(dstHeight)
  );

  if (advanced) {
    context.restore();
  }

  return canvas;
}

export function getStringFromCharCode(dataView, start, length) {
  let str = '';
  let i = start;

  for (length += start; i < length; i++) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

export function getOrientation(arrayBuffer) {
  const dataView = new DataView(arrayBuffer);
  let length = dataView.byteLength;
  let orientation;
  let exifIDCode;
  let tiffOffset;
  let firstIFDOffset;
  let littleEndian;
  let endianness;
  let app1Start;
  let ifdStart;
  let offset;
  let i;

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
      offset = ifdStart + (i * 12) + 2;

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

export function dataURLToArrayBuffer(dataURL) {
  const base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
  const binary = atob(base64);
  const length = binary.length;
  const arrayBuffer = new ArrayBuffer(length);
  const dataView = new Uint8Array(arrayBuffer);
  let i;

  for (i = 0; i < length; i++) {
    dataView[i] = binary.charCodeAt(i);
  }

  return arrayBuffer;
}

// Only available for JPEG image
export function arrayBufferToDataURL(arrayBuffer) {
  const dataView = new Uint8Array(arrayBuffer);
  const length = dataView.length;
  let base64 = '';
  let i;

  for (i = 0; i < length; i++) {
    base64 += fromCharCode(dataView[i]);
  }

  return `data:image/jpeg;base64,${btoa(base64)}`;
}
