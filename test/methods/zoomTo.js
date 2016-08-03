QUnit.test('methods#zoomTo', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(3);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var imageData = cropper.zoomTo(1).getImageData();
      var canvasData = cropper.getCanvasData();

      assert.strictEqual(imageData.width, imageData.naturalWidth);
      assert.strictEqual(canvasData.width, canvasData.naturalWidth);
      assert.strictEqual(canvasData.naturalWidth, imageData.naturalWidth);

      done();
    }
  });
});
