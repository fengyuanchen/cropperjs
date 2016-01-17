QUnit.test('options.built', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      assert.ok(cropper.built);

      done();
    }
  });
});
