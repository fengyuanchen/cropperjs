import {
  CROPPER_CANVAS,
  CROPPER_IMAGE,
} from '@cropper/utils';
import {
  CropperCanvas,
  CropperImage,
  CropperSelection,
} from '@cropper/elements';
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

  describe('others', () => {
    it('should inherit alt and crossorigin', () => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.alt = 'Test alt text';
      new Cropper(image);

      const element = document.querySelector(CROPPER_IMAGE);

      if (element) {
        expect(element.hasAttribute('alt')).toBe(true);
        expect(element.hasAttribute('crossorigin')).toBe(true);
      }
    });
  });

  describe('methods', () => {
    describe('getCropperCanvas', () => {
      it('should return the cropper canvas element', () => {
        const image = new Image();
        const cropper = new Cropper(image);

        expect(cropper.getCropperCanvas()).toBeInstanceOf(CropperCanvas);
      });
    });

    describe('getCropperImage', () => {
      it('should return the cropper image element', () => {
        const image = new Image();
        const cropper = new Cropper(image);

        expect(cropper.getCropperImage()).toBeInstanceOf(CropperImage);
      });
    });

    describe('getCropperSelection', () => {
      it('should return the cropper selection element', () => {
        const image = new Image();
        const cropper = new Cropper(image);

        expect(cropper.getCropperSelection()).toBeInstanceOf(CropperSelection);
      });
    });

    describe('getCropperSelections', () => {
      it('should return all the cropper selection elements', () => {
        const image = new Image();
        const cropper = new Cropper(image);
        const selections = cropper.getCropperSelections();

        expect(selections).toHaveLength(1);

        if (selections) {
          expect(selections[0]).toBeInstanceOf(CropperSelection);
        }
      });
    });
  });
});
