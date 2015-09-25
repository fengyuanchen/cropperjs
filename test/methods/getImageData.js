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
        var data = cropper.getImageData();

        assert.ok(isNumber(data.naturalWidth));
        assert.ok(isNumber(data.naturalHeight));
        assert.ok(isNumber(data.aspectRatio));
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));
      });

      QUnit.test('methods.getImageData: rotated', function (assert) {
        var data = cropper.rotate(45).getImageData();

        assert.equal(data.rotate, 45);
      });

      QUnit.test('methods.getImageData: scaled', function (assert) {
        var data = cropper.scale(-1, -1).getImageData();

        assert.equal(data.scaleX, -1);
        assert.equal(data.scaleY, -1);
      });

    }
  });

});
