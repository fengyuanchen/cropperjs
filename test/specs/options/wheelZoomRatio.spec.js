describe('wheelZoomRatio (option)', () => {
  it('should be `0.1` by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const wheelEvent = window.createEvent('wheel');

        wheelEvent.deltaY = -1;
        cropper.cropper.dispatchEvent(wheelEvent);

        const expectedCanvasWidth = canvasData.width * 1.1;
        const actualCanvasWidth = cropper.getCanvasData().width;

        expect(Math.round(expectedCanvasWidth)).to.equal(Math.round(actualCanvasWidth));
        done();
      },
    });

    expect(cropper.options.wheelZoomRatio).to.equal(0.1);
  });

  it('should match the given zoom ratio', (done) => {
    const image = window.createImage();
    const wheelZoomRatio = 0.2;
    const cropper = new Cropper(image, {
      wheelZoomRatio,

      ready() {
        const canvasData = cropper.getCanvasData();
        const wheelEvent = window.createEvent('wheel');

        wheelEvent.deltaY = -1;
        cropper.cropper.dispatchEvent(wheelEvent);

        const expectedCanvasWidth = canvasData.width * (1 + wheelZoomRatio);
        const actualCanvasWidth = cropper.getCanvasData().width;

        expect(Math.round(expectedCanvasWidth)).to.equal(Math.round(actualCanvasWidth));
        done();
      },
    });

    expect(cropper.options.wheelZoomRatio).to.equal(wheelZoomRatio);
  });
});
