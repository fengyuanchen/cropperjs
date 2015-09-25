window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var image = cropper.image;

      QUnit.test('methods.zoom', function (assert) {
        var width = image.width;
        var height = image.height;

        cropper.zoom(0.1);

        assert.ok(image.width > width);
        assert.ok(image.height > height);
        assert.notEqual(image.width, width);
        assert.notEqual(image.height, height);
      });

    }
  });

});
