describe('minContainerWidth (option)', () => {
  it('should be `200` by default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.minContainerWidth).to.equal(200);
  });

  it('should match the given minimum size', (done) => {
    const image = window.createImage();

    image.parentElement.style.width = '160px';

    const minContainerWidth = 320;
    const cropper = new Cropper(image, {
      minContainerWidth,

      ready() {
        expect(cropper.getContainerData().width).to.equal(minContainerWidth);
        done();
      },
    });

    expect(cropper.options.minContainerWidth).to.equal(minContainerWidth);
  });

  it('should support `0` as the value', (done) => {
    const image = window.createImage();

    image.parentElement.style.width = '0';

    const minContainerWidth = 0;
    const cropper = new Cropper(image, {
      minContainerWidth,

      ready() {
        expect(cropper.getContainerData().width).to.equal(minContainerWidth);
        done();
      },
    });

    expect(cropper.options.minContainerWidth).to.equal(minContainerWidth);
  });
});
