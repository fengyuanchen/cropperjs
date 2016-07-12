QUnit.test('options#minCanvasWidth', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var minCanvasWidth = 480;

  assert.expect(1);

  return new Cropper(image, {
    minCanvasWidth: minCanvasWidth,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.setCanvasData({
            width: 320
          }).getCanvasData();

      assert.strictEqual(Math.round(canvasData.width), minCanvasWidth);

      done();
    }
  });
});
