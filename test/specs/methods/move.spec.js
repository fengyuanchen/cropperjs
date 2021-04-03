describe('move (method)', () => {
  it('should move with the given offsets', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.move(1, 1).getCanvasData();

        expect(changedCanvasData.left).to.equal(canvasData.left + 1);
        expect(changedCanvasData.top).to.equal(canvasData.top + 1);
        done();
      },
    });
  });

  it('should not work when it is not movable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      movable: false,

      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.move(1, 1).getCanvasData();

        expect(changedCanvasData.left).to.equal(canvasData.left);
        expect(changedCanvasData.top).to.equal(canvasData.top);
        done();
      },
    });
  });
});
