window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      cropper.cropper.dispatchEvent(new MouseEvent('wheel', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    },

    zoom: function () {
      QUnit.test('options.zoomOnWheel: true', function (assert) {
        assert.ok(true);
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      zoomOnWheel: false,

      built: function () {
        var cropper = this.cropper;

        cropper.cropper.dispatchEvent(new MouseEvent('wheel', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      },

      zoom: function () {
        QUnit.test('options.zoomOnWheel: false', function (assert) {
          assert.ok(false);
        });
      }
    });
  })();

});
