QUnit.test('methods#disable', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(11);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var options = cropper.options;
      var cropBoxData;
      var canvasData;
      var imageData;
      var action;

      cropper.disable();
      assert.ok(cropper.disabled);
      assert.ok(util.hasClass(cropper.cropper, 'cropper-disabled'));

      cropBoxData = cropper.getCropBoxData();
      cropper.clear();
      assert.deepEqual(cropper.getCropBoxData(), cropBoxData);

      imageData = cropper.getImageData();
      cropper.move(10, 10);
      assert.deepEqual(cropper.getImageData(), imageData);

      cropper.zoom(0.5);
      assert.strictEqual(cropper.getImageData().ratio, imageData.ratio);

      cropper.rotate(15);
      assert.strictEqual(cropper.getImageData().rotate, imageData.rotate);

      cropper.scale(-1);
      assert.strictEqual(cropper.getImageData().scaleX, imageData.scaleX);

      canvasData = cropper.getCanvasData();
      cropper.setCanvasData({
        width: canvasData.width - 160
      });
      assert.deepEqual(cropper.getCanvasData(), canvasData);

      cropBoxData = cropper.getCropBoxData();
      cropper.setCropBoxData({
        height: cropBoxData.height - 90
      });
      assert.deepEqual(cropper.getCropBoxData(), cropBoxData);

      cropper.setAspectRatio(0.618);
      assert.ok(isNaN(options.aspectRatio));

      action = cropper.dragBox.dataset.action;
      cropper.setDragMode('none');
      assert.strictEqual(cropper.dragBox.dataset.action, action);

      done();
    }
  });
});
