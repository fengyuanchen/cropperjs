describe('checkCrossOrigin (option)', () => {
  const crossOriginImageURL = 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg';

  it('should check cross origin by default', () => {
    const image = window.createImage({
      src: crossOriginImageURL,
    });
    const cropper = new Cropper(image, {
      checkOrientation: false,
    });

    expect(cropper.options.checkCrossOrigin).to.be.true;
    expect(cropper.image.crossOrigin).to.equal('anonymous');
    expect(cropper.image.src).to.include('timestamp');
    cropper.destroy();
  });

  it('should not check cross origin', () => {
    const image = window.createImage({
      src: crossOriginImageURL,
    });
    const cropper = new Cropper(image, {
      checkCrossOrigin: false,
      checkOrientation: false,
    });

    expect(cropper.options.checkCrossOrigin).to.be.false;
    expect(cropper.image.crossOrigin).to.be.null;
    expect(cropper.image.src).to.not.include('timestamp');
    cropper.destroy();
  });

  it('should add timestamp even though the image has the `crossOrigin` attribute', () => {
    const image = window.createImage({
      src: crossOriginImageURL,
      crossOrigin: 'anonymous',
    });
    const cropper = new Cropper(image, {
      checkOrientation: false,
    });

    expect(cropper.image.crossOrigin).to.equal('anonymous');
    expect(cropper.image.src).to.include('timestamp');
    cropper.destroy();
  });
});
