describe('maxCropBoxHeight (option)', () => {
  it('should be `Infinity` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.maxCropBoxHeight).to.equal(Infinity);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const maxCropBoxHeight = 50;
    const cropper = new Cropper(image, {
      maxCropBoxHeight,

      ready() {
        const cropBoxData = cropper.setCropBoxData({
          height: 100,
        }).getCropBoxData();

        expect(cropBoxData.height).to.equal(maxCropBoxHeight);
        done();
      },
    });

    expect(cropper.options.maxCropBoxHeight).to.equal(maxCropBoxHeight);
  });
});
