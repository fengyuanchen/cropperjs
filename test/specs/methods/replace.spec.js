describe('replace (method)', () => {
  it('should replace the image url with a new one', (done) => {
    const image = window.createImage();
    const imageURL = '/base/docs/images/picture-2.jpg';
    const cropper = new Cropper(image, {
      ready() {
        cropper.options.ready = () => {
          expect(image.src).to.include(imageURL);
          done();
        };

        expect(image.src).to.not.include(imageURL);
        cropper.replace(imageURL);
      },
    });
  });
});
