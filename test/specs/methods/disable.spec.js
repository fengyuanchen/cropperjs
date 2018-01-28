describe('disable (method)', () => {
  it('should be disabled after call the method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.disabled).to.be.false;
        expect(cropper.cropper.className).to.not.include('cropper-disabled');
        cropper.disable();
        expect(cropper.disabled).to.be.true;
        expect(cropper.cropper.className).to.include('cropper-disabled');
        done();
      },
    });
  });

  it('should disable the `crop` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      autoCrop: false,

      ready() {
        expect(cropper.cropped).to.be.false;
        cropper.disable().crop();
        expect(cropper.cropped).to.be.false;
        done();
      },
    });
  });

  it('should disable the `reset` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.moveTo(0).getCanvasData();

        cropper.disable().reset();
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `clear` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.cropped).to.be.true;
        cropper.disable().clear();
        expect(cropper.cropped).to.be.true;
        done();
      },
    });
  });

  it('should disable the `replace` method', (done) => {
    const image = window.createImage();
    const imageURL = image.src;
    const cropper = new Cropper(image, {
      ready() {
        if (!cropper.replaced) {
          cropper.disable().replace('/base/docs/images/picture-2.jpg');
          expect(image.src).to.equal(imageURL);
          done();
        } else {
          expect.fail(1, 0);
        }
      },
    });
  });

  it('should disable the `move` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().move(10, 10);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `moveTo` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().moveTo(0);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `zoom` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().zoom(0.1);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `zoomTo` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().zoomTo(1);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `rotate` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().rotate(45);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `rotateTo` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().rotateTo(45);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `scaleX` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().scaleX(2);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `scaleY` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().scaleY(2);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `scale` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().scale(2);
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `setData` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.getData();

        cropper.disable().setData({
          width: 160,
        });
        expect(cropper.getData()).to.deep.equal(data);
        done();
      },
    });
  });

  it('should disable the `setCanvasData` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        cropper.disable().setCanvasData({
          width: 160,
        });
        expect(cropper.getCanvasData()).to.deep.equal(canvasData);
        done();
      },
    });
  });

  it('should disable the `setCropBoxData` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();

        cropper.disable().setCropBoxData({
          width: 160,
        });
        expect(cropper.getCropBoxData()).to.deep.equal(cropBoxData);
        done();
      },
    });
  });

  it('should disable the `setAspectRatio` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.disable().setAspectRatio(0.618);
        expect(cropper.options.aspectRatio).to.be.NaN;
        done();
      },
    });
  });

  it('should disable the `setDragMode` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragMode } = cropper.options;

        cropper.disable().setDragMode('none');
        expect(cropper.options.dragMode).to.equal(dragMode);
        done();
      },
    });
  });

  it('should not disable the `enable` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.disable().enable();
        expect(cropper.disabled).to.be.false;
        done();
      },
    });
  });

  it('should not disable the `destroy` method', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.disable().destroy();
        expect(image.cropper).to.be.undefined;
        done();
      },
    });
  });
});
