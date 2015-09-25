window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var data = this.cropper.getContainerData();

      QUnit.test('methods.getContainerData', function (assert) {
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));
      });

    }
  });

});
