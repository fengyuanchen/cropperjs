QUnit.test('events#crop', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(7);

  image.addEventListener('crop', function (e) {
    assert.ok(util.isNumber(e.detail.x));
    assert.ok(util.isNumber(e.detail.y));
    assert.ok(util.isNumber(e.detail.width));
    assert.ok(util.isNumber(e.detail.height));
    assert.ok(util.isNumber(e.detail.rotate));
    assert.ok(util.isNumber(e.detail.scaleX));
    assert.ok(util.isNumber(e.detail.scaleY));

    done();
  });

  return new Cropper(image);
});
