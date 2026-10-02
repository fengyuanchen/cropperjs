describe('zoomAroundCenter (option)', () => {
  it('should be disabled by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.zoomAroundCenter).to.be.false;
  });

  it('should zoom around the center of the cropper when enabled', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomAroundCenter: true,

      ready() {
        const canvasData = cropper.getCanvasData();
        const containerData = cropper.getContainerData();
        const centerX = containerData.width / 2;
        const centerY = containerData.height / 2;
        const imageX = (centerX - canvasData.left) / canvasData.width;
        const imageY = (centerY - canvasData.top) / canvasData.height;
        const event = window.createEvent('wheel');

        event.pageX = 0;
        event.pageY = 0;
        cropper.cropper.dispatchEvent(event);

        const changedCanvasData = cropper.getCanvasData();

        expect(changedCanvasData.width).to.not.equal(canvasData.width);
        expect((centerX - changedCanvasData.left) / changedCanvasData.width)
          .to.be.closeTo(imageX, 0.0001);
        expect((centerY - changedCanvasData.top) / changedCanvasData.height)
          .to.be.closeTo(imageY, 0.0001);
        done();
      },
    });
  });

  it('should preserve an explicitly provided pivot', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomAroundCenter: true,

      ready() {
        const canvasData = cropper.getCanvasData();
        const pivot = {
          x: 10,
          y: 20,
        };
        const imageX = (pivot.x - canvasData.left) / canvasData.width;
        const imageY = (pivot.y - canvasData.top) / canvasData.height;

        cropper.zoomTo((canvasData.width / canvasData.naturalWidth) * 1.1, pivot);

        const changedCanvasData = cropper.getCanvasData();

        expect((pivot.x - changedCanvasData.left) / changedCanvasData.width)
          .to.be.closeTo(imageX, 0.0001);
        expect((pivot.y - changedCanvasData.top) / changedCanvasData.height)
          .to.be.closeTo(imageY, 0.0001);
        done();
      },
    });
  });
});
