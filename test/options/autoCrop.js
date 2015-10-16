window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.autoCrop: true', function (assert) {
        assert.ok(cropper.cropped);
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      autoCrop: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.autoCrop: false', function (assert) {
          assert.ok(!cropper.cropped);
        });

      }
    });
  })();

});
