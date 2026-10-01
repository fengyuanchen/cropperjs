describe('error (event)', () => {
  it('should trigger the `error` event when the image fails to load', (done) => {
    const image = window.createImage({
      src: '/base/docs/images/not-found.jpg',
    });

    image.addEventListener('error', (event) => {
      expect(event.type).to.equal('error');
      expect(event.target).to.equal(image);
      done();
    });

    new Cropper(image);
  });
});
