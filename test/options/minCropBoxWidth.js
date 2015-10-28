window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCropBoxWidth = 300;

  image.newCropper = new Cropper(image, {
    minCropBoxWidth: minCropBoxWidth,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.minCropBoxWidth', function (assert) {
        var cropBoxData = cropper.setCropBoxData({
              width: 200
            }).getCropBoxData();

        assert.equal(Math.round(cropBoxData.width), minCropBoxWidth);
      });

    }
  });

});
