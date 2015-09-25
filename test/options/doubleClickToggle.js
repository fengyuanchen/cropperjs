window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    doubleClickToggle: false,

    built: function () {
      var cropper = this.cropper;
      var dragBox = cropper.dragBox;

      QUnit.test('options.doubleClickToggle', function (assert) {
        $(cropper.cropper).trigger('dblclick');
        assert.ok(dragBox.className.indexOf('cropper-crop') !== -1);
        assert.equal(dragBox.dataset.action, 'crop');
      });

    }
  });

});
