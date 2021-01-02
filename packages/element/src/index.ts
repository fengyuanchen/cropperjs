import {
  IS_BROWSER,
  WINDOW,
} from '@cropper/constants';
import {
  emit,
  isNaN,
  isNumber,
  isUndefined,
  toCamelCase,
  toKebabCase,
} from '@cropper/utils';
import style from './style';

const REGEXP_SUFFIX = /left|top|width|height/i;
const DEFAULT_SHADOW_ROOT_MODE = 'open';
const shadowRoots = new WeakMap();
const styleSheets = new WeakMap();
const supportsAdoptedStyleSheets = WINDOW.document && Array.isArray(WINDOW.document.adoptedStyleSheets) && 'replaceSync' in WINDOW.CSSStyleSheet.prototype;

export default class CropperElement extends HTMLElement {
  static $version: string = '__VERSION__';

  protected $style?: string;

  protected $template?: string;

  protected get $sharedStyle() {
    return `${this.themeColor ? `:host{--theme-color: ${this.themeColor};}` : ''}${style}`;
  }

  shadowRootMode: ShadowRootMode = DEFAULT_SHADOW_ROOT_MODE;

  slottable: boolean = true;

  static: boolean = false;

  themeColor?: string;

  protected static get observedAttributes() {
    return [
      'shadow-root-mode',
      'slottable',
      'static',
      'theme-color',
    ];
  }

  // Convert attribute to property
  protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (newValue === oldValue) {
      return;
    }

    const propertyName = toCamelCase(name);
    const oldPropertyValue = (this as any)[propertyName];
    let newPropertyValue: any = newValue;

    switch (typeof oldPropertyValue) {
      case 'number':
        newPropertyValue = Number(newValue);
        break;

      case 'boolean':
        newPropertyValue = newValue !== null && newValue !== 'false';
        break;

      default:
    }

    (this as any)[propertyName] = newPropertyValue;

    switch (name) {
      case 'theme-color': {
        const styleSheet = styleSheets.get(this);
        const styles = this.$sharedStyle;

        if (styleSheet && styles) {
          if (supportsAdoptedStyleSheets) {
            styleSheet.replaceSync(styles);
          } else {
            styleSheet.textContent = styles;
          }
        }

        break;
      }

      default:
    }
  }

  protected static get $observedProperties() {
    return [
      'static',
    ];
  }

  // Convert property to attribute
  protected $propertyChangedCallback(name: string, oldValue: any, newValue: any) {
    if (newValue === oldValue) {
      return;
    }

    name = toKebabCase(name);

    switch (typeof newValue) {
      case 'boolean':
        if (newValue === true) {
          if (!this.hasAttribute(name)) {
            this.setAttribute(name, '');
          }
        } else {
          this.removeAttribute(name);
        }
        break;

      case 'number':
        if (isNaN(newValue)) {
          newValue = '';
        } else {
          newValue = String(newValue);
        }
        // Fall through

        // case 'string':
        // eslint-disable-next-line no-fallthrough
      default:
        if (newValue) {
          if (this.getAttribute(name) !== newValue) {
            this.setAttribute(name, newValue);
          }
        } else {
          this.removeAttribute(name);
        }
    }
  }

  protected connectedCallback() {
    // Observe properties after observed attributes
    Object.getPrototypeOf(this).constructor.$observedProperties.forEach((attribute: string) => {
      const property = toCamelCase(attribute);
      let value = (this as any)[property];

      if (!isUndefined(value)) {
        this.$propertyChangedCallback(property, undefined, value);
      }

      Object.defineProperty(this, property, {
        enumerable: true,
        configurable: true,
        get() {
          return value;
        },
        set(newValue) {
          const oldValue = value;

          value = newValue;
          this.$propertyChangedCallback(property, oldValue, newValue);
        },
      });
    });

    const shadow = this.attachShadow({
      mode: this.shadowRootMode || DEFAULT_SHADOW_ROOT_MODE,
    });

    if (!this.shadowRoot) {
      shadowRoots.set(this, shadow);
    }

    styleSheets.set(this, this.$addStyles(this.$sharedStyle));
    this.$addStyles(this.$style);

    if (this.$template) {
      const template = document.createElement('template');

      template.innerHTML = this.$template;
      shadow.appendChild(template.content);
    }

    if (this.slottable) {
      const slot = document.createElement('slot');

      shadow.appendChild(slot);
    }
  }

  protected disconnectedCallback() {
    if (styleSheets.has(this)) {
      styleSheets.delete(this);
    }

    if (shadowRoots.has(this)) {
      shadowRoots.delete(this);
    }
  }

  protected $setStyles(properties: any) {
    Object.keys(properties).forEach((property: any) => {
      let value = properties[property];

      if (isNumber(value)) {
        if (value !== 0 && REGEXP_SUFFIX.test(property)) {
          value = `${value}px`;
        } else {
          value = String(value);
        }
      }

      this.style[property] = value;
    });

    return this;
  }

  /**
   * Outputs the shadow root of the element.
   * @returns {ShadowRoot|null} Returns the shadow root if any.
   */
  $getShadowRoot() {
    return this.shadowRoot || shadowRoots.get(this) || null;
  }

  /**
   * Adds styles to the shadow root.
   * @param {string} styles The styles to add.
   * @returns {CSSStyleSheet|HTMLStyleElement|null} Returns the generated style sheet.
   */
  $addStyles(styles?: string) {
    let styleSheet = null;

    if (styles) {
      const shadow = this.$getShadowRoot();

      if (supportsAdoptedStyleSheets) {
        styleSheet = new CSSStyleSheet();

        (styleSheet as any).replaceSync(styles);
        shadow.adoptedStyleSheets = shadow.adoptedStyleSheets.concat(styleSheet);
      } else {
        styleSheet = document.createElement('style');

        styleSheet.textContent = styles;
        shadow.appendChild(styleSheet);
      }
    }

    return styleSheet;
  }

  /**
   * Dispatches an event at the element.
   * @param {string} type The name of the event.
   * @param {*} [detail] The data passed when initializing the event.
   * @param {CustomEventInit} [options] The other event options.
   * @returns {boolean} Returns the result value.
   */
  $emit(type: string, detail?: any, options?: CustomEventInit): boolean {
    return emit(this, type, detail, options);
  }

  /**
   * Defines the constructor as a new custom element.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
   * @param options
   */
  static $define(options?: ElementDefinitionOptions) {
    const name = toKebabCase(this.name);
    const { customElements } = WINDOW;

    if (IS_BROWSER && customElements && !customElements.get(name)) {
      customElements.define(name, this, options);
    }
  }
}
