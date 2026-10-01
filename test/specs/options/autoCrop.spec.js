describe('autoCrop (option)', () => {
  it('should crop automatically by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.cropped).to.be.true;
        expect(window.getComputedStyle(cropper.cropBox).display).to.not.equal('none');
        done();
      },
    });

    expect(cropper.options.autoCrop).to.be.true;
  });

  it('should not crop automatically', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        expect(cropper.cropped).to.be.false;
        expect(window.getComputedStyle(cropper.cropBox).display).to.equal('none');
        done();
      },
    });

    expect(cropper.options.autoCrop).to.be.false;
  });

  it('should create a crop box from the initial pointer position', (done) => {
    const image = window.createImage();
    let cropper;

    const dispatchPointerEvent = (type, pageX, pageY) => {
      const event = window.createEvent(type);

      Object.defineProperties(event, {
        pageX: { value: pageX },
        pageY: { value: pageY },
      });
      cropper.dragBox.dispatchEvent(event);
    };

    cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        const cropperOffset = cropper.cropper.getBoundingClientRect();
        const startX = cropperOffset.left + window.pageXOffset + 20;
        const startY = cropperOffset.top + window.pageYOffset + 20;
        const pointerDown = window.PointerEvent ? 'pointerdown' : 'mousedown';
        const pointerMove = window.PointerEvent ? 'pointermove' : 'mousemove';

        dispatchPointerEvent(pointerDown, startX, startY);
        dispatchPointerEvent(pointerMove, startX + 20, startY);
        expect(cropper.cropped).to.be.false;

        dispatchPointerEvent(pointerMove, startX + 20, startY + 20);

        expect(cropper.cropped).to.be.true;
        expect(cropper.cropBoxData.left).to.equal(20);
        expect(cropper.cropBoxData.top).to.equal(20);
        expect(cropper.cropBoxData.width).to.equal(20);
        expect(cropper.cropBoxData.height).to.equal(20);
        done();
      },
    });
  });
});
