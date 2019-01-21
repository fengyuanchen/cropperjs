describe('righttap (option)', () => {
  const CONTEXT_MENU = 'contextmenu';

  it('should execute the `righttap` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const { dragBox } = cropper;

        dragBox.dispatchEvent(window.createEvent(CONTEXT_MENU));
      },

      righttap(event) {
        expect(event.type).to.equal('contextmenu');
        done();
      },
    });

    expect(cropper.options.righttap).to.be.a('function');
  });
});
