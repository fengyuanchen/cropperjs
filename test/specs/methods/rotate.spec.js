describe('rotate (method)', () => {
  it('should rotate with the given degree', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.rotate(360).getImageData().rotate).to.equal(0);
        expect(cropper.rotate(90).getImageData().rotate).to.equal(90);
        expect(cropper.rotate(-180).getImageData().rotate).to.equal(-90);
        done();
      },
    });
  });

  it('should not work when it is not rotatable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      rotatable: false,

      ready() {
        expect(cropper.rotate(360).getImageData().rotate).to.be.undefined;
        expect(cropper.rotate(90).getImageData().rotate).to.be.undefined;
        expect(cropper.rotate(-180).getImageData().rotate).to.be.undefined;
        done();
      },
    });
  });
});
