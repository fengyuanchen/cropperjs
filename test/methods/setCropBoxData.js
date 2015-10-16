window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.setCropBoxData: move', function (assert) {
        var cropBoxData = cropper.getCropBoxData();
        var changedCropBoxData = cropper.setCropBoxData({
              left: 16,
              top: 9
            }).getCropBoxData();

        assert.notEqual(changedCropBoxData.left, cropBoxData.left);
        assert.notEqual(changedCropBoxData.top, cropBoxData.top);

        assert.equal(changedCropBoxData.width, cropBoxData.width);
        assert.equal(changedCropBoxData.height, cropBoxData.height);
      });


      QUnit.test('methods.setCropBoxData: resize', function (assert) {
        var cropBoxData = cropper.getCropBoxData();
        var changedCropBoxData = cropper.setCropBoxData({
              width: 320,
              height: 180
            }).getCropBoxData();

        assert.equal(changedCropBoxData.left, cropBoxData.left);
        assert.equal(changedCropBoxData.top, cropBoxData.top);

        assert.notEqual(changedCropBoxData.width, cropBoxData.width);
        assert.notEqual(changedCropBoxData.height, cropBoxData.height);
      });

    }
  });

});
