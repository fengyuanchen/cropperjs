import {
  ACTION_MOVE,
  ACTION_ROTATE,
  ACTION_SCALE,
  ACTION_TRANSFORM,
  CROPPER_CANVAS,
  CROPPER_SELECTION,
  EVENT_ACTION,
  EVENT_LOAD,
  EVENT_TRANSFORM,
  isNumber,
  off,
  on,
  once,
  toAngleInRadian,
} from '@cropper/utils';
import CropperElement from '@cropper/element';
import style from './style';

const NATIVE_ATTRIBUTES = [
  'alt',
  'crossorigin',
  'decoding',
  'importance',
  'loading',
  'referrerpolicy',
  'sizes',
  'src',
  'srcset',
];

export default class CropperImage extends CropperElement {
  static $version = '__VERSION__';

  protected $matrix: number[] = [1, 0, 0, 1, 0, 0];

  protected $onCanvasAction: EventListener | null = null;

  protected $style: string = style;

  readonly $image: HTMLImageElement = new Image();

  rotatable = true;

  scalable = true;

  skewable = true;

  slottable = false;

  translatable = true;

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat(NATIVE_ATTRIBUTES, [
      'rotatable',
      'scalable',
      'skewable',
      'translatable',
    ]);
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (newValue === oldValue) {
      return;
    }

    super.attributeChangedCallback(name, oldValue, newValue);

    // Inherits the native attributes
    if (NATIVE_ATTRIBUTES.includes(name)) {
      this.$image.setAttribute(name, newValue);
    }
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    const { $image } = this;

    once($image, EVENT_LOAD, () => {
      this.$setStyles({
        width: $image.naturalWidth,
        height: $image.naturalHeight,
      });
    });

    const canvas: any = this.closest(CROPPER_CANVAS);

    if (canvas) {
      this.$setStyles({
        left: 0,
        position: 'absolute',
        top: 0,
      });

      const onLoad = () => {
        this.$center();
        this.$fit();
      };

      if ($image.complete) {
        onLoad();
      } else {
        once($image, EVENT_LOAD, onLoad);
      }

      if (this.scalable || this.translatable) {
        on(canvas, EVENT_ACTION, (this.$onCanvasAction = this.$handleAction.bind(this)));
      }
    }

    this.$getShadowRoot().appendChild($image);
  }

  protected disconnectedCallback(): void {
    const canvas = this.closest(CROPPER_CANVAS);

    if (canvas && this.$onCanvasAction) {
      off(canvas, EVENT_ACTION, this.$onCanvasAction);
    }

    this.$getShadowRoot().removeChild(this.$image);
    super.disconnectedCallback();
  }

  protected $handleAction(event: Event | CustomEvent): void {
    if (this.hidden) {
      return;
    }

    const canvas: any = this.closest(CROPPER_CANVAS);
    const selection = canvas.querySelector(CROPPER_SELECTION);
    const { detail } = event as CustomEvent;

    if (detail && (!selection || selection.hidden)) {
      switch (detail.action) {
        case ACTION_MOVE:
          this.$move(detail.endX - detail.startX, detail.endY - detail.startY);
          break;

        case ACTION_SCALE:
          this.$scale(detail.scale);
          break;

        case ACTION_ROTATE:
          this.$rotate(detail.rotate);
          break;

        case ACTION_TRANSFORM: {
          const { rotate, scale } = detail;

          this.$transform(
            scale * Math.cos(rotate),
            scale * Math.sin(rotate),
            scale * -Math.sin(rotate),
            scale * Math.cos(rotate),
            0,
            0,
          );
          break;
        }

        default:
      }
    }
  }

  /**
   * Aligns the image to the center of its parent element.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $center(): this {
    const { parentElement } = this;

    if (!parentElement) {
      return this;
    }

    const { offsetWidth, offsetHeight } = parentElement;
    const [a, b, c, d] = this.$matrix;
    const width = this.$image.naturalWidth * a;
    const height = this.$image.naturalHeight * d;
    const e = (offsetWidth - width) / 2;
    const f = (offsetHeight - height) / 2;

    return this.$setTransform(a, b, c, d, e, f);
  }

  /**
   * Fits the image to its parent element.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $fit(): this {
    const { parentElement } = this;

    if (!parentElement) {
      return this;
    }

    const { offsetWidth, offsetHeight } = parentElement;
    const [a, d] = this.$matrix;
    const width = this.$image.naturalWidth * a;
    const height = this.$image.naturalHeight * d;

    if (width > offsetWidth || height > offsetHeight) {
      this.$scale(Math.max(
        (width - offsetWidth) / width,
        (height - offsetHeight) / height,
      ));
    }

    return this;
  }

  /**
   * Moves the image.
   * @param {number} x The moving distance in the horizontal direction.
   * @param {number} [y=x] The moving distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $move(x: number, y: number = x): this {
    if (this.translatable && isNumber(x) && isNumber(y)) {
      const [a, b, c, d] = this.$matrix;
      const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
      const f = (y - (b * e)) / d;

      this.$translate(e, f);
    }

    return this;
  }

  /**
   * Moves the image to a specific position.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} [y=x] The new position in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $moveTo(x: number, y: number = x): this {
    if (this.translatable && isNumber(x) && isNumber(y)) {
      const [a, b, c, d] = this.$matrix;
      const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
      const f = (y - (b * e)) / d;

      this.$setTransform(a, b, c, d, e, f);
    }

    return this;
  }

  /**
   * Rotates the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
   * @param {number|string} angle The rotation angle (in radians).
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $rotate(angle: number | string): this {
    if (this.rotatable) {
      const radian = toAngleInRadian(angle);

      this.$transform(
        Math.cos(radian),
        Math.sin(radian),
        -Math.sin(radian),
        Math.cos(radian),
        0,
        0,
      );
    }

    return this;
  }

  /**
   * Scales the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
   * @param {number} x The scaling factor in the horizontal direction.
   * @param {number} [y=x] The scaling factor in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $scale(x: number, y: number = x): this {
    if (this.scalable) {
      this.$transform(x, 0, 0, y, 0, 0);
    }

    return this;
  }

  /**
   * Skews the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
   * @param {number|string} x The skewing angle in the horizontal direction.
   * @param {number|string} [y=0] The skewing angle in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $skew(x: number | string, y: number | string = 0): this {
    if (this.skewable) {
      const radianX = toAngleInRadian(x);
      const radianY = toAngleInRadian(y);

      this.$transform(1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0);
    }

    return this;
  }

  /**
   * Translates the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
   * @param {number} x The translating distance in the horizontal direction.
   * @param {number} [y=x] The translating distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $translate(x: number, y: number = x): this {
    if (this.translatable && isNumber(x) && isNumber(y)) {
      this.$transform(1, 0, 0, 1, x, y);
    }

    return this;
  }

  /**
   * Transforms the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
   * @param {number} a The scaling factor in the horizontal direction.
   * @param {number} b The skewing angle in the vertical direction.
   * @param {number} c The skewing angle in the horizontal direction.
   * @param {number} d The scaling factor in the vertical direction.
   * @param {number} e The translating distance in the horizontal direction.
   * @param {number} f The translating distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $transform(a: number, b: number, c: number, d: number, e: number, f: number): this {
    if (
      isNumber(a)
      && isNumber(b)
      && isNumber(c)
      && isNumber(d)
      && isNumber(e)
      && isNumber(f)
    ) {
      const [a1, b1, c1, d1, e1, f1] = this.$matrix;
      const [a2, b2, c2, d2, e2, f2] = [a, b, c, d, e, f];

      // ┌ a1 c1 e1 ┐   ┌ a2 c2 e2 ┐
      // │ b1 d1 f1 │ × │ b2 d2 f2 │
      // └ 0  0  1  ┘   └ 0  0  1  ┘
      return this.$setTransform(
        a1 * a2 + c1 * b2/* + e1 * 0 */,
        b1 * a2 + d1 * b2/* + f1 * 0 */,
        a1 * c2 + c1 * d2/* + e1 * 0 */,
        b1 * c2 + d1 * d2/* + f1 * 0 */,
        a1 * e2 + c1 * f2 + e1/* * 1 */,
        b1 * e2 + d1 * f2 + f1/* * 1 */,
      );
    }

    return this;
  }

  /**
   * Resets (overrides) the current transform to the specific identity matrix.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
   * @param {number|Array} a The scaling factor in the horizontal direction.
   * @param {number} b The skewing angle in the vertical direction.
   * @param {number} c The skewing angle in the horizontal direction.
   * @param {number} d The scaling factor in the vertical direction.
   * @param {number} e The translating distance in the horizontal direction.
   * @param {number} f The translating distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $setTransform(
    a: number | number[],
    b?: number,
    c?: number,
    d?: number,
    e?: number,
    f?: number,
  ): this {
    if (this.rotatable || this.scalable || this.skewable || this.translatable) {
      if (Array.isArray(a)) {
        [a, b, c, d, e, f] = a;
      }

      if (
        isNumber(a)
        && isNumber(b)
        && isNumber(c)
        && isNumber(d)
        && isNumber(e)
        && isNumber(f)
      ) {
        const newMatrix = [a, b, c, d, e, f];

        if (this.$emit(EVENT_TRANSFORM, {
          matrix: newMatrix,
          oldMatrix: this.$matrix,
        }) === false) {
          return this;
        }

        this.$matrix = newMatrix;
        this.style.transform = `matrix(${newMatrix.join(', ')})`;
      }
    }

    return this;
  }

  /**
   * Resets (overrides) the current transform to the specific identity matrix by a certain offset.
   * @param {Array} matrix The transformation matrix.
   * @param {number} [x=0] The horizontal offset of the transformation origin.
   * @param {number} [y=0] The vertical offset of the transformation origin.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $setTransformByOffset(matrix: number[], x = 0, y = 0): this {
    if (Array.isArray(matrix) && isNumber(x) && isNumber(y)) {
      const [a, b, c, d] = matrix;
      const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
      const f = (y - (b * e)) / d;
      const [a1, b1, c1, d1, e1, f1] = matrix;
      const [a2, b2, c2, d2, e2, f2] = [1, 0, 0, 1, e, f];

      matrix = [
        a1 * a2 + c1 * b2,
        b1 * a2 + d1 * b2,
        a1 * c2 + c1 * d2,
        b1 * c2 + d1 * d2,
        a1 * e2 + c1 * f2 + e1,
        b1 * e2 + d1 * f2 + f1,
      ];
    }

    return this.$setTransform(matrix);
  }

  /**
   * Retrieves the current transformation matrix being applied to the element.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
   * @returns {Array} Returns the readonly transformation matrix.
   */
  $getTransform(): number[] {
    return this.$matrix.slice();
  }

  /**
   * Resets the current transform to the initial identity matrix.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $resetTransform(): this {
    return this.$setTransform([1, 0, 0, 1, 0, 0]);
  }
}
