window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.rotateTo', function (assert) {
        assert.equal(cropper.rotateTo(360).getImageData().rotate, 0);
        assert.equal(cropper.rotateTo(90).getImageData().rotate, 90);
        assert.equal(cropper.rotateTo(0).getImageData().rotate, 0);
      });

    }
  });

});
