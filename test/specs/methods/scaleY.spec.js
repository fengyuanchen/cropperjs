describe('scaleY (method)', () => {
  it('should be scaled in the y-axis', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.scaleY(-1).getImageData();

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
        const imageData = cropper.scaleY(-1).getImageData();

        expect(imageData.scaleY).to.be.undefined;
        done();
      },
    });
  });
});
