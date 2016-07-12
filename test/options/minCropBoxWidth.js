QUnit.test('options#minCropBoxWidth', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var minCropBoxWidth = 300;

  assert.expect(1);

  return new Cropper(image, {
    minCropBoxWidth: minCropBoxWidth,

    ready: function () {
      var cropper = this.cropper;
      var cropBoxData = cropper.setCropBoxData({
            width: 200
          }).getCropBoxData();

      assert.strictEqual(Math.round(cropBoxData.width), minCropBoxWidth);

      done();
    }
  });
});
