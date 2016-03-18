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
          addListener(element, EVENT_BUILT, options.built, true);
        }

        dispatchEvent(element, EVENT_BUILT);
        dispatchEvent(element, EVENT_CROP, _this.getData());

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
