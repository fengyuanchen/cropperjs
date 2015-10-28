window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var crossOriginImage = 'http://fengyuanchen.github.io/cropper/img/picture.jpg';
  var image = window.createCropperImage({
        src: crossOriginImage
      });

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.checkCrossOrigin', function (assert) {
        assert.ok(cropper.image.crossOrigin === 'anonymous');
        assert.ok(cropper.image.src.indexOf('timestamp') !== -1);
      });

    }
  });

  (function () {
    var image = window.createCropperImage({
          src: crossOriginImage,
          crossOrigin: 'anonymous'
        });

    image.newCropper = new Cropper(image, {
      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.checkCrossOrigin: exists crossOrigin attribute', function (assert) {
          assert.ok(cropper.image.crossOrigin === 'anonymous');
          assert.ok(cropper.image.src.indexOf('timestamp') === -1);
        });

      }
    });
  })();

});
