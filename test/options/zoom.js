$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      this.cropper.zoom(0.1).zoom(-0.1);
    },

    zoom: function (data) {

      QUnit.test('options.zoom', function (assert) {
        if (data.ratio > 0) {
          assert.equal(data.ratio, 0.1);
        } else {
          assert.equal(data.ratio, -0.1);
        }
      });

    }
  });

});
