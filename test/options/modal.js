window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    modal: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.modal', function (assert) {
        assert.ok(cropper.canvas.className.indexOf('cropper-modal') === -1);
      });

    }
  });

});
