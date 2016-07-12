QUnit.test('methods#getCropBoxData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var cropBoxData = cropper.getCropBoxData();

      assert.ok(util.isNumber(cropBoxData.left));
      assert.ok(util.isNumber(cropBoxData.top));
      assert.ok(util.isNumber(cropBoxData.width));
      assert.ok(util.isNumber(cropBoxData.height));

      done();
    }
  });
});
