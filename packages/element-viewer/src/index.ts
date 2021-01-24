import CropperElement from '@cropper/element';
import {
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  EVENT_CHANGE,
} from '@cropper/helper-constants';
import {
  isElement,
  on,
  off,
} from '@cropper/helper-utils';
import style from './style';

const selectionCache = new WeakMap();
const sourceImageCache = new WeakMap();

export const RESIZE_BOTH = 'both';
export const RESIZE_HORIZONTAL = 'horizontal';
export const RESIZE_VERTICAL = 'vertical';
export const RESIZE_NONE = 'none';
export default class CropperViewer extends CropperElement {
  static $version = '__VERSION__';

  protected $image: any = null;

  protected $mounted = false;

  protected $onSelectionChanged: EventListener | null = null;

  protected $style = style;

  bordered = false;

  resize: string = RESIZE_VERTICAL;

  selection = '';

  slottable = false;

  protected set $sourceImage(element: Element) {
    if (isElement(element)) {
      sourceImageCache.set(this, element);
    } else {
      sourceImageCache.delete(this);
    }
  }

  protected get $sourceImage(): Element {
    return sourceImageCache.get(this);
  }

  set $selection(element: Element) {
    if (isElement(element)) {
      selectionCache.set(this, element);
    } else {
      selectionCache.delete(this);
    }
  }

  get $selection(): Element {
    return selectionCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'bordered',
      'resize',
      'selection',
    ]);
  }

  protected static get $observedProperties(): string[] {
    return super.$observedProperties.concat([
      'bordered',
    ]);
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (newValue === oldValue) {
      return;
    }

    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'disabled') {
      this.$unmount();
      this.$mount();
    }
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    this.$mount();
  }

  protected disconnectedCallback(): void {
    this.$unmount();
    super.disconnectedCallback();
  }

  protected $mount(): void {
    if (this.$mounted) {
      return;
    }

    let $selection = null;

    if (this.selection) {
      $selection = this.ownerDocument.querySelector(this.selection);
    } else {
      $selection = this.closest(CROPPER_SELECTION);
    }

    if (isElement($selection)) {
      const $sourceCanvas = $selection.closest(CROPPER_CANVAS);
      const $sourceImage = $sourceCanvas ? $sourceCanvas.querySelector(CROPPER_IMAGE) : null;

      if ($sourceImage) {
        this.$image = $sourceImage.cloneNode(true);
        this.$sourceImage = $sourceImage;
        this.$getShadowRoot().appendChild(this.$image);
      }

      on($selection, EVENT_CHANGE, (this.$onSelectionChanged = this.$render.bind(this)));
      this.$selection = $selection;
      this.$mounted = true;
      this.$render();
    }
  }

  protected $unmount(): void {
    if (!this.$mounted) {
      return;
    }

    this.$mounted = false;

    const { $selection } = this;

    if ($selection && this.$onSelectionChanged) {
      off($selection, EVENT_CHANGE, this.$onSelectionChanged);
    }
  }

  protected $render(): void {
    const { $image, $sourceImage, $selection } = this;

    if (
      $image
      && $selection
      && !($selection as any).hidden
      && ($selection as any).width > 0
      && ($selection as any).height > 0
    ) {
      const styles: any = {};
      const { clientWidth, clientHeight } = this;
      const { width, height } = $selection as any;
      let newWidth = clientWidth;
      let newHeight = clientHeight;
      let scale = NaN;

      switch (this.resize) {
        case RESIZE_BOTH:
          scale = 1;
          newWidth = width;
          newHeight = height;
          styles.width = width;
          styles.height = height;
          break;

        case RESIZE_HORIZONTAL:
          scale = clientHeight / height;
          newWidth = width * scale;
          styles.width = newWidth;
          break;

        case RESIZE_VERTICAL:
          scale = clientWidth / width;
          newHeight = height * scale;
          styles.height = newHeight;
          break;

        // case RESIZE_NONE:
        default:
          if (clientWidth > 0) {
            scale = clientWidth / width;
          } else if (clientHeight > 0) {
            scale = clientHeight / height;
          }
      }

      if (newWidth > 0 || newHeight > 0) {
        this.$setStyles(styles);
      }

      if (scale > 0 && $sourceImage) {
        this.dataset.scale = String(scale);

        const sourceMatrix = ($sourceImage as any).$getTransform();
        const {
          a, b, c, d,
        } = sourceMatrix;
        const x = ((newWidth - width) / 2) - ($selection as any).x;
        const y = ((newHeight - height) / 2) - ($selection as any).y;
        const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
        const f = (y - (b * e)) / d;
        const {
          a: a1, b: b1, c: c1, d: d1, e: e1, f: f1,
        } = sourceMatrix;
        const [a2, b2, c2, d2, e2, f2] = [scale, 0, 0, scale, e, f];

        $image.$setTransform(
          a1 * a2 + c1 * b2,
          b1 * a2 + d1 * b2,
          a1 * c2 + c1 * d2,
          b1 * c2 + d1 * d2,
          a1 * e2 + c1 * f2 + e1,
          b1 * e2 + d1 * f2 + f1,
        );
      }
    }
  }
}
