describe('setData (method)', () => {
  it('should change the positions only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();
        const changedData = cropper.setData({
          x: 1,
          y: 1,
        }).getData();

        expect(changedData.x).to.not.equal(data.x);
        expect(changedData.y).to.not.equal(data.y);
        expect(changedData.width).to.equal(data.width);
        expect(changedData.height).to.equal(data.height);
        done();
      },
    });
  });

  it('should change the positions only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();
        const changedData = cropper.setData({
          width: 160,
          height: 90,
        }).getData();

        expect(changedData.x).to.equal(data.x);
        expect(changedData.y).to.equal(data.y);
        expect(changedData.width).to.not.equal(data.width);
        expect(changedData.height).to.not.equal(data.height);
        done();
      },
    });
  });

  it('should change the rotate degrees', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();
        const changedData = cropper.setData({
          rotate: 90,
        }).getData();

        expect(changedData.rotate).to.not.equal(data.rotate);
        done();
      },
    });
  });

  it('should change the scale in both x-axis and y-axis', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();
        const changedData = cropper.setData({
          scaleX: -1,
          scaleY: -1,
        }).getData();

        expect(changedData.scaleX).to.not.equal(data.scaleX);
        expect(changedData.scaleY).to.not.equal(data.scaleY);
        done();
      },
    });
  });

  it('should expect ratio to not overflow when changing x position using viewMode 1', (done) => {
    const image = window.generateImage({ width: 600, height: 314 });
    const container = image.parentNode;
    container.style.height = '290px';
    container.style.width = '290px';
    const crop = { x: 0, width: 314 };

    const cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      ready() {
        cropper.setData(crop);
        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left).to.equal(0);
        done();
      },
    });
  });
});
