describe('crop (method)', () => {
  it('should match the expected behaviors by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        expect(cropper.cropped).to.be.false;
        expect(window.getComputedStyle(cropper.cropBox).display).to.equal('none');
        cropper.crop();
        expect(cropper.cropped).to.be.true;
        expect(window.getComputedStyle(cropper.cropBox).display).to.not.equal('none');
        done();
      },
    });
  });

  it('should trigger the `crop` event', (done) => {
    const image = window.createImage();

    image.addEventListener('crop', () => {
      done();
    });

    const cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        cropper.crop();
      },
    });
  });

  it('should not crop again when it is already cropped', (done) => {
    const image = window.createImage();
    let count = 0;
    const cropper = new Cropper(image, {
      crop() {
        count += 1;

        if (count > 1) {
          expect.fail(1, 0);
        } else {
          cropper.crop();
          done();
        }
      },
    });
  });
});
