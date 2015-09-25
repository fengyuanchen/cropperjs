window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    center: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.center', function (assert) {
        assert.ok(cropper.cropBox.querySelector('.cropper-center').className.indexOf('cropper-hidden') !== -1);
      });

    }
  });

});
