import {
  ACTION_RESIZE_NORTH,
  ACTION_RESIZE_EAST,
  ACTION_RESIZE_SOUTH,
  ACTION_RESIZE_WEST,
  ACTION_RESIZE_NORTHEAST,
  ACTION_RESIZE_NORTHWEST,
  ACTION_RESIZE_SOUTHEAST,
  ACTION_RESIZE_SOUTHWEST,
} from '@cropper/helper-constants';
import CropperSelection from '../src';

CropperSelection.$define();

describe('CropperSelection', () => {
  describe('properties', () => {
    describe('x', () => {
      it('should be `0` by default', () => {
        const element = new CropperSelection();

        expect(element.x).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperSelection();

        element.setAttribute('x', '1');
        expect(element.x).toBe(1);
      });
    });

    describe('y', () => {
      it('should be `0` by default', () => {
        const element = new CropperSelection();

        expect(element.y).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperSelection();

        element.setAttribute('y', '1');
        expect(element.y).toBe(1);
      });
    });

    describe('width', () => {
      it('should be `0` by default', () => {
        const element = new CropperSelection();

        expect(element.width).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperSelection();

        element.setAttribute('width', '1');
        expect(element.width).toBe(1);
      });
    });

    describe('height', () => {
      it('should be `0` by default', () => {
        const element = new CropperSelection();

        expect(element.height).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperSelection();

        element.setAttribute('height', '1');
        expect(element.height).toBe(1);
      });
    });

    describe('aspectRatio', () => {
      it('should be `NaN` by default', () => {
        const element = new CropperSelection();

        expect(element.aspectRatio).toBeNaN();
      });

      it('should be `1`', () => {
        const element = new CropperSelection();

        element.setAttribute('aspect-ratio', '1');
        expect(element.aspectRatio).toBe(1);
      });
    });

    describe('initialAspectRatio', () => {
      it('should be `NaN` by default', () => {
        const element = new CropperSelection();

        expect(element.initialAspectRatio).toBeNaN();
      });

      it('should be `1`', () => {
        const element = new CropperSelection();

        element.setAttribute('initial-aspect-ratio', '1');
        expect(element.initialAspectRatio).toBe(1);
      });
    });

    describe('autoSelect', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.autoSelect).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('auto-select', '');
        expect(element.autoSelect).toBe(true);
      });
    });

    describe('autoSelectArea', () => {
      it('should be `1` by default', () => {
        const element = new CropperSelection();

        expect(element.autoSelectArea).toBe(1);
      });

      it('should be `0.5`', () => {
        const element = new CropperSelection();

        element.setAttribute('auto-select-area', '0.5');
        expect(element.autoSelectArea).toBe(0.5);
      });
    });

    describe('movable', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.movable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('movable', '');
        expect(element.movable).toBe(true);
      });
    });

    describe('resizable', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.resizable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('resizable', '');
        expect(element.resizable).toBe(true);
      });
    });

    describe('zoomable', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.zoomable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('zoomable', '');
        expect(element.zoomable).toBe(true);
      });
    });

    describe('outlined', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.outlined).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('outlined', '');
        expect(element.outlined).toBe(true);
      });
    });

    describe('precision', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.precision).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('precision', '');
        expect(element.precision).toBe(true);
      });
    });
  });

  describe('methods', () => {
    describe('$move', () => {
      it('should move the selection', () => {
        const element = new CropperSelection();

        element.movable = true;
        element.$move(1, 2);
        expect(element.x).toBe(1);
        expect(element.y).toBe(2);
      });

      it('should default to the first parameter for the second parameter', () => {
        const element = new CropperSelection();

        element.movable = true;
        element.$move(1);
        expect(element.x).toBe(1);
        expect(element.y).toBe(1);
      });
    });

    describe('$moveTo', () => {
      it('should the selection to a specific position', () => {
        const element = new CropperSelection();

        element.movable = true;
        element.$moveTo(1, 2);
        expect(element.x).toBe(1);
        expect(element.y).toBe(2);
      });

      it('should default to the first parameter for the second parameter', () => {
        const element = new CropperSelection();

        element.movable = true;
        element.$moveTo(1);
        expect(element.x).toBe(1);
        expect(element.y).toBe(1);
      });
    });

    describe('$resize', () => {
      describe(ACTION_RESIZE_NORTH, () => {
        it('should resize the north side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_NORTH, 0, -1);
          expect(element.y).toBe(-1);
          expect(element.height).toBe(1);
          element.$resize(ACTION_RESIZE_NORTH, 0, 1);
          expect(element.y).toBe(0);
          expect(element.height).toBe(0);
        });

        it('should resize the south side when the height is `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_NORTH, 0, 1);
          expect(element.y).toBe(0);
          expect(element.height).toBe(1);
        });

        it('should resize the east and west sides as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_NORTH, 0, -1);
          expect(element.x).toBe(-0.5);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_EAST, () => {
        it('should resize the east side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_EAST, 1, 0);
          expect(element.x).toBe(0);
          expect(element.width).toBe(1);
          element.$resize(ACTION_RESIZE_EAST, -1, 0);
          expect(element.x).toBe(0);
          expect(element.width).toBe(0);
        });

        it('should resize the west side when the width is `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_EAST, -1, 0);
          expect(element.x).toBe(-1);
          expect(element.width).toBe(1);
        });

        it('should resize the south and north sides as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_EAST, 1, 0);
          expect(element.x).toBe(0);
          expect(element.y).toBe(-0.5);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_SOUTH, () => {
        it('should resize the south side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_SOUTH, 0, 1);
          expect(element.y).toBe(0);
          expect(element.height).toBe(1);
          element.$resize(ACTION_RESIZE_SOUTH, 0, -1);
          expect(element.y).toBe(0);
          expect(element.height).toBe(0);
        });

        it('should resize the north side when the height is `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_SOUTH, 0, -1);
          expect(element.y).toBe(-1);
          expect(element.height).toBe(1);
        });

        it('should resize the east and west sides as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_SOUTH, 0, 1);
          expect(element.x).toBe(-0.5);
          expect(element.y).toBe(0);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_WEST, () => {
        it('should resize the west side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_WEST, -1, 0);
          expect(element.x).toBe(-1);
          expect(element.width).toBe(1);
          element.$resize(ACTION_RESIZE_WEST, 1, 0);
          expect(element.x).toBe(0);
          expect(element.width).toBe(0);
        });

        it('should resize the east side when the width is `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_WEST, 1, 0);
          expect(element.x).toBe(0);
          expect(element.width).toBe(1);
        });

        it('should resize the south and north sides as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_WEST, -1, 0);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(-0.5);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_NORTHEAST, () => {
        it('should resize the northeast side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_NORTHEAST, 1, -1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
          element.$resize(ACTION_RESIZE_NORTHEAST, -1, 1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.width).toBe(0);
          expect(element.height).toBe(0);
        });

        it('should resize the southwest side when the width and height are `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_NORTHEAST, -1, 1);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(0);
          expect(element.height).toBe(1);
          expect(element.height).toBe(1);
        });

        it('should resize the north side as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_NORTHEAST, 1, 0);
          expect(element.x).toBe(0);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_NORTHWEST, () => {
        it('should resize the northwest side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_NORTHWEST, -1, -1);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
          element.$resize(ACTION_RESIZE_NORTHWEST, 1, 1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.width).toBe(0);
          expect(element.height).toBe(0);
        });

        it('should resize the southeast side when the width and height are `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_NORTHWEST, 1, 1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.height).toBe(1);
          expect(element.height).toBe(1);
        });

        it('should resize the north side as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_NORTHWEST, -1, 0);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_SOUTHEAST, () => {
        it('should resize the southeast side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_SOUTHEAST, 1, 1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
          element.$resize(ACTION_RESIZE_SOUTHEAST, -1, -1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.width).toBe(0);
          expect(element.height).toBe(0);
        });

        it('should resize the northwest side when the width and height are `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_SOUTHEAST, -1, -1);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(-1);
          expect(element.height).toBe(1);
          expect(element.height).toBe(1);
        });

        it('should resize the south side as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_SOUTHEAST, 1, 0);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });

      describe(ACTION_RESIZE_SOUTHWEST, () => {
        it('should resize the southwest side', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_SOUTHWEST, -1, 1);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(0);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
          element.$resize(ACTION_RESIZE_SOUTHWEST, 1, -1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(0);
          expect(element.width).toBe(0);
          expect(element.height).toBe(0);
        });

        it('should resize the northeast side when the width and height are `0`', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.$resize(ACTION_RESIZE_SOUTHWEST, 1, -1);
          expect(element.x).toBe(0);
          expect(element.y).toBe(-1);
          expect(element.height).toBe(1);
          expect(element.height).toBe(1);
        });

        it('should resize the south side as well when the aspect ratio is set', () => {
          const element = new CropperSelection();

          element.resizable = true;
          element.aspectRatio = 1;
          element.$resize(ACTION_RESIZE_SOUTHWEST, -1, 0);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(0);
          expect(element.width).toBe(1);
          expect(element.height).toBe(1);
        });
      });
    });

    describe('$zoom', () => {
      it('should zoom in the selection', () => {
        const element = new CropperSelection();

        element.zoomable = true;
        element.width = 1;
        element.height = 1;
        element.$zoom(1);
        expect(element.width).toBe(2);
        expect(element.height).toBe(2);
      });

      it('should zoom out the selection', () => {
        const element = new CropperSelection();

        element.zoomable = true;
        element.width = 2;
        element.height = 2;
        element.$zoom(-1);
        expect(element.width).toBe(1);
        expect(element.height).toBe(1);
      });
    });

    describe('$zoomTo', () => {
      it('should zoom the selection to a specific factor', () => {
        const element = new CropperSelection();

        element.zoomable = true;
        element.width = 1;
        element.height = 1;
        element.$zoomTo(3);
        expect(element.x).toBe(-1);
        expect(element.y).toBe(-1);
        expect(element.width).toBe(3);
        expect(element.height).toBe(3);
      });

      it('should zoom the selection bases on the specific origin', () => {
        const element = new CropperSelection();

        element.zoomable = true;
        element.width = 1;
        element.height = 1;
        element.$zoomTo(3, 1, 1);
        expect(element.x).toBe(-2);
        expect(element.y).toBe(-2);
        expect(element.width).toBe(3);
        expect(element.height).toBe(3);
      });
    });

    describe('$change', () => {
      it('should change the position', () => {
        const element = new CropperSelection();

        element.$change(1, 1);
        expect(element.x).toBe(1);
        expect(element.y).toBe(1);
        expect(element.width).toBe(0);
        expect(element.height).toBe(0);
      });

      it('should change the size', () => {
        const element = new CropperSelection();

        element.$change(0, 0, 1, 1);
        expect(element.width).toBe(1);
        expect(element.height).toBe(1);
      });

      it('should adjust the width and height parameters when the aspect ratio is passed', () => {
        const element = new CropperSelection();

        element.$change(0, 0, 1, 2, 1);
        expect(element.width).toBe(2);
        expect(element.height).toBe(2);
      });
    });

    describe('$reset', () => {
      it('should reset the selection to its initial position and size', () => {
        const element = new CropperSelection();

        element.$change(1, 1, 1, 1);
        element.$reset();
        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
        expect(element.width).toBe(0);
        expect(element.height).toBe(0);
      });
    });

    describe('$render', () => {
      it('should refresh the position or size of the selection', () => {
        const element = new CropperSelection();

        element.x = 1;
        element.y = 1;
        element.width = 1;
        element.height = 1;
        expect(element.style.left).toBe('');
        expect(element.style.top).toBe('');
        expect(element.style.width).toBe('');
        expect(element.style.height).toBe('');
        element.$render();
        expect(element.style.left).toBe('1px');
        expect(element.style.top).toBe('1px');
        expect(element.style.width).toBe('1px');
        expect(element.style.height).toBe('1px');
      });
    });

    describe('$toCanvas', () => {
      it('should return a promise that resolves the generated canvas element', (done) => {
        const element = new CropperSelection();

        document.body.appendChild(element);

        const promise = element.$toCanvas();

        expect(promise).toBeInstanceOf(Promise);
        promise.then((canvas) => {
          expect(canvas).toBeInstanceOf(HTMLCanvasElement);
          done();
        });
      });

      it('should throw error when it is not connected to the DOM', (done) => {
        const element = new CropperSelection();

        element.$toCanvas().catch((error) => {
          expect(error.message).toBe('The current element is not connected to the DOM.');
          done();
        });
      });
    });
  });
});
