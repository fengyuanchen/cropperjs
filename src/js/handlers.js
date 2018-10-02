import {
  ACTION_CROP,
  ACTION_ZOOM,
  CLASS_CROP,
  CLASS_MODAL,
  DATA_ACTION,
  DRAG_MODE_CROP,
  DRAG_MODE_MOVE,
  DRAG_MODE_NONE,
  EVENT_CROP_END,
  EVENT_CROP_MOVE,
  EVENT_CROP_START,
  REGEXP_ACTIONS,
} from './constants';
import {
  addClass,
  assign,
  dispatchEvent,
  forEach,
  getData,
  getPointer,
  hasClass,
  toggleClass,
} from './utilities';

export default {
  resize() {
    const { options, container, containerData } = this;
    const minContainerWidth = Number(options.minContainerWidth) || 200;
    const minContainerHeight = Number(options.minContainerHeight) || 100;

    if (this.disabled || containerData.width <= minContainerWidth
      || containerData.height <= minContainerHeight) {
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
        this.setCanvasData(forEach(canvasData, (n, i) => {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData(forEach(cropBoxData, (n, i) => {
          cropBoxData[i] = n * ratio;
        }));
      }
    }
  },

  dblclick() {
    if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
      return;
    }

    this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
  },

  wheel(e) {
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

  cropStart(e) {
    if (this.disabled) {
      return;
    }

    const { options, pointers } = this;
    let action;

    if (e.changedTouches) {
      // Handle touch event
      forEach(e.changedTouches, (touch) => {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      // Handle mouse event and pointer event
      pointers[e.pointerId || 0] = getPointer(e);
    }

    if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
      action = ACTION_ZOOM;
    } else {
      action = getData(e.target, DATA_ACTION);
    }

    if (!REGEXP_ACTIONS.test(action)) {
      return;
    }

    if (dispatchEvent(this.element, EVENT_CROP_START, {
      originalEvent: e,
      action,
    }) === false) {
      return;
    }

    // This line is required for preventing page zooming in iOS browsers
    e.preventDefault();

    this.action = action;
    this.cropping = false;

    if (action === ACTION_CROP) {
      this.cropping = true;
      addClass(this.dragBox, CLASS_MODAL);
    }
  },

  cropMove(e) {
    const { action } = this;

    if (this.disabled || !action) {
      return;
    }

    const { pointers } = this;

    e.preventDefault();

    if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
      originalEvent: e,
      action,
    }) === false) {
      return;
    }

    if (e.changedTouches) {
      forEach(e.changedTouches, (touch) => {
        // The first parameter should not be undefined (#432)
        assign(pointers[touch.identifier] || {}, getPointer(touch, true));
      });
    } else {
      assign(pointers[e.pointerId || 0] || {}, getPointer(e, true));
    }

    this.change(e);
  },

  cropEnd(e) {
    if (this.disabled) {
      return;
    }

    const { action, pointers } = this;

    if (e.changedTouches) {
      forEach(e.changedTouches, (touch) => {
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
      toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
    }

    dispatchEvent(this.element, EVENT_CROP_END, {
      originalEvent: e,
      action,
    });
  },
};
