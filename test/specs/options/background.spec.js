describe('background (option)', () => {
  it('should show the background by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(window.getComputedStyle(cropper.cropper).backgroundImage).to.not.equal('none');
        done();
      },
    });

    expect(cropper.options.background).to.be.true;
  });

  it('should not show the background', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      background: false,

      ready() {
        expect(window.getComputedStyle(cropper.cropper).backgroundImage).to.equal('none');
        done();
      },
    });

    expect(cropper.options.background).to.be.false;
  });
});
