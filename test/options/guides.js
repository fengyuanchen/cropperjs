window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.guides: true', function (assert) {
        assert.ok(!hasClass(cropper.cropBox.querySelector('.cropper-dashed'), 'cropper-hidden'));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      guides: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.guides: false', function (assert) {
          assert.ok(hasClass(cropper.cropBox.querySelector('.cropper-dashed'), 'cropper-hidden'));
        });

      }
    });
  })();

});
