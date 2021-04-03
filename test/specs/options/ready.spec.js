describe('ready (option)', () => {
  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.ready).to.be.null;
  });

  it('should execute the `ready` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready(event) {
        expect(event.type).to.equal('ready');
        done();
      },
    });

    expect(cropper.options.ready).to.be.a('function');
  });

  it('should execute the `crop` hook function even though default prevented', (done) => {
    const image = window.createImage();

    new Cropper(image, {
      ready(event) {
        event.preventDefault();
      },

      crop() {
        done();
      },
    });
  });
});
