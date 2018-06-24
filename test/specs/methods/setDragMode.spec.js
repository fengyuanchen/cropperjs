describe('setDragMode (method)', () => {
  it('should set the drag mode to "move"', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        expect(dragBox.dataset.cropperAction).to.equal('crop');
        cropper.setDragMode('move');
        expect(dragBox.dataset.cropperAction).to.equal('move');
        done();
      },
    });
  });

  it('should set the drag mode to "none"', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        expect(dragBox.dataset.cropperAction).to.equal('crop');
        cropper.setDragMode('none');
        expect(dragBox.dataset.cropperAction).to.equal('none');
        done();
      },
    });
  });
});
