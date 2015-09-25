window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    dragCrop: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.dragCrop', function (assert) {
        assert.notEqual(cropper.canvas.dataset.action, 'crop');
      });

    }
  });

});
