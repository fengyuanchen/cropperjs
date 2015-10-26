window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var options = cropper.options;

      cropper.disable();

      QUnit.test('methods.disable', function (assert) {
        assert.ok(cropper.isDisabled);
        assert.ok(cropper.cropper.className.indexOf('cropper-disabled') !== -1);
      });

      QUnit.test('methods.disable: clear', function (assert) {
        var cropBoxData = cropper.getCropBoxData();

        cropper.clear();
        assert.deepEqual(cropper.getCropBoxData(), cropBoxData);
      });

      QUnit.test('methods.disable: move', function (assert) {
        var imageData = cropper.getImageData();

        cropper.move(10, 10);
        assert.deepEqual(cropper.getImageData(), imageData);
      });

      QUnit.test('methods.disable: zoom', function (assert) {
        var imageData = cropper.getImageData();

        cropper.zoom(0.5);
        assert.equal(cropper.getImageData().ratio, imageData.ratio);
      });

      QUnit.test('methods.disable: rotate', function (assert) {
        var imageData = cropper.getImageData();

        cropper.rotate(15);
        assert.equal(cropper.getImageData().rotate, imageData.rotate);
      });

      QUnit.test('methods.disable: scale', function (assert) {
        var imageData = cropper.getImageData();

        cropper.scale(-1);
        assert.equal(cropper.getImageData().scaleX, imageData.scaleX);
      });

      QUnit.test('methods.disable: setCanvasData', function (assert) {
        var canvasData = cropper.getCanvasData();

        cropper.setCanvasData({
          width: canvasData.width - 160
        });

        assert.deepEqual(cropper.getCanvasData(), canvasData);
      });

      QUnit.test('methods.disable: setCropBoxData', function (assert) {
        var cropBoxData = cropper.getCropBoxData();

        cropper.setCropBoxData({
          height: cropBoxData.height - 90
        });

        assert.deepEqual(cropper.getCropBoxData(), cropBoxData);
      });

      QUnit.test('methods.disable: setAspectRatio', function (assert) {
        cropper.setAspectRatio(0.618);
        assert.ok(isNaN(options.aspectRatio));
      });

      QUnit.test('methods.disable: setDragMode', function (assert) {
        var action = cropper.dragBox.dataset.action;

        cropper.setDragMode('none');
        assert.equal(cropper.dragBox.dataset.action, action);
      });

    }
  });

});
