describe('movable (option)', () => {
  it('should be movable by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.move(10, 10).getCanvasData();

        expect(changedCanvasData.left).to.equal(canvasData.left + 10);
        expect(changedCanvasData.top).to.equal(canvasData.top + 10);
        done();
      },
    });

    expect(cropper.options.movable).to.be.true;
  });

  it('should not be movable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      movable: false,

      ready() {
        const canvasData = cropper.getCanvasData();
        const changedCanvasData = cropper.move(10, 10).getCanvasData();

        expect(changedCanvasData.left).to.equal(canvasData.left);
        expect(changedCanvasData.top).to.equal(canvasData.top);
        done();
      },
    });

    expect(cropper.options.movable).to.be.false;
  });
});
