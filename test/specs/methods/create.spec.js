describe('create', () => {
  it('should be a static method', () => {
    expect(Cropper.create).to.be.a('function');
  });

  it('should create a new Cropper instance', (done) => {
    const image = window.createImage();
    const cropper = Cropper.create(image, {
      aspectRatio: 1,

      ready() {
        expect(cropper.options.aspectRatio).to.equal(1);
        done();
      },
    });

    expect(cropper).to.be.instanceof(Cropper);
  });
});
