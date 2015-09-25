window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var _data = cropper.getCanvasData();

      QUnit.test('methods.setCanvasData', function (assert) {
        var data = cropper.setCanvasData({
              left: 16,
              height: 120
            }).getCanvasData();

        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.notEqual(data.left, _data.left);
        assert.notEqual(data.top, _data.top);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

      QUnit.test('methods.setCanvasData: move', function (assert) {
        var data = cropper.reset().setCanvasData({
              left: 16,
              top: 9
            }).getCanvasData();

        assert.notEqual(data.left, _data.left);
        assert.notEqual(data.top, _data.top);
        assert.equal(data.width, _data.width);
        assert.equal(data.height, _data.height);
      });


      QUnit.test('methods.setCanvasData: resize', function (assert) {
        var data = cropper.reset().setCanvasData({
              width: 320,
              height: 180
            }).getCanvasData();

        assert.notEqual(data.left, _data.left);
        assert.notEqual(data.top, _data.top);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

    }
  });

});
