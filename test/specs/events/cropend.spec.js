describe('cropend (event)', () => {
  const POINTER_DOWN = window.PointerEvent ? 'pointerdown' : 'mousedown';
  const POINTER_MOVE = window.PointerEvent ? 'pointermove' : 'mousemove';
  const POINTER_UP = window.PointerEvent ? 'pointerup' : 'mouseup';

  it('should trigger the `cropend` event', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      const { dragBox } = cropper;

      dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
      dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
      dragBox.dispatchEvent(window.createEvent(POINTER_UP));
    });

    image.addEventListener('cropend', (event) => {
      expect(event.type).to.equal('cropend');
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

    image.addEventListener('cropend', (event) => {
      expect(event.detail).to.be.an('object').that.has.all.keys(['action', 'originalEvent']);
      expect(event.detail.action).to.equal('crop');
      expect(event.detail.originalEvent.type).to.equal(POINTER_UP);
      done();
    });

    cropper = new Cropper(image);
  });
});
