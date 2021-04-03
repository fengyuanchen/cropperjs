describe('setCanvasData (method)', () => {
  it('should change the positions only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.setCanvasData({
          left: 16,
          top: 9,
        }).getCanvasData();

        expect(changedCanvasData.left).to.not.equal(canvasData.left);
        expect(changedCanvasData.top).to.not.equal(canvasData.top);
        expect(changedCanvasData.width).to.equal(canvasData.width);
        expect(changedCanvasData.height).to.equal(canvasData.height);
        done();
      },
    });
  });

  it('should change the sizes only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.setCanvasData({
          width: 320,
          height: 180,
        }).getCanvasData();

        expect(changedCanvasData.left).to.equal(canvasData.left);
        expect(changedCanvasData.top).to.equal(canvasData.top);
        expect(changedCanvasData.width).to.not.equal(canvasData.width);
        expect(changedCanvasData.height).to.not.equal(canvasData.height);
        done();
      },
    });
  });
});
