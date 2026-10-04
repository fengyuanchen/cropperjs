import {
  ACTION_RESIZE_EAST,
  ACTION_RESIZE_NORTH,
  ACTION_RESIZE_NORTHEAST,
  ACTION_RESIZE_NORTHWEST,
  ACTION_RESIZE_SOUTH,
  ACTION_RESIZE_SOUTHEAST,
  ACTION_RESIZE_SOUTHWEST,
  ACTION_RESIZE_WEST,
  ACTION_SCALE,
  ACTION_SELECT,
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

    describe('resizeAroundCenter', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.resizeAroundCenter).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('resize-around-center', '');
        expect(element.resizeAroundCenter).toBe(true);
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

    describe('zoomAroundCenter', () => {
      it('should be `false` by default', () => {
        const element = new CropperSelection();

        expect(element.zoomAroundCenter).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperSelection();

        element.setAttribute('zoom-around-center', '');
        expect(element.zoomAroundCenter).toBe(true);
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

      it('should keep the center when resizing around it', () => {
        const element = new CropperSelection();

        element.x = 10;
        element.y = 20;
        element.width = 100;
        element.height = 50;
        element.resizable = true;
        element.resizeAroundCenter = true;
        for (let count = 0; count < 3; count += 1) {
          element.$resize(ACTION_RESIZE_SOUTHEAST, 1, 1);

          expect(Number.isInteger(element.x)).toBe(true);
          expect(Number.isInteger(element.y)).toBe(true);
          expect(element.x + element.width / 2).toBe(60);
          expect(element.y + element.height / 2).toBe(45);
        }
      });

      it('should preserve precise dimensions when resizing around the center', () => {
        const element = new CropperSelection();

        element.x = 10;
        element.y = 20;
        element.width = 100;
        element.height = 50;
        element.resizable = true;
        element.resizeAroundCenter = true;
        element.precise = true;
        element.$resize(ACTION_RESIZE_EAST, 0.5, 0);

        expect(element.width).toBe(100.5);
        expect(element.x + element.width / 2).toBe(60);
        expect(element.y + element.height / 2).toBe(45);
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

      it('should honor an explicit origin when zoomAroundCenter is enabled', () => {
        const element = new CropperSelection();

        element.x = 10;
        element.y = 20;
        element.width = 100;
        element.height = 50;
        element.zoomable = true;
        element.zoomAroundCenter = true;
        element.precise = true;
        element.$zoom(0.1, 10, 20);

        expect(element.x).toBe(10);
        expect(element.y).toBe(20);
      });
    });

    describe('$handleAction', () => {
      it('should place a fixed-size selection at the action start when not resizable', () => {
        const element = new CropperSelection();
        const canvas = document.createElement('div');
        const relatedEvent = {
          target: document.createElement('cropper-handle'),
          pageX: 150,
          pageY: 140,
          shiftKey: false,
        };

        Object.defineProperty(canvas, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({ left: 10, top: 20 }),
        });
        element.x = 1;
        element.y = 2;
        element.width = 100;
        element.height = 80;
        element.resizable = false;

        (element as any).$handleActionStart({
          defaultPrevented: false,
          currentTarget: canvas,
          detail: {
            action: ACTION_SELECT,
            relatedEvent,
          },
        });
        (element as any).$handleAction({
          defaultPrevented: false,
          currentTarget: canvas,
          detail: {
            action: ACTION_SELECT,
            startX: relatedEvent.pageX,
            startY: relatedEvent.pageY,
            endX: relatedEvent.pageX + 20,
            endY: relatedEvent.pageY + 10,
            relatedEvent,
          },
        });

        expect(element.x).toBe(140);
        expect(element.y).toBe(120);
        expect(element.width).toBe(100);
        expect(element.height).toBe(80);
      });

      it('should restore the original dimensions after fractional resize deltas return to the start', () => {
        const element = new CropperSelection();
        const canvas = document.createElement('div');
        const relatedEvent = {
          target: document.createElement('cropper-handle'),
          pageX: 200.25,
          pageY: 150.5,
          shiftKey: false,
        };
        const pointerPositions = [200.85, 201.45, 201.05, 200.25];
        let previousX = relatedEvent.pageX;

        element.x = 100;
        element.y = 80;
        element.width = 120;
        element.height = 60;
        element.resizable = true;

        (element as any).$handleActionStart({
          defaultPrevented: false,
          detail: {
            action: ACTION_RESIZE_SOUTHEAST,
            relatedEvent,
          },
        });

        pointerPositions.forEach((pageX) => {
          (element as any).$handleAction({
            defaultPrevented: false,
            currentTarget: canvas,
            detail: {
              action: ACTION_RESIZE_SOUTHEAST,
              startX: previousX,
              startY: relatedEvent.pageY,
              endX: pageX,
              endY: relatedEvent.pageY,
              relatedEvent,
            },
          });
          previousX = pageX;
        });

        expect(element.x).toBe(100);
        expect(element.y).toBe(80);
        expect(element.width).toBe(120);
        expect(element.height).toBe(60);
      });

      it('should zoom around the selection center when enabled', () => {
        const element = new CropperSelection();
        const relatedEvent = new MouseEvent('mousemove', {
          clientX: 10,
          clientY: 20,
        });

        element.x = 10;
        element.y = 20;
        element.width = 100;
        element.height = 50;
        element.zoomable = true;
        element.zoomAroundCenter = true;
        element.dynamic = true;

        for (let count = 0; count < 3; count += 1) {
          (element as any).$handleAction({
            defaultPrevented: false,
            currentTarget: document.createElement('div'),
            detail: {
              action: ACTION_SCALE,
              relatedEvent,
              scale: 0.1,
            },
          });

          expect(Number.isInteger(element.x)).toBe(true);
          expect(Number.isInteger(element.y)).toBe(true);
          expect(element.x + element.width / 2).toBe(60);
          expect(element.y + element.height / 2).toBe(45);
        }
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

    describe('$initSelection', () => {
      it('should preserve explicit dimensions when initial coverage is first set', async () => {
        const parent = document.createElement('div');
        const element = new CropperSelection();

        Object.defineProperty(parent, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            left: 0, top: 0, width: 400, height: 300,
          }),
        });
        element.width = 160;
        element.height = 90;
        parent.appendChild(element);
        document.body.appendChild(parent);

        element.setAttribute('initial-coverage', '0.5');
        await Promise.resolve();

        expect(element.x).toBe(120);
        expect(element.y).toBe(105);
        expect(element.width).toBe(160);
        expect(element.height).toBe(90);

        element.setAttribute('initial-coverage', '0.75');
        await Promise.resolve();

        expect(element.width).toBe(300);
        expect(element.height).toBe(225);
        document.body.removeChild(parent);
      });

      it('should wait for the image to be ready before calculating the initial coverage', async () => {
        const canvas = document.createElement('div');
        const image = document.createElement('div');
        const element = new CropperSelection();
        let resolveReady: () => void;

        Object.defineProperty(canvas, 'offsetWidth', { configurable: true, value: 400 });
        Object.defineProperty(canvas, 'offsetHeight', { configurable: true, value: 300 });
        Object.defineProperty(canvas, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            left: 100, top: 200, width: 400, height: 300,
          }),
        });
        Object.defineProperty(image, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            left: 150, top: 240, width: 200, height: 100,
          }),
        });
        (image as any).$ready = () => new Promise<void>((resolve) => {
          resolveReady = resolve;
        });
        canvas.appendChild(element);
        (element as any).$canvas = canvas;
        (element as any).$image = image;
        element.initialCoverage = 1;

        const initialized = (element as any).$initSelection(true);

        expect(element.width).toBe(0);
        resolveReady!();
        await initialized;

        expect(element.x).toBe(50);
        expect(element.y).toBe(40);
        expect(element.width).toBe(200);
        expect(element.height).toBe(100);
      });

      it('should fall back to the canvas when no image is available', () => {
        const canvas = document.createElement('div');
        const element = new CropperSelection();

        Object.defineProperty(canvas, 'offsetWidth', { configurable: true, value: 400 });
        Object.defineProperty(canvas, 'offsetHeight', { configurable: true, value: 300 });
        Object.defineProperty(canvas, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            left: 100, top: 200, width: 400, height: 300,
          }),
        });
        canvas.appendChild(element);
        (element as any).$canvas = canvas;
        element.initialCoverage = 1;

        (element as any).$initSelection(true);

        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
        expect(element.width).toBe(400);
        expect(element.height).toBe(300);
      });

      it('should fall back to the parent element when no image or canvas is available', () => {
        const parent = document.createElement('div');
        const element = new CropperSelection();

        Object.defineProperty(parent, 'offsetWidth', { configurable: true, value: 500 });
        Object.defineProperty(parent, 'offsetHeight', { configurable: true, value: 250 });
        Object.defineProperty(parent, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            left: 100, top: 200, width: 500, height: 250,
          }),
        });
        parent.appendChild(element);
        element.initialCoverage = 1;

        (element as any).$initSelection(true);

        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
        expect(element.width).toBe(500);
        expect(element.height).toBe(250);
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
