describe('destroy (method)', () => {
  it('should destroy before ready', () => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect.fail(1, 0);
      },
    });

    expect(image.cropper).to.be.an.instanceof(Cropper);
    expect(cropper.xhr).to.be.an.instanceof(XMLHttpRequest);
    cropper.destroy();
    expect(cropper.xhr).to.be.not.exist;
    expect(image.cropper).to.be.not.exist;
  });

  it('should destroy after ready', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(this.cropper).to.be.an.instanceof(Cropper);
        expect(window.getComputedStyle(image).display).to.equal('none');
        cropper.destroy();
        expect(this.cropper).to.be.not.exist;
        expect(window.getComputedStyle(image).display).to.not.equal('none');
        done();
      },
    });
  });
});
