describe('minCropBoxWidth (option)', () => {
  it('should be `0` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minCropBoxWidth).to.equal(0);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const minCropBoxWidth = 300;
    const cropper = new Cropper(image, {
      minCropBoxWidth,

      ready() {
        const cropBoxData = cropper.setCropBoxData({
          width: 200,
        }).getCropBoxData();

        expect(cropBoxData.width).to.equal(minCropBoxWidth);
        done();
      },
    });

    expect(cropper.options.minCropBoxWidth).to.equal(minCropBoxWidth);
  });

  it('should keep the opposite edge fixed when flipping past the minimum width', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      minCropBoxWidth: 100,

      ready() {
        cropper.setCropBoxData({
          left: 200,
          width: 150,
        });
        cropper.action = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: -200,
          endY: 0,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left).to.equal(100);
        expect(cropBoxData.width).to.equal(100);
        done();
      },
    });
  });

  it('should keep the opposite edge fixed when flipping from the west edge', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      minCropBoxWidth: 100,

      ready() {
        cropper.setCropBoxData({
          left: 200,
          width: 150,
        });
        cropper.action = 'w';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 200,
          endY: 0,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left).to.equal(350);
        expect(cropBoxData.width).to.equal(100);
        done();
      },
    });
  });
});
