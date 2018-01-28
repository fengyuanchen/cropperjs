describe('rotateTo (method)', () => {
  it('should rotate to the given degree', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.rotateTo(360).getImageData().rotate).to.equal(0);
        expect(cropper.rotateTo(90).getImageData().rotate).to.equal(90);
        expect(cropper.rotateTo(0).getImageData().rotate).to.equal(0);
        expect(cropper.rotateTo(-180).getImageData().rotate).to.equal(-180);
        done();
      },
    });
  });

  it('should not work when it is not rotatable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      rotatable: false,

      ready() {
        expect(cropper.rotateTo(360).getImageData().rotate).to.be.undefined;
        expect(cropper.rotateTo(90).getImageData().rotate).to.be.undefined;
        expect(cropper.rotateTo(-180).getImageData().rotate).to.be.undefined;
        done();
      },
    });
  });
});
