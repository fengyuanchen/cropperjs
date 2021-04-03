describe('moveTo (method)', () => {
  it('should move to the given coordinate', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.moveTo(100, 100).getCanvasData();

        expect(canvasData.left).to.equal(100);
        expect(canvasData.top).to.equal(100);
        done();
      },
    });
  });

  it('should not work when it is not movable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      movable: false,

      ready() {
        const canvasData = cropper.moveTo(100, 100).getCanvasData();

        expect(canvasData.left).to.not.equal(100);
        expect(canvasData.top).to.not.equal(100);
        done();
      },
    });
  });
});
