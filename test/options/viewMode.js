window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    // viewMode: 0,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.viewMode: 0', function (assert) {
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

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      viewMode: 1,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.viewMode: 1', function (assert) {
          var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
          var cropBoxData = cropper.getCropBoxData();

          assert.ok(canvasData.width >= cropBoxData.width);
          assert.ok(canvasData.height >= cropBoxData.height);
        });

      }
    });
  })();

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      viewMode: 2,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.viewMode: 2', function (assert) {
          var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
          var containerData = cropper.getContainerData();

          assert.ok(canvasData.width >= containerData.width || canvasData.height >= containerData.height);
        });

      }
    });
  })();

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      viewMode: 3,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.viewMode: 3', function (assert) {
          var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
          var containerData = cropper.getContainerData();

          assert.ok(canvasData.width >= containerData.width);
          assert.ok(canvasData.height >= containerData.height);
        });

      }
    });
  })();

});
