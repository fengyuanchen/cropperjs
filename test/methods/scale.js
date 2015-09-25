window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.scale', function (assert) {
        var imageData;

        cropper.scale(-2, 2);
        imageData = cropper.getImageData();
        assert.equal(imageData.scaleX, -2);
        assert.equal(imageData.scaleY, 2);
      });

    }
  });

});
