window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var image2 = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var _left = canvasData.left;
      var _top = canvasData.top;

      QUnit.test('options.movable: true', function (assert) {
        cropper.move(10, 10);
        canvasData = cropper.getCanvasData();
        assert.equal(canvasData.left, _left + 10);
        assert.equal(canvasData.top, _top + 10);
      });
    }
  });

  image2.newCropper = new Cropper(image2, {
    movable: false,

    built: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var _left = canvasData.left;
      var _top = canvasData.top;

      QUnit.test('options.movable: true', function (assert) {
        cropper.move(10, 10);
        canvasData = cropper.getCanvasData();
        assert.equal(canvasData.left, _left);
        assert.equal(canvasData.top, _top);
      });
    }
  });

});
