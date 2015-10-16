window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.getContainerData', function (assert) {
        var containerData = cropper.getContainerData();

        assert.ok(isNumber(containerData.width));
        assert.ok(isNumber(containerData.height));
      });

    }
  });

});
