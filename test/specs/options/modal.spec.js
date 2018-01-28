describe('modal (option)', () => {
  it('should show the modal by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(cropper.dragBox.className).to.include('cropper-modal');
        done();
      },
    });

    expect(cropper.options.modal).to.be.true;
  });

  it('should not show the modal', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      modal: false,

      ready() {
        expect(cropper.dragBox.className).to.not.include('cropper-modal');
        done();
      },
    });

    expect(cropper.options.modal).to.be.false;
  });
});
