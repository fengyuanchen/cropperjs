window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var minContainerHeight = 361;

  image.newCropper = new Cropper(image, {
    minContainerHeight: minContainerHeight,

    built: function () {
      var containerData = this.cropper.getContainerData();

      QUnit.test('options.minContainerHeight', function (assert) {
        assert.equal(Math.round(containerData.height), minContainerHeight);
      });

    }
  });

});
