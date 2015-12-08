  function Cropper(element, options) {
    this.element = element;
    this.options = extend({}, Cropper.DEFAULTS, isPlainObject(options) && options);
    this.loaded = false;
    this.built = false;
    this.complete = false;
    this.rotated = false;
    this.cropped = false;
    this.disabled = false;
    this.replaced = false;
    this.limited = false;
    this.isImg = false;
    this.originalUrl = '';
    this.canvasData = null;
    this.cropBoxData = null;
    this.previews = null;
    this.init();
  }
