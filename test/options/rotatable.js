QUnit.test('options#rotatable: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // rotatable: true,

    built: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.rotate(90).getImageData().rotate, 90);

      done();
    }
  });
});

QUnit.test('options#rotatable: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    rotatable: false,

    built: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.rotate(90).getImageData().rotate, undefined);

      done();
    }
  });
});
