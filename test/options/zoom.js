$(function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      this.cropper.zoom(0.1);
    },

    zoom: function (data) {
      QUnit.test('options.zoom', function (assert) {
        assert.ok(data.ratio > 0);
        assert.ok(data.oldRatio > 0);
        assert.ok(data.ratio > data.oldRatio);
      });
    }
  });

});
