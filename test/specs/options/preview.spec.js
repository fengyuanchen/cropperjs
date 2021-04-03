describe('preview (option)', () => {
  it('should be an empty string be default', () => {
    const image = window.createImage();
    const cropper = new Cropper(image);

    expect(cropper.options.preview).to.be.a('string').that.is.empty;
  });

  it('should support element', (done) => {
    const image = window.createImage();
    const preview = document.createElement('div');

    image.ownerDocument.body.appendChild(preview);

    const cropper = new Cropper(image, {
      preview,

      ready() {
        expect(preview.firstElementChild).to.not.be.null;
        expect(preview.firstElementChild.src).to.equal(image.src);
        done();
      },
    });

    expect(cropper.options.preview).to.equal(preview);
  });

  it('should support array of elements', (done) => {
    const image = window.createImage();
    const previews = document.createElement('ul');
    const preview1 = document.createElement('li');
    const preview2 = document.createElement('li');
    const preview = [preview1, preview2];

    previews.appendChild(preview1);
    previews.appendChild(preview2);
    image.ownerDocument.body.appendChild(previews);

    const cropper = new Cropper(image, {
      preview,

      ready() {
        expect(preview1.firstElementChild).to.not.be.null;
        expect(preview2.firstElementChild).to.not.be.null;
        expect(preview1.firstElementChild.src).to.equal(image.src);
        expect(preview2.firstElementChild.src).to.equal(image.src);
        done();
      },
    });

    expect(cropper.options.preview).to.equal(preview);
  });

  it('should support `NodeList` object', (done) => {
    const image = window.createImage();
    const previews = document.createElement('ul');
    const preview1 = document.createElement('li');
    const preview2 = document.createElement('li');

    previews.appendChild(preview1);
    previews.appendChild(preview2);
    image.ownerDocument.body.appendChild(previews);

    const cropper = new Cropper(image, {
      preview: previews.children,

      ready() {
        expect(preview1.firstElementChild).to.not.be.null;
        expect(preview2.firstElementChild).to.not.be.null;
        expect(preview1.firstElementChild.src).to.equal(image.src);
        expect(preview2.firstElementChild.src).to.equal(image.src);
        done();
      },
    });

    expect(cropper.options.preview).to.equal(previews.children);
  });

  it('should support selector', (done) => {
    const image = window.createImage();
    const previews = document.createElement('ul');
    const preview1 = document.createElement('li');
    const preview2 = document.createElement('li');

    preview1.className = 'preview';
    preview2.className = 'preview';
    previews.appendChild(preview1);
    previews.appendChild(preview2);
    image.ownerDocument.body.appendChild(previews);

    const cropper = new Cropper(image, {
      preview: '.preview',

      ready() {
        expect(preview1.firstElementChild).to.not.be.null;
        expect(preview2.firstElementChild).to.not.be.null;
        expect(preview1.firstElementChild.src).to.equal(image.src);
        expect(preview2.firstElementChild.src).to.equal(image.src);
        done();
      },
    });

    expect(cropper.options.preview).to.equal('.preview');
  });
});
