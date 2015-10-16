window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    strict: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.move', function (assert) {
        var canvasData = cropper.getCanvasData();
        var changedCanvasData = cropper.move(1, 1).getCanvasData();

        assert.equal(changedCanvasData.left, canvasData.left + 1);
        assert.equal(changedCanvasData.top, canvasData.top + 1);
      });

    }
  });

});
