window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    strict: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.reset', function (assert) {
        var canvasData = cropper.getCanvasData();
        var cropBoxData = cropper.getCropBoxData();

        cropper.setCanvasData({
          top: canvasData.top + 10,
          width: canvasData.width - 10
        });

        assert.notDeepEqual(cropper.getCanvasData(), canvasData);

        cropper.setCropBoxData({
          left: cropBoxData.left + 10,
          height: cropBoxData.height - 10
        });

        assert.notDeepEqual(cropper.getCropBoxData(), cropBoxData);

        cropper.reset();
        assert.deepEqual(cropper.getCanvasData(), canvasData);
        assert.deepEqual(cropper.getCropBoxData(), cropBoxData);
      });

    }
  });

});
