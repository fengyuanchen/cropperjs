import CropperCrosshair from '../src';

CropperCrosshair.$define();

describe('CropperCrosshair', () => {
  describe('properties', () => {
    describe('centered', () => {
      it('should be `false` by default', () => {
        const element = new CropperCrosshair();

        expect(element.centered).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperCrosshair();

        element.setAttribute('centered', '');
        expect(element.centered).toBe(true);
      });
    });

    describe('slottable', () => {
      it('should be `false` by default', () => {
        const element = new CropperCrosshair();

        expect(element.slottable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperCrosshair();

        element.setAttribute('slottable', '');
        expect(element.slottable).toBe(true);
      });
    });

    describe('themeColor', () => {
      it('should be `"rgba(238, 238, 238, 0.5)"` by default', () => {
        const element = new CropperCrosshair();

        expect(element.themeColor).toBe('rgba(238, 238, 238, 0.5)');
      });

      it('should be "#000"', () => {
        const element = new CropperCrosshair();

        element.setAttribute('theme-color', '#000');
        expect(element.themeColor).toBe('#000');
      });
    });
  });
});
