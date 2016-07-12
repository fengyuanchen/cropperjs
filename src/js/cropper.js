  function Cropper(element, options) {
    var _this = this;

    _this.element = element;
    _this.options = extend({}, Cropper.DEFAULTS, isPlainObject(options) && options);
    _this.loaded = false;
    _this.ready = false;
    _this.complete = false;
    _this.rotated = false;
    _this.cropped = false;
    _this.disabled = false;
    _this.replaced = false;
    _this.limited = false;
    _this.wheeling = false;
    _this.isImg = false;
    _this.originalUrl = '';
    _this.canvasData = null;
    _this.cropBoxData = null;
    _this.previews = null;
    _this.init();
  }
