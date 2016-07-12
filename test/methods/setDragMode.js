QUnit.test('methods#setDragMode', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var dragBox = cropper.dragBox;

      assert.strictEqual(dragBox.dataset.action, 'crop');

      cropper.setDragMode('move');
      assert.strictEqual(dragBox.dataset.action, 'move');

      cropper.setDragMode('crop');
      assert.strictEqual(dragBox.dataset.action, 'crop');

      cropper.setDragMode('none');
      assert.strictEqual(dragBox.dataset.action, 'none');

      done();
    }
  });
});
