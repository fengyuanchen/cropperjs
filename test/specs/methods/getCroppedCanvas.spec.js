describe('getCroppedCanvas (method)', () => {
  it('should get a canvas with the whole image drew when it is not cropped', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        const canvasData = cropper.getCanvasData();
        const canvas = cropper.getCroppedCanvas();

        expect(canvas).to.be.an.instanceof(HTMLCanvasElement);
        expect(canvas.width).to.equal(canvasData.naturalWidth);
        expect(canvas.height).to.equal(canvasData.naturalHeight);
        done();
      },
    });
  });

  it('should get a canvas with the cropped area of the image drew', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();
        const canvas = cropper.getCroppedCanvas();

        expect(canvas).to.be.an.instanceof(HTMLCanvasElement);
        expect(canvas.width).to.equal(data.width);
        expect(canvas.height).to.equal(data.height);
        done();
      },
    });
  });

  it('should match the given width', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const width = 160;
        const canvas = cropper.getCroppedCanvas({
          width,
        });

        expect(canvas.width).to.equal(width);
        done();
      },
    });
  });

  it('should match the given height', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const height = 90;
        const canvas = cropper.getCroppedCanvas({
          height,
        });

        expect(canvas.height).to.equal(height);
        done();
      },
    });
  });

  it('should be contained when both width and height are given', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const width = 160;
        const height = 90;
        const canvas = cropper.getCroppedCanvas({
          width,
          height,
        });

        expect(canvas.width).to.be.most(width);
        expect(canvas.height).to.be.most(height);
        done();
      },
    });
  });

  it('should not be greater than the maximum width', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const maxWidth = 160;
        const canvas = cropper.getCroppedCanvas({
          maxWidth,
        });

        expect(canvas.width).to.be.most(maxWidth);
        done();
      },
    });
  });

  it('should not be greater than the maximum height', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const maxHeight = 90;
        const canvas = cropper.getCroppedCanvas({
          maxHeight,
        });

        expect(canvas.height).to.be.most(maxHeight);
        done();
      },
    });
  });

  it('should not be greater than both the maximum width and maximum height', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const maxWidth = 160;
        const maxHeight = 90;
        const canvas = cropper.getCroppedCanvas({
          maxWidth,
          maxHeight,
        });

        expect(canvas.width).to.be.most(maxWidth);
        expect(canvas.height).to.be.most(maxHeight);
        done();
      },
    });
  });

  it('should not be less than the minimum width', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const minWidth = 1600;
        const canvas = cropper.getCroppedCanvas({
          minWidth,
        });

        expect(canvas.width).to.be.least(minWidth);
        done();
      },
    });
  });

  it('should not be less than the minimum height', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const minHeight = 900;
        const canvas = cropper.getCroppedCanvas({
          minHeight,
        });

        expect(canvas.height).to.be.least(minHeight);
        done();
      },
    });
  });

  it('should not be less than both the minimum width and minimum height', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const minWidth = 1600;
        const minHeight = 900;
        const canvas = cropper.getCroppedCanvas({
          minWidth,
          minHeight,
        });

        expect(canvas.width).to.be.least(minWidth);
        expect(canvas.height).to.be.least(minHeight);
        done();
      },
    });
  });

  it('should match the given fill color', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvas = cropper.zoomTo(0.1).getCroppedCanvas({
          fillColor: '#010101',
        });
        const pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;

        expect(pixelData[0]).to.equal(1, 'red is 1');
        expect(pixelData[1]).to.equal(1, 'green is 1');
        expect(pixelData[2]).to.equal(1, 'blue is 1');
        expect(pixelData[3]).to.equal(255, 'color is opaque');
        done();
      },
    });
  });
});
