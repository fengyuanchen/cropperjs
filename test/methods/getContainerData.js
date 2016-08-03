QUnit.test('methods#getContainerData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var containerData = cropper.getContainerData();

      assert.ok(util.isNumber(containerData.width));
      assert.ok(util.isNumber(containerData.height));

      done();
    }
  });
});
