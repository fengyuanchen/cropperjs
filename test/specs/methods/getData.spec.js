describe('getData (method)', () => {
  const initialData = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
  };

  it('should get initial data when it is not ready', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.getData()).to.deep.equal(initialData);
  });

  it('should get initial data when it is not cropped', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        expect(cropper.cropped).to.be.false;
        expect(cropper.getData()).to.deep.equal(initialData);
        done();
      },
    });
  });

  it('should get data with expected properties', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();

        expect(data).to.be.an('object').that.has.all.keys(['x', 'y', 'width', 'height', 'rotate', 'scaleX', 'scaleY']);
        expect(data.x).to.be.a('number');
        expect(data.y).to.be.a('number');
        expect(data.width).to.be.a('number');
        expect(data.height).to.be.a('number');
        expect(data.rotate).to.be.a('number');
        expect(data.scaleX).to.be.a('number');
        expect(data.scaleY).to.be.a('number');
        done();
      },
    });
  });

  it('should get data with rounded property values', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData(true);

        expect(data.x % 1).to.equal(0);
        expect(data.y % 1).to.equal(0);
        expect(data.width % 1).to.equal(0);
        expect(data.height % 1).to.equal(0);
        done();
      },
    });
  });

  it('should round value without increase px', (done) => {
    const image = window.createImage();

    const cropper = new Cropper(image, {
      ready() {
        // mock an edge case
        cropper.cropBoxData = {
          left: 100.50000000000001,
          top: 100.50000000000001,
          width: 100.5,
          height: 100.5,
        };
        cropper.canvasData = {
          left: 0,
          top: 0,
        };
        cropper.imageData.width = 200;
        cropper.imageData.naturalWidth = 200;

        const data = cropper.getData(true);
        expect(data.x + data.width === 201).to.be.true;
        expect(data.y + data.height === 201).to.be.true;
        done();
      },
    });
  });
});
