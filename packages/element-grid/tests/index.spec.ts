import CropperGrid from '../src';

CropperGrid.$define();

describe('CropperGrid', () => {
  describe('properties', () => {
    describe('bordered', () => {
      it('should be `false` by default', () => {
        const element = new CropperGrid();

        expect(element.bordered).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperGrid();

        element.setAttribute('bordered', '');
        expect(element.bordered).toBe(true);
      });
    });

    describe('columns', () => {
      it('should be `3` by default', () => {
        const element = new CropperGrid();

        expect(element.columns).toBe(3);
      });

      it('should be `2`', () => {
        const element = new CropperGrid();

        element.setAttribute('columns', '2');
        expect(element.columns).toBe(2);
      });
    });

    describe('covered', () => {
      it('should be `false` by default', () => {
        const element = new CropperGrid();

        expect(element.covered).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperGrid();

        element.setAttribute('covered', '');
        expect(element.covered).toBe(true);
      });
    });

    describe('rows', () => {
      it('should be `3` by default', () => {
        const element = new CropperGrid();

        expect(element.rows).toBe(3);
      });

      it('should be `2`', () => {
        const element = new CropperGrid();

        element.setAttribute('rows', '2');
        expect(element.rows).toBe(2);
      });
    });

    describe('slottable', () => {
      it('should be `false` by default', () => {
        const element = new CropperGrid();

        expect(element.slottable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperGrid();

        element.setAttribute('slottable', '');
        expect(element.slottable).toBe(true);
      });
    });

    describe('themeColor', () => {
      it('should be `"rgba(238, 238, 238, 0.5)"` by default', () => {
        const element = new CropperGrid();

        expect(element.themeColor).toBe('rgba(238, 238, 238, 0.5)');
      });

      it('should be "#000"', () => {
        const element = new CropperGrid();

        element.setAttribute('theme-color', '#000');
        expect(element.themeColor).toBe('#000');
      });
    });
  });
});
