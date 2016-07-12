QUnit.test('methods#getData', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(7);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var data = cropper.getData();

      assert.ok(util.isNumber(data.x));
      assert.ok(util.isNumber(data.y));
      assert.ok(util.isNumber(data.width));
      assert.ok(util.isNumber(data.height));
      assert.ok(util.isNumber(data.rotate));
      assert.ok(util.isNumber(data.scaleX));
      assert.ok(util.isNumber(data.scaleY));

      done();
    }
  });
});

QUnit.test('methods#getData: rounded', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(4);

  return new Cropper(image, {
    ready: function () {
      var cropper = this.cropper;
      var data = cropper.getData(true);

      assert.ok(data.x % 1 === 0);
      assert.ok(data.y % 1 === 0);
      assert.ok(data.width % 1 === 0);
      assert.ok(data.height % 1 === 0);

      done();
    }
  });
});
