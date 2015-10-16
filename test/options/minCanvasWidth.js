window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCanvasWidth = 480;

  image.newCropper = new Cropper(image, {
    strict: false,
    minCanvasWidth: minCanvasWidth,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.minCanvasWidth', function (assert) {
        var canvasData = cropper.setCanvasData({
              width: 320
            }).getCanvasData();

        assert.equal(Math.round(canvasData.width), minCanvasWidth);
      });

    }
  });

});
