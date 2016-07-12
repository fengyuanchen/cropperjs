QUnit.test('methods#scaleX', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var imageData = cropper.scaleX(-1).getImageData();

      assert.strictEqual(imageData.scaleX, -1);

      done();
    }
  });
});
