describe('maxCanvasHeight (option)', () => {
  it('should be `Infinity` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.maxCanvasHeight).to.equal(Infinity);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const maxCanvasHeight = 90;
    const cropper = new Cropper(image, {
      maxCanvasHeight,

      ready() {
        const canvasData = cropper.setCanvasData({
          height: 180,
        }).getCanvasData();

        expect(canvasData.height).to.equal(maxCanvasHeight);
        done();
      },
    });

    expect(cropper.options.maxCanvasHeight).to.equal(maxCanvasHeight);
  });
});
