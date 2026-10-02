describe('cropBoxResizeAroundCenter (option)', () => {
  it('should be disabled by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.cropBoxResizeAroundCenter).to.be.false;
  });

  it('should resize from the center when enabled', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxResizeAroundCenter: true,

      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 10,
          endY: 0,
        };

        cropper.change({
          shiftKey: false,
        });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropper.options.cropBoxResizeAroundCenter).to.be.true;
        expect(cropBoxData.left + (cropBoxData.width / 2)).to.equal(250);
        expect(cropBoxData.top + (cropBoxData.height / 2)).to.equal(140);
        expect(cropBoxData.width).to.equal(120);
        done();
      },
    });
  });

  it('should keep the center fixed for every edge and corner', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxResizeAroundCenter: true,

      ready() {
        const actions = [
          {
            action: 'e', x: 5, y: 0, width: 110, height: 80,
          },
          {
            action: 'w', x: -5, y: 0, width: 110, height: 80,
          },
          {
            action: 'n', x: 0, y: -5, width: 100, height: 90,
          },
          {
            action: 's', x: 0, y: 5, width: 100, height: 90,
          },
          {
            action: 'ne', x: 5, y: -5, width: 110, height: 90,
          },
          {
            action: 'nw', x: -5, y: -5, width: 110, height: 90,
          },
          {
            action: 'se', x: 5, y: 5, width: 110, height: 90,
          },
          {
            action: 'sw', x: -5, y: 5, width: 110, height: 90,
          },
        ];

        actions.forEach(({
          action,
          x,
          y,
          width,
          height,
        }) => {
          cropper.setCropBoxData({
            left: 200,
            top: 100,
            width: 100,
            height: 80,
          });
          cropper.action = action;
          cropper.pointers[0] = {
            startX: 0,
            startY: 0,
            endX: x,
            endY: y,
          };

          cropper.change({
            shiftKey: false,
          });

          const cropBoxData = cropper.getCropBoxData();

          expect(cropBoxData.left + (cropBoxData.width / 2)).to.equal(250);
          expect(cropBoxData.top + (cropBoxData.height / 2)).to.equal(140);
          expect(cropBoxData.width).to.equal(width);
          expect(cropBoxData.height).to.equal(height);
        });

        done();
      },
    });
  });

  it('should preserve the aspect ratio around the center', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      aspectRatio: 2,
      cropBoxResizeAroundCenter: true,

      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 115,
          width: 100,
          height: 50,
        });
        cropper.action = 'ne';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 5,
          endY: -5,
        };

        cropper.change({
          shiftKey: false,
        });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left + (cropBoxData.width / 2)).to.equal(250);
        expect(cropBoxData.top + (cropBoxData.height / 2)).to.equal(140);
        expect(cropBoxData.width).to.equal(120);
        expect(cropBoxData.height).to.equal(60);
        done();
      },
    });
  });

  it('should flip the active edge when it is dragged past the center', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxResizeAroundCenter: true,

      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: -60,
          endY: 0,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropper.action).to.equal('w');
        expect(cropBoxData.left + (cropBoxData.width / 2)).to.equal(250);
        expect(cropBoxData.width).to.equal(20);
        done();
      },
    });
  });

  it('should respect the minimum size without moving the center', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxResizeAroundCenter: true,
      minCropBoxWidth: 60,

      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: -30,
          endY: 0,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left + (cropBoxData.width / 2)).to.equal(250);
        expect(cropBoxData.width).to.equal(60);
        done();
      },
    });
  });

  it('should stop at the container edge without moving the center', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxResizeAroundCenter: true,

      ready() {
        cropper.setCropBoxData({
          left: 20,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 1000,
          endY: 0,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left + (cropBoxData.width / 2)).to.equal(70);
        expect(cropBoxData.left).to.equal(0);
        expect(cropBoxData.width).to.equal(140);
        done();
      },
    });
  });

  it('should keep the default resize behavior when disabled', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 10,
          endY: 0,
        };

        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.left).to.equal(200);
        expect(cropBoxData.width).to.equal(110);
        done();
      },
    });
  });
});
