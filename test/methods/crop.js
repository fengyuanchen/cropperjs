window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    autoCrop: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.crop', function (assert) {
        cropper.crop();
        assert.ok(cropper.isCropped);
        assert.ok(cropper.dragBox.className.indexOf('cropper-hidden') === -1);
        assert.ok(cropper.cropBox.className.indexOf('cropper-hidden') === -1);
      });

    }
  });

});
