window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var image2 = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var imageData;

      QUnit.test('options.rotatable: true', function (assert) {
        cropper.rotate(90);
        imageData = cropper.getImageData();
        assert.equal(imageData.rotate, 90);
      });

    }
  });

  image2.newCropper = new Cropper(image2, {
    rotatable: false,

    built: function () {
      var cropper = this.cropper;
      var imageData;

      QUnit.test('options.rotatable: false', function (assert) {
        cropper.rotate(90);
        imageData = cropper.getImageData();
        assert.ok(typeof imageData.rotate === 'undefined');
      });

    }
  });

});
