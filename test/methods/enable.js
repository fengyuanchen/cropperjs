window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.enable', function (assert) {
        cropper.disable();
        assert.ok(cropper.disabled);
        assert.ok(cropper.cropper.className.indexOf('cropper-disabled') !== -1);

        cropper.enable();
        assert.ok(!cropper.disabled);
        assert.ok(cropper.cropper.className.indexOf('cropper-disabled') === -1);
      });

    }
  });

});
