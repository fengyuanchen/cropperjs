describe('ready (event)', () => {
  it('should trigger the `ready` event', (done) => {
    const image = window.createImage();

    image.addEventListener('ready', (event) => {
      expect(event.type).to.equal('ready');
      done();
    });

    new Cropper(image);
  });

  it('should trigger the `crop` event even though default prevented', (done) => {
    const image = window.createImage();

    image.addEventListener('ready', (event) => {
      event.preventDefault();
    });

    image.addEventListener('crop', () => {
      done();
    });

    new Cropper(image);
  });
});
