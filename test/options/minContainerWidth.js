window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minContainerWidth = 641;

  image.newCropper = new Cropper(image, {
    minContainerWidth: minContainerWidth,

    built: function () {
      var containerData = this.cropper.getContainerData();

      QUnit.test('options.minContainerWidth', function (assert) {
        assert.equal(Math.round(containerData.width), minContainerWidth);
      });

    }
  });

});
