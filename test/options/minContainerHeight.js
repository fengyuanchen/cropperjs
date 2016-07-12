QUnit.test('options#minContainerHeight', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var minContainerHeight = 361;

  assert.expect(1);

  return new Cropper(image, {
    minContainerHeight: minContainerHeight,

    ready: function () {
      var cropper = this.cropper;
      var containerData = cropper.getContainerData();

      assert.strictEqual(Math.round(containerData.height), minContainerHeight);

      done();
    }
  });
});
