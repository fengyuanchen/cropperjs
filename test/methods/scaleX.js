window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.scaleX', function (assert) {
        var imageData = cropper.scaleX(-1).getImageData();

        assert.equal(imageData.scaleX, -1);
      });

    }
  });

});
