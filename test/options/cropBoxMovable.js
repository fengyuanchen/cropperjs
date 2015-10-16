window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.cropBoxMovable: true', function (assert) {
        assert.equal(cropper.cropper.querySelector('.cropper-face').dataset.action, 'all');
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      cropBoxMovable: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.cropBoxMovable: false', function (assert) {
          assert.notEqual(cropper.cropper.querySelector('.cropper-face').dataset.action, 'all');
        });

      }
    });
  })();

});
