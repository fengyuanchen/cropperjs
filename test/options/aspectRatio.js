window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.aspectRatio: NaN', function (assert) {
        assert.ok(isNaN(cropper.options.aspectRatio));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      aspectRatio: 1,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.aspectRatio: 1', function (assert) {
          assert.equal(cropper.options.aspectRatio, 1);
        });

      }
    });
  })();

});
