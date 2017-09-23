QUnit.test('events#cropend', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('ready', function () {
    var PointerEvent = window.PointerEvent;
    var cropper = this.cropper;

    util.dispatchEvent(cropper.dragBox, PointerEvent ? 'pointerdown' : 'mousedown');
    util.dispatchEvent(cropper.dragBox, PointerEvent ? 'pointermove' : 'mousemove');
    util.dispatchEvent(cropper.dragBox, PointerEvent ? 'pointerup' : 'mouseup');

    done();
  });

  image.addEventListener('cropend', function (e) {
    assert.strictEqual(e.detail.action, 'crop');
  });

  return new Cropper(image);
});
