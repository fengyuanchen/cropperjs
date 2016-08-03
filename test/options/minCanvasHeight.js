QUnit.test('options#minCanvasHeight', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var minCanvasHeight = 270;

  assert.expect(1);

  return new Cropper(image, {
    minCanvasHeight: minCanvasHeight,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.setCanvasData({
            height: 180
          }).getCanvasData();

      assert.strictEqual(Math.round(canvasData.height), minCanvasHeight);

      done();
    }
  });
});
