describe('checkCrossOrigin (option)', () => {
  const crossOriginImageURL = 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg';

  it('should check cross origin by default', (done) => {
    const image = window.createImage({
      src: crossOriginImageURL,
    });
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.image.crossOrigin).to.equal('anonymous');
        expect(cropper.image.src).to.include('timestamp');
        done();
      },
    });

    expect(cropper.options.checkCrossOrigin).to.be.true;
  });

  it('should not check cross origin', (done) => {
    const image = window.createImage({
      src: crossOriginImageURL,
    });
    const cropper = new Cropper(image, {
      checkCrossOrigin: false,

      ready() {
        expect(cropper.image.crossOrigin).to.be.null;
        expect(cropper.image.src).to.not.include('timestamp');
        done();
      },
    });

    expect(cropper.options.checkCrossOrigin).to.be.false;
  });

  it('should add timestamp even though the image has the `crossOrigin` attribute', (done) => {
    const image = window.createImage({
      src: crossOriginImageURL,
      crossOrigin: 'anonymous',
    });
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.image.crossOrigin).to.equal('anonymous');
        expect(cropper.image.src).to.include('timestamp');
        done();
      },
    });
  });
});
