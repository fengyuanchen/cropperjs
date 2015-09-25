window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var _data = cropper.getCropBoxData();

      QUnit.test('methods.setCropBoxData', function (assert) {
        var data = cropper.setCropBoxData({
              left: 16,
              height: 120
            }).getCropBoxData();

        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.notEqual(data.left, _data.left);
        assert.equal(data.top, _data.top);
        assert.equal(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

      QUnit.test('methods.setCropBoxData: move', function (assert) {
        var data = cropper.reset().setCropBoxData({
              left: 16,
              top: 9
            }).getCropBoxData();

        assert.notEqual(data.left, _data.left);
        assert.notEqual(data.top, _data.top);
        assert.equal(data.width, _data.width);
        assert.equal(data.height, _data.height);
      });


      QUnit.test('methods.setCropBoxData: resize', function (assert) {
        var data = cropper.reset().setCropBoxData({
              width: 320,
              height: 180
            }).getCropBoxData();

        assert.equal(data.left, _data.left);
        assert.equal(data.top, _data.top);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

    }
  });

});
