QUnit.test('Issue #99', function (assert) {
  const loadFromData = oldData => {
    var done = assert.async();
    var util = window.Util;
    var image = util.createImage();

    assert.expect(4);

    new Cropper(image, {
      viewMode: 1,
      minCropBoxWidth: 200,
      minCropBoxHeight: 550,
      data: oldData,
      ready: function () {
        var cropper = this.cropper;

        if (oldData === null) {
          cropper.zoom(3);
          cropper.move(100, 200);

          const newData = cropper.getData();

          return loadFromData(newData);
        }

        const newData = cropper.getData();

        assert.strictEqual(newData.x, oldData.x);
        assert.strictEqual(newData.y, oldData.y);
        assert.strictEqual(newData.width, oldData.width);
        assert.strictEqual(newData.height, oldData.height);

        done();
      }
    });
  };

  loadFromData(null);
});
