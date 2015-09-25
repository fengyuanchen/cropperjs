window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    cropBoxResizable: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.cropBoxResizable', function (assert) {
        assert.ok(cropper.cropBox.querySelector('.cropper-line').className.indexOf('cropper-hidden') !== -1);
        assert.ok(cropper.cropBox.querySelector('.cropper-point').className.indexOf('cropper-hidden') !== -1);
      });

    }
  });

});
