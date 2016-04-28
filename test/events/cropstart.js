QUnit.test('events#cropstart', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('built', function () {
    var cropper = this.cropper;

    util.dispatchEvent(cropper.dragBox, 'mousedown');
    util.dispatchEvent(cropper.dragBox, 'mouseup');

    done();
  });

  image.addEventListener('cropstart', function (e) {
    assert.strictEqual(e.detail.action, 'crop');
  });

  return new Cropper(image);
});

QUnit.test('events#cropstart: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(0);

  image.addEventListener('built', function () {
    var cropper = this.cropper;

    util.dispatchEvent(cropper.dragBox, 'mousedown');
    util.dispatchEvent(cropper.dragBox, 'mousemove');
    util.dispatchEvent(cropper.dragBox, 'mouseup');

    done();
  });

  image.addEventListener('cropstart', function (e) {
    e.preventDefault();
  });

  image.addEventListener('cropmove', function () {
    assert.ok(false);
  });

  image.addEventListener('cropend', function () {
    assert.ok(false);
  });

  return new Cropper(image);
});
