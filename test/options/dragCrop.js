window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.dragCrop: true', function (assert) {
        assert.equal(cropper.dragBox.dataset.action, 'crop');
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      dragCrop: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.dragCrop: false', function (assert) {
          assert.equal(cropper.dragBox.dataset.action, 'move');
        });

      }
    });
  })();

});
