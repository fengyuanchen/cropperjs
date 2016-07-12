QUnit.test('events#ready', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('ready', function () {
    assert.ok(true);

    done();
  });

  return new Cropper(image);
});
