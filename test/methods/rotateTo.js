QUnit.test('methods#rotateTo', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.rotateTo(360).getImageData().rotate, 0);
      assert.strictEqual(cropper.rotateTo(90).getImageData().rotate, 90);
      assert.strictEqual(cropper.rotateTo(0).getImageData().rotate, 0);
      assert.strictEqual(cropper.rotateTo(-180).getImageData().rotate, -180);

      done();
    }
  });
});
