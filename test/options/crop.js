QUnit.test('options.crop', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(7);

  return new Cropper(image, {
    crop: function (data) {
      assert.ok(util.isNumber(data.x));
      assert.ok(util.isNumber(data.y));
      assert.ok(util.isNumber(data.width));
      assert.ok(util.isNumber(data.height));
      assert.ok(util.isNumber(data.rotate));
      assert.ok(util.isNumber(data.scaleX));
      assert.ok(util.isNumber(data.scaleY));

      done();
    }
  });
});
