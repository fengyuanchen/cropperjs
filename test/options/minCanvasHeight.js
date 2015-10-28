window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCanvasHeight = 270;

  image.newCropper = new Cropper(image, {
    minCanvasHeight: minCanvasHeight,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.minCanvasHeight', function (assert) {
        var canvasData = cropper.setCanvasData({
              height: 180
            }).getCanvasData();

        assert.equal(Math.round(canvasData.height), minCanvasHeight);
      });

    }
  });

});
