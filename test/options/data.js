QUnit.test('options#data', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();
  var initialData = {
        x: 360,
        y: 450,
        width: 640,
        height: 360,
        rotate: 45,
        scaleX: -1,
        scaleY: -1
      };

  assert.expect(7);

  return new Cropper(image, {
    data: initialData,

    ready: function () {
      var cropper = this.cropper;
      var data = cropper.getData(true);

      assert.strictEqual(data.x, initialData.x);
      assert.strictEqual(data.y, initialData.y);
      assert.strictEqual(data.width, initialData.width);
      assert.strictEqual(data.height, initialData.height);
      assert.strictEqual(data.rotate, initialData.rotate);
      assert.strictEqual(data.scaleX, initialData.scaleX);
      assert.strictEqual(data.scaleY, initialData.scaleY);

      done();
    }
  });
});
