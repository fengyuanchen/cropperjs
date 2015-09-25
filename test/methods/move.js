window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    strict: false,

    built: function () {
      var cropper = this.cropper;
      var _canvasData = cropper.getCanvasData();

      QUnit.test('methods.move', function (assert) {
        var canvasData;

        cropper.move(1, 1);
        canvasData = cropper.getCanvasData();
        assert.ok(canvasData.left === _canvasData.left + 1);
        assert.ok(canvasData.top === _canvasData.top + 1);
      });

    }
  });

});
