window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    cropBoxMovable: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.cropBoxMovable', function (assert) {
        assert.notEqual(cropper.cropper.querySelector('.cropper-face').dataset.action, 'all');
      });

    }
  });

});
