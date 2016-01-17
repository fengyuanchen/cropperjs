QUnit.test('options.scalable: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    // scalable: true,

    built: function () {
      var cropper = this.cropper;
      var imageData = cropper.scale(-1, -1).getImageData();

      assert.strictEqual(imageData.scaleX, -1);
      assert.strictEqual(imageData.scaleY, -1);

      done();
    }
  });
});

QUnit.test('options.scalable: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    scalable: false,

    built: function () {
      var cropper = this.cropper;
      var imageData = cropper.scale(-1, -1).getImageData();

      assert.strictEqual(imageData.scaleX, undefined);
      assert.strictEqual(imageData.scaleY, undefined);

      done();
    }
  });
});
