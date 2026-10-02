describe('cropBoxMoveMode (option)', () => {
  it('should use the cursor mode by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.cropBoxMoveMode).to.equal('cursor');
  });

  it('should move the crop box relative to the drag start point', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxMoveMode: 'dragStart',

      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'all';
        cropper.cropBoxDragStartAction = 'all';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 10,
          endY: 10,
        };

        cropper.change({ shiftKey: false });
        cropper.pointers[0].endX = 20;
        cropper.pointers[0].endY = 20;
        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropper.options.cropBoxMoveMode).to.equal('dragStart');
        expect(cropBoxData.left).to.equal(220);
        expect(cropBoxData.top).to.equal(120);
        done();
      },
    });
  });

  it('should resize the crop box relative to the drag start point', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxMoveMode: 'dragStart',

      ready() {
        cropper.setCropBoxData({
          left: 200,
          top: 100,
          width: 100,
          height: 80,
        });
        cropper.action = 'e';
        cropper.cropBoxDragStartAction = 'e';
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 10,
          endY: 0,
        };

        cropper.change({ shiftKey: false });
        cropper.pointers[0].endX = 20;
        cropper.change({ shiftKey: false });

        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.width).to.equal(120);
        done();
      },
    });
  });

  it('should not change the mode while creating a crop box', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxMoveMode: 'dragStart',

      ready() {
        cropper.action = 'crop';
        cropper.cropBoxDragStartAction = '';
        cropper.cropBoxDragStartData = null;
        cropper.pointers[0] = {
          startX: 0,
          startY: 0,
          endX: 10,
          endY: 10,
        };

        cropper.change({ shiftKey: false });
        cropper.pointers[0].endX = 20;
        cropper.pointers[0].endY = 20;
        cropper.change({ shiftKey: false });
        cropper.pointers[0].endX = 30;
        cropper.pointers[0].endY = 30;
        cropper.change({ shiftKey: false });

        expect(cropper.cropBoxDragStartData).to.be.null;
        done();
      },
    });
  });
});
