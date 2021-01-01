import CropperElement from '@cropper/element';
import {
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  EVENT_CHANGE,
} from '@cropper/constants';
import {
  isElement,
  on,
  off,
} from '@cropper/utils';
import style from './style';

const selectionCache = new WeakMap();
const sourceImageCache = new WeakMap();

export const RESIZE_BOTH = 'both';
export const RESIZE_HORIZONTAL = 'horizontal';
export const RESIZE_VERTICAL = 'vertical';
export const RESIZE_NONE = 'none';
export default class CropperViewer extends CropperElement {
  protected $image: any = null;

  protected $mounted: boolean = false;

  protected $onSelectionChanged: EventListener | null = null;

  protected $style = style;

  bordered: boolean = false;

  resize: string = RESIZE_VERTICAL;

  selection: string = '';

  slottable: boolean = false;

  protected set $sourceImage(element: any) {
    if (isElement(element)) {
      sourceImageCache.set(this, element);
    } else {
      sourceImageCache.delete(this);
    }
  }

  protected get $sourceImage(): any {
    return sourceImageCache.get(this) || null;
  }

  set $selection(element: any) {
    if (isElement(element)) {
      selectionCache.set(this, element);
    } else {
      selectionCache.delete(this);
    }
  }

  get $selection(): any {
    return selectionCache.get(this) || null;
  }

  protected static get observedAttributes() {
    return super.observedAttributes.concat([
      'bordered',
      'resize',
      'selection',
    ]);
  }

  protected get $observedProperties() {
    return super.$observedProperties.concat([
      'bordered',
    ]);
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (newValue === oldValue) {
      return;
    }

    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'disabled') {
      this.$unmount();
      this.$mount();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.$mount();
  }

  protected disconnectedCallback() {
    this.$unmount();
    super.disconnectedCallback();
  }

  protected $mount() {
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

  protected $unmount() {
    if (!this.$mounted) {
      return;
    }

    this.$mounted = false;

    const { $selection } = this;

    if ($selection && this.$onSelectionChanged) {
      off($selection, EVENT_CHANGE, this.$onSelectionChanged);
    }
  }

  protected $render() {
    const { $image, $sourceImage, $selection } = this;

    if (
      $image
      && $selection
      && !$selection.hidden
      && $selection.width > 0
      && $selection.height > 0
    ) {
      const styles: any = {};
      const { clientWidth, clientHeight } = this;
      const { width, height } = $selection;
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

        const sourceMatrix = $sourceImage.$getTransform();
        const {
          a, b, c, d,
        } = sourceMatrix;
        const x = ((newWidth - width) / 2) - $selection.x;
        const y = ((newHeight - height) / 2) - $selection.y;
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
