$(function () {

  'use strict';

  var image = window.createCropperImage();
  var count = 0;

  image.newCropper = new Cropper(image, {
    built: function () {
      this.cropper.zoom(0.1).zoom(-0.1);
    },

    zoom: function (data) {
      QUnit.test('options.zoom', function (assert) {
        if (count === 0) {
          assert.ok(data.ratio > data.oldRatio);
        } else {
          assert.ok(data.ratio < data.oldRatio);
        }

        count++;
      });
    }
  });

});
