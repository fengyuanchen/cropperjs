window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var image2 = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var imageData = cropper.imageData;

      QUnit.test('options.scalable: true', function (assert) {
        cropper.scale(2, -2);

        assert.equal(imageData.scaleX, 2);
        assert.equal(imageData.scaleY, -2);
      });

    }
  });

  image2.newCropper = new Cropper(image2, {
    scalable: false,

    built: function () {
      var cropper = this.cropper;
      var imageData = cropper.imageData;

      QUnit.test('options.scalable: false', function (assert) {
        cropper.scale(2, -2);

        assert.ok(typeof imageData.scaleX === 'undefined');
        assert.ok(typeof imageData.scaleY === 'undefined');
      });

    }
  });

});
