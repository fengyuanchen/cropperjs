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
        expect(event.detail).to.be.an('object').that.has.all.keys(['scale', 'oldScale', 'originalEvent']);
        expect(event.detail.scale).to.be.a('number');
        expect(event.detail.oldScale).to.be.a('number');
        expect(event.detail.scale).to.be.above(0);
        expect(event.detail.oldScale).to.be.above(0);
        expect(event.detail.scale).to.be.above(event.detail.oldScale);
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
