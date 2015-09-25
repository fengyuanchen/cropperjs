$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var dragBox = this.cropper.dragBox;

      // Triggers events manually when built
      $(dragBox).trigger('mousedown').trigger('mouseup');
    },

    cropstart: function (data) {

      QUnit.test('options.cropstart', function (assert) {
        assert.equal(data.action, 'crop');
      });

    }
  });

});
