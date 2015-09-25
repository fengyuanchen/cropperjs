window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    mouseWheelZoom: false,

    built: function () {
      var cropper = this.cropper;
      var _ratio = cropper.image.ratio;

      QUnit.test('options.mouseWheelZoom', function (assert) {
        $(cropper.cropper).trigger($.Event('wheel', {
          originalEvent: {
            wheelDelta: -120
          }
        }));

        assert.equal(cropper.image.ratio, _ratio);
      });

    }
  });

});
