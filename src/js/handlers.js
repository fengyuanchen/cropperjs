import * as $ from './utilities';

export const REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;

export default {
  resize() {
    const self = this;
    const restore = self.options.restore;
    const container = self.container;
    const containerData = self.containerData;

    // Check `container` is necessary for IE8
    if (self.disabled || !containerData) {
      return;
    }

    const ratio = container.offsetWidth / containerData.width;
    let canvasData;
    let cropBoxData;

    // Resize when width changed or height changed
    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
      if (restore) {
        canvasData = self.getCanvasData();
        cropBoxData = self.getCropBoxData();
      }

      self.render();

      if (restore) {
        self.setCanvasData($.each(canvasData, (n, i) => {
          canvasData[i] = n * ratio;
        }));
        self.setCropBoxData($.each(cropBoxData, (n, i) => {
          cropBoxData[i] = n * ratio;
        }));
      }
    }
  },

  dblclick() {
    const self = this;

    if (self.disabled) {
      return;
    }

    self.setDragMode($.hasClass(self.dragBox, 'cropper-crop') ? 'move' : 'crop');
  },

  wheel(event) {
    const self = this;
    const e = $.getEvent(event);
    const ratio = Number(self.options.wheelZoomRatio) || 0.1;
    let delta = 1;

    if (self.disabled) {
      return;
    }

    e.preventDefault();

    // Limit wheel speed to prevent zoom too fast (#21)
    if (self.wheeling) {
      return;
    }

    self.wheeling = true;

    setTimeout(() => {
      self.wheeling = false;
    }, 50);

    if (e.deltaY) {
      delta = e.deltaY > 0 ? 1 : -1;
    } else if (e.wheelDelta) {
      delta = -e.wheelDelta / 120;
    } else if (e.detail) {
      delta = e.detail > 0 ? 1 : -1;
    }

    self.zoom(-delta * ratio, e);
  },

  cropStart(event) {
    const self = this;
    const options = self.options;
    const e = $.getEvent(event);
    const touches = e.touches;
    let touchesLength;
    let touch;
    let action;

    if (self.disabled) {
      return;
    }

    if (touches) {
      touchesLength = touches.length;

      if (touchesLength > 1) {
        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
          touch = touches[1];
          self.startX2 = touch.pageX;
          self.startY2 = touch.pageY;
          action = 'zoom';
        } else {
          return;
        }
      }

      touch = touches[0];
    }

    action = action || $.getData(e.target, 'action');

    if (REGEXP_ACTIONS.test(action)) {
      if ($.dispatchEvent(self.element, 'cropstart', {
        originalEvent: e,
        action,
      }) === false) {
        return;
      }

      e.preventDefault();

      self.action = action;
      self.cropping = false;

      self.startX = touch ? touch.pageX : e.pageX;
      self.startY = touch ? touch.pageY : e.pageY;

      if (action === 'crop') {
        self.cropping = true;
        $.addClass(self.dragBox, 'cropper-modal');
      }
    }
  },

  cropMove(event) {
    const self = this;
    const options = self.options;
    const e = $.getEvent(event);
    const touches = e.touches;
    const action = self.action;
    let touchesLength;
    let touch;

    if (self.disabled) {
      return;
    }

    if (touches) {
      touchesLength = touches.length;

      if (touchesLength > 1) {
        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
          touch = touches[1];
          self.endX2 = touch.pageX;
          self.endY2 = touch.pageY;
        } else {
          return;
        }
      }

      touch = touches[0];
    }

    if (action) {
      if ($.dispatchEvent(self.element, 'cropmove', {
        originalEvent: e,
        action,
      }) === false) {
        return;
      }

      e.preventDefault();

      self.endX = touch ? touch.pageX : e.pageX;
      self.endY = touch ? touch.pageY : e.pageY;

      self.change(e.shiftKey, action === 'zoom' ? e : null);
    }
  },

  cropEnd(event) {
    const self = this;
    const options = self.options;
    const e = $.getEvent(event);
    const action = self.action;

    if (self.disabled) {
      return;
    }

    if (action) {
      e.preventDefault();

      if (self.cropping) {
        self.cropping = false;
        $.toggleClass(self.dragBox, 'cropper-modal', self.cropped && options.modal);
      }

      self.action = '';

      $.dispatchEvent(self.element, 'cropend', {
        originalEvent: e,
        action,
      });
    }
  },
};
