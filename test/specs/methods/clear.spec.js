describe('clear (method)', () => {
  it('should match the expected behaviors after cleared', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.cropped).to.be.true;
        cropper.clear();
        expect(cropper.cropped).to.be.false;
        expect(cropper.getData()).to.deep.equal({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
        });
        expect(cropper.getCropBoxData()).to.be.an('object').that.is.empty;
        expect(window.getComputedStyle(cropper.cropBox).display).to.equal('none');
        done();
      },
    });
  });

  it('should not clear when it is disabled', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.disable().clear();
        expect(cropper.cropped).to.be.true;
        expect(cropper.getCropBoxData()).to.be.an('object').that.is.not.empty;
        expect(window.getComputedStyle(cropper.cropBox).display).to.not.equal('none');
        done();
      },
    });
  });
});
