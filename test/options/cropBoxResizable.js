window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.cropBoxResizable: true', function (assert) {
        var cropBox = cropper.cropBox;

        assert.ok(!hasClass(cropBox.querySelector('.cropper-line'), 'cropper-hidden'));
        assert.ok(!hasClass(cropBox.querySelector('.cropper-point'), 'cropper-hidden'));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      cropBoxResizable: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.cropBoxResizable: false', function (assert) {
          var cropBox = cropper.cropBox;

          assert.ok(hasClass(cropBox.querySelector('.cropper-line'), 'cropper-hidden'));
          assert.ok(hasClass(cropBox.querySelector('.cropper-point'), 'cropper-hidden'));
        });

      }
    });
  })();

});
