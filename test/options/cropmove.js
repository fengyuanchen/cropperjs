window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      // Triggers events manually when built
      $(cropper.dragBox).trigger('mousedown').trigger('mousemove').trigger('mouseup');
    },

    cropmove: function (data) {

      QUnit.test('options.cropmove', function (assert) {
        assert.equal(data.action, 'crop');
      });

    }
  });

});
