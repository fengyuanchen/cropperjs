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
          expect(detail.scale).toBeGreaterThan(0);
          expect(detail.relatedEvent).toBeInstanceOf(WheelEvent);
          done();
        });
        element.dispatchEvent(new WheelEvent(EVENT_WHEEL, wheelEventOptions));
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
    });
  });
});
