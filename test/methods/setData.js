window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var _data = cropper.getData();

      QUnit.test('methods.setData', function (assert) {
        var data = cropper.setData({
              x: 16,
              height: 120
            }).getData();

        assert.ok(isNumber(data.x));
        assert.ok(isNumber(data.y));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.notEqual(data.x, _data.x);
        assert.equal(data.y, _data.y);
        assert.equal(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

      QUnit.test('methods.setData: move', function (assert) {
        var data = cropper.reset().setData({
              x: 16,
              y: 9
            }).getData();

        assert.notEqual(data.x, _data.x);
        assert.notEqual(data.y, _data.y);
        assert.equal(data.width, _data.width);
        assert.equal(data.height, _data.height);
      });


      QUnit.test('methods.setData: resize', function (assert) {
        var data = cropper.reset().setData({
              width: 320,
              height: 180
            }).getData();

        assert.equal(data.x, _data.x);
        assert.equal(data.y, _data.y);
        assert.notEqual(data.width, _data.width);
        assert.notEqual(data.height, _data.height);
      });

    }
  });

});
