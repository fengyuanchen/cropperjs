  if (typeof define === 'function' && define.amd) {
    define('cropper', [], function () {
      return Cropper;
    });
  }

  if (!noGlobal) {
    window.Cropper = Cropper;
  }

  return Cropper;

});
