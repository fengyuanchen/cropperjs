import * as $ from './utilities';

const REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;

function getPointer({ pageX, pageY }, endOnly) {
  const end = {
    endX: pageX,
    endY: pageY,
  };

  if (endOnly) {
    return end;
  }

  return $.extend({
    startX: pageX,
    startY: pageY,
  }, end);
}

export default {
  resize() {
    const self = this;
    const options = self.options;
    const container = self.container;
    const containerData = self.containerData;
    const minContainerWidth = Number(options.minContainerWidth) || 200;
    const minContainerHeight = Number(options.minContainerHeight) || 100;

    if (self.disabled || containerData.width === minContainerWidth ||
      containerData.height === minContainerHeight) {
      return;
    }

    const ratio = container.offsetWidth / containerData.width;

    // Resize when width changed or height changed
    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
      let canvasData;
      let cropBoxData;

      if (options.restore) {
        canvasData = self.getCanvasData();
        cropBoxData = self.getCropBoxData();
      }

      self.render();

      if (options.restore) {
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

    if (self.disabled || self.options.dragMode === 'none') {
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

    if (self.disabled) {
      return;
    }

    const options = self.options;
    const pointers = self.pointers;
    const e = $.getEvent(event);
    let action;

    if (e.changedTouches) {
      // Handle touch event
      $.each(e.changedTouches, (touch) => {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      // Handle mouse event and pointer event
      pointers[e.pointerId || 0] = getPointer(e);
    }

    if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
      action = 'zoom';
    } else {
      action = $.getData(e.target, 'action');
    }

    if (!REGEXP_ACTIONS.test(action)) {
      return;
    }

    if ($.dispatchEvent(self.element, 'cropstart', {
      originalEvent: e,
      action,
    }) === false) {
      return;
    }

    e.preventDefault();

    self.action = action;
    self.cropping = false;

    if (action === 'crop') {
      self.cropping = true;
      $.addClass(self.dragBox, 'cropper-modal');
    }
  },

  cropMove(event) {
    const self = this;
    const action = self.action;

    if (self.disabled || !action) {
      return;
    }

    const pointers = self.pointers;
    const e = $.getEvent(event);

    e.preventDefault();

    if ($.dispatchEvent(self.element, 'cropmove', {
      originalEvent: e,
      action,
    }) === false) {
      return;
    }

    if (e.changedTouches) {
      $.each(e.changedTouches, (touch) => {
        $.extend(pointers[touch.identifier], getPointer(touch, true));
      });
    } else {
      $.extend(pointers[e.pointerId || 0], getPointer(e, true));
    }

    self.change(e);
  },

  cropEnd(event) {
    const self = this;

    if (self.disabled) {
      return;
    }

    const action = self.action;
    const pointers = self.pointers;
    const e = $.getEvent(event);

    if (e.changedTouches) {
      $.each(e.changedTouches, (touch) => {
        delete pointers[touch.identifier];
      });
    } else {
      delete pointers[e.pointerId || 0];
    }

    if (!action) {
      return;
    }

    e.preventDefault();

    if (!Object.keys(pointers).length) {
      self.action = '';
    }

    if (self.cropping) {
      self.cropping = false;
      $.toggleClass(self.dragBox, 'cropper-modal', self.cropped && this.options.modal);
    }

    $.dispatchEvent(self.element, 'cropend', {
      originalEvent: e,
      action,
    });
  },
};
