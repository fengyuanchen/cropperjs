describe('zoomable (option)', () => {
  it('should be zoomable by default', (done) => {
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

    expect(cropper.options.zoomable).to.be.true;
  });

  it('should not be zoomable', (done) => {
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

    expect(cropper.options.zoomable).to.be.false;
  });
});
