describe('Cropper', () => {
  it('should be a class (function)', () => {
    expect(Cropper).to.be.a('function');
  });

  it('should throw error when the first argument is not an element', () => {
    expect(() => {
      new Cropper(document);
    }).to.throw('The first argument is required and must be an <img> or <canvas> element.');
  });
});
