QUnit.test('options#zoomOnWheel: true', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    // zoomOnWheel: true,

    ready: function () {
      var cropper = this.cropper;

      util.dispatchEvent(cropper.cropper, 'wheel');

      done();
    },

    zoom: function () {
      assert.ok(true);
    }
  });
});

QUnit.test('options#zoomOnWheel: false', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(0);

  return new Cropper(image, {
    zoomOnWheel: false,

    ready: function () {
      var cropper = this.cropper;

      util.dispatchEvent(cropper.cropper, 'wheel');

      done();
    },

    zoom: function () {
      assert.ok(false);
    }
  });
});
