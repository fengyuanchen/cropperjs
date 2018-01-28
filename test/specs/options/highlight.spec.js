describe('highlight (option)', () => {
  it('should show the highlight mask by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const face = cropper.cropper.querySelector('.cropper-face');

        expect(window.getComputedStyle(face).opacity).to.not.equal('0');
        done();
      },
    });

    expect(cropper.options.highlight).to.be.true;
  });

  it('should not show the highlight mask', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      highlight: false,

      ready() {
        const face = cropper.cropper.querySelector('.cropper-face');

        expect(window.getComputedStyle(face).opacity).to.equal('0');
        done();
      },
    });

    expect(cropper.options.highlight).to.be.false;
  });
});
