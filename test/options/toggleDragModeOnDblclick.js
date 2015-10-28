window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var image = window.createCropperImage();

  function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
  }

  image.newCropper = new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      QUnit.test('options.toggleDragModeOnDblclick: true', function (assert) {
        var dragBox = cropper.dragBox;

        dragBox.dispatchEvent(new MouseEvent('dblclick', {
          view: window,
          bubbles: true,
          cancelable: true
        }));

        assert.ok(hasClass(dragBox, 'cropper-move'));
        assert.equal(dragBox.dataset.action, 'move');
      });

    }
  });

  (function () {
    var image = window.createCropperImage();

    image.newCropper = new Cropper(image, {
      toggleDragModeOnDblclick: false,

      built: function () {
        var cropper = this.cropper;

        QUnit.test('options.toggleDragModeOnDblclick: false', function (assert) {
          var dragBox = cropper.dragBox;

          dragBox.dispatchEvent(new MouseEvent('dblclick', {
            view: window,
            bubbles: true,
            cancelable: true
          }));
          assert.ok(hasClass(dragBox, 'cropper-crop'));
          assert.equal(dragBox.dataset.action, 'crop');
        });

      }
    });
  })();

});
