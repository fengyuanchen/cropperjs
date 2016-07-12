QUnit.test('options#aspectRatio: NaN', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // aspectRatio: NaN,

    ready: function () {
      var cropper = this.cropper;

      assert.ok(isNaN(cropper.options.aspectRatio));

      done();
    }
  });
});

QUnit.test('options#aspectRatio: 1', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    aspectRatio: 1,

    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.options.aspectRatio, 1);

      done();
    }
  });
});
