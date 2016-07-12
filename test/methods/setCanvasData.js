QUnit.test('methods#setCanvasData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(6);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var changedCanvasData = cropper.setCanvasData({
            left: 16,
            top: 9
          }).getCanvasData();

      assert.notStrictEqual(changedCanvasData.left, canvasData.left);
      assert.notStrictEqual(changedCanvasData.top, canvasData.top);
      assert.strictEqual(changedCanvasData.width, canvasData.width);
      assert.strictEqual(changedCanvasData.height, canvasData.height);

      canvasData = cropper.getCanvasData();
      changedCanvasData = cropper.setCanvasData({
        width: 320,
        height: 180
      }).getCanvasData();

      assert.notStrictEqual(changedCanvasData.width, canvasData.width);
      assert.notStrictEqual(changedCanvasData.height, canvasData.height);

      done();
    }
  });
});
