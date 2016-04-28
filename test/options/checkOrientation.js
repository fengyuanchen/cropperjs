QUnit.test('options#checkOrientation: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage({
        src: '../assets/img/picture-3.jpg'
      });

  assert.expect(1);

  return new Cropper(image, {
    // checkOrientation: true,

    built: function () {
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
        src: '../assets/img/picture-3.jpg'
      });

  assert.expect(1);

  return new Cropper(image, {
    checkOrientation: false,

    built: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.getData().rotate, 0);

      done();
    }
  });
});
