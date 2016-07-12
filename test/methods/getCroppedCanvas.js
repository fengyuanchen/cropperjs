QUnit.test('methods#getCroppedCanvas', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(7);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var canvas = cropper.getCroppedCanvas({
            width: 160,
            height: 90
          });
      var pixelData;

      assert.ok(canvas instanceof HTMLCanvasElement);
      assert.strictEqual(canvas.width, 160);
      assert.strictEqual(canvas.height, 90);

      canvas = cropper.rotate(90).getCroppedCanvas({
        fillColor: '#010101'
      });
      pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;
      assert.strictEqual(pixelData[0], 1, 'red is 1');
      assert.strictEqual(pixelData[1], 1, 'green is 1');
      assert.strictEqual(pixelData[2], 1, 'blue is 1');
      assert.strictEqual(pixelData[3], 255, 'color is opaque');

      done();
    }
  });
});
