describe('minCanvasWidth (option)', () => {
  it('should be `0` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minCanvasWidth).to.equal(0);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const minCanvasWidth = 480;
    const cropper = new Cropper(image, {
      minCanvasWidth,

      ready() {
        const canvasData = cropper.setCanvasData({
          width: 320,
        }).getCanvasData();

        expect(canvasData.width).to.equal(minCanvasWidth);
        done();
      },
    });

    expect(cropper.options.minCanvasWidth).to.equal(minCanvasWidth);
  });
});
