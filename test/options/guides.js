window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    guides: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.guides', function (assert) {
        assert.ok(cropper.cropBox.querySelector('.cropper-dashed').className.indexOf('cropper-hidden') !== -1);
      });

    }
  });

});
