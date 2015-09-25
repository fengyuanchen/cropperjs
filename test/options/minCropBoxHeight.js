window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCropBoxHeight = 150;

  image.newCropper = new Cropper(image, {
    strict: false,
    minCropBoxHeight: minCropBoxHeight,

    built: function () {
      var cropBoxData = this.cropper.setCropBoxData({
            height: 100
          }).getCropBoxData();

      QUnit.test('options.minCropBoxHeight', function (assert) {
        assert.equal(Math.round(cropBoxData.height), minCropBoxHeight);
      });

    }
  });

});
