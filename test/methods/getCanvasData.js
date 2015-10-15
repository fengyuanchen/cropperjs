window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var data = this.cropper.getCanvasData();

      QUnit.test('methods.getCanvasData', function (assert) {
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));
        assert.ok(isNumber(data.naturalWidth));
        assert.ok(isNumber(data.naturalHeight));
      });

    }
  });

});
