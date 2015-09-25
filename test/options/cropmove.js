$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var dragBox = this.cropper.dragBox;

      // Triggers events manually when built
      $(dragBox).trigger('mousedown').trigger('mousemove').trigger('mouseup');
    },

    cropmove: function (data) {

      QUnit.test('options.cropmove', function (assert) {
        assert.equal(data.action, 'crop');
      });

    }
  });

});
