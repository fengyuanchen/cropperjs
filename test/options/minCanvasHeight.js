window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCanvasHeight = 270;

  image.newCropper = new Cropper(image, {
    strict: false,
    minCanvasHeight: minCanvasHeight,

    built: function () {
      var canvasData = this.cropper.setCanvasData({
            height: 180
          }).getCanvasData();

      QUnit.test('options.minCanvasHeight', function (assert) {
        assert.equal(Math.round(canvasData.height), minCanvasHeight);
      });

    }
  });

});
