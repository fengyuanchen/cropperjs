describe('viewMode (option)', () => {
  it('should not have any restrictions by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = {
          left: 100,
          top: 100,
          width: 160,
          height: 90,
        };
        const changedCanvasData = cropper.setCanvasData(canvasData).getCanvasData();

        expect(changedCanvasData.left).to.equal(canvasData.left);
        expect(changedCanvasData.top).to.equal(canvasData.top);
        expect(changedCanvasData.width).to.equal(canvasData.width);
        expect(changedCanvasData.height).to.equal(canvasData.height);
        done();
      },
    });

    expect(cropper.options.viewMode).to.equal(0);
  });

  it('should restrict the crop box to not exceed the size of the canvas', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      viewMode: 1,

      ready() {
        let canvasData = cropper.zoom(-0.5).getCanvasData();
        let cropBoxData = cropper.getCropBoxData();

        expect(canvasData.width).to.be.least(cropBoxData.width);
        expect(canvasData.height).to.be.least(cropBoxData.height);

        // Move the canvas beyond the top and left container boundaries
        canvasData = cropper.zoom(0.5).setCropBoxData({
          left: 0,
          top: 0,
          width: 10,
          height: 10,
        }).moveTo(-200).getCanvasData();

        expect(canvasData.left).to.be.equal(-200);
        expect(canvasData.top).to.be.equal(-200);

        cropBoxData = cropper.setCropBoxData({
          width: canvasData.width,
          height: canvasData.height,
        }).getCropBoxData();

        expect(cropBoxData.width).to.be.equal(canvasData.width + canvasData.left);
        expect(cropBoxData.height).to.be.equal(canvasData.height + canvasData.top);

        // Move the canvas beyond the bottom and right container boundaries
        canvasData = cropper.setCropBoxData({
          left: cropBoxData.width,
          top: cropBoxData.height,
          width: 10,
          height: 10,
        }).move(500).getCanvasData();

        const canvasRight = cropper.getContainerData().width - canvasData.left - canvasData.width;
        const canvasBottom = cropper.getContainerData().height - canvasData.top - canvasData.height;

        expect(canvasData.left).to.be.least(1);
        expect(canvasData.top).to.be.least(1);
        expect(canvasRight).to.be.below(0);
        expect(canvasBottom).to.be.below(0);

        cropBoxData = cropper.setCropBoxData({
          width: canvasData.width,
          height: canvasData.height,
        }).getCropBoxData();

        expect(cropBoxData.width).to.be.equal(canvasData.width + canvasRight);
        expect(cropBoxData.height).to.be.equal(canvasData.height + canvasBottom);

        done();
      },
    });

    expect(cropper.options.viewMode).to.equal(1);
  });

  it('should restrict the minimum canvas size to fit within the container.', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      viewMode: 2,

      ready() {
        const canvasData = cropper.zoom(-0.5).getCanvasData();
        const containerData = cropper.getContainerData();

        expect(canvasData.width >= containerData.width
          || canvasData.height >= containerData.height).to.be.true;
        done();
      },
    });

    expect(cropper.options.viewMode).to.equal(2);
  });

  it('should restrict the minimum canvas size to full fit the container.', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      viewMode: 3,

      ready() {
        const canvasData = cropper.zoom(-0.5).getCanvasData();
        const containerData = cropper.getContainerData();

        expect(canvasData.left).to.be.most(0);
        expect(canvasData.top).to.be.most(0);
        expect(canvasData.width).to.be.least(containerData.width);
        expect(canvasData.height).to.be.least(containerData.height);
        done();
      },
    });

    expect(cropper.options.viewMode).to.equal(3);
  });
});
