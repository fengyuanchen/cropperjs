describe('reset (method)', () => {
  it('should reset the cropper to its initial state', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const cropBoxData = cropper.getCropBoxData();

        cropper.setCanvasData({
          top: canvasData.top + 10,
          width: canvasData.width - 10,
        });

        expect(cropper.getCanvasData()).to.not.deep.equal(canvasData);

        cropper.setCropBoxData({
          left: cropBoxData.left + 10,
          height: cropBoxData.height - 10,
        });

        expect(cropper.getCropBoxData()).to.not.deep.equal(cropBoxData);

        cropper.reset();
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        expect(cropper.getCropBoxData()).to.deep.equal(cropBoxData);
        done();
      },
    });
  });
});
