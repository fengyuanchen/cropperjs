import * as $ from './utilities';

// Events
const EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
const EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
const EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel' +
  ' MSPointerUp MSPointerCancel';
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

    $.addListener(cropper, EVENT_MOUSE_DOWN, (self.onCropStart = $.proxy(self.cropStart, self)));

    if (options.zoomable && options.zoomOnWheel) {
      $.addListener(cropper, EVENT_WHEEL, (self.onWheel = $.proxy(self.wheel, self)));
    }

    if (options.toggleDragModeOnDblclick) {
      $.addListener(cropper, EVENT_DBLCLICK, (self.onDblclick = $.proxy(self.dblclick, self)));
    }

    $.addListener(document, EVENT_MOUSE_MOVE, (self.onCropMove = $.proxy(self.cropMove, self)));
    $.addListener(document, EVENT_MOUSE_UP, (self.onCropEnd = $.proxy(self.cropEnd, self)));

    if (options.responsive) {
      $.addListener(window, EVENT_RESIZE, (self.onResize = $.proxy(self.resize, self)));
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

    $.removeListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart);

    if (options.zoomable && options.zoomOnWheel) {
      $.removeListener(cropper, EVENT_WHEEL, self.onWheel);
    }

    if (options.toggleDragModeOnDblclick) {
      $.removeListener(cropper, EVENT_DBLCLICK, self.onDblclick);
    }

    $.removeListener(document, EVENT_MOUSE_MOVE, self.onCropMove);
    $.removeListener(document, EVENT_MOUSE_UP, self.onCropEnd);

    if (options.responsive) {
      $.removeListener(window, EVENT_RESIZE, self.onResize);
    }
  },
};
