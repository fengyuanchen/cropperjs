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
});
