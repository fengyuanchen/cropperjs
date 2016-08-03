QUnit.test('methods#setAspectRatio', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var options = cropper.options;

      assert.ok(isNaN(options.aspectRatio));
      cropper.setAspectRatio(1);
      assert.strictEqual(options.aspectRatio, 1);

      done();
    }
  });
});
