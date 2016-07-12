QUnit.test('options#toggleDragModeOnDblclick: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    // toggleDragModeOnDblclick: true,

    ready: function () {
      var cropper = this.cropper;
      var dragBox = cropper.dragBox;

      util.dispatchEvent(dragBox, 'dblclick');
      assert.ok(util.hasClass(dragBox, 'cropper-move'));
      assert.strictEqual(dragBox.dataset.action, 'move');

      done();
    }
  });
});

QUnit.test('options#toggleDragModeOnDblclick: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(2);

  return new Cropper(image, {
    toggleDragModeOnDblclick: false,

    ready: function () {
      var cropper = this.cropper;
      var dragBox = cropper.dragBox;

      util.dispatchEvent(dragBox, 'dblclick');
      assert.ok(util.hasClass(dragBox, 'cropper-crop'));
      assert.strictEqual(dragBox.dataset.action, 'crop');

      done();
    }
  });
});
