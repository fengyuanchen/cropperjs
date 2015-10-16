window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.clear', function (assert) {
        var cropBoxData = cropper.clear().getCropBoxData();

        assert.ok(!cropper.cropped);
        assert.ok(cropper.cropBox.className.indexOf('cropper-hidden') !== -1);
        assert.deepEqual(cropBoxData, {});
      });

    }
  });

});
