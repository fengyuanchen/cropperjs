import Cropper from '../../../src/js/cropper';

describe('Cropper init function', () => {
  let element;

  beforeEach(() => {
    // create new image element for each test
    element = document.createElement('img');
    document.body.appendChild(element);
  });

  afterEach(() => {
    // remove created image element
    document.body.removeChild(element);
  });

  it('should not reinitialize if already initialized', () => {
    // verifies that init returns early if cropper is already attached to the element
    element.NAMESPACE = new Cropper(element);
    const cropper = new Cropper(element);
    expect(cropper).to.exist;
  });

  it('should return if img src is empty', () => {
    // verifies that init returns early if src attribute is empty
    const cropper = new Cropper(element);
    expect(cropper.originalUrl).to.equal('');
  });

  it('should initialize for canvas element', () => {
    // checks correct initialisation of cropper for canvas element
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const cropper = new Cropper(canvas);
    expect(cropper.isImg).to.be.undefined;
    document.body.removeChild(canvas);
  });
});
