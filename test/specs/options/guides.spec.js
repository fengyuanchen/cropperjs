describe('guides (option)', () => {
  it('should show the guides by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        Array.from(cropper.cropper.querySelectorAll('.cropper-dashed')).forEach((dashed) => {
          expect(window.getComputedStyle(dashed).display).to.not.equal('none');
        });
        done();
      },
    });

    expect(cropper.options.guides).to.be.true;
  });

  it('should hide the guides', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      guides: false,

      ready() {
        Array.from(cropper.cropper.querySelectorAll('.cropper-dashed')).forEach((dashed) => {
          expect(window.getComputedStyle(dashed).display).to.equal('none');
        });
        done();
      },
    });

    expect(cropper.options.guides).to.be.false;
  });
});
