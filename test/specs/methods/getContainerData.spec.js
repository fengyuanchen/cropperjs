describe('getContainerData (method)', () => {
  it('should get an empty object when it is not ready', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);
    const containerData = cropper.getContainerData();

    expect(containerData).to.be.an('object').that.is.empty;
  });

  it('should get expect container data when ready', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const containerData = cropper.getContainerData();

        expect(containerData).to.be.an('object').that.has.all.keys(['width', 'height']);
        expect(containerData.width).to.be.a('number');
        expect(containerData.height).to.be.a('number');
        done();
      },
    });
  });
});
