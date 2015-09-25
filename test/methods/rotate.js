window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.rotate', function (assert) {
        cropper.rotate(360);
        assert.equal(cropper.getImageData().rotate, 0);

        cropper.rotate(30);
        assert.equal(cropper.getImageData().rotate, 30);

        cropper.rotate(-15);
        assert.equal(cropper.getImageData().rotate, 15);

        cropper.rotate(-15);
        assert.equal(cropper.getImageData().rotate, 0);
      });

    }
  });

});
