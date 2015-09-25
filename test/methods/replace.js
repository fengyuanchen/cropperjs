window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.replace', function (assert) {
        var done = assert.async();

        cropper.options.built = function () {
          assert.ok(true);
          done();
        };

        cropper.replace('../assets/img/picture-2.jpg');
      });

    }
  });

});
