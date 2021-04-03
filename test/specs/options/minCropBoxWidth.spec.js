describe('minCropBoxWidth (option)', () => {
  it('should be `0` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minCropBoxWidth).to.equal(0);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const minCropBoxWidth = 300;
    const cropper = new Cropper(image, {
      minCropBoxWidth,

      ready() {
        const cropBoxData = cropper.setCropBoxData({
          width: 200,
        }).getCropBoxData();

        expect(cropBoxData.width).to.equal(minCropBoxWidth);
        done();
      },
    });

    expect(cropper.options.minCropBoxWidth).to.equal(minCropBoxWidth);
  });
});
