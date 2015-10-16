window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.scaleY', function (assert) {
        var imageData = cropper.scaleY(-1).getImageData();

        assert.equal(imageData.scaleY, -1);
      });

    }
  });

});
