window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var dragBox = cropper.dragBox;

      QUnit.test('methods.setDragMode', function (assert) {
        assert.equal(dragBox.dataset.action, 'crop');
      });

      QUnit.test('methods.setDragMode: move', function (assert) {
        cropper.setDragMode('move');
        assert.equal(dragBox.dataset.action, 'move');
      });

      QUnit.test('methods.setDragMode: crop', function (assert) {
        cropper.setDragMode('crop');
        assert.equal(dragBox.dataset.action, 'crop');
      });

      QUnit.test('methods.setDragMode: none', function (assert) {
        cropper.setDragMode('none');
        assert.equal(dragBox.dataset.action, 'none');
      });

    }
  });

});
