import CropperElement from '@cropper/element';
import type CropperCanvas from '@cropper/element-canvas';
import type CropperSelection from '@cropper/element-selection';
import {
  ACTION_SELECT,
  CROPPER_CANVAS,
  CROPPER_SELECTION,
  CROPPER_SHADE,
  EVENT_ACTION_END,
  EVENT_ACTION_START,
  EVENT_CHANGE,
  WINDOW,
  isNumber,
  off,
  on,
} from '@cropper/utils';
import style from './style';

const canvasCache = new WeakMap();

export default class CropperShade extends CropperElement {
  static $name = CROPPER_SHADE;

  static $version = '__VERSION__';

  protected $onCanvasActionEnd: EventListener | null = null;

  protected $onCanvasActionStart: EventListener | null = null;

  protected $onSelectionChange: EventListener | null = null;

  protected $style = style;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  slottable = false;

  themeColor = 'rgba(0, 0, 0, 0.65)';

  protected set $canvas(element: CropperCanvas) {
    canvasCache.set(this, element);
  }

  protected get $canvas(): CropperCanvas {
    return canvasCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'height',
      'width',
      'x',
      'y',
    ]);
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    const $canvas: CropperCanvas | null = this.closest(this.$getTagNameOf(CROPPER_CANVAS));

    if ($canvas) {
      this.$canvas = $canvas;
      this.style.position = 'absolute';

      const $selection: CropperSelection | null = $canvas.querySelector(
        this.$getTagNameOf(CROPPER_SELECTION),
      );

      if ($selection) {
        this.$onCanvasActionStart = (event) => {
          if ($selection.hidden && (event as CustomEvent).detail.action === ACTION_SELECT) {
            this.hidden = false;
          }
        };
        this.$onCanvasActionEnd = (event) => {
          if ($selection.hidden && (event as CustomEvent).detail.action === ACTION_SELECT) {
            this.hidden = true;
          }
        };
        this.$onSelectionChange = (event) => {
          const {
            x,
            y,
            width,
            height,
          } = $selection.multiple ? (event as CustomEvent).detail : $selection;

          this.$change(x, y, width, height);

          if ($selection.hidden || (x === 0 && y === 0 && width === 0 && height === 0)) {
            this.hidden = true;
          }
        };
        on($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
        on($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
        on($canvas, EVENT_CHANGE, this.$onSelectionChange);
      }
    }

    this.$render();
  }

  protected disconnectedCallback(): void {
    const { $canvas } = this;

    if ($canvas) {
      if (this.$onCanvasActionStart) {
        off($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
        this.$onCanvasActionStart = null;
      }

      if (this.$onCanvasActionEnd) {
        off($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
        this.$onCanvasActionEnd = null;
      }

      if (this.$onSelectionChange) {
        off($canvas, EVENT_CHANGE, this.$onSelectionChange);
        this.$onSelectionChange = null;
      }
    }

    super.disconnectedCallback();
  }

  /**
   * Changes the position and/or size of the shade.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} y The new position in the vertical direction.
   * @param {number} [width] The new width.
   * @param {number} [height] The new height.
   * @returns {CropperShade} Returns `this` for chaining.
   */
  $change(x: number, y: number, width: number = this.width, height: number = this.height): this {
    if (
      !isNumber(x)
      || !isNumber(y)
      || !isNumber(width)
      || !isNumber(height)
      || (x === this.x && y === this.y && width === this.width && height === this.height)
    ) {
      return this;
    }

    if (this.hidden) {
      this.hidden = false;
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    return this.$render();
  }

  /**
   * Resets the shade to its initial position and size.
   * @returns {CropperShade} Returns `this` for chaining.
   */
  $reset(): this {
    return this.$change(0, 0, 0, 0);
  }

  /**
   * Refreshes the position or size of the shade.
   * @returns {CropperShade} Returns `this` for chaining.
   */
  $render(): this {
    return this.$setStyles({
      transform: `translate(${this.x}px, ${this.y}px)`,
      width: this.width,
      height: this.height,
      outlineWidth: WINDOW.innerWidth,
    });
  }
}
