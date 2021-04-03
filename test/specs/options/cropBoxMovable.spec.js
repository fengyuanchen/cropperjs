describe('cropBoxMovable (option)', () => {
  it('should by movable by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const face = cropper.cropper.querySelector('.cropper-face');

        expect(face.dataset.cropperAction).to.equal('all');
        done();
      },
    });

    expect(cropper.options.cropBoxMovable).to.be.true;
  });

  it('should not be movable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      cropBoxMovable: false,

      ready() {
        const face = cropper.cropper.querySelector('.cropper-face');

        expect(face.dataset.cropperAction).to.not.equal('all');
        done();
      },
    });

    expect(cropper.options.cropBoxMovable).to.be.false;
  });
});
