window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.zoom', function (assert) {
        var canvasData = cropper.getCanvasData();
        var changedCanvasData = cropper.zoom(0.1).getCanvasData();

        assert.ok(changedCanvasData.width > canvasData.width);
        assert.ok(changedCanvasData.height > canvasData.height);
      });

    }
  });

});
