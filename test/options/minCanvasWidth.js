window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCanvasWidth = 480;

  image.newCropper = new Cropper(image, {
    strict: false,
    minCanvasWidth: minCanvasWidth,

    built: function () {
      var canvasData = this.cropper.setCanvasData({
            width: 320
          }).getCanvasData();

      QUnit.test('options.minCanvasWidth', function (assert) {
        assert.equal(Math.round(canvasData.width), minCanvasWidth);
      });

    }
  });

});
