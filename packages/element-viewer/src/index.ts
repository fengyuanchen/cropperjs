import CropperElement from '@cropper/element';
import type { Selection } from '@cropper/element-selection';
import type CropperCanvas from '@cropper/element-canvas';
import type CropperImage from '@cropper/element-image';
import type CropperSelection from '@cropper/element-selection';
import {
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  CROPPER_VIEWER,
  EVENT_CHANGE,
  EVENT_LOAD,
  EVENT_TRANSFORM,
  getRootDocument,
  isElement,
  off,
  on,
} from '@cropper/utils';
import style from './style';

const canvasCache = new WeakMap();
const imageCache = new WeakMap();
const selectionCache = new WeakMap();
const sourceImageCache = new WeakMap();

export const RESIZE_BOTH = 'both';
export const RESIZE_HORIZONTAL = 'horizontal';
export const RESIZE_VERTICAL = 'vertical';
export const RESIZE_NONE = 'none';
export default class CropperViewer extends CropperElement {
  static $name = CROPPER_VIEWER;

  static $version = '__VERSION__';

  protected $onSelectionChange: EventListener | null = null;

  protected $onSourceImageLoad: EventListener | null = null;

  protected $onSourceImageTransform: EventListener | null = null;

  protected $scale = 1;

  protected $style = style;

  resize: string = RESIZE_VERTICAL;

  selection = '';

  slottable = false;

  protected set $image(element: CropperImage) {
    imageCache.set(this, element);
  }

  protected get $image(): CropperImage {
    return imageCache.get(this);
  }

  protected set $sourceImage(element: CropperImage) {
    sourceImageCache.set(this, element);
  }

  protected get $sourceImage(): CropperImage {
    return sourceImageCache.get(this);
  }

  protected set $canvas(element: CropperCanvas) {
    canvasCache.set(this, element);
  }

  protected get $canvas(): CropperCanvas {
    return canvasCache.get(this);
  }

  set $selection(element: CropperSelection) {
    selectionCache.set(this, element);
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
      $selection = getRootDocument(this)?.querySelector(this.selection) ?? null;
    } else {
      $selection = this.closest(this.$getTagNameOf(CROPPER_SELECTION));
    }

    if (isElement($selection)) {
      this.$selection = $selection;
      this.$onSelectionChange = this.$handleSelectionChange.bind(this);
      on($selection, EVENT_CHANGE, this.$onSelectionChange);

      const $canvas: CropperCanvas | null = $selection.closest(this.$getTagNameOf(CROPPER_CANVAS));

      if ($canvas) {
        this.$canvas = $canvas;

        const $sourceImage: CropperImage | null = $canvas.querySelector(
          this.$getTagNameOf(CROPPER_IMAGE),
        );

        if ($sourceImage) {
          this.$sourceImage = $sourceImage;
          this.$image = $sourceImage.cloneNode(true) as CropperImage;
          this.$getShadowRoot().appendChild(this.$image);
          this.$onSourceImageLoad = this.$handleSourceImageLoad.bind(this);
          this.$onSourceImageTransform = this.$handleSourceImageTransform.bind(this);
          on($sourceImage.$image, EVENT_LOAD, this.$onSourceImageLoad);
          on($sourceImage, EVENT_TRANSFORM, this.$onSourceImageTransform);
        }
      }

      this.$render();
    }
  }

  protected disconnectedCallback(): void {
    const { $selection, $sourceImage } = this;

    if ($selection && this.$onSelectionChange) {
      off($selection, EVENT_CHANGE, this.$onSelectionChange);
      this.$onSelectionChange = null;
    }

    if ($sourceImage && this.$onSourceImageLoad) {
      off($sourceImage.$image, EVENT_LOAD, this.$onSourceImageLoad);
      this.$onSourceImageLoad = null;
    }

    if ($sourceImage && this.$onSourceImageTransform) {
      off($sourceImage, EVENT_TRANSFORM, this.$onSourceImageTransform);
      this.$onSourceImageTransform = null;
    }

    super.disconnectedCallback();
  }

  protected $handleSelectionChange(event: Event): void {
    this.$render((event as CustomEvent).detail);
  }

  protected $handleSourceImageLoad(): void {
    const { $image, $sourceImage } = this;
    const oldSrc = $image.getAttribute('src');
    const newSrc = $sourceImage.getAttribute('src');

    if (newSrc && newSrc !== oldSrc) {
      $image.setAttribute('src', newSrc);
      $image.$ready(() => {
        this.$render();
      });
    }
  }

  protected $handleSourceImageTransform(event?: Event): void {
    this.$render(undefined, (event as CustomEvent).detail.matrix);
  }

  protected $render(selection?: Selection, matrix?: number[]): void {
    const { $canvas, $selection } = this;

    if (!selection && !$selection.hidden) {
      selection = $selection;
    }

    if (!selection || (
      selection.x === 0
      && selection.y === 0
      && selection.width === 0
      && selection.height === 0
    )) {
      selection = {
        x: 0,
        y: 0,
        width: $canvas.offsetWidth,
        height: $canvas.offsetHeight,
      };
    }

    const {
      x,
      y,
      width,
      height,
    } = selection;
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
        scale = height > 0 ? clientHeight / height : 0;
        newWidth = width * scale;
        styles.width = newWidth;
        break;

      case RESIZE_VERTICAL:
        scale = width > 0 ? clientWidth / width : 0;
        newHeight = height * scale;
        styles.height = newHeight;
        break;

      case RESIZE_NONE:
      default:
        if (clientWidth > 0) {
          scale = width > 0 ? clientWidth / width : 0;
        } else if (clientHeight > 0) {
          scale = height > 0 ? clientHeight / height : 0;
        }
    }

    this.$scale = scale;
    this.$setStyles(styles);

    if (this.$sourceImage) {
      // Transform the image by the selection offset after the next DOM update cycle
      setTimeout(() => {
        this.$transformImageByOffset(matrix ?? this.$sourceImage.$getTransform(), -x, -y);
      });
    }
  }

  protected $transformImageByOffset(matrix: number[], x: number, y: number): void {
    const {
      $image,
      $scale,
      $sourceImage,
    } = this;

    if ($sourceImage && $image && $scale >= 0) {
      const [a, b, c, d, e, f] = matrix;
      const translateX = ((x * d) - (c * y)) / ((a * d) - (c * b));
      const translateY = ((y * a) - (b * x)) / ((a * d) - (c * b));
      const newE = a * translateX + c * translateY + e;
      const newF = b * translateX + d * translateY + f;

      $image.$ready((image) => {
        this.$setStyles.call($image, {
          width: image.naturalWidth * $scale,
          height: image.naturalHeight * $scale,
        });
      });
      $image.$setTransform(a, b, c, d, newE * $scale, newF * $scale);
    }
  }
}
