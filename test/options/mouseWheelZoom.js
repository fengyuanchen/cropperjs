window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      cropper.cropper.dispatchEvent(new WheelEvent('wheel', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    },

    zoom: function () {
      QUnit.test('options.mouseWheelZoom: true', function (assert) {
        assert.ok(true);
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      mouseWheelZoom: false,

      built: function () {
        var cropper = this.cropper;

        cropper.cropper.dispatchEvent(new WheelEvent('wheel', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      },

      zoom: function () {
        QUnit.test('options.mouseWheelZoom: false', function (assert) {
          assert.ok(false);
        });
      }
    });
  })();

});
