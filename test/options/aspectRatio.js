window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var aspectRatio = 16 / 9;

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var options = cropper.options;

      QUnit.test('options.aspectRatio', function (assert) {
        assert.ok(isNaN(options.aspectRatio));
        cropper.setAspectRatio(aspectRatio);
        assert.equal(options.aspectRatio, aspectRatio);
      });

    }
  });

});
