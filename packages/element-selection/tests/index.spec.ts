import {
  ACTION_RESIZE_EAST,
  ACTION_RESIZE_NORTH,
  ACTION_RESIZE_NORTHEAST,
  ACTION_RESIZE_NORTHWEST,
  ACTION_RESIZE_SOUTH,
  ACTION_RESIZE_SOUTHEAST,
  ACTION_RESIZE_SOUTHWEST,
  ACTION_RESIZE_WEST,
  EVENT_KEYDOWN,
} from '@cropper/utils';
import CropperCanvas from '@cropper/element-canvas';
import CropperSelection from '../src';

CropperCanvas.$define();
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

    describe('initialCoverage', () => {
      it('should be `NaN` by default', () => {
        const element = new CropperSelection();

        expect(element.initialCoverage).toBeNaN();
      });

      it('should be `0.5`', () => {
        const element = new CropperSelection();

        element.setAttribute('initial-coverage', '0.5');
        expect(element.initialCoverage).toBe(0.5);
      });
    });

    describe('dynamic', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.dynamic).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('dynamic', '');
        expect(element.dynamic).toBe(true);
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

    describe('keyboard', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.keyboard).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('keyboard', '');
        expect(element.keyboard).toBe(true);
      });

      const createKeyboardSelection = async () => {
        const canvas = new CropperCanvas();
        const selection = new CropperSelection();

        selection.keyboard = true;
        selection.movable = true;
        selection.zoomable = true;
        selection.x = 10;
        selection.y = 20;
        selection.width = 100;
        selection.height = 50;
        canvas.appendChild(selection);
        document.body.appendChild(canvas);
        await new Promise((resolve) => {
          setTimeout(resolve, 0);
        });

        return { canvas, selection };
      };

      it('should remove the active selection with Delete', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: 'Delete' }));

        expect(selection.hidden).toBe(true);
        document.body.removeChild(canvas);
      });

      it('should remove the active selection with Command + Backspace', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, {
          key: 'Backspace',
          metaKey: true,
        }));

        expect(selection.hidden).toBe(true);
        document.body.removeChild(canvas);
      });

      it('should move the active selection left by one pixel', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: 'ArrowLeft' }));

        expect(selection.x).toBe(9);
        expect(selection.y).toBe(20);
        document.body.removeChild(canvas);
      });

      it('should move the active selection right by one pixel', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: 'ArrowRight' }));

        expect(selection.x).toBe(11);
        expect(selection.y).toBe(20);
        document.body.removeChild(canvas);
      });

      it('should move the active selection up by one pixel', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: 'ArrowUp' }));

        expect(selection.x).toBe(10);
        expect(selection.y).toBe(19);
        document.body.removeChild(canvas);
      });

      it('should move the active selection down by one pixel', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: 'ArrowDown' }));

        expect(selection.x).toBe(10);
        expect(selection.y).toBe(21);
        document.body.removeChild(canvas);
      });

      it('should zoom the active selection in and out by ten percent', async () => {
        const { canvas, selection } = await createKeyboardSelection();

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: '+' }));
        expect(selection.width).toBe(110);
        expect(selection.height).toBe(55);

        document.dispatchEvent(new KeyboardEvent(EVENT_KEYDOWN, { key: '-' }));
        expect(selection.width).toBeCloseTo(100);
        expect(selection.height).toBeCloseTo(50);
        document.body.removeChild(canvas);
      });

      afterEach(() => {
        document.activeElement?.dispatchEvent(new Event('blur'));
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

    describe('precise', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.precise).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('precise', '');
        expect(element.precise).toBe(true);
      });
    });
  });

  describe('methods', () => {
    describe('$move', () => {
      it('should move the selection', () => {
        const element = new CropperSelection();

        element.$move(1, 2);
        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
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

        element.$moveTo(1, 2);
        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
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
      it('should not resize when the selection is not resizable', () => {
        const element = new CropperSelection();

        element.$resize(ACTION_RESIZE_EAST, 1, 2);
        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
        expect(element.width).toBe(0);
        expect(element.height).toBe(0);
      });

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
          element.$resize(ACTION_RESIZE_NORTH, 0, -2);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(-2);
          expect(element.width).toBe(2);
          expect(element.height).toBe(2);
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
          element.$resize(ACTION_RESIZE_EAST, 2, 0);
          expect(element.x).toBe(0);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(2);
          expect(element.height).toBe(2);
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
          element.$resize(ACTION_RESIZE_SOUTH, 0, 2);
          expect(element.x).toBe(-1);
          expect(element.y).toBe(0);
          expect(element.width).toBe(2);
          expect(element.height).toBe(2);
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
          element.$resize(ACTION_RESIZE_WEST, -2, 0);
          expect(element.x).toBe(-2);
          expect(element.y).toBe(-1);
          expect(element.width).toBe(2);
          expect(element.height).toBe(2);
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

        element.$zoom(1);
        expect(element.width).toBe(0);
        expect(element.height).toBe(0);
        element.zoomable = true;
        element.width = 1;
        element.height = 1;
        element.$zoom(1);
        expect(element.width).toBe(2);
        expect(element.height).toBe(2);
      });

      it('should zoom out the selection', () => {
        const element = new CropperSelection();

        element.$zoom(-1);
        expect(element.width).toBe(0);
        expect(element.height).toBe(0);
        element.zoomable = true;
        element.width = 2;
        element.height = 2;
        element.$zoom(-1);
        expect(element.width).toBe(1);
        expect(element.height).toBe(1);
      });
    });

    describe('$center', () => {
      it('should return itself when it has no parent element', () => {
        const element = new CropperSelection();

        expect(element.$center()).toBe(element);
      });

      it('should center the selection in its parent element', () => {
        const parent = document.createElement('div');
        const element = new CropperSelection();

        Object.defineProperty(parent, 'offsetWidth', { configurable: true, value: 100 });
        Object.defineProperty(parent, 'offsetHeight', { configurable: true, value: 80 });
        element.width = 20;
        element.height = 10;
        element.movable = true;
        parent.appendChild(element);
        element.$center();

        expect(element.x).toBe(40);
        expect(element.y).toBe(35);
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

      it('should reject invalid and prevented changes', () => {
        const element = new CropperSelection();
        const listener = jest.fn((event: Event) => event.preventDefault());

        element.addEventListener('change', listener);
        element.$change(1, 2, -1, 4);
        expect(element.x).toBe(0);
        element.$change(1, 2, 3, 4);
        expect(element.x).toBe(0);
        expect(listener).toHaveBeenCalled();
      });

      it('should clear and restore the selection', () => {
        const element = new CropperSelection();

        element.$change(1, 2, 3, 4);
        element.$clear();
        expect(element.hidden).toBe(true);
        element.$change(5, 6, 7, 8);
        expect(element.hidden).toBe(false);
        expect(element.width).toBe(7);
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
        expect(element.style.transform).toBe('');
        expect(element.style.width).toBe('');
        expect(element.style.height).toBe('');
        element.$render();
        expect(element.style.transform).toBe('translate(1px, 1px)');
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
