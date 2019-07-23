describe('shouldBustCache (option)', () => {
  const crossOriginImageURL = 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg';

  it('should not add timestamp when shouldBustCache = false', (done) => {
    const image = window.createImage({
      src: crossOriginImageURL,
    });
    const shouldBustCache = false;
    const cropper = new Cropper(image, {
      shouldBustCache,
      ready() {
        expect(cropper.image.crossOrigin).to.equal('anonymous');
        expect(cropper.image.src).to.not.include('timestamp');
        done();
      },
    });

    expect(cropper.options.checkCrossOrigin).to.be.true;
  });
});
