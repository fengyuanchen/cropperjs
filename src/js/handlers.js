    resize: function () {
      var _this = this;
      var restore = _this.options.restore;
      var container = _this.container;
      var containerData = _this.containerData;
      var canvasData;
      var cropBoxData;
      var ratio;

      // Check `container` is necessary for IE8
      if (_this.disabled || !containerData) {
        return;
      }

      ratio = container.offsetWidth / containerData.width;

      // Resize when width changed or height changed
      if (ratio !== 1 || container.offsetHeight !== containerData.height) {
        if (restore) {
          canvasData = _this.getCanvasData();
          cropBoxData = _this.getCropBoxData();
        }

        _this.render();

        if (restore) {
          _this.setCanvasData(each(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          _this.setCropBoxData(each(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },

    dblclick: function () {
      var _this = this;

      if (_this.disabled) {
        return;
      }

      _this.setDragMode(hasClass(_this.dragBox, CLASS_CROP) ? ACTION_MOVE : ACTION_CROP);
    },

    wheel: function (event) {
      var _this = this;
      var e = getEvent(event);
      var ratio = Number(_this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (_this.disabled) {
        return;
      }

      preventDefault(e);

      // Limit wheel speed to prevent zoom too fast (#21)
      if (_this.wheeling) {
        return;
      }

      _this.wheeling = true;

      setTimeout(function () {
        _this.wheeling = false;
      }, 50);

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      _this.zoom(-delta * ratio, e);
    },

    cropStart: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var touchesLength;
      var touch;
      var action;

      if (_this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
            touch = touches[1];
            _this.startX2 = touch.pageX;
            _this.startY2 = touch.pageY;
            action = ACTION_ZOOM;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      action = action || getData(e.target, DATA_ACTION);

      if (REGEXP_ACTIONS.test(action)) {
        if (dispatchEvent(_this.element, EVENT_CROP_START, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        _this.action = action;
        _this.cropping = false;

        _this.startX = touch ? touch.pageX : e.pageX;
        _this.startY = touch ? touch.pageY : e.pageY;

        if (action === ACTION_CROP) {
          _this.cropping = true;
          addClass(_this.dragBox, CLASS_MODAL);
        }
      }
    },

    cropMove: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var touches = e.touches;
      var action = _this.action;
      var touchesLength;
      var touch;

      if (_this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
            touch = touches[1];
            _this.endX2 = touch.pageX;
            _this.endY2 = touch.pageY;
          } else {
            return;
          }
        }

        touch = touches[0];
      }

      if (action) {
        if (dispatchEvent(_this.element, EVENT_CROP_MOVE, {
          originalEvent: e,
          action: action
        }) === false) {
          return;
        }

        preventDefault(e);

        _this.endX = touch ? touch.pageX : e.pageX;
        _this.endY = touch ? touch.pageY : e.pageY;

        _this.change(e.shiftKey, action === ACTION_ZOOM ? e : null);
      }
    },

    cropEnd: function (event) {
      var _this = this;
      var options = _this.options;
      var e = getEvent(event);
      var action = _this.action;

      if (_this.disabled) {
        return;
      }

      if (action) {
        preventDefault(e);

        if (_this.cropping) {
          _this.cropping = false;
          toggleClass(_this.dragBox, CLASS_MODAL, _this.cropped && options.modal);
        }

        _this.action = '';

        dispatchEvent(_this.element, EVENT_CROP_END, {
          originalEvent: e,
          action: action
        });
      }
    },
