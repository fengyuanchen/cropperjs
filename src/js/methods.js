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
     * @param {Boolean} onlyColorChanged (optional)
     */
    replace: function (url, onlyColorChanged) {
      var _this = this;

      if (!_this.disabled && url) {
        if (_this.isImg) {
          _this.element.src = url;
        }

        if (onlyColorChanged) {
          _this.url = url;
          _this.image.src = url;

          if (_this.built) {
            _this.image2.src = url;

            each(_this.previews, function (element) {
              getByTag(element, 'img')[0].src = url;
            });
          }
        } else {
          if (_this.isImg) {
            _this.replaced = true;
          }

          // Clear previous data
          _this.options.data = null;
          _this.load(url);
        }
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

        if (dispatchEvent(_this.element, EVENT_ZOOM, {
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

      if (!_this.built || !SUPPORT_CANVAS) {
        return;
      }

      // Return the whole canvas if not cropped
      if (!_this.cropped) {
        return getSourceCanvas(_this.image, _this.imageData);
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
        var canvasData = _this.canvasData;
        var params = [source];

        // Source canvas
        var srcX = data.x + canvasData.naturalWidth * (abs(data.scaleX || 1) - 1) / 2;
        var srcY = data.y + canvasData.naturalHeight * (abs(data.scaleY || 1) - 1) / 2;
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

        params.push(floor(srcX), floor(srcY), floor(srcWidth), floor(srcHeight));

        // Scale destination sizes
        if (scaledRatio) {
          dstX *= scaledRatio;
          dstY *= scaledRatio;
          dstWidth *= scaledRatio;
          dstHeight *= scaledRatio;
        }

        // Avoid "IndexSizeError" in IE and Firefox
        if (dstWidth > 0 && dstHeight > 0) {
          params.push(floor(dstX), floor(dstY), floor(dstWidth), floor(dstHeight));
        }

        return params;
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
