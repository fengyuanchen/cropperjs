describe('setAspectRatio (method)', () => {
  it('should change the aspect ratio to `1`', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { options } = cropper;

        expect(options.aspectRatio).to.be.NaN;
        cropper.setAspectRatio(1);
        expect(options.aspectRatio).to.equal(1);
        done();
      },
    });
  });

  it('should change the aspect ratio to `NaN`', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      aspectRatio: 1,

      ready() {
        const { options } = cropper;

        expect(options.aspectRatio).to.equal(1);
        cropper.setAspectRatio(NaN);
        expect(options.aspectRatio).to.be.NaN;
        done();
      },
    });
  });
});
