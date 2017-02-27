import * as $ from './utilities';

// Globals
const PointerEvent = typeof window !== 'undefined' ? window.PointerEvent : null;

// Events
const EVENT_MOUSE_DOWN = PointerEvent ? 'pointerdown' : 'touchstart mousedown';
const EVENT_MOUSE_MOVE = PointerEvent ? 'pointermove' : 'touchmove mousemove';
const EVENT_MOUSE_UP = PointerEvent ? ' pointerup pointercancel' : 'touchend touchcancel mouseup';
const EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
const EVENT_DBLCLICK = 'dblclick';
const EVENT_RESIZE = 'resize';
const EVENT_CROP_START = 'cropstart';
const EVENT_CROP_MOVE = 'cropmove';
const EVENT_CROP_END = 'cropend';
const EVENT_CROP = 'crop';
const EVENT_ZOOM = 'zoom';

export default {
  bind() {
    const self = this;
    const options = self.options;
    const element = self.element;
    const cropper = self.cropper;

    if ($.isFunction(options.cropstart)) {
      $.addListener(element, EVENT_CROP_START, options.cropstart);
    }

    if ($.isFunction(options.cropmove)) {
      $.addListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if ($.isFunction(options.cropend)) {
      $.addListener(element, EVENT_CROP_END, options.cropend);
    }

    if ($.isFunction(options.crop)) {
      $.addListener(element, EVENT_CROP, options.crop);
    }

    if ($.isFunction(options.zoom)) {
      $.addListener(element, EVENT_ZOOM, options.zoom);
    }

    if (options.zoomable && options.zoomOnWheel) {
      $.addListener(cropper, EVENT_WHEEL, (self.onWheel = $.proxy(self.wheel, self)));
    }

    if (options.toggleDragModeOnDblclick) {
      $.addListener(cropper, EVENT_DBLCLICK, (self.onDblclick = $.proxy(self.dblclick, self)));
    }

    if (options.responsive) {
      $.addListener(window, EVENT_RESIZE, (self.onResize = $.proxy(self.resize, self)));
    }

    if (!options.cropBoxFixed) {
      $.addListener(cropper, EVENT_MOUSE_DOWN, (self.onCropStart = $.proxy(self.cropStart, self)));
      $.addListener(document, EVENT_MOUSE_MOVE, (self.onCropMove = $.proxy(self.cropMove, self)));
      $.addListener(document, EVENT_MOUSE_UP, (self.onCropEnd = $.proxy(self.cropEnd, self)));
    }
  },

  unbind() {
    const self = this;
    const options = self.options;
    const element = self.element;
    const cropper = self.cropper;

    if ($.isFunction(options.cropstart)) {
      $.removeListener(element, EVENT_CROP_START, options.cropstart);
    }

    if ($.isFunction(options.cropmove)) {
      $.removeListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if ($.isFunction(options.cropend)) {
      $.removeListener(element, EVENT_CROP_END, options.cropend);
    }

    if ($.isFunction(options.crop)) {
      $.removeListener(element, EVENT_CROP, options.crop);
    }

    if ($.isFunction(options.zoom)) {
      $.removeListener(element, EVENT_ZOOM, options.zoom);
    }

    if (options.zoomable && options.zoomOnWheel) {
      $.removeListener(cropper, EVENT_WHEEL, self.onWheel);
    }

    if (options.toggleDragModeOnDblclick) {
      $.removeListener(cropper, EVENT_DBLCLICK, self.onDblclick);
    }

    if (options.responsive) {
      $.removeListener(window, EVENT_RESIZE, self.onResize);
    }

    if (!options.cropBoxFixed) {
      $.removeListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart);
      $.removeListener(document, EVENT_MOUSE_MOVE, self.onCropMove);
      $.removeListener(document, EVENT_MOUSE_UP, self.onCropEnd);
    }
  },
};
