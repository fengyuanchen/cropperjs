import CropperHandle from '../src';

CropperHandle.$define();

describe('CropperHandle', () => {
  describe('properties', () => {
    describe('action', () => {
      it('should be `"none"` by default', () => {
        const element = new CropperHandle();

        expect(element.action).toBe('none');
      });

      it('should be "move"', () => {
        const element = new CropperHandle();

        element.setAttribute('action', 'move');
        expect(element.action).toBe('move');
      });
    });

    describe('plain', () => {
      it('should be `false` by default', () => {
        const element = new CropperHandle();

        expect(element.plain).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperHandle();

        element.setAttribute('plain', '');
        expect(element.plain).toBe(true);
      });
    });

    describe('slottable', () => {
      it('should be `false` by default', () => {
        const element = new CropperHandle();

        expect(element.slottable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperHandle();

        element.setAttribute('slottable', '');
        expect(element.slottable).toBe(true);
      });
    });
  });
});
