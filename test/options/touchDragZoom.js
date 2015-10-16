window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function emulateToucheEvents(element) {
    var pageX = window.innerWidth / 2;
    var pageY = window.innerHeight / 2;

    $(element).trigger($.Event('touchstart', {
      originalEvent: {
        touches: [
          {
            pageX: pageX,
            pageY: pageY
          },
          {
            pageX: pageX,
            pageY: pageY
          }
        ]
      }
    })).trigger($.Event('touchmove', {
      originalEvent: {
        touches: [
          {
            pageX: pageX - 10,
            pageY: pageY - 10
          },
          {
            pageX: pageX + 10,
            pageY: pageY + 10
          }
        ]
      }
    })).trigger('touchend');
  }

  image.newCropper = new Cropper(image, {

    built: function () {
      emulateToucheEvents(this.cropper.cropper);
    },

    zoom: function (data) {
      QUnit.test('options.touchDragZoom: true', function (assert) {
        assert.notEqual(data.ratio, data.oldRatio);
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      touchDragZoom: false,

      built: function () {
        emulateToucheEvents(this.cropper.cropper);
      },

      zoom: function (data) {
        QUnit.test('options.touchDragZoom: false', function (assert) {
          assert.equal(data.ratio, data.oldRatio);
        });
      }
    });
  })();

});
