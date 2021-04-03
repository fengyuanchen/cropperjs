describe('rotatable (option)', () => {
  it('should be rotatable by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {

      ready() {
        expect(cropper.rotate(90).getImageData().rotate).to.equal(90);
        done();
      },
    });

    expect(cropper.options.rotatable).to.be.true;
  });

  it('should not be rotatable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      rotatable: false,

      ready() {
        expect(cropper.rotate(90).getImageData().rotate).to.be.undefined;
        done();
      },
    });

    expect(cropper.options.rotatable).to.be.false;
  });
});
