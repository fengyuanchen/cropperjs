QUnit.test('options#zoomable: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(3);

  return new Cropper(image, {
    // zoomable: true,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var changedCanvasData = cropper.zoom(0.1).getCanvasData();

      assert.ok(changedCanvasData.width > canvasData.width);
      assert.ok(changedCanvasData.height > canvasData.height);

      done();
    },
    zoom: function () {
      assert.ok(true);
    }
  });
});

QUnit.test('options#zoomable: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    zoomable: false,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();
      var changedCanvasData = cropper.zoom(0.1).getCanvasData();

      assert.ok(changedCanvasData.width === canvasData.width);
      assert.ok(changedCanvasData.height === canvasData.height);

      done();
    },
    zoom: function () {
      assert.ok(false);
    }
  });
});
