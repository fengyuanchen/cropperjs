describe('cropstart (event)', () => {
  const POINTER_DOWN = window.PointerEvent ? 'pointerdown' : 'mousedown';
  const POINTER_MOVE = window.PointerEvent ? 'pointermove' : 'mousemove';
  const POINTER_UP = window.PointerEvent ? 'pointerup' : 'mouseup';

  it('should trigger the `cropstart` event', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      const { dragBox } = cropper;

      dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
      dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
      dragBox.dispatchEvent(window.createEvent(POINTER_UP));
    });

    image.addEventListener('cropstart', (event) => {
      expect(event.type).to.equal('cropstart');
      done();
    });

    cropper = new Cropper(image);
  });

  it('should have expected properties in `event.detail`', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      const { dragBox } = cropper;

      dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
      dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
      dragBox.dispatchEvent(window.createEvent(POINTER_UP));
    });

    image.addEventListener('cropstart', (event) => {
      expect(event.detail).to.be.an('object').that.has.all.keys(['action', 'originalEvent']);
      expect(event.detail.action).to.equal('crop');
      expect(event.detail.originalEvent.type).to.equal(POINTER_DOWN);
      done();
    });

    cropper = new Cropper(image);
  });

  it('should not trigger the `cropmove` and `cropend` events when default prevented', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      const { dragBox } = cropper;

      dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
      dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
      dragBox.dispatchEvent(window.createEvent(POINTER_UP));
    });

    image.addEventListener('cropstart', (event) => {
      event.preventDefault();
      done();
    });

    image.addEventListener('cropmove', () => {
      expect.fail(1, 0);
    });

    image.addEventListener('cropend', () => {
      expect.fail(1, 0);
    });

    cropper = new Cropper(image);
  });
});
