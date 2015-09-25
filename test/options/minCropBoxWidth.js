window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCropBoxWidth = 300;

  image.newCropper = new Cropper(image, {
    strict: false,
    minCropBoxWidth: minCropBoxWidth,

    built: function () {
      var cropBoxData = this.cropper.setCropBoxData({
            width: 200
          }).getCropBoxData();

      QUnit.test('options.minCropBoxWidth', function (assert) {
        assert.equal(Math.round(cropBoxData.width), minCropBoxWidth);
      });

    }
  });

});
