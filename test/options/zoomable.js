window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    zoomable: false,

    built: function () {
      var cropper = this.cropper;
      var _ratio = cropper.image.ratio;

      QUnit.test('options.zoomable', function (assert) {
        cropper.zoom(1);

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

});
