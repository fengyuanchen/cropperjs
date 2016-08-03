QUnit.test('options#cropstart', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      util.dispatchEvent(cropper.dragBox, 'mousedown');
      util.dispatchEvent(cropper.dragBox, 'mouseup');

      done();
    },

    cropstart: function (e) {
      assert.strictEqual(e.detail.action, 'crop');
    }
  });
});

QUnit.test('options#cropstart: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(0);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      util.dispatchEvent(cropper.dragBox, 'mousedown');
      util.dispatchEvent(cropper.dragBox, 'mousemove');
      util.dispatchEvent(cropper.dragBox, 'mouseup');

      done();
    },

    cropstart: function (e) {
      e.preventDefault();
    },

    cropmove: function () {
      assert.ok(false);
    },

    cropend: function () {
      assert.ok(false);
    }
  });
});
