import {
  CROPPER_CANVAS,
} from '@cropper/utils';
import Cropper from '../src';

describe('Cropper', () => {
  describe('element', () => {
    it('should support `HTMLImageElement`', () => {
      expect(() => {
        new Cropper(document.createElement('img'));
      }).not.toThrow();
    });

    it('should support `HTMLCanvasElement`', () => {
      expect(() => {
        new Cropper(document.createElement('canvas'));
      }).not.toThrow();
    });

    it('should not support other elements', () => {
      expect(() => {
        new Cropper(document.createElement('div') as HTMLImageElement);
      }).toThrow();
    });
  });

  describe('options', () => {
    describe('container', () => {
      it('should be `undefined` by default', () => {
        const image = new Image();
        const cropper = new Cropper(image);

        expect(cropper.options.container).toBeUndefined();
      });

      it('should be the parent element if it exists by default', () => {
        const container = document.createElement('div');
        const image = new Image();
        const cropper = new Cropper(image);

        container.appendChild(image);
        expect(cropper.options.container).toBeUndefined();
        expect(container.contains(document.querySelector(CROPPER_CANVAS))).toBeTruthy();
      });

      it('should be the document body if the parent element does not exist by default', () => {
        const image = new Image();
        const cropper = new Cropper(image);

        expect(cropper.options.container).toBeUndefined();
        expect(document.body.contains(document.querySelector(CROPPER_CANVAS))).toBeTruthy();
      });

      it('should use the given element', () => {
        const container = document.createElement('div');
        const image = new Image();
        const cropper = new Cropper(image, {
          container,
        });

        expect(cropper.options.container).toBe(container);
        expect(container.contains(document.querySelector(CROPPER_CANVAS))).toBeTruthy();
      });
    });

    describe('template', () => {
      it('should be defined by default', () => {
        const image = new Image();
        const cropper = new Cropper(image);

        expect(cropper.options.template).toBeDefined();
      });

      it('should use the given template', () => {
        const template = '<cropper-canvas id="cropperCanvas"><cropper-image></cropper-image></cropper-canvas>';
        const image = new Image();
        const cropper = new Cropper(image, {
          template,
        });

        expect(cropper.options.template).toBe(template);
        expect(document.querySelector('#cropperCanvas')).toBeTruthy();
      });
    });
  });
});
