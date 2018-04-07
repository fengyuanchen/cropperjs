describe('dragMode (option)', () => {
  it('should be "crop" by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.dragBox.dataset.cropperAction).to.equal('crop');
        done();
      },
    });

    expect(cropper.options.dragMode).to.equal('crop');
  });

  it('should be "move"', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      dragMode: 'move',

      ready() {
        expect(cropper.dragBox.dataset.cropperAction).to.equal('move');
        done();
      },
    });

    expect(cropper.options.dragMode).to.equal('move');
  });

  it('should be "none"', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      dragMode: 'none',

      ready() {
        expect(cropper.dragBox.dataset.cropperAction).to.equal('none');
        done();
      },
    });

    expect(cropper.options.dragMode).to.equal('none');
  });
});
