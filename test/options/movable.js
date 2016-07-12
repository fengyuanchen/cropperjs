QUnit.test('options#movable: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    // movable: true,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var changedCanvasData = cropper.move(10, 10).getCanvasData();

      assert.strictEqual(changedCanvasData.left, canvasData.left + 10);
      assert.strictEqual(changedCanvasData.top, canvasData.top + 10);

      done();
    }
  });
});

QUnit.test('options#movable: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    movable: false,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var changedCanvasData = cropper.move(10, 10).getCanvasData();

      assert.strictEqual(changedCanvasData.left, canvasData.left);
      assert.strictEqual(changedCanvasData.top, canvasData.top);

      done();
    }
  });
});
