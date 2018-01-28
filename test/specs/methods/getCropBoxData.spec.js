describe('getCropBoxData (method)', () => {
  it('should get an empty object when it is not ready', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);
    const cropBoxData = cropper.getCropBoxData();

    expect(cropBoxData).to.be.an('object').that.is.empty;
  });

  it('should get expect crop box data when ready', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData).to.be.an('object').that.has.all.keys(['left', 'top', 'width', 'height']);
        expect(cropBoxData.left).to.be.a('number');
        expect(cropBoxData.top).to.be.a('number');
        expect(cropBoxData.width).to.be.a('number');
        expect(cropBoxData.height).to.be.a('number');
        done();
      },
    });
  });
});
