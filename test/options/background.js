window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.background: true', function (assert) {
        assert.ok(hasClass(cropper.cropper, 'cropper-bg'));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      background: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.background: false', function (assert) {
          assert.ok(!hasClass(cropper.cropper, 'cropper-bg'));
        });

      }
    });
  })();

});
