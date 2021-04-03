describe('setCropBoxData (method)', () => {
  it('should change the positions only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();
        const changedCropBoxData = cropper.setCropBoxData({
          left: 16,
          top: 9,
        }).getCropBoxData();

        expect(changedCropBoxData.left).to.not.equal(cropBoxData.left);
        expect(changedCropBoxData.top).to.not.equal(cropBoxData.top);
        expect(changedCropBoxData.width).to.equal(cropBoxData.width);
        expect(changedCropBoxData.height).to.equal(cropBoxData.height);
        done();
      },
    });
  });

  it('should change the sizes only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();
        const changedCropBoxData = cropper.setCropBoxData({
          width: 320,
          height: 180,
        }).getCropBoxData();

        expect(changedCropBoxData.left).to.equal(cropBoxData.left);
        expect(changedCropBoxData.top).to.equal(cropBoxData.top);
        expect(changedCropBoxData.width).to.not.equal(cropBoxData.width);
        expect(changedCropBoxData.height).to.not.equal(cropBoxData.height);
        done();
      },
    });
  });
});
