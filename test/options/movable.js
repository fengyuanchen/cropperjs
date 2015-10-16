window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.movable: true', function (assert) {
        var canvasData = cropper.getCanvasData();
        var changedCanvadData = cropper.move(10, 10).getCanvasData();

        assert.equal(changedCanvadData.left, canvasData.left + 10);
        assert.equal(changedCanvadData.top, canvasData.top + 10);
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      movable: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.movable: false', function (assert) {
          var canvasData = cropper.getCanvasData();
          var changedCanvadData = cropper.move(10, 10).getCanvasData();

          assert.equal(changedCanvadData.left, canvasData.left);
          assert.equal(changedCanvadData.top, canvasData.top);
        });
      }
    });
  })();

});
