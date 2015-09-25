$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    build: function () {

      QUnit.test('options.build', function (assert) {
        assert.ok(true);
      });

      return false;

    },

    built: function () {

      QUnit.test('options.build: default prevented', function (assert) {
        assert.ok(false);
      });

    }
  });

});
