describe('noConflict', () => {
  it('should be a static method', () => {
    expect(Cropper.noConflict).to.be.a('function');
  });

  it('should return the Cropper class itself', () => {
    const { Cropper } = window;
    const ImageCropper = Cropper.noConflict();

    expect(ImageCropper).to.equal(Cropper);
    expect(window.Cropper).to.be.undefined;

    // Reverts it for the rest test suites
    window.Cropper = ImageCropper;
  });
});
