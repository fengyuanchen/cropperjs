QUnit.test('options#center: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // center: true,

    ready: function () {
      var cropper = this.cropper;
      var center = util.getByClass(cropper.cropBox, 'cropper-center');

      assert.notOk(util.hasClass(center[0], 'cropper-hidden'));

      done();
    }
  });
});

QUnit.test('options#center: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    center: false,

    ready: function () {
      var cropper = this.cropper;
      var center = util.getByClass(cropper.cropBox, 'cropper-center');

      assert.ok(util.hasClass(center[0], 'cropper-hidden'));

      done();
    }
  });
});
