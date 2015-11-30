  extend(prototype, {

    // Show the crop box manually
    crop: function () {
      if (this.isBuilt && !this.isDisabled) {
        if (!this.isCropped) {
          this.isCropped = true;
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
      if (this.isBuilt && !this.isDisabled) {
        this.imageData = extend({}, this.initialImageData);
        this.canvasData = extend({}, this.initialCanvasData);
        this.cropBoxData = extend({}, this.initialCropBoxData);

        this.renderCanvas();

        if (this.isCropped) {
          this.renderCropBox();
        }
      }

      return this;
    },

    // Clear the crop box
    clear: function () {
      if (this.isCropped && !this.isDisabled) {
        extend(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });

        this.isCropped = false;
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
      if (!this.isDisabled && url) {
        if (this.isImg) {
          this.isReplaced = true;
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
      if (this.isBuilt) {
        this.isDisabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },

    // Disable (freeze) the cropper
    disable: function () {
      if (this.isBuilt) {
        this.isDisabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },

    // Destroy the cropper and remove the instance from the image
    destroy: function () {
      var element = this.element;
      var image = this.image;

      if (this.isLoaded) {
        if (this.isImg && this.isReplaced) {
          element.src = this.originalUrl;
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
     * Move the canvas with relative offsets
     *
     * @param {Number} offsetX
     * @param {Number} offsetY (optional)
     */
    move: function (offsetX, offsetY) {
      var canvasData = this.canvasData;

      return this.moveTo(
        isUndefined(offsetX) ? offsetX : canvasData.left + num(offsetX),
        isUndefined(offsetY) ? offsetY : canvasData.top + num(offsetY)
      );
    },

    /**
     * Move the canvas to an absolute point
     *
     * @param {Number} x
     * @param {Number} y (optional)
     */
    moveTo: function (x, y) {
      var canvasData = this.canvasData;
      var isChanged = false;

      // If "y" is not present, its default value is "x"
      if (isUndefined(y)) {
        y = x;
      }

      x = num(x);
      y = num(y);

      if (this.isBuilt && !this.isDisabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          isChanged = true;
        }

        if (isNumber(y)) {
          canvasData.top = y;
          isChanged = true;
        }

        if (isChanged) {
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
    zoom: function (ratio, _originalEvent) {
      var canvasData = this.canvasData;

      ratio = num(ratio);

      if (ratio < 0) {
        ratio =  1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, _originalEvent);
    },

    /**
     * Zoom the canvas to an absolute ratio
     *
     * @param {Number} ratio
     * @param {Event} _originalEvent (private)
     */
    zoomTo: function (ratio, _originalEvent) {
      var options = this.options;
      var canvasData = this.canvasData;
      var width = canvasData.width;
      var height = canvasData.height;
      var naturalWidth = canvasData.naturalWidth;
      var naturalHeight = canvasData.naturalHeight;
      var newWidth;
      var newHeight;

      ratio = num(ratio);

      if (ratio >= 0 && this.isBuilt && !this.isDisabled && options.zoomable) {
        newWidth = naturalWidth * ratio;
        newHeight = naturalHeight * ratio;

        if (isFunction(options.zoom) && options.zoom.call(this.element, {
          originalEvent: _originalEvent,
          oldRatio: width / naturalWidth,
          ratio: newWidth / naturalWidth
        }) === false) {
          return this;
        }

        canvasData.left -= (newWidth - width) / 2;
        canvasData.top -= (newHeight - height) / 2;
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
    rotate: function (degree) {
      return this.rotateTo((this.imageData.rotate || 0) + num(degree));
    },

    /**
     * Rotate the canvas to an absolute degree
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
     *
     * @param {Number} degree
     */
    rotateTo: function (degree) {
      degree = num(degree);

      if (isNumber(degree) && this.isBuilt && !this.isDisabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.isRotated = true;
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
      var isChanged = false;

      // If "scaleY" is not present, its default value is "scaleX"
      if (isUndefined(scaleY)) {
        scaleY = scaleX;
      }

      scaleX = num(scaleX);
      scaleY = num(scaleY);

      if (this.isBuilt && !this.isDisabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          isChanged = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          isChanged = true;
        }

        if (isChanged) {
          this.renderImage(true);
        }
      }

      return this;
    },

    /**
     * Scale the abscissa of the image
     *
     * @param {Number} scaleX
     */
    scaleX: function (scaleX) {
      var scaleY = this.imageData.scaleY;

      return this.scale(scaleX, isNumber(scaleY) ? scaleY : 1);
    },

    /**
     * Scale the ordinate of the image
     *
     * @param {Number} scaleY
     */
    scaleY: function (scaleY) {
      var scaleX = this.imageData.scaleX;

      return this.scale(isNumber(scaleX) ? scaleX : 1, scaleY);
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     *
     * @param {Boolean} isRounded (optional)
     * @return {Object} data
     */
    getData: function (isRounded) {
      var options = this.options;
      var imageData = this.imageData;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
      var ratio;
      var data;

      if (this.isBuilt && this.isCropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };

        ratio = imageData.width / imageData.naturalWidth;

        each(data, function (n, i) {
          n = n / ratio;
          data[i] = isRounded ? round(n) : n;
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
      var isRotated;
      var isScaled;
      var ratio;

      if (isFunction(data)) {
        data = data.call(this.element);
      }

      if (this.isBuilt && !this.isDisabled && isPlainObject(data)) {
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            this.isRotated = isRotated = true;
          }
        }

        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            isScaled = true;
          }

          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            isScaled = true;
          }
        }

        if (isRotated) {
          this.renderCanvas();
        } else if (isScaled) {
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
      return this.isBuilt ? this.containerData : {};
    },

    /**
     * Get the image position and size data
     *
     * @return {Object} data
     */
    getImageData: function () {
      return this.isLoaded ? this.imageData : {};
    },

    /**
     * Get the canvas position and size data
     *
     * @return {Object} data
     */
    getCanvasData: function () {
      var canvasData = this.canvasData;
      var data = {};

      if (this.isBuilt) {
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
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;

      if (isFunction(data)) {
        data = data.call(this.element);
      }

      if (this.isBuilt && !this.isDisabled && isPlainObject(data)) {
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

      if (this.isBuilt && this.isCropped) {
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
      var isWidthChanged;
      var isHeightChanged;

      if (isFunction(data)) {
        data = data.call(this.element);
      }

      if (this.isBuilt && this.isCropped && !this.isDisabled && isPlainObject(data)) {

        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }

        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          isWidthChanged = true;
          cropBoxData.width = data.width;
        }

        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          isHeightChanged = true;
          cropBoxData.height = data.height;
        }

        if (aspectRatio) {
          if (isWidthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (isHeightChanged) {
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

      if (!this.isBuilt || !this.isCropped || !SUPPORT_CANVAS) {
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

      // The canvas element will use `Math.floor` on a float number, so round first
      canvasWidth = round(scaledWidth || originalWidth);
      canvasHeight = round(scaledHeight || originalHeight);

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

      if (!this.isDisabled && !isUndefined(aspectRatio)) {

        // 0 -> NaN
        options.aspectRatio = max(0, aspectRatio) || NaN;

        if (this.isBuilt) {
          this.initCropBox();

          if (this.isCropped) {
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

      if (this.isLoaded && !this.isDisabled) {
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

      return this;
    }
  });
