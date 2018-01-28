describe('checkOrientation (option)', () => {
  const imageURL = '/base/docs/images/picture-3.jpg';

  it('should check orientation be default', (done) => {
    const image = window.createImage({
      src: imageURL,
    });
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.getData().rotate).to.not.equal(0);
        done();
      },
    });

    expect(cropper.options.checkOrientation).to.be.true;
  });

  it('should not check orientation', (done) => {
    const image = window.createImage({
      src: imageURL,
    });
    const cropper = new Cropper(image, {
      checkOrientation: false,

      ready() {
        expect(cropper.getData().rotate).to.equal(0);
        done();
      },
    });

    expect(cropper.options.checkOrientation).to.be.false;
  });
});
