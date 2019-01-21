describe('cropend (option)', () => {
  const CONTEXT_MENU = 'contextmenu';

  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.righttap).to.be.null;
  });

  it('should execute the `cropend` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        dragBox.dispatchEvent(window.createEvent(CONTEXT_MENU));
      },

      righttap(event) {
        expect(event.type).to.equal('righttap');
        done();
      },
    });

    expect(cropper.options.righttap).to.be.a('function');
  });
});
