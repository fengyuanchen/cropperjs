import {
  ACTION_EAST,
  ACTION_NORTH,
  ACTION_NORTH_EAST, ACTION_NORTH_WEST,
  ACTION_SOUTH,
  ACTION_SOUTH_EAST, ACTION_SOUTH_WEST,
  ACTION_WEST,
} from '../../../src/js/constants';

describe('change (method)', () => {
  const createPointerMove = (x, y) => ({
    startX: 0, endX: x, startY: 0, endY: y,
  });
  const CROPBOX_INITIAL_VALUES = {
    left: 100,
    top: 100,
    width: 10,
    height: 10,
  };

  let cropper;

  beforeEach((done) => {
    const image = window.createImage();
    cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();
        cropBoxData.left = CROPBOX_INITIAL_VALUES.left;
        cropBoxData.top = CROPBOX_INITIAL_VALUES.top;
        cropBoxData.width = CROPBOX_INITIAL_VALUES.width;
        cropBoxData.height = CROPBOX_INITIAL_VALUES.height;
        cropper.setCropBoxData(cropBoxData);
        done();
      },
    });
  });

  it('should resize cropping box correctly when moving NORTH to SOUTH', () => {
    cropper.pointers[0] = createPointerMove(0, 50);
    cropper.action = ACTION_NORTH;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.top).to.equal(110);
    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(10);
  });

  it('should resize cropping box correctly when moving SOUTH to NORTH', () => {
    cropper.pointers[0] = createPointerMove(0, -50);
    cropper.action = ACTION_SOUTH;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.top).to.equal(60);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(10);
  });

  it('should resize cropping box correctly when moving WEST to EAST', () => {
    cropper.pointers[0] = createPointerMove(50, 0);
    cropper.action = ACTION_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(10);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(110);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving EAST to WEST', () => {
    cropper.pointers[0] = createPointerMove(-50, 0);
    cropper.action = ACTION_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(10);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(60);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving NORTH-EAST to SOUTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(5, 50);
    cropper.action = ACTION_NORTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();
    expect(cropBoxDataNew.top).to.equal(110);
    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(15);
  });

  it('should resize cropping box correctly when moving SOUTH-EAST to NORTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(5, -50);
    cropper.action = ACTION_SOUTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.top).to.equal(60);
    expect(cropBoxDataNew.left).to.equal(100);
    expect(cropBoxDataNew.width).to.equal(15);
  });

  it('should resize cropping box correctly when moving NORTH-WEST to NORTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(50, 5);
    cropper.action = ACTION_NORTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(5);
    expect(cropBoxDataNew.top).to.equal(105);
    expect(cropBoxDataNew.left).to.equal(110);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving NORTH-EAST to NORTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(-50, 5);
    cropper.action = ACTION_NORTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(5);
    expect(cropBoxDataNew.top).to.equal(105);
    expect(cropBoxDataNew.left).to.equal(60);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving NORTH-WEST to SOUTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(5, 50);
    cropper.action = ACTION_NORTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();
    expect(cropBoxDataNew.top).to.equal(110);
    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.left).to.equal(105);
    expect(cropBoxDataNew.width).to.equal(5);
  });

  it('should resize cropping box correctly when moving SOUTH-WEST to NORTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(5, -50);
    cropper.action = ACTION_SOUTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(40);
    expect(cropBoxDataNew.top).to.equal(60);
    expect(cropBoxDataNew.left).to.equal(105);
    expect(cropBoxDataNew.width).to.equal(5);
  });

  it('should resize cropping box correctly when moving SOUTH-WEST to SOUTH-EAST', () => {
    cropper.pointers[0] = createPointerMove(50, 5);
    cropper.action = ACTION_SOUTH_WEST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(15);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(110);
    expect(cropBoxDataNew.width).to.equal(40);
  });

  it('should resize cropping box correctly when moving SOUTH-EAST to SOUTH-WEST', () => {
    cropper.pointers[0] = createPointerMove(-50, 5);
    cropper.action = ACTION_SOUTH_EAST;

    cropper.change({});

    const cropBoxDataNew = cropper.getCropBoxData();

    expect(cropBoxDataNew.height).to.equal(15);
    expect(cropBoxDataNew.top).to.equal(100);
    expect(cropBoxDataNew.left).to.equal(60);
    expect(cropBoxDataNew.width).to.equal(40);
  });
});
