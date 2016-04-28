QUnit.test('options#build', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    build: function () {
      assert.ok(true);

      done();
    }
  });
});

QUnit.test('options#build: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(0);

  return new Cropper(image, {
    build: function (e) {
      e.preventDefault();

      done();
    },

    built: function () {
      assert.ok(false);
    }
  });
});
