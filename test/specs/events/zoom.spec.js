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
      expect(event.detail).to.be.an('object').that.has.all.keys(['ratio', 'oldRatio', 'originalEvent']);
      expect(event.detail.ratio).to.be.a('number');
      expect(event.detail.oldRatio).to.be.a('number');
      expect(event.detail.ratio).to.be.above(0);
      expect(event.detail.oldRatio).to.be.above(0);
      expect(event.detail.ratio).to.be.above(event.detail.oldRatio);
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
