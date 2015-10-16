window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.getCanvasData', function (assert) {
        var canvasData = cropper.getCanvasData();

        assert.ok(isNumber(canvasData.left));
        assert.ok(isNumber(canvasData.top));
        assert.ok(isNumber(canvasData.width));
        assert.ok(isNumber(canvasData.height));
        assert.ok(isNumber(canvasData.naturalWidth));
        assert.ok(isNumber(canvasData.naturalHeight));
      });

    }
  });

});
