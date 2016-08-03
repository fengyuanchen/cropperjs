QUnit.test('methods#scaleY', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var imageData = cropper.scaleY(-1).getImageData();

      assert.strictEqual(imageData.scaleY, -1);

      done();
    }
  });
});
