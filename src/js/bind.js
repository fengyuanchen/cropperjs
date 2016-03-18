    bind: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var cropper = _this.cropper;

      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }

      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }

      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }

      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }

      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }

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
      var element = _this.element;
      var cropper = _this.cropper;

      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }

      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }

      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }

      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }

      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }

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
