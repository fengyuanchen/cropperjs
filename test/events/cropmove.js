QUnit.test('events.cropmove', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('built', function () {
    var cropper = this.cropper;

    util.dispatchEvent(cropper.dragBox, 'mousedown');
    util.dispatchEvent(cropper.dragBox, 'mousemove');
    util.dispatchEvent(cropper.dragBox, 'mouseup');

    done();
  });

  image.addEventListener('cropmove', function (e) {
    assert.strictEqual(e.detail.action, 'crop');
  });

  return new Cropper(image);
});
