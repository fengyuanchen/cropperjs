describe('scale (method)', () => {
  it('should scale with the given values', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.scale(-1, -1).getImageData();

        expect(imageData.scaleX).to.equal(-1);
        expect(imageData.scaleY).to.equal(-1);
        done();
      },
    });
  });

  it('should not work when it is not scalable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      scalable: false,

      ready() {
        const imageData = cropper.scale(-1, -1).getImageData();

        expect(imageData.scaleX).to.be.undefined;
        expect(imageData.scaleY).to.be.undefined;
        done();
      },
    });
  });
});
