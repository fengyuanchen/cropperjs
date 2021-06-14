import CropperElement from '../src';

CropperElement.$define();

describe('CropperElement', () => {
  describe('properties', () => {
    describe('shadowRootMode', () => {
      it('should be `"open"` by default', () => {
        const element = new CropperElement();

        expect(element.shadowRootMode).toBe('open');
      });

      it('should be `"closed"` by default', () => {
        const element = new CropperElement();

        element.setAttribute('shadow-root-mode', 'closed');
        expect(element.shadowRootMode).toBe('closed');
      });
    });

    describe('slottable', () => {
      it('should be `true` by default', () => {
        const element = new CropperElement();

        expect(element.slottable).toBe(true);
      });

      it('should be `false` by default', () => {
        const element = new CropperElement();

        element.setAttribute('slottable', 'false');
        expect(element.slottable).toBe(false);
      });
    });

    describe('themeColor', () => {
      it('should be `undefined` by default', () => {
        const element = new CropperElement();

        expect(element.themeColor).toBeUndefined();
      });

      it('should be "#000"', () => {
        const element = new CropperElement();

        element.setAttribute('theme-color', '#000');
        expect(element.themeColor).toBe('#000');
      });
    });
  });

  describe('methods', () => {
    describe('$getShadowRoot', () => {
      it('should return the shadow root of the element', () => {
        const element = new CropperElement();

        document.body.appendChild(element);
        expect(element.$getShadowRoot()).toBe(element.shadowRoot);
      });

      it('should return the shadow root of the element even if its mode is "closed"', () => {
        const element = new CropperElement();

        element.setAttribute('shadow-root-mode', 'closed');
        document.body.appendChild(element);
        expect(element.$getShadowRoot()).not.toBeNull();
      });
    });

    describe('$addStyles', () => {
      it('should add styles to the shadow root', () => {
        const element = new CropperElement();

        document.body.appendChild(element);

        const shadowRoot = element.$getShadowRoot();

        element.$addStyles(':host{color:blue}');

        if (shadowRoot) {
          expect(shadowRoot.querySelectorAll('style')).toHaveLength(2);
        }
      });
    });

    describe('$emit', () => {
      it('should dispatch event at the current element', () => {
        const element = new CropperElement();

        document.body.appendChild(element);

        element.addEventListener('click', (event) => {
          expect(event.type).toBe('click');
        });
        element.$emit('click');
      });
    });
  });

  describe('extends', () => {
    class MyCropperElement extends CropperElement {
      string = '';

      number = 0;

      boolean = false;

      protected static get observedAttributes(): string[] {
        return super.observedAttributes.concat([
          'boolean',
          'number',
          'string',
        ]);
      }
    }

    MyCropperElement.$define();

    it('should convert attributes to properties', () => {
      const element = new MyCropperElement();

      element.setAttribute('string', 'foo');
      element.setAttribute('number', '1');
      element.setAttribute('boolean', '');
      expect(element.string).toBe('foo');
      expect(element.number).toBe(1);
      expect(element.boolean).toBe(true);
    });

    it('should convert properties to attributes', () => {
      const element = new MyCropperElement();

      element.string = 'foo';
      element.number = 1;
      element.boolean = true;
      document.body.appendChild(element);
      expect(element.getAttribute('string')).toBe('foo');
      expect(element.getAttribute('number')).toBe('1');
      expect(element.getAttribute('boolean')).toBe('');
    });
  });
});
