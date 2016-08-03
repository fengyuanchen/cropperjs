QUnit.test('options#minContainerWidth', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var minContainerWidth = 641;

  assert.expect(1);

  return new Cropper(image, {
    minContainerWidth: minContainerWidth,

    ready: function () {
      var cropper = this.cropper;
      var containerData = cropper.getContainerData();

      assert.strictEqual(Math.round(containerData.width), minContainerWidth);

      done();
    }
  });
});
