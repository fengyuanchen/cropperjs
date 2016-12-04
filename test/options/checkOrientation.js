QUnit.test('options#checkOrientation: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage({
        src: '../docs/images/picture-3.jpg'
      });

  assert.expect(1);

  return new Cropper(image, {
    // checkOrientation: true,

    ready: function () {
      var cropper = this.cropper;

      assert.notStrictEqual(cropper.getData().rotate, 0);

      done();
    }
  });
});

QUnit.test('options#checkOrientation: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage({
        src: '../docs/images/picture-3.jpg'
      });

  assert.expect(1);

  return new Cropper(image, {
    checkOrientation: false,

    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.getData().rotate, 0);

      done();
    }
  });
});
