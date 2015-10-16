window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  image.newCropper = new Cropper(image, {
    strict: false,

    built: function () {
      var cropper = this.cropper;

      QUnit.test('methods.setCanvasData: move', function (assert) {
        var canvasData = cropper.getCanvasData();
        var changedCanvasData = cropper.setCanvasData({
              left: 16,
              top: 9
            }).getCanvasData();

        assert.notEqual(changedCanvasData.left, canvasData.left);
        assert.notEqual(changedCanvasData.top, canvasData.top);

        assert.equal(changedCanvasData.width, canvasData.width);
        assert.equal(changedCanvasData.height, canvasData.height);
      });


      QUnit.test('methods.setCanvasData: resize', function (assert) {
        var canvasData = cropper.getCanvasData();
        var changedCanvasData = cropper.setCanvasData({
              width: 320,
              height: 180
            }).getCanvasData();

        assert.notEqual(changedCanvasData.width, canvasData.width);
        assert.notEqual(changedCanvasData.height, canvasData.height);
      });

    }
  });

});
