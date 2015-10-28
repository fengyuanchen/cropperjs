window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.dragMode: crop', function (assert) {
        assert.equal(cropper.dragBox.dataset.action, 'crop');
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      dragMode: 'move',

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.dragMode: move', function (assert) {
          assert.equal(cropper.dragBox.dataset.action, 'move');
        });

      }
    });
  })();

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      dragMode: 'none',

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.dragMode: none', function (assert) {
          assert.equal(cropper.dragBox.dataset.action, 'none');
        });

      }
    });
  })();

});
