describe('initialAspectRatio (option)', () => {
  it('should be `NaN` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.initialAspectRatio).to.be.NaN;
  });

  it('should match the given aspect ratio', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      initialAspectRatio: 1,

      ready() {
        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.width).to.equal(cropBoxData.height);
        done();
      },
    });

    expect(cropper.options.initialAspectRatio).to.equal(1);
  });

  it('should allow to change the aspect ratio', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      initialAspectRatio: 2,

      ready() {
        let cropBoxData = cropper.getCropBoxData();

        cropBoxData.width = cropBoxData.height;
        cropBoxData = cropper.setCropBoxData(cropBoxData).getCropBoxData();
        expect(cropBoxData.width).to.equal(cropBoxData.height);
        done();
      },
    });
  });
});
