describe('cropmove (option)', () => {
  const POINTER_DOWN = window.PointerEvent ? 'pointerdown' : 'mousedown';
  const POINTER_MOVE = window.PointerEvent ? 'pointermove' : 'mousemove';
  const POINTER_UP = window.PointerEvent ? 'pointerup' : 'mouseup';

  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.cropmove).to.be.null;
  });

  it('should execute the `cropmove` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
        dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
        dragBox.dispatchEvent(window.createEvent(POINTER_UP));
      },

      cropmove(event) {
        expect(event.type).to.equal('cropmove');
        expect(event.detail).to.be.an('object').that.has.all.keys(['action', 'originalEvent']);
        expect(event.detail.action).to.equal('crop');
        expect(event.detail.originalEvent.type).to.equal(POINTER_MOVE);
        done();
      },
    });

    expect(cropper.options.cropmove).to.be.a('function');
  });

  it('should not execute the `crop` hook function when default prevented', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        cropper.options.crop = () => {
          expect.fail(1, 0);
        };

        dragBox.dispatchEvent(window.createEvent(POINTER_DOWN));
        dragBox.dispatchEvent(window.createEvent(POINTER_MOVE));
        dragBox.dispatchEvent(window.createEvent(POINTER_UP));
      },

      cropmove(event) {
        event.preventDefault();
        done();
      },
    });
  });
});
