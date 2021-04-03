describe('crop (event)', () => {
  it('should trigger the `crop` event', (done) => {
    const image = window.createImage();

    image.addEventListener('crop', (event) => {
      expect(event.type).to.equal('crop');
      done();
    });

    new Cropper(image);
  });

  it('should have expected properties in `event.detail`', (done) => {
    const image = window.createImage();

    image.addEventListener('crop', (event) => {
      expect(event.detail).to.be.an('object').that.has.all.keys(['x', 'y', 'width', 'height', 'rotate', 'scaleX', 'scaleY']);
      expect(event.detail.x).to.be.a('number');
      expect(event.detail.y).to.be.a('number');
      expect(event.detail.width).to.be.a('number');
      expect(event.detail.height).to.be.a('number');
      expect(event.detail.rotate).to.be.a('number');
      expect(event.detail.scaleX).to.be.a('number');
      expect(event.detail.scaleY).to.be.a('number');
      done();
    });

    new Cropper(image);
  });
});
