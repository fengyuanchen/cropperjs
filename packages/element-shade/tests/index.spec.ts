import CropperShade from '../src';

CropperShade.$define();

describe('CropperShade', () => {
  describe('properties', () => {
    describe('x', () => {
      it('should be `0` by default', () => {
        const element = new CropperShade();

        expect(element.x).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperShade();

        element.setAttribute('x', '1');
        expect(element.x).toBe(1);
      });
    });

    describe('y', () => {
      it('should be `0` by default', () => {
        const element = new CropperShade();

        expect(element.y).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperShade();

        element.setAttribute('y', '1');
        expect(element.y).toBe(1);
      });
    });

    describe('width', () => {
      it('should be `0` by default', () => {
        const element = new CropperShade();

        expect(element.width).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperShade();

        element.setAttribute('width', '1');
        expect(element.width).toBe(1);
      });
    });

    describe('height', () => {
      it('should be `0` by default', () => {
        const element = new CropperShade();

        expect(element.height).toBe(0);
      });

      it('should be `1`', () => {
        const element = new CropperShade();

        element.setAttribute('height', '1');
        expect(element.height).toBe(1);
      });
    });

    describe('slottable', () => {
      it('should be `false` by default', () => {
        const element = new CropperShade();

        expect(element.slottable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperShade();

        element.setAttribute('slottable', '');
        expect(element.slottable).toBe(true);
      });
    });

    describe('themeColor', () => {
      it('should be `"rgba(0, 0, 0, 0.65)"` by default', () => {
        const element = new CropperShade();

        expect(element.themeColor).toBe('rgba(0, 0, 0, 0.65)');
      });

      it('should be `"#000"`', () => {
        const element = new CropperShade();

        element.setAttribute('theme-color', '#000');
        expect(element.themeColor).toBe('#000');
      });
    });
  });
});
