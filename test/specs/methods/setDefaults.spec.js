describe('setDefaults', () => {
  it('should be a static method', () => {
    expect(Cropper.setDefaults).to.be.a('function');
  });

  it('should change the global default options', (done) => {
    Cropper.setDefaults({
      aspectRatio: 1,
    });

    const image = window.createImage();
    const cropper = new Cropper(image, {
      aspectRatio: 1,

      crop() {
        const cropBoxData = cropper.getCropBoxData();

        expect(cropBoxData.width).to.equal(cropBoxData.height);
        done();
      },
    });

    expect(cropper.options.aspectRatio).to.equal(1);

    // Reverts it for the rest test suites
    Cropper.setDefaults({
      aspectRatio: NaN,
    });
  });
});
