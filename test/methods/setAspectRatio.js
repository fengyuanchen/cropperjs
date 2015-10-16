window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.setAspectRatio', function (assert) {
        var options = cropper.options;

        assert.ok(isNaN(options.aspectRatio));

        cropper.setAspectRatio(1);
        assert.equal(options.aspectRatio, 1);
      });

    }
  });

});
