describe('minContainerHeight (option)', () => {
  it('should be `100` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minContainerHeight).to.equal(100);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();

    image.parentElement.style.height = '90px';

    const minContainerHeight = 180;
    const cropper = new Cropper(image, {
      minContainerHeight,

      ready() {
        expect(cropper.getContainerData().height).to.equal(minContainerHeight);
        done();
      },
    });

    expect(cropper.options.minContainerHeight).to.equal(minContainerHeight);
  });
});
