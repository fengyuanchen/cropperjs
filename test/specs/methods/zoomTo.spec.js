describe('zoomTo (method)', () => {
  it('should zoom to the certain ratio', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.zoomTo(1).getImageData();
        const canvasData = cropper.getCanvasData();

        expect(imageData.width).to.equal(imageData.naturalWidth);
        expect(canvasData.width).to.equal(canvasData.naturalWidth);
        expect(canvasData.naturalWidth).to.equal(imageData.naturalWidth);
        done();
      },
    });
  });

  it('should not be zoomed when it is not zoomable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomable: false,

      ready() {
        const imageData = cropper.zoomTo(1).getImageData();
        const canvasData = cropper.getCanvasData();

        expect(imageData.width).to.not.equal(imageData.naturalWidth);
        expect(canvasData.width).to.not.equal(canvasData.naturalWidth);
        expect(canvasData.naturalWidth).to.equal(imageData.naturalWidth);
        done();
      },
    });
  });
});
