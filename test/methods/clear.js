QUnit.test('methods#clear', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;

      cropper.clear();
      assert.notOk(cropper.cropped);
      assert.deepEqual(cropper.getData(), {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotate: 0,
        scaleX: 1,
        scaleY: 1
      });
      assert.deepEqual(cropper.getCropBoxData(), {});
      assert.ok(util.hasClass(cropper.cropBox, 'cropper-hidden'));

      done();
    }
  });
});
