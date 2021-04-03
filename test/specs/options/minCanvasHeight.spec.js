describe('minCanvasHeight (option)', () => {
  it('should be `0` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minCanvasHeight).to.equal(0);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const minCanvasHeight = 270;
    const cropper = new Cropper(image, {
      minCanvasHeight,

      ready() {
        const canvasData = cropper.setCanvasData({
          height: 180,
        }).getCanvasData();

        expect(canvasData.height).to.equal(minCanvasHeight);
        done();
      },
    });

    expect(cropper.options.minCanvasHeight).to.equal(minCanvasHeight);
  });
});
