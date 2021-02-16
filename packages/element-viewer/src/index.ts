import CropperElement from '@cropper/element';
import CropperCanvas from '@cropper/element-canvas';
import CropperImage from '@cropper/element-image';
import CropperSelection from '@cropper/element-selection';
import {
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  EVENT_CHANGE,
  EVENT_TRANSFORM,
} from '@cropper/helper-constants';
import {
  isElement,
  on,
  off,
} from '@cropper/helper-utils';
import style from './style';

const imageCache = new WeakMap();
const selectionCache = new WeakMap();
const sourceImageCache = new WeakMap();

export const RESIZE_BOTH = 'both';
export const RESIZE_HORIZONTAL = 'horizontal';
export const RESIZE_VERTICAL = 'vertical';
export const RESIZE_NONE = 'none';
export default class CropperViewer extends CropperElement {
  static $version = '__VERSION__';

  protected $onSourceImageTransform: EventListener | null = null;

  protected $onSelectionChange: EventListener | null = null;

  protected $scale = 1;

  protected $style = style;

  resize: string = RESIZE_VERTICAL;

  selection = '';

  slottable = false;

  protected set $image(element: CropperImage) {
    if (isElement(element)) {
      imageCache.set(this, element);
    } else {
      imageCache.delete(this);
    }
  }

  protected get $image(): CropperImage {
    return imageCache.get(this);
  }

  protected set $sourceImage(element: CropperImage) {
    if (isElement(element)) {
      sourceImageCache.set(this, element);
    } else {
      sourceImageCache.delete(this);
    }
  }

  protected get $sourceImage(): CropperImage {
    return sourceImageCache.get(this);
  }

  set $selection(element: CropperSelection) {
    if (isElement(element)) {
      selectionCache.set(this, element);
    } else {
      selectionCache.delete(this);
    }
  }

  get $selection(): CropperSelection {
    return selectionCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'resize',
      'selection',
    ]);
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    let $selection: CropperSelection | null = null;

    if (this.selection) {
      $selection = this.ownerDocument.querySelector(this.selection);
    } else {
      $selection = this.closest(CROPPER_SELECTION);
    }

    if (isElement($selection)) {
      this.$selection = $selection;
      on(
        $selection,
        EVENT_CHANGE,
        (this.$onSelectionChange = this.$handleSelectionChange.bind(this)),
      );

      const $canvas: CropperCanvas | null = $selection.closest(CROPPER_CANVAS);

      if ($canvas) {
        const $sourceImage: CropperImage | null = $canvas.querySelector(CROPPER_IMAGE);

        if ($sourceImage) {
          this.$sourceImage = $sourceImage;
          this.$image = $sourceImage.cloneNode(true) as CropperImage;
          this.$getShadowRoot().appendChild(this.$image);
          on(
            $sourceImage,
            EVENT_TRANSFORM,
            (this.$onSourceImageTransform = this.$handleSourceImageTransform.bind(this)),
          );
        }
      }

      this.$render();
    }
  }

  protected disconnectedCallback(): void {
    const { $selection, $sourceImage } = this;

    if ($sourceImage && this.$onSourceImageTransform) {
      off($sourceImage, EVENT_TRANSFORM, this.$onSourceImageTransform);
    }

    if ($selection && this.$onSelectionChange) {
      off($selection, EVENT_CHANGE, this.$onSelectionChange);
    }

    super.disconnectedCallback();
  }

  protected $handleSelectionChange(event: Event): void {
    this.$render((event as CustomEvent).detail);
  }

  protected $handleSourceImageTransform(event: Event): void {
    const {
      x,
      y,
      width,
      height,
    } = this.$selection;

    this.$transformImageByOffset((event as CustomEvent).detail.matrix, x, y, width, height);
  }

  protected $render(selection?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): void {
    const {
      x,
      y,
      width,
      height,
    } = selection || this.$selection;
    const styles: any = {};
    const { clientWidth, clientHeight } = this;
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

      case RESIZE_NONE:
      default:
        if (clientWidth > 0) {
          scale = clientWidth / width;
        } else if (clientHeight > 0) {
          scale = clientHeight / height;
        }
    }

    this.$scale = scale;
    this.$setStyles(styles);

    if (this.$sourceImage) {
      this.$transformImageByOffset(this.$sourceImage.$getTransform(), x, y, width, height);
    }
  }

  protected $transformImageByOffset(
    matrix: number[],
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const {
      $image,
      $scale,
      $sourceImage,
    } = this;

    if ($sourceImage && $image && $scale > 0) {
      const [a, b, c, d, e, f] = matrix;
      const newWidth = this.clientWidth;
      const newHeight = this.clientHeight;
      const offsetX = -x + ((newWidth - width) / 2);
      const offsetY = -y + ((newHeight - height) / 2);
      const translateX = ((offsetX * d) - (c * offsetY)) / ((a * d) - (c * b));
      const translateY = (offsetY - (b * e)) / d;
      const newE = a * translateX + c * translateY + e;
      const newF = b * translateX + d * translateY + f;
      const [a1, b1, c1, d1, e1, f1] = [a, b, c, d, newE, newF];
      const [a2, b2, c2, d2, e2, f2] = [$scale, 0, 0, $scale, 0, 0];

      $image.$setTransform(
        a1 * a2 + c1 * b2/* + e1 * 0 */,
        b1 * a2 + d1 * b2/* + f1 * 0 */,
        a1 * c2 + c1 * d2/* + e1 * 0 */,
        b1 * c2 + d1 * d2/* + f1 * 0 */,
        a1 * e2 + c1 * f2 + e1/* * 1 */,
        b1 * e2 + d1 * f2 + f1/* * 1 */,
      );
    }
  }
}
