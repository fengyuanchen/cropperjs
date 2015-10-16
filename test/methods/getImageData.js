window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.getImageData', function (assert) {
        var imageData = cropper.getImageData();

        assert.ok(isNumber(imageData.naturalWidth));
        assert.ok(isNumber(imageData.naturalHeight));
        assert.ok(isNumber(imageData.aspectRatio));
        assert.ok(isNumber(imageData.left));
        assert.ok(isNumber(imageData.top));
        assert.ok(isNumber(imageData.width));
        assert.ok(isNumber(imageData.height));
      });

      QUnit.test('methods.getImageData: rotated', function (assert) {
        var imageData = cropper.rotateTo(45).getImageData();

        assert.equal(imageData.rotate, 45);
      });

      QUnit.test('methods.getImageData: scaled', function (assert) {
        var imageData = cropper.scale(-1, -1).getImageData();

        assert.equal(imageData.scaleX, -1);
        assert.equal(imageData.scaleY, -1);
      });

    }
  });

});
