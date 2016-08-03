QUnit.test('options#cropmove', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      util.dispatchEvent(cropper.dragBox, 'mousedown');
      util.dispatchEvent(cropper.dragBox, 'mousemove');
      util.dispatchEvent(cropper.dragBox, 'mouseup');

      done();
    },

    cropmove: function (e) {
      assert.strictEqual(e.detail.action, 'crop');
    }
  });
});
