QUnit.test('options#cropBoxMovable: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // cropBoxMovable: true,

    ready: function () {
      var cropper = this.cropper;
      var face = util.getByClass(cropper.cropBox, 'cropper-face');

      assert.strictEqual(face[0].dataset.action, 'all');

      done();
    }
  });
});

QUnit.test('options#cropBoxMovable: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    cropBoxMovable: false,

    ready: function () {
      var cropper = this.cropper;
      var face = util.getByClass(cropper.cropBox, 'cropper-face');

      assert.strictEqual(face[0].dataset.action, cropper.options.dragMode);

      done();
    }
  });
});
