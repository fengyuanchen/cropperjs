QUnit.test('methods#scale', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var imageData = cropper.scale(-1, -1).getImageData();

      assert.strictEqual(imageData.scaleX, -1);
      assert.strictEqual(imageData.scaleY, -1);

      done();
    }
  });
});
