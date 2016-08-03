QUnit.test('options#modal: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // modal: true,

    ready: function () {
      var cropper = this.cropper;

      assert.ok(util.hasClass(cropper.dragBox, 'cropper-modal'));

      done();
    }
  });
});

QUnit.test('options#modal: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    modal: false,

    ready: function () {
      var cropper = this.cropper;

      assert.notOk(util.hasClass(cropper.dragBox, 'cropper-modal'));

      done();
    }
  });
});
