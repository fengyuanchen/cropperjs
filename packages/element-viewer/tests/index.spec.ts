import { EVENT_CHANGE } from '@cropper/utils';
import CropperCanvas from '@cropper/element-canvas';
import CropperImage from '@cropper/element-image';
import CropperSelection from '@cropper/element-selection';
import CropperViewer from '../src';

CropperCanvas.$define();
CropperImage.$define();
CropperSelection.$define();
CropperViewer.$define();

describe('CropperViewer', () => {
  describe('properties', () => {
    describe('resize', () => {
      it('should be `"vertical"` by default', () => {
        const element = new CropperViewer();

        expect(element.resize).toBe('vertical');
      });

      it.each(['both', 'horizontal', 'vertical', 'none'])(
        'should support the `%s` option',
        (value) => {
          const element = new CropperViewer();

          element.setAttribute('resize', value);
          expect(element.resize).toBe(value);
        },
      );
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

  describe('lifecycle', () => {
    it('should render from the closest selection and clean up listeners', () => {
      const canvas = new CropperCanvas();
      const image = new CropperImage();
      const selection = new CropperSelection();
      const viewer = new CropperViewer();

      Object.defineProperty(canvas, 'offsetWidth', { configurable: true, value: 400 });
      Object.defineProperty(canvas, 'offsetHeight', { configurable: true, value: 300 });
      Object.defineProperty(viewer, 'clientWidth', { configurable: true, value: 200 });
      Object.defineProperty(viewer, 'clientHeight', { configurable: true, value: 100 });
      selection.x = 10;
      selection.y = 20;
      selection.width = 100;
      selection.height = 80;
      canvas.appendChild(selection);
      canvas.appendChild(image);
      selection.appendChild(viewer);

      document.body.appendChild(canvas);
      expect(viewer.style.height).toBe('160px');

      selection.dispatchEvent(new CustomEvent(EVENT_CHANGE, {
        bubbles: true,
        detail: {
          x: 1, y: 2, width: 3, height: 4,
        },
      }));
      expect(viewer.style.height).toBe('266.6666666666667px');

      document.body.removeChild(canvas);
      selection.dispatchEvent(new CustomEvent(EVENT_CHANGE, {
        bubbles: true,
        detail: {
          x: 5, y: 6, width: 7, height: 8,
        },
      }));
      expect(viewer.style.height).toBe('266.6666666666667px');
    });

    it('should use a selector to find the selection', () => {
      const canvas = new CropperCanvas();
      const selection = new CropperSelection();
      const viewer = new CropperViewer();

      selection.id = 'selection';
      viewer.selection = '#selection';
      canvas.appendChild(selection);
      canvas.appendChild(viewer);
      document.body.appendChild(canvas);

      expect(viewer.selection).toBe('#selection');
      document.body.removeChild(canvas);
    });
  });
});
