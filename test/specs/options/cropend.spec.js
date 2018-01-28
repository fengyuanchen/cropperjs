describe('cropend (option)', () => {
  const POINTER_DOWN = window.PointerEvent ? 'pointerdown' : 'mousedown';
  const POINTER_MOVE = window.PointerEvent ? 'pointermove' : 'mousemove';
  const POINTER_UP = window.PointerEvent ? 'pointerup' : 'mouseup';

  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.cropend).to.be.null;
  });

  it('should execute the `cropend` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
        dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
        dragBox.dispatchEvent(window.createEvent(POINTER_UP));
      },

      cropend(event) {
        expect(event.type).to.equal('cropend');
        expect(event.detail).to.be.an('object').that.has.all.keys(['action', 'originalEvent']);
        expect(event.detail.action).to.equal('crop');
        expect(event.detail.originalEvent.type).to.equal(POINTER_UP);
        done();
      },
    });

    expect(cropper.options.cropend).to.be.a('function');
  });
});
