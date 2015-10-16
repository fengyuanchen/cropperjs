window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minContainerWidth = 641;

  image.newCropper = new Cropper(image, {
    minContainerWidth: minContainerWidth,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.minContainerWidth', function (assert) {
        var containerData = cropper.getContainerData();

        assert.equal(Math.round(containerData.width), minContainerWidth);
      });

    }
  });

});
