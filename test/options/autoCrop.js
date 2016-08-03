QUnit.test('options#autoCrop: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // autoCrop: true,

    ready: function () {
      var cropper = this.cropper;

      assert.ok(cropper.cropped);

      done();
    }
  });
});

QUnit.test('options#autoCrop: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    autoCrop: false,

    ready: function () {
      var cropper = this.cropper;

      assert.notOk(cropper.cropped);

      done();
    }
  });
});
