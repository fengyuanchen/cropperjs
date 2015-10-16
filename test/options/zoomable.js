window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      this.cropper.zoom(0.1);
    },
    zoom: function () {
      QUnit.test('options.zoomable: true', function (assert) {
        assert.ok(true);
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      zoomable: false,

      built: function () {
        this.cropper.zoom(0.1);
      },
      zoom: function () {
        QUnit.test('options.zoomable: false', function (assert) {
          assert.ok(false);
        });
      }
    });
  })();

});
