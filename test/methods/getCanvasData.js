QUnit.test('methods#getCanvasData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(6);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();

      assert.ok(util.isNumber(canvasData.left));
      assert.ok(util.isNumber(canvasData.top));
      assert.ok(util.isNumber(canvasData.width));
      assert.ok(util.isNumber(canvasData.height));
      assert.ok(util.isNumber(canvasData.naturalWidth));
      assert.ok(util.isNumber(canvasData.naturalHeight));

      done();
    }
  });
});
