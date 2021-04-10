describe('wheelZoomRatio (option)', () => {
  it('should be `0.1` by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();
        const wheelEvent = window.createEvent('wheel');

        wheelEvent.deltaY = -1;
        cropper.cropper.dispatchEvent(wheelEvent);
        expect(canvasData.width * 1.1).to.equal(cropper.getCanvasData().width);
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
        const expectedWidthRaw = canvasData.width * (1 + wheelZoomRatio);
        const actualWidthRaw = cropper.getCanvasData().width;

        const expectedWidth = Math.round(expectedWidthRaw * 10) / 10;
        const actualWidth = Math.round(actualWidthRaw * 10) / 10;

        expect(expectedWidth).to.equal(actualWidth);
        done();
      },
    });

    expect(cropper.options.wheelZoomRatio).to.equal(wheelZoomRatio);
  });
});
