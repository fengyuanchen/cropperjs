describe('aspectRatio (option)', () => {
  it('should be `NaN` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.aspectRatio).to.be.NaN;
  });

  it('should match the given aspect ratio', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      aspectRatio: 1,

      crop() {
        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.width).to.equal(cropBoxData.height);
        done();
      },
    });

    expect(cropper.options.aspectRatio).to.equal(1);
  });
});
