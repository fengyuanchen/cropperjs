describe('zoomOnWheel (option)', () => {
  it('should zoom on wheel by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.cropper.dispatchEvent(window.createEvent('wheel'));
      },

      zoom() {
        done();
      },
    });

    expect(cropper.options.zoomOnWheel).to.be.true;
  });

  it('should not zoom on wheel', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomOnWheel: false,

      ready() {
        cropper.cropper.dispatchEvent(window.createEvent('wheel'));
        done();
      },

      zoom() {
        expect.fail(1, 0);
      },
    });

    expect(cropper.options.zoomOnWheel).to.be.false;
  });
});
