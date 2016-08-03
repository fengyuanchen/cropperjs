QUnit.test('methods#crop', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    autoCrop: false,

    ready: function () {
      var cropper = this.cropper;

      assert.notOk(cropper.cropped);
      assert.ok(util.hasClass(cropper.cropBox, 'cropper-hidden'));

      cropper.crop();
      assert.ok(cropper.cropped);
      assert.notOk(util.hasClass(cropper.cropBox, 'cropper-hidden'));

      done();
    }
  });
});
