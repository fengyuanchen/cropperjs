window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.highlight: true', function (assert) {
        assert.ok(!hasClass(cropper.cropper.querySelector('.cropper-face'), 'cropper-invisible'));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      highlight: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.highlight: false', function (assert) {
          assert.ok(hasClass(cropper.cropper.querySelector('.cropper-face'), 'cropper-invisible'));
        });

      }
    });
  })();

});
