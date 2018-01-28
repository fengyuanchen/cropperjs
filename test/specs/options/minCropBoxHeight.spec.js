describe('minCropBoxHeight (option)', () => {
  it('should be `0` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minCropBoxHeight).to.equal(0);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const minCropBoxHeight = 150;
    const cropper = new Cropper(image, {
      minCropBoxHeight,

      ready() {
        const cropBoxData = cropper.setCropBoxData({
          height: 100,
        }).getCropBoxData();

        expect(cropBoxData.height).to.equal(minCropBoxHeight);
        done();
      },
    });

    expect(cropper.options.minCropBoxHeight).to.equal(minCropBoxHeight);
  });
});
