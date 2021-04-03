describe('responsive (option)', () => {
  it('should be responsive be default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const containerData = cropper.getContainerData();
        let newContainerWidth = containerData.width - 10;
        let newContainerHeight = containerData.height - 10;

        image.parentElement.style.width = `${newContainerWidth}px`;
        image.parentElement.style.height = `${newContainerHeight}px`;
        window.dispatchEvent(window.createEvent('resize'));

        let newContainerData = cropper.getContainerData();

        expect(newContainerData.width).to.equal(newContainerWidth);
        expect(newContainerData.height).to.equal(newContainerHeight);

        newContainerWidth = containerData.width + 10;
        newContainerHeight = containerData.height + 10;

        image.parentElement.style.width = `${newContainerWidth}px`;
        image.parentElement.style.height = `${newContainerHeight}px`;
        window.dispatchEvent(window.createEvent('resize'));

        newContainerData = cropper.getContainerData();

        expect(newContainerData.width).to.equal(newContainerWidth);
        expect(newContainerData.height).to.equal(newContainerHeight);
        done();
      },
    });

    expect(cropper.options.responsive).to.be.true;
  });

  it('should not be responsive', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      responsive: false,

      ready() {
        const containerData = cropper.getContainerData();
        const newContainerWidth = containerData.width - 10;
        const newContainerHeight = containerData.height - 10;

        image.parentElement.style.width = `${newContainerWidth}px`;
        image.parentElement.style.height = `${newContainerHeight}px`;
        window.dispatchEvent(window.createEvent('resize'));

        const newContainerData = cropper.getContainerData();

        expect(newContainerData.width).to.equal(containerData.width);
        expect(newContainerData.height).to.equal(containerData.height);
        done();
      },
    });

    expect(cropper.options.responsive).to.be.false;
  });
});
