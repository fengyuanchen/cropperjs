QUnit.test('options#highlight: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // highlight: true,

    ready: function () {
      var cropper = this.cropper;
      var face = util.getByClass(cropper.cropBox, 'cropper-face');

      assert.notOk(util.hasClass(face[0], 'cropper-invisible'));

      done();
    }
  });
});

QUnit.test('options#highlight: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    highlight: false,

    ready: function () {
      var cropper = this.cropper;
      var face = util.getByClass(cropper.cropBox, 'cropper-face');

      assert.ok(util.hasClass(face[0], 'cropper-invisible'));

      done();
    }
  });
});
