QUnit.test('methods#getImageData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(10);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var imageData = cropper.getImageData();

      assert.ok(util.isNumber(imageData.naturalWidth));
      assert.ok(util.isNumber(imageData.naturalHeight));
      assert.ok(util.isNumber(imageData.aspectRatio));
      assert.ok(util.isNumber(imageData.left));
      assert.ok(util.isNumber(imageData.top));
      assert.ok(util.isNumber(imageData.width));
      assert.ok(util.isNumber(imageData.height));

      imageData = cropper.rotateTo(45).getImageData();
      assert.strictEqual(imageData.rotate, 45);

      imageData = cropper.scale(-1, -1).getImageData();
      assert.strictEqual(imageData.scaleX, -1);
      assert.strictEqual(imageData.scaleY, -1);

      done();
    }
  });
});
