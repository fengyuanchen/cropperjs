describe('center (option)', () => {
  it('should show the center cross hair by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const center = cropper.cropper.querySelector('.cropper-center');

        expect(window.getComputedStyle(center).display).to.not.equal('none');
        done();
      },
    });

    expect(cropper.options.center).to.be.true;
  });

  it('should hide the center cross hair', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      center: false,

      ready() {
        const center = cropper.cropper.querySelector('.cropper-center');

        expect(window.getComputedStyle(center).display).to.equal('none');
        done();
      },
    });

    expect(cropper.options.center).to.be.false;
  });
});
