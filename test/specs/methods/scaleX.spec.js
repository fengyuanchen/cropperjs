describe('scaleX (method)', () => {
  it('should be scaled in the x-axis', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.scaleX(-1).getImageData();

        expect(imageData.scaleX).to.equal(-1);
        done();
      },
    });
  });

  it('should not work when it is not scalable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      scalable: false,

      ready() {
        const imageData = cropper.scaleX(-1).getImageData();

        expect(imageData.scaleX).to.be.undefined;
        done();
      },
    });
  });
});
