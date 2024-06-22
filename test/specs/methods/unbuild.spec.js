import Cropper from '../../../src/js/cropper'; // Adjust import based on actual file location

describe('Cropper unbuild function', () => {
  let element; let
    cropperInstance;

  beforeEach(() => {
    element = document.createElement('img');
    document.body.appendChild(element);
    cropperInstance = new Cropper(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    cropperInstance = null;
  });

  it('should return early if not ready', () => {
    cropperInstance.ready = false;
    cropperInstance.unbuild();
    expect(cropperInstance.ready).to.be.false;
  });
});
