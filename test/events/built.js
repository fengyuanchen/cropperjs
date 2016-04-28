QUnit.test('events#built', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('built', function () {
    var cropper = this.cropper;

    assert.ok(cropper.built);

    done();
  });

  return new Cropper(image);
});
