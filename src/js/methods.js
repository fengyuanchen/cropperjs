import * as $ from './utilities';

function getPointersCenter(pointers) {
  let pageX = 0;
  let pageY = 0;
  let count = 0;

  $.each(pointers, ({ startX, startY }) => {
    pageX += startX;
    pageY += startY;
    count += 1;
  });

  pageX /= count;
  pageY /= count;

  return {
    pageX,
    pageY,
  };
}

export default {
  // Show the crop box manually
  crop() {
    if (this.ready && !this.disabled) {
      if (!this.cropped) {
        this.cropped = true;
        this.limitCropBox(true, true);

        if (this.options.modal) {
          $.addClass(this.dragBox, 'cropper-modal');
        }

        $.removeClass(this.cropBox, 'cropper-hidden');
      }

      this.setCropBoxData(this.initialCropBoxData);
    }

    return this;
  },

  // Reset the image and crop box to their initial states
  reset() {
    if (this.ready && !this.disabled) {
      this.imageData = $.extend({}, this.initialImageData);
      this.canvasData = $.extend({}, this.initialCanvasData);
      this.cropBoxData = $.extend({}, this.initialCropBoxData);
      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    }

    return this;
  },

  // Clear the crop box
  clear() {
    if (this.cropped && !this.disabled) {
      $.extend(this.cropBoxData, {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      });

      this.cropped = false;
      this.renderCropBox();
      this.limitCanvas(true, true);

      // Render canvas after crop box rendered
      this.renderCanvas();
      $.removeClass(this.dragBox, 'cropper-modal');
      $.addClass(this.cropBox, 'cropper-hidden');
    }

    return this;
  },

  /**
   * Replace the image's src and rebuild the cropper
   *
   * @param {String} url
   * @param {Boolean} onlyColorChanged (optional)
   */
  replace(url, onlyColorChanged) {
    if (!this.disabled && url) {
      if (this.isImg) {
        this.element.src = url;
      }

      if (onlyColorChanged) {
        this.url = url;
        this.image.src = url;

        if (this.ready) {
          this.image2.src = url;

          $.each(this.previews, (element) => {
            $.getByTag(element, 'img')[0].src = url;
          });
        }
      } else {
        if (this.isImg) {
          this.replaced = true;
        }

        // Clear previous data
        this.options.data = null;
        this.load(url);
      }
    }

    return this;
  },

  // Enable (unfreeze) the cropper
  enable() {
    if (this.ready) {
      this.disabled = false;
      $.removeClass(this.cropper, 'cropper-disabled');
    }

    return this;
  },

  // Disable (freeze) the cropper
  disable() {
    if (this.ready) {
      this.disabled = true;
      $.addClass(this.cropper, 'cropper-disabled');
    }

    return this;
  },

  // Destroy the cropper and remove the instance from the image
  destroy() {
    const { element, image } = this;

    if (this.loaded) {
      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }

      this.unbuild();
      $.removeClass(element, 'cropper-hidden');
    } else if (this.isImg) {
      $.removeListener(element, 'load', this.onStart);
    } else if (image) {
      $.removeChild(image);
    }

    $.removeData(element, 'cropper');

    return this;
  },

  /**
   * Move the canvas with relative offsets
   *
   * @param {Number} offsetX
   * @param {Number} offsetY (optional)
   */
  move(offsetX, offsetY) {
    const { left, top } = this.canvasData;

    return this.moveTo(
      $.isUndefined(offsetX) ? offsetX : (left + Number(offsetX)),
      $.isUndefined(offsetY) ? offsetY : (top + Number(offsetY)),
    );
  },

  /**
   * Move the canvas to an absolute point
   *
   * @param {Number} x
   * @param {Number} y (optional)
   */
  moveTo(x, y) {
    const { canvasData } = this;
    let changed = false;

    // If "y" is not present, its default value is "x"
    if ($.isUndefined(y)) {
      y = x;
    }

    x = Number(x);
    y = Number(y);

    if (this.ready && !this.disabled && this.options.movable) {
      if ($.isNumber(x)) {
        canvasData.left = x;
        changed = true;
      }

      if ($.isNumber(y)) {
        canvasData.top = y;
        changed = true;
      }

      if (changed) {
        this.renderCanvas(true);
      }
    }

    return this;
  },

  /**
   * Zoom the canvas with a relative ratio
   *
   * @param {Number} ratio
   * @param {Event} _originalEvent (private)
   */
  zoom(ratio, _originalEvent) {
    const { canvasData } = this;

    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    return this.zoomTo((canvasData.width * ratio) / canvasData.naturalWidth, _originalEvent);
  },

  /**
   * Zoom the canvas to an absolute ratio
   *
   * @param {Number} ratio
   * @param {Event} _originalEvent (private)
   */
  zoomTo(ratio, _originalEvent) {
    const { options, canvasData } = this;
    const {
      width,
      height,
      naturalWidth,
      naturalHeight,
    } = canvasData;

    ratio = Number(ratio);

    if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
      const newWidth = naturalWidth * ratio;
      const newHeight = naturalHeight * ratio;

      if ($.dispatchEvent(this.element, 'zoom', {
        originalEvent: _originalEvent,
        oldRatio: width / naturalWidth,
        ratio: newWidth / naturalWidth,
      }) === false) {
        return this;
      }

      if (_originalEvent) {
        const { pointers } = this;
        const offset = $.getOffset(this.cropper);
        const center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY,
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
      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Rotate the canvas with a relative degree
   *
   * @param {Number} degree
   */
  rotate(degree) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
  },

  /**
   * Rotate the canvas to an absolute degree
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
   *
   * @param {Number} degree
   */
  rotateTo(degree) {
    degree = Number(degree);

    if ($.isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
      this.imageData.rotate = degree % 360;
      this.renderCanvas(true, true);
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
  scale(scaleX, scaleY) {
    const { imageData } = this;
    let transformed = false;

    // If "scaleY" is not present, its default value is "scaleX"
    if ($.isUndefined(scaleY)) {
      scaleY = scaleX;
    }

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (this.ready && !this.disabled && this.options.scalable) {
      if ($.isNumber(scaleX)) {
        imageData.scaleX = scaleX;
        transformed = true;
      }

      if ($.isNumber(scaleY)) {
        imageData.scaleY = scaleY;
        transformed = true;
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }
    }

    return this;
  },

  /**
   * Scale the abscissa of the image
   *
   * @param {Number} scaleX
   */
  scaleX(scaleX) {
    const { scaleY } = this.imageData;

    return this.scale(scaleX, $.isNumber(scaleY) ? scaleY : 1);
  },

  /**
   * Scale the ordinate of the image
   *
   * @param {Number} scaleY
   */
  scaleY(scaleY) {
    const { scaleX } = this.imageData;

    return this.scale($.isNumber(scaleX) ? scaleX : 1, scaleY);
  },

  /**
   * Get the cropped area position and size data (base on the original image)
   *
   * @param {Boolean} rounded (optional)
   * @return {Object} data
   */
  getData(rounded) {
    const {
      options,
      imageData,
      canvasData,
      cropBoxData,
    } = this;
    let data;

    if (this.ready && this.cropped) {
      data = {
        x: cropBoxData.left - canvasData.left,
        y: cropBoxData.top - canvasData.top,
        width: cropBoxData.width,
        height: cropBoxData.height,
      };

      const ratio = imageData.width / imageData.naturalWidth;

      $.each(data, (n, i) => {
        n /= ratio;
        data[i] = rounded ? Math.round(n) : n;
      });
    } else {
      data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
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
  setData(data) {
    const { options, imageData, canvasData } = this;
    const cropBoxData = {};

    if ($.isFunction(data)) {
      data = data.call(this.element);
    }

    if (this.ready && !this.disabled && $.isPlainObject(data)) {
      let transformed = false;

      if (options.rotatable) {
        if ($.isNumber(data.rotate) && data.rotate !== imageData.rotate) {
          imageData.rotate = data.rotate;
          transformed = true;
        }
      }

      if (options.scalable) {
        if ($.isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
          imageData.scaleX = data.scaleX;
          transformed = true;
        }

        if ($.isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
          imageData.scaleY = data.scaleY;
          transformed = true;
        }
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }

      const ratio = imageData.width / imageData.naturalWidth;

      if ($.isNumber(data.x)) {
        cropBoxData.left = (data.x * ratio) + canvasData.left;
      }

      if ($.isNumber(data.y)) {
        cropBoxData.top = (data.y * ratio) + canvasData.top;
      }

      if ($.isNumber(data.width)) {
        cropBoxData.width = data.width * ratio;
      }

      if ($.isNumber(data.height)) {
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
  getContainerData() {
    return this.ready ? this.containerData : {};
  },

  /**
   * Get the image position and size data
   *
   * @return {Object} data
   */
  getImageData() {
    return this.loaded ? this.imageData : {};
  },

  /**
   * Get the canvas position and size data
   *
   * @return {Object} data
   */
  getCanvasData() {
    const { canvasData } = this;
    const data = {};

    if (this.ready) {
      $.each([
        'left',
        'top',
        'width',
        'height',
        'naturalWidth',
        'naturalHeight',
      ], (n) => {
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
  setCanvasData(data) {
    const { canvasData } = this;
    const { aspectRatio } = canvasData;

    if ($.isFunction(data)) {
      data = data.call(this.element);
    }

    if (this.ready && !this.disabled && $.isPlainObject(data)) {
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

      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Get the crop box position and size data
   *
   * @return {Object} data
   */
  getCropBoxData() {
    const { cropBoxData } = this;
    let data;

    if (this.ready && this.cropped) {
      data = {
        left: cropBoxData.left,
        top: cropBoxData.top,
        width: cropBoxData.width,
        height: cropBoxData.height,
      };
    }

    return data || {};
  },

  /**
   * Set the crop box position and size with new data
   *
   * @param {Object} data
   */
  setCropBoxData(data) {
    const { cropBoxData } = this;
    const { aspectRatio } = this.options;
    let widthChanged;
    let heightChanged;

    if ($.isFunction(data)) {
      data = data.call(this.element);
    }

    if (this.ready && this.cropped && !this.disabled && $.isPlainObject(data)) {
      if ($.isNumber(data.left)) {
        cropBoxData.left = data.left;
      }

      if ($.isNumber(data.top)) {
        cropBoxData.top = data.top;
      }

      if ($.isNumber(data.width) && data.width !== cropBoxData.width) {
        widthChanged = true;
        cropBoxData.width = data.width;
      }

      if ($.isNumber(data.height) && data.height !== cropBoxData.height) {
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
   * @param {Object} [options={}] - The config options.
   * @returns {HTMLCanvasElement} - The result canvas.
   */
  getCroppedCanvas(options = {}) {
    if (!this.ready || !window.HTMLCanvasElement) {
      return null;
    }

    const { canvasData } = this;
    const source = $.getSourceCanvas(this.image, this.imageData, canvasData, options);

    // Returns the source canvas if it is not cropped.
    if (!this.cropped) {
      return source;
    }

    const {
      x,
      y,
      width: initialWidth,
      height: initialHeight,
    } = this.getData();
    const aspectRatio = initialWidth / initialHeight;
    const maxSizes = $.getContainSizes({
      aspectRatio,
      width: options.maxWidth || Infinity,
      height: options.maxHeight || Infinity,
    });
    const minSizes = $.getContainSizes({
      aspectRatio,
      width: options.minWidth || 0,
      height: options.minHeight || 0,
    });
    let {
      width,
      height,
    } = $.getContainSizes({
      aspectRatio,
      width: options.width || initialWidth,
      height: options.height || initialHeight,
    });

    width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
    height = Math.min(maxSizes.height, Math.max(minSizes.height, height));

    const canvas = $.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = options.fillColor || 'transparent';
    context.fillRect(0, 0, width, height);

    const { imageSmoothingEnabled = true, imageSmoothingQuality } = options;

    context.imageSmoothingEnabled = imageSmoothingEnabled;

    if (imageSmoothingQuality) {
      context.imageSmoothingQuality = imageSmoothingQuality;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
    const sourceWidth = source.width;
    const sourceHeight = source.height;

    // Source canvas parameters
    let srcX = x;
    let srcY = y;
    let srcWidth;
    let srcHeight;

    // Destination canvas parameters
    let dstX;
    let dstY;
    let dstWidth;
    let dstHeight;

    if (srcX <= -initialWidth || srcX > sourceWidth) {
      srcX = 0;
      srcWidth = 0;
      dstX = 0;
      dstWidth = 0;
    } else if (srcX <= 0) {
      dstX = -srcX;
      srcX = 0;
      srcWidth = Math.min(sourceWidth, initialWidth + srcX);
      dstWidth = srcWidth;
    } else if (srcX <= sourceWidth) {
      dstX = 0;
      srcWidth = Math.min(initialWidth, sourceWidth - srcX);
      dstWidth = srcWidth;
    }

    if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
      srcY = 0;
      srcHeight = 0;
      dstY = 0;
      dstHeight = 0;
    } else if (srcY <= 0) {
      dstY = -srcY;
      srcY = 0;
      srcHeight = Math.min(sourceHeight, initialHeight + srcY);
      dstHeight = srcHeight;
    } else if (srcY <= sourceHeight) {
      dstY = 0;
      srcHeight = Math.min(initialHeight, sourceHeight - srcY);
      dstHeight = srcHeight;
    }

    // All the numerical parameters should be integer for `drawImage`
    // https://github.com/fengyuanchen/cropper/issues/476
    const params = [
      Math.floor(srcX),
      Math.floor(srcY),
      Math.floor(srcWidth),
      Math.floor(srcHeight),
    ];

    // Avoid "IndexSizeError"
    if (dstWidth > 0 && dstHeight > 0) {
      const scale = width / initialWidth;

      params.push(
        Math.floor(dstX * scale),
        Math.floor(dstY * scale),
        Math.floor(dstWidth * scale),
        Math.floor(dstHeight * scale),
      );
    }

    context.drawImage(source, ...params);

    return canvas;
  },

  /**
   * Change the aspect ratio of the crop box
   *
   * @param {Number} aspectRatio
   */
  setAspectRatio(aspectRatio) {
    const { options } = this;

    if (!this.disabled && !$.isUndefined(aspectRatio)) {
      // 0 -> NaN
      options.aspectRatio = Math.max(0, aspectRatio) || NaN;

      if (this.ready) {
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
  setDragMode(mode) {
    const { options, dragBox, face } = this;

    if (this.loaded && !this.disabled) {
      const croppable = mode === 'crop';
      const movable = options.movable && mode === 'move';

      mode = (croppable || movable) ? mode : 'none';

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

    return this;
  },
};
