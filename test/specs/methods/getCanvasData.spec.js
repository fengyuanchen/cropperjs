describe('getCanvasData (method)', () => {
  it('should get an empty object when it is not ready', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);
    const canvasData = cropper.getCanvasData();

    expect(canvasData).to.be.an('object').that.is.empty;
  });

  it('should get expect canvas data when ready', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        expect(canvasData).to.be.an('object').that.has.all.keys(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight']);
        expect(canvasData.left).to.be.a('number');
        expect(canvasData.top).to.be.a('number');
        expect(canvasData.width).to.be.a('number');
        expect(canvasData.height).to.be.a('number');
        expect(canvasData.naturalWidth).to.be.a('number');
        expect(canvasData.naturalHeight).to.be.a('number');
        done();
      },
    });
  });
});
