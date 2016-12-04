QUnit.test('methods#replace', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      cropper.options.ready = function () {
        assert.notOk(cropper.cropped);
        cropper.crop();
        assert.ok(cropper.cropped);
        done();
      };

      cropper.options.autoCrop = false;
      cropper.replace('../docs/images/picture-2.jpg');
    }
  });
});
