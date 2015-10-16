window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.rotate', function (assert) {
        cropper.rotate(360);
        assert.equal(cropper.getImageData().rotate, 0);

        cropper.rotate(90);
        assert.equal(cropper.getImageData().rotate, 90);

        cropper.rotate(-90);
        assert.equal(cropper.getImageData().rotate, 0);
      });

    }
  });

});
