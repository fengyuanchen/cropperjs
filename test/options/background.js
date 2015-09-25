window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    background: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.background', function (assert) {
        assert.ok(cropper.cropper.className.indexOf('cropper-bg') === -1);
      });

    }
  });

});
