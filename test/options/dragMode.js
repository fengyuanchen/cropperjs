QUnit.test('options#dragMode: crop', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // dragMode: 'crop',

    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.dragBox.dataset.action, 'crop');

      done();
    }
  });
});

QUnit.test('options#dragMode: move', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    dragMode: 'move',

    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.dragBox.dataset.action, 'move');

      done();
    }
  });
});


QUnit.test('options#dragMode: none', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    dragMode: 'none',

    ready: function () {
      var cropper = this.cropper;

      assert.strictEqual(cropper.dragBox.dataset.action, 'none');

      done();
    }
  });
});
