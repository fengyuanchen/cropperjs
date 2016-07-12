QUnit.test('options#cropBoxResizable: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(12);

  return new Cropper(image, {
    // cropBoxResizable: true,

    ready: function () {
      var cropper = this.cropper;
      var line = util.getByClass(cropper.cropBox, 'cropper-line');
      var point = util.getByClass(cropper.cropBox, 'cropper-point');

      assert.notOk(util.hasClass(line[0], 'cropper-hidden'));
      assert.notOk(util.hasClass(line[1], 'cropper-hidden'));
      assert.notOk(util.hasClass(line[2], 'cropper-hidden'));
      assert.notOk(util.hasClass(line[3], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[0], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[1], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[2], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[3], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[4], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[5], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[6], 'cropper-hidden'));
      assert.notOk(util.hasClass(point[7], 'cropper-hidden'));

      done();
    }
  });
});

QUnit.test('options#cropBoxResizable: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(12);

  return new Cropper(image, {
    cropBoxResizable: false,

    ready: function () {
      var cropper = this.cropper;
      var line = util.getByClass(cropper.cropBox, 'cropper-line');
      var point = util.getByClass(cropper.cropBox, 'cropper-point');

      assert.ok(util.hasClass(line[0], 'cropper-hidden'));
      assert.ok(util.hasClass(line[1], 'cropper-hidden'));
      assert.ok(util.hasClass(line[2], 'cropper-hidden'));
      assert.ok(util.hasClass(line[3], 'cropper-hidden'));
      assert.ok(util.hasClass(point[0], 'cropper-hidden'));
      assert.ok(util.hasClass(point[1], 'cropper-hidden'));
      assert.ok(util.hasClass(point[2], 'cropper-hidden'));
      assert.ok(util.hasClass(point[3], 'cropper-hidden'));
      assert.ok(util.hasClass(point[4], 'cropper-hidden'));
      assert.ok(util.hasClass(point[5], 'cropper-hidden'));
      assert.ok(util.hasClass(point[6], 'cropper-hidden'));
      assert.ok(util.hasClass(point[7], 'cropper-hidden'));

      done();
    }
  });
});
