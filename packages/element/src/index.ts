import {
  IS_BROWSER,
  WINDOW,
  emit,
  isNaN,
  isNumber,
  isObject,
  isUndefined,
  nextTick,
  toCamelCase,
  toKebabCase,
} from '@cropper/utils';
import style from './style';

const REGEXP_SUFFIX = /left|top|width|height/i;
const DEFAULT_SHADOW_ROOT_MODE = 'open';
const shadowRoots = new WeakMap();
const styleSheets = new WeakMap();
const tagNames: Map<string, string> = new Map();
const supportsAdoptedStyleSheets = WINDOW.document && Array.isArray(WINDOW.document.adoptedStyleSheets) && 'replaceSync' in WINDOW.CSSStyleSheet.prototype;

export default class CropperElement extends HTMLElement {
  static $name: string;

  static $version = '__VERSION__';

  protected $style?: string;

  protected $template?: string;

  protected get $sharedStyle(): string {
    return `${this.themeColor ? `:host{--theme-color: ${this.themeColor};}` : ''}${style}`;
  }

  shadowRootMode: ShadowRootMode = DEFAULT_SHADOW_ROOT_MODE;

  slottable = true;

  themeColor?: string;

  constructor() {
    super();

    const name = Object.getPrototypeOf(this)?.constructor?.$name;

    if (name) {
      tagNames.set(name, this.tagName.toLowerCase());
    }
  }

  protected static get observedAttributes(): string[] {
    return [
      'shadow-root-mode',
      'slottable',
      'theme-color',
    ];
  }

  // Convert attribute to property
  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (Object.is(newValue, oldValue)) {
      return;
    }

    const propertyName = toCamelCase(name);
    const oldPropertyValue = (this as any)[propertyName];
    let newPropertyValue: any = newValue;

    switch (typeof oldPropertyValue) {
      case 'boolean':
        newPropertyValue = newValue !== null && newValue !== 'false';
        break;

      case 'number':
        newPropertyValue = Number(newValue);
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

  // Convert property to attribute
  protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void {
    if (Object.is(newValue, oldValue)) {
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
            this.setAttribute(name, newValue as string);
          }
        } else {
          this.removeAttribute(name);
        }
    }
  }

  protected connectedCallback(): void {
    // Observe properties after observed attributes
    Object.getPrototypeOf(this).constructor.observedAttributes.forEach((attribute: string) => {
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

    if (this.$style) {
      this.$addStyles(this.$style);
    }

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

  protected disconnectedCallback(): void {
    if (styleSheets.has(this)) {
      styleSheets.delete(this);
    }

    if (shadowRoots.has(this)) {
      shadowRoots.delete(this);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected $getTagNameOf(name: string): string {
    return tagNames.get(name) ?? name;
  }

  protected $setStyles(properties: Record<string, any>): this {
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
   * @returns {ShadowRoot} Returns the shadow root.
   */
  $getShadowRoot(): ShadowRoot {
    return this.shadowRoot || shadowRoots.get(this);
  }

  /**
   * Adds styles to the shadow root.
   * @param {string} styles The styles to add.
   * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
   */
  $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement {
    let styleSheet;

    const shadow = this.$getShadowRoot();

    if (supportsAdoptedStyleSheets) {
      styleSheet = new CSSStyleSheet();
      (styleSheet as any).replaceSync(styles);
      (shadow as any).adoptedStyleSheets = (shadow as any).adoptedStyleSheets.concat(styleSheet);
    } else {
      styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      shadow.appendChild(styleSheet);
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
  $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean {
    return emit(this, type, detail, options);
  }

  /**
   * Defers the callback to be executed after the next DOM update cycle.
   * @param {Function} [callback] The callback to execute after the next DOM update cycle.
   * @returns {Promise} A promise that resolves to nothing.
   */
  $nextTick(callback?: () => void): Promise<void> {
    return nextTick(this, callback);
  }

  /**
   * Defines the constructor as a new custom element.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
   * @param {string|object} [name] The element name.
   * @param {object} [options] The element definition options.
   */
  static $define(
    name?: string | ElementDefinitionOptions,
    options?: ElementDefinitionOptions,
  ): void {
    if (isObject(name)) {
      options = name;
      name = '';
    }

    if (!name) {
      name = this.$name || this.name;
    }

    name = toKebabCase(name as string);

    if (IS_BROWSER && WINDOW.customElements && !WINDOW.customElements.get(name)) {
      customElements.define(name, this, options);
    }
  }
}
