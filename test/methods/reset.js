QUnit.test('methods#reset', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var cropBoxData = cropper.getCropBoxData();

      cropper.setCanvasData({
        top: canvasData.top + 10,
        width: canvasData.width - 10
      });

      assert.notDeepEqual(cropper.getCanvasData(), canvasData);

      cropper.setCropBoxData({
        left: cropBoxData.left + 10,
        height: cropBoxData.height - 10
      });

      assert.notDeepEqual(cropper.getCropBoxData(), cropBoxData);

      cropper.reset();
      assert.deepEqual(cropper.getCanvasData(), canvasData);
      assert.deepEqual(cropper.getCropBoxData(), cropBoxData);

      done();
    }
  });
});
