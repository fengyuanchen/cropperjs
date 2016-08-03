QUnit.test('events#zoom', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(3);

  image.addEventListener('ready', function () {
    var cropper = this.cropper;

    cropper.zoom(0.1);

    done();
  });

  image.addEventListener('zoom', function (e) {
    assert.ok(e.detail.ratio > 0);
    assert.ok(e.detail.oldRatio > 0);
    assert.ok(e.detail.ratio > e.detail.oldRatio);
  });

  return new Cropper(image);
});

QUnit.test('events#zoom: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  image.addEventListener('ready', function () {
    var cropper = this.cropper;
    var canvasData = cropper.getCanvasData();

    assert.deepEqual(cropper.zoom(0.1).getCanvasData(), canvasData);

    done();
  });

  image.addEventListener('zoom', function (e) {
    e.preventDefault();
  });

  return new Cropper(image);
});
