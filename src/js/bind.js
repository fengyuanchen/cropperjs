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
