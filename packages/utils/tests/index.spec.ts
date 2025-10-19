import {
  emit,
  getAdjustedSizes,
  getOffset,
  isElement,
  getComposedPathTarget,
  isFunction,
  isNaN,
  isNumber,
  isObject,
  isPlainObject,
  isPositiveNumber,
  isString,
  isUndefined,
  multiplyMatrices,
  off,
  on,
  once,
  toAngleInRadian,
  toCamelCase,
  toKebabCase,
} from '../src';

describe('Utilities', () => {
  describe('isString', () => {
    it('should be `true` for `""`', () => {
      expect(isString('')).toBe(true);
    });

    it('should be `false` for `0`', () => {
      expect(isString(0)).toBe(false);
    });
  });

  describe('isNaN', () => {
    it('should be `true` for `NaN`', () => {
      expect(isNaN(NaN)).toBe(true);
    });

    it('should be `false` for `0`', () => {
      expect(isNaN(0)).toBe(false);
    });

    it('should be `false` for `"0"`', () => {
      expect(isNaN('0')).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should be `true` for `0`', () => {
      expect(isNumber(0)).toBe(true);
    });

    it('should be `true` for `Infinity`', () => {
      expect(isNumber(Infinity)).toBe(true);
    });

    it('should be `true` for `-Infinity`', () => {
      expect(isNumber(-Infinity)).toBe(true);
    });

    it('should be `true` for `NaN`', () => {
      expect(isNumber(NaN)).toBe(false);
    });

    it('should be `false` for `"0"`', () => {
      expect(isNumber('0')).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should be `true` for `1`', () => {
      expect(isPositiveNumber(1)).toBe(true);
    });

    it('should be `false` for `0`', () => {
      expect(isPositiveNumber(0)).toBe(false);
    });

    it('should be `false` for `-1`', () => {
      expect(isPositiveNumber(-1)).toBe(false);
    });

    it('should be `false` for `"0"`', () => {
      expect(isPositiveNumber('0')).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('should be `true` for `undefined`', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should be `false` for `null`', () => {
      expect(isUndefined(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should be `true` for `{}`', () => {
      expect(isObject({})).toBe(true);
    });

    it('should be `false` for `null`', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should be `false` for `() => {}`', () => {
      expect(isObject(() => {})).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('should be `true` for `{}`', () => {
      expect(isPlainObject({})).toBe(true);
    });

    it('should be `false` for `[]`', () => {
      expect(isPlainObject([])).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should be `true` for `() => {}`', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('should be `false` for `[]`', () => {
      expect(isFunction([])).toBe(false);
    });
  });

  describe('isElement', () => {
    it('should be `true` for `document.body`', () => {
      expect(isElement(document.body)).toBe(true);
    });

    it('should be `false` for `document`', () => {
      expect(isElement(document)).toBe(false);
    });
  });

  describe('toKebabCase', () => {
    it('should be `"foobar"` for `"foobar"`', () => {
      expect(toKebabCase('foobar')).toBe('foobar');
    });

    it('should be `"foo-bar"` for `"fooBar"`', () => {
      expect(toKebabCase('fooBar')).toBe('foo-bar');
    });
  });

  describe('toCamelCase', () => {
    it('should be `"foobar"` for `"foobar"`', () => {
      expect(toKebabCase('foobar')).toBe('foobar');
    });

    it('should be `"fooBar"` for `"foo-bar"`', () => {
      expect(toCamelCase('foo-bar')).toBe('fooBar');
    });
  });

  describe('on', () => {
    it('should add event listener to the element', (done) => {
      const element = document.createElement('div');

      on(element, 'click', (event) => {
        expect(event.type).toBe('click');
        done();
      });
      emit(element, 'click');
    });

    it('should support multiple event types', (done) => {
      const element = document.createElement('div');
      let count = 0;

      on(element, 'focus blur', (event) => {
        count += 1;

        switch (count) {
          case 1:
            expect(event.type).toBe('focus');
            break;

          case 2:
            expect(event.type).toBe('blur');
            done();
            break;

          default:
        }
      });
      emit(element, 'focus');
      emit(element, 'blur');
    });

    it('should support options', (done) => {
      const element = document.createElement('div');
      let count = 0;

      on(element, 'click', () => {
        count += 1;

        switch (count) {
          case 1:
            setTimeout(() => {
              done();
            }, 500);
            break;

          case 2:
            throw new Error();

          default:
        }
      }, {
        once: true,
      });
      emit(element, 'click');
      emit(element, 'click');
    });
  });

  describe('once', () => {
    it('should run the event listener once only', (done) => {
      const element = document.createElement('div');
      let count = 0;

      once(element, 'click', () => {
        count += 1;

        switch (count) {
          case 1:
            done();
            break;

          case 2:
            throw new Error();

          default:
        }
      });
      emit(element, 'click');
      emit(element, 'click');
    });

    it('should support multiple event types', (done) => {
      const element = document.createElement('div');
      let count = 0;

      once(element, 'focus blur', (event) => {
        count += 1;

        switch (count) {
          case 1:
            expect(event.type).toBe('focus');
            break;

          case 2:
            expect(event.type).toBe('blur');
            done();
            break;

          default:
        }
      });
      emit(element, 'focus');
      emit(element, 'blur');
    });
  });

  describe('off', () => {
    it('should remove event listener from the element', (done) => {
      const element = document.createElement('div');
      const listener = () => {
        throw new Error();
      };

      on(element, 'click', listener);
      off(element, 'click', listener);
      emit(element, 'click');
      setTimeout(() => {
        done();
      }, 500);
    });

    it('should support multiple event types', (done) => {
      const element = document.createElement('div');
      const listener = () => {
        throw new Error();
      };

      on(element, 'focus blur', listener);
      off(element, 'focus blur', listener);
      emit(element, 'focus');
      emit(element, 'blur');
      setTimeout(() => {
        done();
      }, 500);
    });
  });

  describe('emit', () => {
    it('should dispatch native event on the element', (done) => {
      const element = document.createElement('div');

      on(element, 'click', (event) => {
        expect(event.type).toBe('click');
        done();
      });
      emit(element, 'click');
    });

    it('should dispatch custom event on the element', (done) => {
      const element = document.createElement('div');

      on(element, 'test', (event) => {
        expect(event.type).toBe('test');
        done();
      });
      emit(element, 'test');
    });
  });

  describe("getComposedPathTarget", () => {
    it("should return the first element in composedPath if composedPath exists", () => {
      const div = document.createElement("div");
      const span = document.createElement("span");
      const event = {
        composedPath: () => [null, span, div],
        target: div,
      } as unknown as Event;

      expect(getComposedPathTarget(event)).toBe(span);
    });

    it("should return event.target if composedPath does not exist", () => {
      const div = document.createElement("div");
      const event = { target: div } as unknown as Event;

      expect(getComposedPathTarget(event)).toBe(div);
    });

    it("should return event.target if composedPath returns no element", () => {
      const div = document.createElement("div");
      const event = {
        composedPath: () => [null, undefined, "string"],
        target: div,
      } as unknown as Event;

      expect(getComposedPathTarget(event)).toBe(div);
    });

    it("should work with a real DOM event", () => {
      const button = document.createElement("button");
      document.body.appendChild(button);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      let result: EventTarget | null = null;

      button.addEventListener("click", (e) => {
        result = getComposedPathTarget(e);
      });

      button.dispatchEvent(clickEvent);

      expect(result).toBe(button);
      document.body.removeChild(button);
    });

    it("should return the element inside shadow DOM using composedPath", () => {
      const host = document.createElement("div");
      const shadow = host.attachShadow({ mode: "open" });
      const innerDiv = document.createElement("div");
      shadow.appendChild(innerDiv);
      document.body.appendChild(host);

      let result: EventTarget | null = null;

      innerDiv.addEventListener("click", (e) => {
        result = getComposedPathTarget(e);
      });

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        composed: true,
      });
      innerDiv.dispatchEvent(clickEvent);

      expect(result).toBe(innerDiv);

      document.body.removeChild(host);
    });

    it("should fallback to event.target if shadow DOM event but composedPath returns empty", () => {
      const host = document.createElement("div");
      const shadow = host.attachShadow({ mode: "open" });
      const innerDiv = document.createElement("div");
      shadow.appendChild(innerDiv);
      document.body.appendChild(host);

      const event = {
        target: innerDiv,
        composedPath: () => [],
      } as unknown as Event;

      expect(getComposedPathTarget(event)).toBe(innerDiv);

      document.body.removeChild(host);
    });

    it("should skip non-element nodes in composedPath", () => {
      const div = document.createElement("div");
      const event = {
        composedPath: () => [null, "string", div],
        target: div,
      } as unknown as Event;

      expect(getComposedPathTarget(event)).toBe(div);
    });
  });

  describe('getOffset', () => {
    it('should get the offset base on the document', () => {
      const element = document.createElement('div');

      document.body.appendChild(element);

      const offset = getOffset(element);

      expect(offset.left).toBe(0);
      expect(offset.top).toBe(0);
    });
  });

  describe('toAngleInRadian', () => {
    it('should convert an angle to a radian number.', () => {
      expect(toAngleInRadian(Math.PI)).toBe(Math.PI);
      expect(toAngleInRadian('3.14rad')).toBe(3.14);
      expect(toAngleInRadian('180deg')).toBe(Math.PI);
      expect(toAngleInRadian('200grad')).toBe(Math.PI);
      expect(toAngleInRadian('0.5turn')).toBe(Math.PI);
    });
  });

  describe('getAdjustedSizes', () => {
    it('should contain the given sizes', () => {
      const sizes = getAdjustedSizes({
        width: 200,
        height: 100,
        aspectRatio: 1,
      });

      expect(sizes.width).toBe(100);
      expect(sizes.height).toBe(100);
    });

    it('should cover the given sizes', () => {
      const sizes = getAdjustedSizes({
        width: 200,
        height: 100,
        aspectRatio: 1,
      }, 'cover');

      expect(sizes.width).toBe(200);
      expect(sizes.height).toBe(200);
    });

    it('should compute the width bases on the given height', () => {
      const sizes = getAdjustedSizes({
        height: 100,
        aspectRatio: 1,
      });

      expect(sizes.width).toBe(100);
    });

    it('should compute the height bases on the given width', () => {
      const sizes = getAdjustedSizes({
        width: 200,
        aspectRatio: 1,
      });

      expect(sizes.height).toBe(200);
    });
  });

  describe('multiplyMatrices', () => {
    it('should return the first parameter directly.', () => {
      const matrix = [1, 0, 0, 1, 0, 0];

      expect(multiplyMatrices(matrix)).toBe(matrix);
    });

    it('should multiply matrices correctly.', () => {
      expect(multiplyMatrices([1, 0, 0, 1, 0, 0], [1, 0, 0, 1, 1, 1])).toEqual([1, 0, 0, 1, 1, 1]);
    });
  });
});
