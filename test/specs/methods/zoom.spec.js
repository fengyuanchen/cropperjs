describe('zoom (method)', () => {
  it('should be zoomed', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.zoom(0.1).getCanvasData();

        expect(changedCanvasData.width).to.be.above(canvasData.width);
        expect(changedCanvasData.height).to.be.above(canvasData.height);
        done();
      },
    });
  });

  it('should not be zoomed when it is not zoomable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomable: false,

      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.zoom(0.1).getCanvasData();

        expect(changedCanvasData.width).to.equal(canvasData.width);
        expect(changedCanvasData.height).to.equal(canvasData.height);
        done();
      },
    });
  });
});
