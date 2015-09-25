window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    highlight: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.highlight', function (assert) {
        assert.ok(cropper.cropper.querySelector('.cropper-face').className.indexOf('cropper-invisible') !== -1);
      });

    }
  });

});
