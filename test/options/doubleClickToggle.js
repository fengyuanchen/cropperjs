window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.doubleClickToggle: true', function (assert) {
        var dragBox = cropper.dragBox;

        // FIXME: Fail to trigger the dblclick event
        $(dragBox).trigger('dblclick');
        assert.ok(hasClass(dragBox, 'cropper-move'));
        assert.equal(dragBox.dataset.action, 'move');
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      doubleClickToggle: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.doubleClickToggle: false', function (assert) {
          var dragBox = cropper.dragBox;

          $(dragBox).trigger('dblclick');
          assert.ok(hasClass(dragBox, 'cropper-crop'));
          assert.equal(dragBox.dataset.action, 'crop');
        });

      }
    });
  })();

});
