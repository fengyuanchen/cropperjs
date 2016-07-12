QUnit.test('methods#enable', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      cropper.disable();
      assert.ok(cropper.disabled);
      assert.ok(util.hasClass(cropper.cropper, 'cropper-disabled'));

      cropper.enable();
      assert.notOk(cropper.disabled);
      assert.notOk(util.hasClass(cropper.cropper, 'cropper-disabled'));

      done();
    }
  });
});
