describe('cropBoxResizable (option)', () => {
  it('should be resizable by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        Array.from(cropper.cropper.querySelectorAll('.cropper-line, .cropper-point')).forEach((handler) => {
          expect(window.getComputedStyle(handler).display).to.not.equal('none');
        });
        done();
      },
    });

    expect(cropper.options.cropBoxResizable).to.be.true;
  });

  it('should not be resizable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxResizable: false,

      ready() {
        Array.from(cropper.cropper.querySelectorAll('.cropper-line, .cropper-point')).forEach((handler) => {
          expect(window.getComputedStyle(handler).display).to.equal('none');
        });
        done();
      },
    });

    expect(cropper.options.cropBoxResizable).to.be.false;
  });
});
