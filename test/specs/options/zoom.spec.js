describe('zoom (option)', () => {
  it('should be `null` be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.zoom).to.be.null;
  });

  it('should execute the `zoom` hook function', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        cropper.zoom(0.1);
      },

      zoom(event) {
        expect(event.type).to.equal('zoom');
        expect(event.detail).to.be.an('object').that.has.all.keys(['ratio', 'oldRatio', 'originalEvent']);
        expect(event.detail.ratio).to.be.a('number');
        expect(event.detail.oldRatio).to.be.a('number');
        expect(event.detail.ratio).to.be.above(0);
        expect(event.detail.oldRatio).to.be.above(0);
        expect(event.detail.ratio).to.be.above(event.detail.oldRatio);
        done();
      },
    });

    expect(cropper.options.zoom).to.be.a('function');
  });

  it('should not change the canvas sizes when default prevented', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const canvasData = cropper.getCanvasData();

        expect(cropper.zoom(0.1).getCanvasData()).to.deep.equal(canvasData);
        done();
      },

      zoom(event) {
        event.preventDefault();
      },
    });
  });
});
