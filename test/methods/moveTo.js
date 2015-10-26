window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.moveTo', function (assert) {
        var canvasData = cropper.moveTo(0, 0).getCanvasData();

        assert.equal(canvasData.left, 0);
        assert.equal(canvasData.top, 0);
      });

    }
  });

});
