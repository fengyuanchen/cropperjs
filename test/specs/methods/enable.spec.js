describe('enable (method)', () => {
  it('should be enabled', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.disable();
        expect(cropper.disabled).to.be.true;
        expect(cropper.cropper.className).to.include('cropper-disabled');
        cropper.enable();
        expect(cropper.disabled).to.be.false;
        expect(cropper.cropper.className).to.not.include('cropper-disabled');
        done();
      },
    });
  });
});
