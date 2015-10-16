window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();
  var initialData = {
        x: 360,
        y: 450,
        width: 640,
        height: 360,
        rotate: 45,
        scaleX: -1,
        scaleY: -1
      };

  image.newCropper = new Cropper(image, {
    data: initialData,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.data', function (assert) {
        var data = cropper.getData();

        assert.equal(Math.round(data.x), initialData.x);
        assert.equal(Math.round(data.y), initialData.y);
        assert.equal(Math.round(data.width), initialData.width);
        assert.equal(Math.round(data.height), initialData.height);
        assert.equal(Math.round(data.rotate), initialData.rotate);
        assert.equal(Math.round(data.scaleX), initialData.scaleX);
        assert.equal(Math.round(data.scaleY), initialData.scaleY);
      });

    }
  });

});
