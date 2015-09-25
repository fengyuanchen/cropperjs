window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var crossOriginImage = 'http://fengyuanchen.github.io/cropper/img/picture.jpg';
  var image = window.createCropperImage({
        src: crossOriginImage
      });
  var image2 = window.createCropperImage({
        src: crossOriginImage,
        crossOrigin: 'anonymous'
      });

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.checkImageOrigin', function (assert) {
        assert.ok(cropper.image.crossOrigin === 'anonymous');
        assert.ok(cropper.image.src.indexOf('timestamp') !== -1);
      });

    }
  });

  image2.newCropper = new Cropper(image2, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.checkImageOrigin: exists crossOrigin attribute', function (assert) {
        assert.ok(cropper.image.crossOrigin === 'anonymous');
        assert.ok(cropper.image.src.indexOf('timestamp') === -1);
      });

    }
  });

});
