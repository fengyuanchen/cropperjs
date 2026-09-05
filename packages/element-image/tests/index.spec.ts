import { EVENT_CHANGE, EVENT_TRANSFORM } from '@cropper/utils';
import CropperCanvas from '@cropper/element-canvas';
import CropperImage from '../src';

// A 1×1 pixel PNG image.
const URL_EXAMPLE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4////fwAJ+wP9BUNFygAAAABJRU5ErkJggg==';

CropperCanvas.$define();
CropperImage.$define();

describe('CropperImage', () => {
  describe('properties', () => {
    describe('initialFit', () => {
      it('should be `"contain"` by default', () => {
        const element = new CropperImage();

        expect(element.initialFit).toBe('contain');
      });

      it.each(['cover', 'fill', 'contain', 'scale-down', 'none'])(
        'should support the `%s` option',
        (value) => {
          const element = new CropperImage();

          element.setAttribute('initial-fit', value);
          expect(element.initialFit).toBe(value);
        },
      );
    });

    describe('maxFit', () => {
      it('should be `""` by default', () => {
        const element = new CropperImage();

        expect(element.maxFit).toBe('');
      });

      it.each(['cover', 'fill', 'contain', 'scale-down', 'none'])(
        'should support the `%s` option',
        (value) => {
          const element = new CropperImage();

          element.setAttribute('max-fit', value);
          expect(element.maxFit).toBe(value);
        },
      );
    });

    describe('minFit', () => {
      it('should be `""` by default', () => {
        const element = new CropperImage();

        expect(element.minFit).toBe('');
      });

      it.each(['cover', 'fill', 'contain', 'scale-down', 'none'])(
        'should support the `%s` option',
        (value) => {
          const element = new CropperImage();

          element.setAttribute('min-fit', value);
          expect(element.minFit).toBe(value);
        },
      );
    });

    describe('rotatable', () => {
      it('should be `false` by default', () => {
        const element = new CropperImage();

        expect(element.rotatable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperImage();

        element.setAttribute('rotatable', 'true');
        expect(element.rotatable).toBe(true);
      });
    });

    describe('scalable', () => {
      it('should be `false` by default', () => {
        const element = new CropperImage();

        expect(element.scalable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperImage();

        element.setAttribute('scalable', 'true');
        expect(element.scalable).toBe(true);
      });
    });

    describe('skewable', () => {
      it('should be `false` by default', () => {
        const element = new CropperImage();

        expect(element.skewable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperImage();

        element.setAttribute('skewable', 'true');
        expect(element.skewable).toBe(true);
      });
    });

    describe('translatable', () => {
      it('should be `false` by default', () => {
        const element = new CropperImage();

        expect(element.translatable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperImage();

        element.setAttribute('translatable', 'true');
        expect(element.translatable).toBe(true);
      });
    });

    describe('slottable', () => {
      it('should be `false` by default', () => {
        const element = new CropperImage();

        expect(element.slottable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperImage();

        element.setAttribute('slottable', '');
        expect(element.slottable).toBe(true);
      });
    });
  });

  describe('methods', () => {
    describe('$move', () => {
      it('should move the image', () => {
        const element = new CropperImage();

        element.$move(10, 10);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.translatable = true;
        element.$move(10, 10);

        const matrix = element.$getTransform();

        expect(matrix[4]).not.toBe(0);
        expect(matrix[5]).not.toBe(0);
      });

      it('should default to the first parameter for the second parameter', () => {
        const element = new CropperImage();

        element.translatable = true;
        element.$move(10);

        const matrix = element.$getTransform();

        expect(matrix[5]).toBe(matrix[4]);
      });
    });

    describe('$moveTo', () => {
      it('should move the image to a specific position', () => {
        const element = new CropperImage();

        element.$moveTo(10, 10);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.translatable = true;
        element.$moveTo(10, 10);

        const matrix = element.$getTransform();

        expect(matrix[4]).not.toBe(0);
        expect(matrix[5]).not.toBe(0);
      });

      it('should default to the first parameter for the second parameter', () => {
        const element = new CropperImage();

        element.translatable = true;
        element.$moveTo(10);

        const matrix = element.$getTransform();

        expect(matrix[5]).toBe(matrix[4]);
      });
    });

    describe('$rotate', () => {
      it('should rotate the image', () => {
        const element = new CropperImage();

        element.$rotate(45);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.rotatable = true;
        element.$rotate(45);

        const [a, b, c, d] = element.$getTransform();

        expect(a).not.toBe(1);
        expect(b).not.toBe(0);
        expect(c).not.toBe(0);
        expect(d).not.toBe(1);
      });

      it('should support string parameter', () => {
        const element = new CropperImage();

        element.rotatable = true;
        element.$rotate('45deg');

        const [a, b, c, d] = element.$getTransform();

        expect(a).not.toBe(1);
        expect(b).not.toBe(0);
        expect(c).not.toBe(0);
        expect(d).not.toBe(1);
      });
    });

    describe('$zoom', () => {
      it('should zoom in the image', () => {
        const element = new CropperImage();

        element.$zoom(0.1);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.scalable = true;
        element.$zoom(0.1);

        const matrix = element.$getTransform();

        expect(matrix[0]).toBeGreaterThan(1);
        expect(matrix[3]).toBeGreaterThan(1);
      });

      it('should zoom out the image', () => {
        const element = new CropperImage();

        element.$zoom(0);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.scalable = true;
        element.$zoom(-0.1);

        const matrix = element.$getTransform();

        expect(matrix[0]).toBeLessThan(1);
        expect(matrix[3]).toBeLessThan(1);
      });
    });

    describe('$scale', () => {
      it('should scale the image', () => {
        const element = new CropperImage();

        element.$scale(1.1, 1.2);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.scalable = true;
        element.$scale(1.1, 1.2);

        const matrix = element.$getTransform();

        expect(matrix[0]).not.toBe(1);
        expect(matrix[3]).not.toBe(1);
      });

      it('should default to the first parameter for the second parameter', () => {
        const element = new CropperImage();

        element.scalable = true;
        element.$scale(1.1);

        const matrix = element.$getTransform();

        expect(matrix[2]).toBe(matrix[1]);
      });
    });

    describe('$skew', () => {
      it('should skew the image', () => {
        const element = new CropperImage();

        element.$skew(0.1, 0.2);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.skewable = true;
        element.$skew(0.1, 0.2);

        const matrix = element.$getTransform();

        expect(matrix[1]).not.toBe(0);
        expect(matrix[2]).not.toBe(0);
      });

      it('should support string parameter', () => {
        const element = new CropperImage();

        element.skewable = true;
        element.$skew('15deg', '30deg');

        const matrix = element.$getTransform();

        expect(matrix[1]).not.toBe(0);
        expect(matrix[2]).not.toBe(0);
      });

      it('should default to 0 for the second parameter', () => {
        const element = new CropperImage();

        element.skewable = true;
        element.$skew(0.1);

        const matrix = element.$getTransform();

        expect(matrix[1]).toBe(0);
        expect(matrix[2]).not.toBe(0);
      });
    });

    describe('$translate', () => {
      it('should translate the image', () => {
        const element = new CropperImage();

        element.$translate(10, 5);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.translatable = true;
        element.$translate(10, 5);

        const matrix = element.$getTransform();

        expect(matrix[4]).toBe(10);
        expect(matrix[5]).toBe(5);
      });

      it('should default to the first parameter for the second parameter', () => {
        const element = new CropperImage();

        element.translatable = true;
        element.$translate(10);

        const matrix = element.$getTransform();

        expect(matrix[5]).toBe(matrix[4]);
      });
    });

    describe('$transform', () => {
      it('should transform the image', () => {
        const element = new CropperImage();

        element.$transform(0.5, 0.5, 0.5, 0.5, 5, 5);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.rotatable = true;
        element.scalable = true;
        element.skewable = true;
        element.translatable = true;
        element.$transform(0.5, 0.5, 0.5, 0.5, 5, 5);
        expect(element.$getTransform()).toEqual([0.5, 0.5, 0.5, 0.5, 5, 5]);
        element.$transform(NaN, 0, 0, 1, 0, 0);
        expect(element.$getTransform()).toEqual([0.5, 0.5, 0.5, 0.5, 5, 5]);
      });
    });

    describe('$setTransform', () => {
      it('should reset (override) the current transform to the specific identity matrix', () => {
        const element = new CropperImage();

        element.$setTransform(0.5, 0.5, 0.5, 0.5, 5, 5);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.rotatable = true;
        element.scalable = true;
        element.skewable = true;
        element.translatable = true;
        element.$setTransform(0.5, 0.5, 0.5, 0.5, 5, 5);
        expect(element.$getTransform()).toEqual([0.5, 0.5, 0.5, 0.5, 5, 5]);
      });

      it('should support array parameter', () => {
        const element = new CropperImage();

        element.rotatable = true;
        element.scalable = true;
        element.skewable = true;
        element.translatable = true;
        element.$setTransform([0.5, 0.5, 0.5, 0.5, 5, 5]);
        expect(element.$getTransform()).toEqual([0.5, 0.5, 0.5, 0.5, 5, 5]);
      });
    });

    describe('$getTransform', () => {
      it('should retrieves the current transformation matrix being applied to the element', () => {
        const element = new CropperImage();

        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
      });
    });

    describe('$resetTransform', () => {
      it('should reset the current transform to the initial identity matrix', () => {
        const element = new CropperImage();

        element.$resetTransform();
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.rotatable = true;
        element.scalable = true;
        element.skewable = true;
        element.translatable = true;
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.$setTransform([0.5, 0.5, 0.5, 0.5, 5, 5]);
        expect(element.$getTransform()).toEqual([0.5, 0.5, 0.5, 0.5, 5, 5]);
        element.$resetTransform();
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
      });
    });
  });

  describe('events', () => {
    describe(EVENT_CHANGE, () => {
      it('should report the image position and size when translating', () => {
        const canvas = new CropperCanvas();
        const element = new CropperImage();
        const changes: CustomEvent[] = [];

        Object.defineProperty(canvas, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            x: 10,
            y: 20,
            left: 10,
            top: 20,
            right: 210,
            bottom: 120,
            width: 200,
            height: 100,
          }),
        });
        canvas.appendChild(element);
        document.body.appendChild(canvas);
        const image = element.shadowRoot?.querySelector('img') as HTMLImageElement;

        Object.defineProperty(image, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            x: 30,
            y: 50,
            left: 30,
            top: 50,
            right: 130,
            bottom: 100,
            width: 100,
            height: 50,
          }),
        });
        Object.defineProperty(image, 'complete', { configurable: true, value: true });
        Object.defineProperty(image, 'naturalWidth', { configurable: true, value: 100 });
        Object.defineProperty(image, 'naturalHeight', { configurable: true, value: 50 });
        element.addEventListener(EVENT_CHANGE, (event) => {
          changes.push(event as CustomEvent);
        });

        image.dispatchEvent(new Event('load'));
        element.translatable = true;
        element.$translate(10, 20);

        expect(changes).toHaveLength(1);
        expect(changes[0].detail).toEqual({
          x: 20,
          y: 30,
          width: 100,
          height: 50,
        });
        document.body.removeChild(canvas);
      });
    });

    describe(EVENT_TRANSFORM, () => {
      it('should trigger the `transform` event', (done) => {
        const element = new CropperImage();

        element.rotatable = true;
        element.scalable = true;
        element.skewable = true;
        element.translatable = true;
        element.addEventListener(EVENT_TRANSFORM, (event) => {
          const { detail } = event as CustomEvent;

          expect(detail.matrix).toHaveLength(6);
          expect(detail.matrix).toBeInstanceOf(Array);
          expect(detail.oldMatrix).toHaveLength(6);
          expect(detail.oldMatrix).toBeInstanceOf(Array);
          done();
        });
        element.$setTransform(0.5, 0.5, 0.5, 0.5, 5, 5);
      });

      it('should not transform when default prevented', () => {
        const element = new CropperImage();

        element.rotatable = true;
        element.scalable = true;
        element.skewable = true;
        element.translatable = true;
        element.addEventListener(EVENT_TRANSFORM, (event) => {
          event.preventDefault();
        });
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
        element.$setTransform(0.5, 0.5, 0.5, 0.5, 5, 5);
        expect(element.$getTransform()).toEqual([1, 0, 0, 1, 0, 0]);
      });
    });

    describe('$ready', () => {
      it('should resolve immediately for a loaded image', async () => {
        const element = new CropperImage();
        document.body.appendChild(element);
        const image = element.shadowRoot?.querySelector('img') as HTMLImageElement;

        Object.defineProperty(image, 'complete', { configurable: true, value: true });
        Object.defineProperty(image, 'naturalWidth', { configurable: true, value: 10 });
        Object.defineProperty(image, 'naturalHeight', { configurable: true, value: 10 });

        await expect(element.$ready()).resolves.toBe(image);
        document.body.removeChild(element);
      });

      it('should reject immediately for an invalid image', async () => {
        const element = new CropperImage();
        document.body.appendChild(element);
        const image = element.shadowRoot?.querySelector('img') as HTMLImageElement;

        Object.defineProperty(image, 'complete', { configurable: true, value: true });
        Object.defineProperty(image, 'naturalWidth', { configurable: true, value: 0 });
        Object.defineProperty(image, 'naturalHeight', { configurable: true, value: 0 });

        await expect(element.$ready()).rejects.toThrow('Failed to load the image source');
        document.body.removeChild(element);
      });

      it('should resolve after a pending image load and reject on error', async () => {
        const element = new CropperImage();
        document.body.appendChild(element);
        const image = element.shadowRoot?.querySelector('img') as HTMLImageElement;
        Object.defineProperty(image, 'complete', { configurable: true, value: false });
        Object.defineProperty(image, 'naturalWidth', { configurable: true, value: 10 });
        Object.defineProperty(image, 'naturalHeight', { configurable: true, value: 10 });
        const promise = element.$ready();

        image.dispatchEvent(new Event('load'));
        await expect(promise).resolves.toBe(image);

        const failedElement = new CropperImage();
        document.body.appendChild(failedElement);
        const failedImage = failedElement.shadowRoot?.querySelector('img') as HTMLImageElement;
        const failedPromise = failedElement.$ready();

        failedImage.dispatchEvent(new Event('error'));
        await expect(failedPromise).rejects.toThrow('Failed to load the image source');
        document.body.removeChild(element);
        document.body.removeChild(failedElement);
      });
    });
  });

  describe('others', () => {
    it('should inherit the native attributes', () => {
      const element = new CropperImage();
      const img = element.querySelector('img');

      element.setAttribute('src', URL_EXAMPLE_IMAGE);
      element.setAttribute('alt', 'A 1×1 pixel PNG image');
      element.setAttribute('crossorigin', '');

      if (img) {
        expect(img.hasAttribute('src')).toBe(true);
        expect(img.hasAttribute('alt')).toBe(true);
        expect(img.hasAttribute('crossorigin')).toBe(true);
        element.removeAttribute('alt');
        expect(img.hasAttribute('alt')).toBe(false);
      }
    });
  });
});
