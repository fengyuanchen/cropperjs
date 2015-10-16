window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.zoomTo', function (assert) {
        var imageData = cropper.zoomTo(1).getImageData();
        var canvasData = cropper.getCanvasData();

        assert.equal(imageData.width, imageData.naturalWidth);
        assert.equal(canvasData.width, canvasData.naturalWidth);
        assert.equal(canvasData.naturalWidth, imageData.naturalWidth);
      });

    }
  });

});
