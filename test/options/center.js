window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.center: true', function (assert) {
        assert.ok(!hasClass(cropper.cropBox.querySelector('.cropper-center'), 'cropper-hidden'));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      center: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.center: false', function (assert) {
          assert.ok(hasClass(cropper.cropBox.querySelector('.cropper-center'), 'cropper-hidden'));
        });

      }
    });

  })();

});
