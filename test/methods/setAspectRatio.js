window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var options = cropper.options;
      var aspectRatio = 16 / 9;

      QUnit.test('methods.setAspectRatio', function (assert) {
        assert.ok(isNaN(options.aspectRatio));
        cropper.setAspectRatio(aspectRatio);
        assert.equal(options.aspectRatio, aspectRatio);
      });

    }
  });

});
