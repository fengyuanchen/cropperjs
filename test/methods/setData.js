QUnit.test('methods#setData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(8);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var data = cropper.getData();
      var changedData = cropper.setData({
            x: 16,
            y: 9
          }).getData();

      assert.notStrictEqual(changedData.x, data.x);
      assert.notStrictEqual(changedData.y, data.y);
      assert.strictEqual(changedData.width, data.width);
      assert.strictEqual(changedData.height, data.height);

      data = cropper.getData();
      changedData = cropper.setData({
        width: 320,
        height: 180
      }).getData();

      assert.strictEqual(changedData.x, data.x);
      assert.strictEqual(changedData.y, data.y);
      assert.notStrictEqual(changedData.width, data.width);
      assert.notStrictEqual(changedData.height, data.height);

      done();
    }
  });
});
