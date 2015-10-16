window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.modal: true', function (assert) {
        assert.ok(hasClass(cropper.dragBox, 'cropper-modal'));
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      modal: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.modal: false', function (assert) {
          assert.ok(!hasClass(cropper.dragBox, 'cropper-modal'));
        });

      }
    });
  })();

});
