window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    autoCrop: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.autoCrop', function (assert) {
        assert.ok(!cropper.cropped);
      });

    },

    crop: function () {
      var data = this.cropper.getData();

      QUnit.test('options.autoCrop', function (assert) {
        assert.equal(data.x, 0);
        assert.equal(data.y, 0);
        assert.equal(data.width, 0);
        assert.equal(data.height, 0);
        assert.equal(data.rotate, 0);
        assert.equal(data.scaleX, 1);
        assert.equal(data.scaleY, 1);
      });
    }
  });

});
