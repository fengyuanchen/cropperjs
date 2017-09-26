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
    const { options, container, containerData } = this;
    const minContainerWidth = Number(options.minContainerWidth) || 200;
    const minContainerHeight = Number(options.minContainerHeight) || 100;

    if (this.disabled || containerData.width <= minContainerWidth ||
      containerData.height <= minContainerHeight) {
      return;
    }

    const ratio = container.offsetWidth / containerData.width;

    // Resize when width changed or height changed
    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
      let canvasData;
      let cropBoxData;

      if (options.restore) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();
      }

      this.render();

      if (options.restore) {
        this.setCanvasData($.each(canvasData, (n, i) => {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData($.each(cropBoxData, (n, i) => {
          cropBoxData[i] = n * ratio;
        }));
      }
    }
  },

  dblclick() {
    if (this.disabled || this.options.dragMode === 'none') {
      return;
    }

    this.setDragMode($.hasClass(this.dragBox, 'cropper-crop') ? 'move' : 'crop');
  },

  wheel(event) {
    const e = $.getEvent(event);
    const ratio = Number(this.options.wheelZoomRatio) || 0.1;
    let delta = 1;

    if (this.disabled) {
      return;
    }

    e.preventDefault();

    // Limit wheel speed to prevent zoom too fast (#21)
    if (this.wheeling) {
      return;
    }

    this.wheeling = true;

    setTimeout(() => {
      this.wheeling = false;
    }, 50);

    if (e.deltaY) {
      delta = e.deltaY > 0 ? 1 : -1;
    } else if (e.wheelDelta) {
      delta = -e.wheelDelta / 120;
    } else if (e.detail) {
      delta = e.detail > 0 ? 1 : -1;
    }

    this.zoom(-delta * ratio, e);
  },

  cropStart(event) {
    if (this.disabled) {
      return;
    }

    const { options, pointers } = this;
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

    if ($.dispatchEvent(this.element, 'cropstart', {
      originalEvent: e,
      action,
    }) === false) {
      return;
    }

    e.preventDefault();

    this.action = action;
    this.cropping = false;

    if (action === 'crop') {
      this.cropping = true;
      $.addClass(this.dragBox, 'cropper-modal');
    }
  },

  cropMove(event) {
    const { action } = this;

    if (this.disabled || !action) {
      return;
    }

    const { pointers } = this;
    const e = $.getEvent(event);

    e.preventDefault();

    if ($.dispatchEvent(this.element, 'cropmove', {
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

    this.change(e);
  },

  cropEnd(event) {
    if (this.disabled) {
      return;
    }

    const { action, pointers } = this;
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
      this.action = '';
    }

    if (this.cropping) {
      this.cropping = false;
      $.toggleClass(this.dragBox, 'cropper-modal', this.cropped && this.options.modal);
    }

    $.dispatchEvent(this.element, 'cropend', {
      originalEvent: e,
      action,
    });
  },
};
