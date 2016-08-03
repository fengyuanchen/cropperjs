QUnit.test('options#viewMode: 0', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    // viewMode: 0,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = {
            left: 100,
            top: 100,
            width: 160,
            height: 90
          };
      var changedCanvasData = cropper.setCanvasData(canvasData).getCanvasData();

      assert.strictEqual(changedCanvasData.left, canvasData.left);
      assert.strictEqual(changedCanvasData.top, canvasData.top);
      assert.strictEqual(changedCanvasData.width, canvasData.width);
      assert.strictEqual(changedCanvasData.height, canvasData.height);

      done();
    }
  });
});

QUnit.test('options#viewMode: 1', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    viewMode: 1,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
      var cropBoxData = cropper.getCropBoxData();

      assert.ok(canvasData.width >= cropBoxData.width);
      assert.ok(canvasData.height >= cropBoxData.height);

      done();
    }
  });
});

QUnit.test('options#viewMode: 2', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    viewMode: 2,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
      var containerData = cropper.getContainerData();

      assert.ok(canvasData.width >= containerData.width ||
        canvasData.height >= containerData.height);

      done();
    }
  });
});

QUnit.test('options#viewMode: 3', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    viewMode: 3,

    ready: function () {
      var cropper = this.cropper;
      var canvasData = cropper.zoom(-0.5).getCanvasData(); // Zoom out
      var containerData = cropper.getContainerData();

      assert.ok(canvasData.left <= 0);
      assert.ok(canvasData.top <= 0);
      assert.ok(canvasData.width >= containerData.width);
      assert.ok(canvasData.height >= containerData.height);

      done();
    }
  });
});
