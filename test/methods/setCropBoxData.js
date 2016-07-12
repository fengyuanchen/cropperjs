QUnit.test('methods#setCropBoxData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(8);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var cropBoxData = cropper.getCropBoxData();
      var changedCropBoxData = cropper.setCropBoxData({
            left: 16,
            top: 9
          }).getCropBoxData();

      assert.notStrictEqual(changedCropBoxData.left, cropBoxData.left);
      assert.notStrictEqual(changedCropBoxData.top, cropBoxData.top);
      assert.strictEqual(changedCropBoxData.width, cropBoxData.width);
      assert.strictEqual(changedCropBoxData.height, cropBoxData.height);

      cropBoxData = cropper.getCropBoxData();
      changedCropBoxData = cropper.setCropBoxData({
        width: 320,
        height: 180
      }).getCropBoxData();

      assert.strictEqual(changedCropBoxData.left, cropBoxData.left);
      assert.strictEqual(changedCropBoxData.top, cropBoxData.top);
      assert.notStrictEqual(changedCropBoxData.width, cropBoxData.width);
      assert.notStrictEqual(changedCropBoxData.height, cropBoxData.height);

      done();
    }
  });
});
