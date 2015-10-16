window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      $(cropper.cropper).trigger($.Event('wheel', {
        originalEvent: {
          wheelDelta: -120
        }
      }));
    },

    zoom: function (data) {
      QUnit.test('options.mouseWheelZoom: true', function (assert) {
        assert.notEqual(data.ratio, data.oldRatio);
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      mouseWheelZoom: false,

      built: function () {
        var cropper = this.cropper;

        $(cropper.cropper).trigger($.Event('wheel', {
          originalEvent: {
            wheelDelta: -120
          }
        }));
      },

      zoom: function (data) {
        QUnit.test('options.mouseWheelZoom: false', function (assert) {
          assert.equal(data.ratio, data.oldRatio);
        });
      }
    });
  })();

});
