describe('minCropBoxHeight (option)', () => {
  it('should be `0` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minCropBoxHeight).to.equal(0);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();
    const minCropBoxHeight = 150;
    const cropper = new Cropper(image, {
      minCropBoxHeight,

      ready() {
        const cropBoxData = cropper.setCropBoxData({
          height: 100,
        }).getCropBoxData();

        expect(cropBoxData.height).to.equal(minCropBoxHeight);
        done();
      },
    });

    expect(cropper.options.minCropBoxHeight).to.equal(minCropBoxHeight);
  });

  it('should keep the opposite edge fixed when flipping past the minimum height', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      minCropBoxHeight: 100,

      ready() {
        cropper.setCropBoxData({
          top: 50,
          height: 150,
        });
        cropper.action = 'n';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 200,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.top).to.equal(200);
        expect(cropBoxData.height).to.equal(100);
        done();
      },
    });
  });

  it('should keep the opposite edge fixed when flipping from the south edge', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      minCropBoxHeight: 100,

      ready() {
        cropper.setCropBoxData({
          top: 200,
          height: 150,
        });
        cropper.action = 's';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: -200,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.top).to.equal(100);
        expect(cropBoxData.height).to.equal(100);
        done();
      },
    });
  });
});
