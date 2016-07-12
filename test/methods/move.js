QUnit.test('methods#move', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var changedCanvasData = cropper.move(1, 1).getCanvasData();

      assert.strictEqual(changedCanvasData.left, canvasData.left + 1);
      assert.strictEqual(changedCanvasData.top, canvasData.top + 1);

      done();
    }
  });
});
