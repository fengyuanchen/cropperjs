window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.setData: move', function (assert) {
        var data = cropper.getData();
        var changedData = cropper.setData({
              x: 16,
              y: 9
            }).getData();

        assert.notEqual(changedData.x, data.x);
        assert.notEqual(changedData.y, data.y);

        assert.equal(changedData.width, data.width);
        assert.equal(changedData.height, data.height);
      });


      QUnit.test('methods.setData: resize', function (assert) {
        var data = cropper.getData();
        var changedData = cropper.setData({
              width: 320,
              height: 180
            }).getData();

        assert.equal(changedData.x, data.x);
        assert.equal(changedData.y, data.y);
        assert.notEqual(changedData.width, data.width);
        assert.notEqual(changedData.height, data.height);
      });

    }
  });

});
