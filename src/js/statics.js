  var _Cropper = window.Cropper;

  Cropper.noConflict = function () {
    window.Cropper = _Cropper;
    return Cropper;
  };

  Cropper.setDefaults = function (options) {
    extend(Cropper.DEFAULTS, options);
  };
