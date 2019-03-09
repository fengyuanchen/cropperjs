describe('zoom (event)', () => {
  it('should trigger the `zoom` event', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      cropper.zoom(0.1);
    });

    image.addEventListener('zoom', (event) => {
      expect(event.type).to.equal('zoom');
      done();
    });

    cropper = new Cropper(image);
  });

  it('should have correct properties in `event.detail`', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      cropper.zoom(0.1);
    });

    image.addEventListener('zoom', (event) => {
      expect(event.detail).to.be.an('object').that.has.all.keys(['scale', 'oldScale', 'originalEvent']);
      expect(event.detail.scale).to.be.a('number');
      expect(event.detail.oldScale).to.be.a('number');
      expect(event.detail.scale).to.be.above(0);
      expect(event.detail.oldScale).to.be.above(0);
      expect(event.detail.scale).to.be.above(event.detail.oldScale);
      done();
    });

    cropper = new Cropper(image);
  });

  it('should not change the canvas sizes when default prevented', (done) => {
    const image = window.createImage();
    let cropper;

    image.addEventListener('ready', () => {
      const canvasData = cropper.getCanvasData();

      expect(cropper.zoom(0.1).getCanvasData()).to.deep.equal(canvasData);
      done();
    });

    image.addEventListener('zoom', (event) => {
      event.preventDefault();
    });

    cropper = new Cropper(image);
  });
});
