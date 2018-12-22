describe('maxCropBoxWidth (option)', () => {
  it('should be `Infinity` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.maxCropBoxWidth).to.equal(Infinity);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const maxCropBoxWidth = 100;
    const cropper = new Cropper(image, {
      maxCropBoxWidth,

      ready() {
        const cropBoxData = cropper.setCropBoxData({
          width: 200,
        }).getCropBoxData();

        expect(cropBoxData.width).to.equal(maxCropBoxWidth);
        done();
      },
    });

    expect(cropper.options.maxCropBoxWidth).to.equal(maxCropBoxWidth);
  });
});
