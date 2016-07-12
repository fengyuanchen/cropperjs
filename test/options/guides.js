QUnit.test('options#guides: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    // guides: true,

    ready: function () {
      var cropper = this.cropper;
      var dashed = util.getByClass(cropper.cropBox, 'cropper-dashed');

      assert.notOk(util.hasClass(dashed[0], 'cropper-hidden'));
      assert.notOk(util.hasClass(dashed[1], 'cropper-hidden'));

      done();
    }
  });
});

QUnit.test('options#guides: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    guides: false,

    ready: function () {
      var cropper = this.cropper;
      var dashed = util.getByClass(cropper.cropBox, 'cropper-dashed');

      assert.ok(util.hasClass(dashed[0], 'cropper-hidden'));
      assert.ok(util.hasClass(dashed[1], 'cropper-hidden'));

      done();
    }
  });
});
