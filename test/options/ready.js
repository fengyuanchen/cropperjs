QUnit.test('options#ready', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    ready: function () {
      assert.ok(true);

      done();
    }
  });
});
