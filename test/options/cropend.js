QUnit.test('options.cropend', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      util.dispatchEvent(cropper.dragBox, 'mousedown');
      util.dispatchEvent(cropper.dragBox, 'mousemove');
      util.dispatchEvent(cropper.dragBox, 'mouseup');

      done();
    },

    cropend: function (data) {
      assert.strictEqual(data.action, 'crop');
    }
  });
});
