describe('toggleDragModeOnDblclick (option)', () => {
  it('should toggle drag mode on double click', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {

      ready() {
        const { dragBox } = cropper;

        expect(dragBox.className).include('cropper-crop');
        expect(dragBox.dataset.action).to.equal('crop');
        dragBox.dispatchEvent(window.createEvent('dblclick'));
        expect(dragBox.className).include('cropper-move');
        expect(dragBox.dataset.action).to.equal('move');
        done();
      },
    });

    expect(cropper.options.toggleDragModeOnDblclick).to.be.true;
  });

  it('should not toggle drag mode on double click', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      toggleDragModeOnDblclick: false,

      ready() {
        const { dragBox } = cropper;

        expect(dragBox.className).include('cropper-crop');
        expect(dragBox.dataset.action).to.equal('crop');
        dragBox.dispatchEvent(window.createEvent('dblclick'));
        expect(dragBox.className).include('cropper-crop');
        expect(dragBox.dataset.action).to.equal('crop');
        done();
      },
    });

    expect(cropper.options.toggleDragModeOnDblclick).to.be.false;
  });
});
