window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      // Triggers events manually when built
      $(cropper.dragBox).trigger('mousedown').trigger('mouseup');
    },

    cropend: function (data) {

      QUnit.test('options.cropend', function (assert) {
        assert.ok(data.action, 'crop');
      });

    }
  });

});
