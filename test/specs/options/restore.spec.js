describe('restore (option)', () => {
  it('should restore the cropped area after resize the window be default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const data = cropper.zoomTo(1).getData(true);
        const containerData = cropper.getContainerData();

        image.parentElement.style.width = `${containerData.width - 10}px`;
        image.parentElement.style.height = `${containerData.height - 10}px`;
        window.dispatchEvent(window.createEvent('resize'));
        expect(cropper.getData(true)).to.deep.equal(data);
        done();
      },
    });

    expect(cropper.options.restore).to.be.true;
  });

  it('should not be restore', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      restore: false,

      ready() {
        const data = cropper.zoomTo(1).getData(true);
        const containerData = cropper.getContainerData();

        image.parentElement.style.width = `${containerData.width / 2}px`;
        window.dispatchEvent(window.createEvent('resize'));
        expect(cropper.getData(true)).to.not.deep.equal(data);
        done();
      },
    });

    expect(cropper.options.restore).to.be.false;
  });
});
