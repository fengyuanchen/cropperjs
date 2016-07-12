QUnit.test('methods#rotate', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(3);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.rotate(360).getImageData().rotate, 0);
      assert.strictEqual(cropper.rotate(90).getImageData().rotate, 90);
      assert.strictEqual(cropper.rotate(-180).getImageData().rotate, -90);

      done();
    }
  });
});
