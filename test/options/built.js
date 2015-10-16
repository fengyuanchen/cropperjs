$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.built', function (assert) {
        assert.ok(cropper.built);
      });

    }
  });

});
