describe('scalable (option)', () => {
  it('should be scalable by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.scale(-1, -1).getImageData();

        expect(imageData.scaleX).to.equal(-1);
        expect(imageData.scaleY).to.equal(-1);
        done();
      },
    });

    expect(cropper.options.scalable).to.be.true;
  });

  it('should not be scalable', (done) => {
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

    expect(cropper.options.scalable).to.be.false;
  });
});
