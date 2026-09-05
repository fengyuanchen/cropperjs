import {
  ACTION_MOVE,
  ACTION_SCALE,
  ATTRIBUTE_ACTION,
  EVENT_ACTION,
  EVENT_ACTION_END,
  EVENT_ACTION_MOVE,
  EVENT_ACTION_START,
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_WHEEL,
  HAS_POINTER_EVENT,
  IS_TOUCH_DEVICE,
} from '@cropper/utils';
import CropperCanvas from '../src';

CropperCanvas.$define();

describe('CropperCanvas', () => {
  describe('properties', () => {
    describe('background', () => {
      it('should be `false` by default', () => {
        const element = new CropperCanvas();

        expect(element.background).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperCanvas();

        element.setAttribute('background', '');
        expect(element.background).toBe(true);
      });
    });

    describe('disabled', () => {
      it('should be `false` by default', () => {
        const element = new CropperCanvas();

        expect(element.disabled).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperCanvas();

        element.setAttribute('disabled', '');
        expect(element.disabled).toBe(true);
      });
    });

    describe('scaleStep', () => {
      it('should be `0.1` by default', () => {
        const element = new CropperCanvas();

        expect(element.scaleStep).toBe(0.1);
      });

      it('should be `0.2`', () => {
        const element = new CropperCanvas();

        element.setAttribute('scale-step', '0.2');
        expect(element.scaleStep).toBe(0.2);
      });
    });

    describe('themeColor', () => {
      it('should be `"#39f"` by default', () => {
        const element = new CropperCanvas();

        expect(element.themeColor).toBe('#39f');
      });

      it('should be "#000"', () => {
        const element = new CropperCanvas();

        element.setAttribute('theme-color', '#000');
        expect(element.themeColor).toBe('#000');
      });
    });
  });

  describe('events', () => {
    const TouchEvent = IS_TOUCH_DEVICE ? window.TouchEvent : window.MouseEvent;
    const PointerEvent = HAS_POINTER_EVENT ? window.PointerEvent : TouchEvent;
    const pointerEventOptions = {
      bubbles: true,
      cancelable: true,
      composed: true,
      button: 0,
      buttons: 1,
    };
    const wheelEventOptions = {
      deltaY: 1,
    };
    const createPointerEvent = (type: string, pageX: number, pageY: number) => {
      const event = new PointerEvent(type, pointerEventOptions);

      Object.defineProperties(event, {
        pageX: { configurable: true, value: pageX },
        pageY: { configurable: true, value: pageY },
      });

      return event;
    };
    const createTouchEvent = (type: string, touches: Array<{
      identifier: number;
      pageX: number;
      pageY: number;
    }>) => {
      const event = new Event(type, pointerEventOptions);

      Object.defineProperty(event, 'changedTouches', {
        configurable: true,
        value: touches,
      });

      return event;
    };

    describe(EVENT_ACTION, () => {
      it('should trigger the `action` event', (done) => {
        const element = new CropperCanvas();

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          expect(event.type).toBe(EVENT_ACTION);
          done();
        });
        element.dispatchEvent(new WheelEvent(EVENT_WHEEL, wheelEventOptions));
      });

      it('should have expected properties in `event.detail`', (done) => {
        const element = new CropperCanvas();

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe(ACTION_SCALE);
          expect(detail.scale).toBeLessThan(0);
          expect(detail.relatedEvent).toBeInstanceOf(WheelEvent);
          done();
        });
        element.dispatchEvent(new WheelEvent(EVENT_WHEEL, wheelEventOptions));
      });

      it('should emit a rotate action for a rotate target', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, 'rotate');
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe('rotate');
          expect(detail.relatedEvent).toBeInstanceOf(PointerEvent);
          expect(detail.startX).toBe(10);
          expect(detail.startY).toBe(20);
          expect(detail.endX).toBe(30);
          expect(detail.endY).toBe(45);
          done();
        });
        element.dispatchEvent(createPointerEvent(EVENT_POINTER_DOWN, 10, 20));
        element.dispatchEvent(createPointerEvent(EVENT_POINTER_MOVE, 30, 45));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should emit a scale action for a scale target', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, 'scale');
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe('scale');
          expect(detail.relatedEvent).toBeInstanceOf(PointerEvent);
          expect(detail.startX).toBe(10);
          expect(detail.startY).toBe(20);
          expect(detail.endX).toBe(30);
          expect(detail.endY).toBe(45);
          done();
        });
        element.dispatchEvent(createPointerEvent(EVENT_POINTER_DOWN, 10, 20));
        element.dispatchEvent(createPointerEvent(EVENT_POINTER_MOVE, 30, 45));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should emit a rotate action for a two-finger touch gesture', (done) => {
        const element = new CropperCanvas();
        const firstTouch = { identifier: 1, pageX: 0, pageY: 0 };
        const secondTouch = { identifier: 2, pageX: 10, pageY: 0 };

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe('rotate');
          expect(detail.rotate).toBeCloseTo(Math.PI / 2);
          expect(detail.scale).toBeUndefined();
          expect(detail.relatedEvent.type).toBe(EVENT_POINTER_MOVE);
          document.body.removeChild(element);
          done();
        });
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_DOWN, [firstTouch]));
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_DOWN, [secondTouch]));
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_MOVE, [
          firstTouch,
          { identifier: 2, pageX: 0, pageY: 10 },
        ]));
      });

      it('should emit a transform action with rotate and scale for a two-finger gesture', (done) => {
        const element = new CropperCanvas();
        const firstTouch = { identifier: 1, pageX: 0, pageY: 0 };
        const secondTouch = { identifier: 2, pageX: 10, pageY: 0 };

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe('transform');
          expect(detail.rotate).toBeCloseTo(Math.PI / 2);
          expect(detail.scale).toBe(1);
          expect(detail.relatedEvent.type).toBe(EVENT_POINTER_MOVE);
          document.body.removeChild(element);
          done();
        });
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_DOWN, [firstTouch]));
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_DOWN, [secondTouch]));
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_MOVE, [
          firstTouch,
          { identifier: 2, pageX: 0, pageY: 20 },
        ]));
      });

      it('should emit a scale action for a two-finger touch gesture', (done) => {
        const element = new CropperCanvas();
        const firstTouch = { identifier: 1, pageX: 0, pageY: 0 };
        const secondTouch = { identifier: 2, pageX: 10, pageY: 0 };

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe('scale');
          expect(detail.scale).toBe(1);
          expect(detail.rotate).toBeUndefined();
          expect(detail.relatedEvent.type).toBe(EVENT_POINTER_MOVE);
          document.body.removeChild(element);
          done();
        });
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_DOWN, [firstTouch]));
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_DOWN, [secondTouch]));
        element.dispatchEvent(createTouchEvent(EVENT_POINTER_MOVE, [
          firstTouch,
          { identifier: 2, pageX: 20, pageY: 0 },
        ]));
      });
    });

    describe(EVENT_ACTION_START, () => {
      it('should trigger the `actionstart` event', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_START, (event: Event) => {
          expect(event.type).toBe(EVENT_ACTION_START);
          done();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should have expected properties in `event.detail`', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_START, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe(ACTION_MOVE);
          expect(detail.relatedEvent).toBeInstanceOf(PointerEvent);
          done();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should clear the pointer when the event is canceled', () => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_START, (event) => {
          event.preventDefault();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));

        expect((element as any).$pointers.size).toBe(0);
      });

      it('should use `none` when the target has no action', () => {
        const element = new CropperCanvas();
        const actions: string[] = [];

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_START, (event) => {
          actions.push((event as CustomEvent).detail.action);
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));

        expect(actions).toEqual(['none']);
      });
    });

    describe(EVENT_ACTION_MOVE, () => {
      it('should trigger the `actionmove` event', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_MOVE, (event: Event) => {
          expect(event.type).toBe(EVENT_ACTION_MOVE);
          done();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_MOVE, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should have expected properties in `event.detail`', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_MOVE, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe(ACTION_MOVE);
          expect(detail.relatedEvent).toBeInstanceOf(PointerEvent);
          done();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_MOVE, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should clear the pointer when the event is canceled', () => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_END, (event) => {
          event.preventDefault();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));

        expect((element as any).$pointers.size).toBe(0);
      });

      it('should not trigger for a target with no action', () => {
        const element = new CropperCanvas();
        const listener = jest.fn();

        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_MOVE, listener);
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_MOVE, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));

        expect(listener).not.toHaveBeenCalled();
      });
    });

    describe(EVENT_ACTION_END, () => {
      it('should trigger the `actionend` event', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_END, (event: Event) => {
          expect(event.type).toBe(EVENT_ACTION_END);
          done();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should have expected properties in `event.detail`', (done) => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.addEventListener(EVENT_ACTION_END, (event: Event) => {
          const { detail } = event as CustomEvent;

          expect(detail.action).toBe(ACTION_MOVE);
          expect(detail.relatedEvent).toBeInstanceOf(PointerEvent);
          done();
        });
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_UP, pointerEventOptions));
      });

      it('should clear the pointer when disabled during an action', () => {
        const element = new CropperCanvas();

        element.setAttribute(ATTRIBUTE_ACTION, ACTION_MOVE);
        document.body.appendChild(element);
        element.dispatchEvent(new PointerEvent(EVENT_POINTER_DOWN, pointerEventOptions));
        element.disabled = true;

        expect((element as any).$pointers.size).toBe(0);
        expect((element as any).$action).toBe('none');
      });
    });
  });

  describe('methods', () => {
    describe('$toCanvas', () => {
      it('should return a promise that resolves the generated canvas element', (done) => {
        const element = new CropperCanvas();

        document.body.appendChild(element);

        const promise = element.$toCanvas();

        expect(promise).toBeInstanceOf(Promise);
        promise.then((canvas) => {
          expect(canvas).toBeInstanceOf(HTMLCanvasElement);
          done();
        });
      });

      it('should throw error when it is not connected to the DOM', (done) => {
        const element = new CropperCanvas();

        element.$toCanvas().catch((error) => {
          expect(error.message).toBe('The current element is not connected to the DOM.');
          done();
        });
      });

      it('should honor output dimensions when no image is present', async () => {
        const element = new CropperCanvas();

        Object.defineProperty(element, 'offsetWidth', { configurable: true, value: 400 });
        Object.defineProperty(element, 'offsetHeight', { configurable: true, value: 200 });
        document.body.appendChild(element);

        const canvas = await element.$toCanvas({ width: 200 });

        expect(canvas.width).toBe(200);
        expect(canvas.height).toBe(100);
        document.body.removeChild(element);
      });
    });
  });
});
