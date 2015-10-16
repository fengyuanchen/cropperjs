window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.getCropBoxData', function (assert) {
        var cropBoxData = cropper.getCropBoxData();

        assert.ok(isNumber(cropBoxData.left));
        assert.ok(isNumber(cropBoxData.top));
        assert.ok(isNumber(cropBoxData.width));
        assert.ok(isNumber(cropBoxData.height));
      });

    }
  });

});
