window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minContainerHeight = 361;

  image.newCropper = new Cropper(image, {
    minContainerHeight: minContainerHeight,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.minContainerHeight', function (assert) {
        var containerData = cropper.getContainerData();

        assert.equal(Math.round(containerData.height), minContainerHeight);
      });

    }
  });

});
