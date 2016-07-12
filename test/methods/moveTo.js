QUnit.test('methods#moveTo', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.moveTo(0, 0).getCanvasData();

      assert.strictEqual(canvasData.left, 0);
      assert.strictEqual(canvasData.top, 0);

      done();
    }
  });
});
