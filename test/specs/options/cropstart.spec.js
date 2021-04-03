describe('cropstart (option)', () => {
  const POINTER_DOWN = window.PointerEvent ? 'pointerdown' : 'mousedown';
  const POINTER_MOVE = window.PointerEvent ? 'pointermove' : 'mousemove';
  const POINTER_UP = window.PointerEvent ? 'pointerup' : 'mouseup';

  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.cropstart).to.be.null;
  });

  it('should execute the `cropstart` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
        dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
        dragBox.dispatchEvent(window.createEvent(POINTER_UP));
      },

      cropstart(event) {
        expect(event.type).to.equal('cropstart');
        expect(event.detail).to.be.an('object').that.has.all.keys(['action', 'originalEvent']);
        expect(event.detail.action).to.equal('crop');
        expect(event.detail.originalEvent.type).to.equal(POINTER_DOWN);
        done();
      },
    });

    expect(cropper.options.cropstart).to.be.a('function');
  });

  it('should not execute the `cropmove` and `cropend` callback function when default prevented', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
        dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
        dragBox.dispatchEvent(window.createEvent(POINTER_UP));
      },

      cropstart(event) {
        event.preventDefault();
        done();
      },

      cropmove() {
        expect.fail(1, 0);
      },

      cropend() {
        expect.fail(1, 0);
      },
    });
  });
});
