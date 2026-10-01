describe('error (option)', () => {
  it('should execute the `error` hook function', (done) => {
    const image = window.createImage({
      src: '/base/docs/images/not-found.jpg',
    });

    new Cropper(image, {
      error(event) {
        expect(event.type).to.equal('error');
        expect(event.currentTarget).to.equal(image);
        expect(event.detail).to.be.an('object');
        done();
      },
    });
  });
});
