  extend(prototype, {
    resize: function () {
      var container = this.container;
      var containerData = this.containerData;
      var canvasData;
      var cropBoxData;
      var ratio;

      // Check `container` is necessary for IE8
      if (this.isDisabled || !containerData) {
        return;
      }

      ratio = container.offsetWidth / containerData.width;

      // Resize when width changed or height changed
      if (ratio !== 1 || container.offsetHeight !== containerData.height) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();

        this.render();
        this.setCanvasData(each(canvasData, function (n, i) {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData(each(cropBoxData, function (n, i) {
          cropBoxData[i] = n * ratio;
        }));
      }
    },

    dblclick: function () {
      if (this.isDisabled) {
        return;
      }

      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? ACTION_MOVE : ACTION_CROP);
    },

    wheel: function (event) {
      var e = getEvent(event);
      var ratio = num(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (this.isDisabled) {
        return;
      }

      preventDefault(e);

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, e);
    },

    cropStart: function (event) {
      var options = this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var touchesLength;
      var touch;
      var action;

      if (this.isDisabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
            touch = touches[1];
            this.startX2 = touch.pageX;
            this.startY2 = touch.pageY;
            action = ACTION_ZOOM;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      action = action || getData(e.target, DATA_ACTION);

      if (REGEXP_ACTIONS.test(action)) {
        if (isFunction(options.cropstart) && options.cropstart.call(this.element, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        this.action = action;
        this.cropping = false;

        this.startX = touch ? touch.pageX : e.pageX;
        this.startY = touch ? touch.pageY : e.pageY;

        if (action === ACTION_CROP) {
          this.cropping = true;
          addClass(this.dragBox, CLASS_MODAL);
        }
      }
    },

    cropMove: function (event) {
      var options = this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var action = this.action;
      var touchesLength;
      var touch;

      if (this.isDisabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
            touch = touches[1];
            this.endX2 = touch.pageX;
            this.endY2 = touch.pageY;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      if (action) {
        if (isFunction(options.cropmove) && options.cropmove.call(this.element, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        this.endX = touch ? touch.pageX : e.pageX;
        this.endY = touch ? touch.pageY : e.pageY;

        this.change(e.shiftKey, action === ACTION_ZOOM ? e : null);
      }
    },

    cropEnd: function (event) {
      var options = this.options;
      var e = getEvent(event);
      var action = this.action;

      if (this.isDisabled) {
        return;
      }

      if (action) {
        preventDefault(e);

        if (this.cropping) {
          this.cropping = false;
          toggleClass(this.dragBox, CLASS_MODAL, this.isCropped && options.modal);
        }

        this.action = '';

        if (isFunction(options.cropend)) {
          options.cropend.call(this.element, {
            originalEvent: e,
            action: action
          });
        }
      }
    }
  });
