window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var _data = {
        x: 360,
        y: 450,
        width: 640,
        height: 360,
        rotate: 45,
        scaleX: -1,
        scaleY: -1
      };

  image.newCropper = new Cropper(image, {
    data: _data,

    built: function () {
      var data = this.cropper.getData();

      QUnit.test('options.data', function (assert) {
        assert.equal(Math.round(data.x), _data.x);
        assert.equal(Math.round(data.y), _data.y);
        assert.equal(Math.round(data.width), _data.width);
        assert.equal(Math.round(data.height), _data.height);
        assert.equal(Math.round(data.rotate), _data.rotate);
        assert.equal(Math.round(data.scaleX), _data.scaleX);
        assert.equal(Math.round(data.scaleY), _data.scaleY);
      });

    }
  });

});
