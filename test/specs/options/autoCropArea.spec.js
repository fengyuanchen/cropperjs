describe('autoCropArea (option)', () => {
  it('should be 80% by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const cropBoxData = cropper.getCropBoxData();

        expect(canvasData.width * 0.8).to.equal(cropBoxData.width);
        expect(canvasData.height * 0.8).to.equal(cropBoxData.height);
        done();
      },
    });

    expect(cropper.options.autoCropArea).to.equal(0.8);
  });

  it('should be 100%', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      autoCropArea: 1,

      ready() {
        const canvasData = cropper.getCanvasData();
        const cropBoxData = cropper.getCropBoxData();

        expect(canvasData.width).to.equal(cropBoxData.width);
        expect(canvasData.height).to.equal(cropBoxData.height);
        done();
      },
    });

    expect(cropper.options.autoCropArea).to.equal(1);
  });
});
