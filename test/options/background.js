QUnit.test('options#background: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // background: true,

    ready: function () {
      var cropper = this.cropper;

      assert.ok(util.hasClass(cropper.cropper, 'cropper-bg'));

      done();
    }
  });
});

QUnit.test('options#background: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    background: false,

    ready: function () {
      var cropper = this.cropper;

      assert.notOk(util.hasClass(cropper.cropper, 'cropper-bg'));

      done();
    }
  });

});
