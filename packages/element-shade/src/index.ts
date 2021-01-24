import CropperElement from '@cropper/element';
import {
  CROPPER_CANVAS,
  CROPPER_SELECTION,
  EVENT_ACTION_END,
  EVENT_ACTION_START,
  EVENT_CHANGE,
  WINDOW,
} from '@cropper/helper-constants';
import {
  isNumber,
  off,
  on,
} from '@cropper/helper-utils';
import style from './style';

export default class CropperShade extends CropperElement {
  static $version = '__VERSION__';

  protected $onChange: EventListener | null = null;

  protected $onCropEnd: EventListener | null = null;

  protected $onCropStart: EventListener | null = null;

  protected $style: string = style;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  slottable = false;

  themeColor = 'rgba(0, 0, 0, 0.65)';

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'x',
      'y',
      'width',
      'height',
    ]);
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    const canvas: HTMLElement | null = this.closest(CROPPER_CANVAS);

    if (canvas) {
      const selection: HTMLElement | null = canvas.querySelector(CROPPER_SELECTION);

      on(canvas, EVENT_ACTION_START, (this.$onCropStart = () => {
        if (!selection || selection.hidden) {
          this.hidden = false;
        }
      }));
      on(canvas, EVENT_ACTION_END, (this.$onCropEnd = () => {
        if (!selection || selection.hidden) {
          this.hidden = true;
        }
      }));
      on(canvas, EVENT_CHANGE, (this.$onChange = (event) => {
        const { detail } = event as CustomEvent;

        this.$change(detail.x, detail.y, detail.width, detail.height);
      }));
    }

    this.$render();
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();

    const canvas: HTMLElement | null = this.closest(CROPPER_CANVAS);

    if (canvas) {
      if (this.$onCropStart) {
        off(canvas, EVENT_ACTION_START, this.$onCropStart);
      }

      if (this.$onCropEnd) {
        off(canvas, EVENT_ACTION_END, this.$onCropEnd);
      }

      if (this.$onChange) {
        off(canvas, EVENT_CHANGE, this.$onChange);
      }
    }
  }

  /**
   * Changes the position and/or size of the shade.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} y The new position in the vertical direction.
   * @param {number} [width=this.width] The new width.
   * @param {number} [height=this.height] The new height.
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
      outlineWidth: WINDOW.innerWidth,
      left: this.x,
      top: this.y,
      width: this.width,
      height: this.height,
    });
  }
}
