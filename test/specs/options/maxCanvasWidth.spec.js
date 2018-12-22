describe('maxCanvasWidth (option)', () => {
  it('should be `Infinity` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.maxCanvasWidth).to.equal(Infinity);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const maxCanvasWidth = 240;
    const cropper = new Cropper(image, {
      maxCanvasWidth,

      ready() {
        const canvasData = cropper.setCanvasData({
          width: 320,
        }).getCanvasData();

        expect(canvasData.width).to.equal(maxCanvasWidth);
        done();
      },
    });

    expect(cropper.options.maxCanvasWidth).to.equal(maxCanvasWidth);
  });
});
