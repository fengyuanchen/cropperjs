window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.strict: true', function (assert) {
        var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
        var cropBoxData = cropper.getCropBoxData();

        assert.ok(canvasData.width >= cropBoxData.width);
        assert.ok(canvasData.height >= cropBoxData.height);
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      strict: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.strict: false', function (assert) {
          var canvasData = {
                left: 100,
                top: 100,
                width: 160,
                height: 90
              };
          var changedCanvasData = cropper.setCanvasData(canvasData).getCanvasData();

          assert.equal(changedCanvasData.left, canvasData.left);
          assert.equal(changedCanvasData.top, canvasData.top);
          assert.equal(changedCanvasData.width, canvasData.width);
          assert.equal(changedCanvasData.height, canvasData.height);
        });

      }
    });
  })();

});
