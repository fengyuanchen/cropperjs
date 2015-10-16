window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minCropBoxHeight = 150;

  image.newCropper = new Cropper(image, {
    strict: false,
    minCropBoxHeight: minCropBoxHeight,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.minCropBoxHeight', function (assert) {
        var cropBoxData = cropper.setCropBoxData({
              height: 100
            }).getCropBoxData();

        assert.equal(Math.round(cropBoxData.height), minCropBoxHeight);
      });

    }
  });

});
