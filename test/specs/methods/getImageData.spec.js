describe('getImageData (method)', () => {
  it('should get an empty object when it is not loaded', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);
    const imageData = cropper.getImageData();

    expect(imageData).to.be.an('object').that.is.empty;
  });

  it('should get expect image data when loaded', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.getImageData();

        expect(imageData).to.have.all.keys(['left', 'top', 'width', 'height', 'rotate', 'scaleX', 'scaleY', 'naturalWidth', 'naturalHeight', 'aspectRatio']);
        expect(imageData.left).to.be.a('number');
        expect(imageData.top).to.be.a('number');
        expect(imageData.width).to.be.a('number');
        expect(imageData.height).to.be.a('number');
        expect(imageData.rotate).to.be.a('number');
        expect(imageData.scaleX).to.be.a('number');
        expect(imageData.scaleY).to.be.a('number');
        expect(imageData.naturalWidth).to.be.a('number');
        expect(imageData.naturalHeight).to.be.a('number');
        expect(imageData.aspectRatio).to.be.a('number');
        done();
      },
    });
  });

  it('should not have the `rotate` property when it is not rotatable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      rotatable: false,

      ready() {
        const imageData = cropper.getImageData();

        expect(imageData).to.have.all.keys(['left', 'top', 'width', 'height', 'scaleX', 'scaleY', 'naturalWidth', 'naturalHeight', 'aspectRatio']);
        expect(imageData.rotate).to.be.undefined;
        done();
      },
    });
  });

  it('should not have the `scaleX` and `scaleY` properties when it is not scalable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      scalable: false,

      ready() {
        const imageData = cropper.getImageData();

        expect(imageData).to.have.all.keys(['left', 'top', 'width', 'height', 'rotate', 'naturalWidth', 'naturalHeight', 'aspectRatio']);
        expect(imageData.scaleX).to.be.undefined;
        expect(imageData.scaleY).to.be.undefined;
        done();
      },
    });
  });
});
