QUnit.test('options#checkCrossOrigin: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage({
        src: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg'
      });

  assert.expect(2);

  return new Cropper(image, {
    // checkCrossOrigin: true,

    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.image.crossOrigin, 'anonymous');
      assert.ok(cropper.image.src.indexOf('timestamp') >= 0);

      done();
    }
  });
});

QUnit.test('options#checkCrossOrigin: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage({
        src: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg'
      });

  assert.expect(2);

  return new Cropper(image, {
    checkCrossOrigin: false,

    ready: function () {
      var cropper = this.cropper;

      assert.notStrictEqual(cropper.image.crossOrigin, 'anonymous');
      assert.ok(cropper.image.src.indexOf('timestamp') < 0);

      done();
    }
  });
});

QUnit.test('options#checkCrossOrigin: exists crossOrigin attribute', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage({
        src: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg',
        crossOrigin: 'anonymous'
      });

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.image.crossOrigin, 'anonymous');
      assert.ok(cropper.image.src.indexOf('timestamp') < 0);

      done();
    }
  });
});
