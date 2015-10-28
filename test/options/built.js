window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.built', function (assert) {
        assert.equal(cropper.isBuilt, true);
      });

    }
  });

});
