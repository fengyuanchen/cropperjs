describe('crop (option)', () => {
  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.crop).to.be.null;
  });

  it('should execute the `crop` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      crop(event) {
        expect(event.type).to.equal('crop');
        expect(event.detail).to.be.an('object').that.has.all.keys(['x', 'y', 'width', 'height', 'rotate', 'scaleX', 'scaleY']);
        expect(event.detail.x).to.be.a('number');
        expect(event.detail.y).to.be.a('number');
        expect(event.detail.width).to.be.a('number');
        expect(event.detail.height).to.be.a('number');
        expect(event.detail.rotate).to.be.a('number');
        expect(event.detail.scaleX).to.be.a('number');
        expect(event.detail.scaleY).to.be.a('number');
        done();
      },
    });

    expect(cropper.options.crop).to.be.a('function');
  });
});
