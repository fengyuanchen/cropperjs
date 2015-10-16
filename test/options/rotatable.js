window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.rotatable: true', function (assert) {
        assert.equal(cropper.rotate(90).getImageData().rotate, 90);
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      rotatable: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.rotatable: false', function (assert) {
          assert.equal(cropper.rotate(90).getImageData().rotate, undefined);
        });

      }
    });
  })();

});
