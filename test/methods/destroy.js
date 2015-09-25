window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var image2 = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    build: function () {
      var cropper = this.cropper;

      QUnit.test('methods.destroy: after built', function (assert) {
        assert.ok(image.className.indexOf('cropper-hidden') !== -1);
        assert.ok(typeof image.cropper === 'object');

        cropper.destroy();
        assert.ok(image.className.indexOf('cropper-hidden') === -1);
        assert.ok(typeof image.cropper === 'undefined');
      });
    }
  });

  image2.newCropper = new Cropper(image2, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.destroy: after built', function (assert) {
        assert.ok(image2.className.indexOf('cropper-hidden') !== -1);
        assert.ok(typeof image2.cropper === 'object');

        cropper.destroy();
        assert.ok(image2.className.indexOf('cropper-hidden') === -1);
        assert.ok(typeof image2.cropper === 'undefined');
      });
    }
  });

});
