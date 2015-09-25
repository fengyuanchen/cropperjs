  if (typeof define === 'function' && define.amd) {
    define('cropper', [], function () {
      return Cropper;
    });
  }

  if (typeof noGlobal === 'undefined') {
    window.Cropper = Cropper;
  }

  return Cropper;

});
