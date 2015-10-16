window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    build: function () {
      var cropper = this.cropper;

      QUnit.test('methods.destroy: before built', function (assert) {
        assert.ok(image.className.indexOf('cropper-hidden') !== -1);
        assert.ok(typeof image.cropper === 'object');

        cropper.destroy();
        assert.ok(image.className.indexOf('cropper-hidden') === -1);
        assert.ok(typeof image.cropper === 'undefined');
      });
    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      built: function () {
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
  })();

});
