window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var image2 = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var canvasData;
      var cropBoxData;

      QUnit.test('options.strict: true', function (assert) {
        cropper.zoom(-0.5); // Zoom out
        canvasData = cropper.getCanvasData();
        cropBoxData = cropper.getCropBoxData();
        assert.ok(canvasData.width >= cropBoxData.width);
        assert.ok(canvasData.height >= cropBoxData.height);
      });

    }
  });

  image2.newCropper = new Cropper(image2, {
    strict: false,

    built: function () {
      var cropper = this.cropper;
      var _canvasData = {
            left: 100,
            top: 100,
            width: 160,
            height: 90
          };

      QUnit.test('options.strict: false', function (assert) {
        var canvasData = cropper.setCanvasData(_canvasData).getCanvasData();

        assert.equal(canvasData.left, _canvasData.left);
        assert.equal(canvasData.top, _canvasData.top);
        assert.equal(canvasData.width, _canvasData.width);
        assert.equal(canvasData.height, _canvasData.height);
      });

    }
  });

});
