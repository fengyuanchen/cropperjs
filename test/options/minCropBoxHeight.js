QUnit.test('options#minCropBoxHeight', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var minCropBoxHeight = 150;

  assert.expect(1);

  return new Cropper(image, {
    minCropBoxHeight: minCropBoxHeight,

    ready: function () {
      var cropper = this.cropper;
      var cropBoxData = cropper.setCropBoxData({
            height: 100
          }).getCropBoxData();

      assert.strictEqual(Math.round(cropBoxData.height), minCropBoxHeight);

      done();
    }
  });
});
