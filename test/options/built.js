$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {

      QUnit.test('options.built', function (assert) {
        assert.ok(true);
      });

    }
  });

});
