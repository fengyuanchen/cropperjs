QUnit.test('events#build', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('build', function () {
    assert.ok(true);

    done();
  });

  return new Cropper(image);
});

QUnit.test('events#build: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(0);

  image.addEventListener('build', function (e) {
    e.preventDefault();

    done();
  });

  image.addEventListener('built', function () {
    assert.ok(false);
  });

  return new Cropper(image);
});
