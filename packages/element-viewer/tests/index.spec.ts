import CropperViewer from '../src';

CropperViewer.$define();

describe('CropperViewer', () => {
  describe('properties', () => {
    describe('bordered', () => {
      it('should be `false` by default', () => {
        const element = new CropperViewer();

        expect(element.bordered).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperViewer();

        element.setAttribute('bordered', '');
        expect(element.bordered).toBe(true);
      });
    });

    describe('resize', () => {
      it('should be `"vertical"` by default', () => {
        const element = new CropperViewer();

        expect(element.resize).toBe('vertical');
      });

      it('should be `"both"`', () => {
        const element = new CropperViewer();

        element.setAttribute('resize', 'both');
        expect(element.resize).toBe('both');
      });
    });

    describe('selection', () => {
      it('should be empty by default', () => {
        const element = new CropperViewer();

        expect(element.selection).toBe('');
      });

      it('should be "#selection"', () => {
        const element = new CropperViewer();

        element.setAttribute('selection', '#selection');
        expect(element.selection).toBe('#selection');
      });
    });

    describe('slottable', () => {
      it('should be `false` by default', () => {
        const element = new CropperViewer();

        expect(element.slottable).toBe(false);
      });

      it('should be `true`', () => {
        const element = new CropperViewer();

        element.setAttribute('slottable', '');
        expect(element.slottable).toBe(true);
      });
    });
  });
});
