QUnit.test('options.zoom', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(3);

  return new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      cropper.zoom(0.1);

      done();
    },

    zoom: function (data) {
      assert.ok(data.ratio > 0);
      assert.ok(data.oldRatio > 0);
      assert.ok(data.ratio > data.oldRatio);
    }
  });
});

QUnit.test('options.zoom: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();

      assert.deepEqual(cropper.zoom(0.1).getCanvasData(), canvasData);

      done();
    },

    zoom: function () {
      return false;
    }
  });
});
