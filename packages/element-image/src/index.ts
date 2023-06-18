import CropperElement from '@cropper/element';
import type CropperCanvas from '@cropper/element-canvas';
import {
  ACTION_MOVE,
  ACTION_NONE,
  ACTION_ROTATE,
  ACTION_SCALE,
  ACTION_TRANSFORM,
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  EVENT_ACTION,
  EVENT_ACTION_END,
  EVENT_ACTION_START,
  EVENT_ERROR,
  EVENT_LOAD,
  EVENT_TRANSFORM,
  isFunction,
  isNumber,
  multiplyMatrices,
  off,
  on,
  once,
  toAngleInRadian,
} from '@cropper/utils';
import style from './style';

const canvasCache = new WeakMap();
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
  static $name = CROPPER_IMAGE;

  static $version = '__VERSION__';

  protected $matrix = [1, 0, 0, 1, 0, 0];

  protected $onLoad: EventListener | null = null;

  protected $onCanvasAction: EventListener | null = null;

  protected $onCanvasActionEnd: EventListener | null = null;

  protected $onCanvasActionStart: EventListener | null = null;

  protected $actionStartTarget: EventTarget | null = null;

  protected $style = style;

  readonly $image = new Image();

  rotatable = true;

  scalable = true;

  skewable = true;

  slottable = false;

  translatable = true;

  protected set $canvas(element: CropperCanvas) {
    canvasCache.set(this, element);
  }

  protected get $canvas(): CropperCanvas {
    return canvasCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat(NATIVE_ATTRIBUTES, [
      'rotatable',
      'scalable',
      'skewable',
      'translatable',
    ]);
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (Object.is(newValue, oldValue)) {
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
    const $canvas: CropperCanvas | null = this.closest(this.$getTagNameOf(CROPPER_CANVAS));

    if ($canvas) {
      this.$canvas = $canvas;
      this.$setStyles({
        position: 'absolute',
      });

      this.$onCanvasActionStart = (event: Event | CustomEvent) => {
        this.$actionStartTarget = (event as CustomEvent).detail?.relatedEvent?.target;
      };
      this.$onCanvasActionEnd = () => {
        this.$actionStartTarget = null;
      };
      this.$onCanvasAction = this.$handleAction.bind(this);
      on($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
      on($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
      on($canvas, EVENT_ACTION, this.$onCanvasAction);
    }

    this.$onLoad = this.$handleLoad.bind(this);
    on($image, EVENT_LOAD, this.$onLoad);
    this.$getShadowRoot().appendChild($image);
  }

  protected disconnectedCallback(): void {
    const { $image, $canvas } = this;

    if ($canvas) {
      if (this.$onCanvasActionStart) {
        off($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
        this.$onCanvasActionStart = null;
      }

      if (this.$onCanvasActionEnd) {
        off($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
        this.$onCanvasActionEnd = null;
      }

      if (this.$onCanvasAction) {
        off($canvas, EVENT_ACTION, this.$onCanvasAction);
        this.$onCanvasAction = null;
      }
    }

    if ($image && this.$onLoad) {
      off($image, EVENT_LOAD, this.$onLoad);
      this.$onLoad = null;
    }

    this.$getShadowRoot().removeChild($image);
    super.disconnectedCallback();
  }

  protected $handleLoad(): void {
    const { $image } = this;

    this.$setStyles({
      width: $image.naturalWidth,
      height: $image.naturalHeight,
    });

    if (this.$canvas) {
      this.$center('cover');
    }
  }

  protected $handleAction(event: Event | CustomEvent): void {
    if (this.hidden || !(this.rotatable || this.scalable || this.translatable)) {
      return;
    }

    const { $canvas } = this;
    const { detail } = event as CustomEvent;

    if (detail) {
      const { relatedEvent } = detail;
      let { action } = detail;

      if (action === ACTION_TRANSFORM && (!this.rotatable || !this.scalable)) {
        if (this.rotatable) {
          action = ACTION_ROTATE;
        } else if (this.scalable) {
          action = ACTION_SCALE;
        } else {
          action = ACTION_NONE;
        }
      }

      switch (action) {
        case ACTION_MOVE:
          if (this.translatable) {
            const cropperSelectionTagName = this.$getTagNameOf(CROPPER_SELECTION);
            let selection: any = $canvas.querySelector(cropperSelectionTagName);

            if (selection && selection.multiple && !selection.active) {
              selection = $canvas.querySelector(`${cropperSelectionTagName}[active]`);
            }

            if (!selection || selection.hidden || !selection.movable
              || !(this.$actionStartTarget && selection.contains(this.$actionStartTarget))
            ) {
              this.$move(detail.endX - detail.startX, detail.endY - detail.startY);
            }
          }
          break;

        case ACTION_ROTATE:
          if (this.rotatable) {
            if (relatedEvent) {
              const { x, y } = this.getBoundingClientRect();

              this.$rotate(
                detail.rotate,
                relatedEvent.clientX - x,
                relatedEvent.clientY - y,
              );
            } else {
              this.$rotate(detail.rotate);
            }
          }
          break;

        case ACTION_SCALE:
          if (this.scalable) {
            if (relatedEvent) {
              const { x, y } = this.getBoundingClientRect();

              this.$zoom(
                detail.scale,
                relatedEvent.clientX - x,
                relatedEvent.clientY - y,
              );
            } else {
              this.$zoom(detail.scale);
            }
          }
          break;

        case ACTION_TRANSFORM:
          if (this.rotatable && this.scalable) {
            const { rotate } = detail;
            let { scale } = detail;

            if (scale < 0) {
              scale = 1 / (1 - scale);
            } else {
              scale += 1;
            }

            const cos = Math.cos(rotate);
            const sin = Math.sin(rotate);
            const [scaleX, skewY, skewX, scaleY] = [
              cos * scale,
              sin * scale,
              -sin * scale,
              cos * scale,
            ];

            if (relatedEvent) {
              const clientRect = this.getBoundingClientRect();
              const x = relatedEvent.clientX - clientRect.x;
              const y = relatedEvent.clientY - clientRect.y;
              const [a, b, c, d] = this.$matrix;
              const originX = clientRect.width / 2;
              const originY = clientRect.height / 2;
              const moveX = x - originX;
              const moveY = y - originY;
              const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
              const translateY = (moveY - (b * translateX)) / d;

              /**
               * Equals to
               * this.$rotate(rotate, x, y);
               * this.$scale(scale, x, y);
               */
              this.$transform(
                scaleX,
                skewY,
                skewX,
                scaleY,
                translateX * (1 - scaleX) + translateY * skewX,
                translateY * (1 - scaleY) + translateX * skewY,
              );
            } else {
              /**
               * Equals to
               * this.$rotate(rotate);
               * this.$scale(scale);
               */
              this.$transform(scaleX, skewY, skewX, scaleY, 0, 0);
            }
          }
          break;

        default:
      }
    }
  }

  /**
   * Defers the callback to execute after successfully loading the image.
   * @param {Function} [callback] The callback to execute after successfully loading the image.
   * @returns {Promise} Returns a promise that resolves to the image element.
   */
  $ready(callback?: (image: HTMLImageElement) => unknown): Promise<HTMLImageElement> {
    const { $image } = this;
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const error = new Error('Failed to load the image source');

      if ($image.complete) {
        if ($image.naturalWidth > 0 && $image.naturalHeight > 0) {
          resolve($image);
        } else {
          reject(error);
        }
      } else {
        const onLoad = () => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          off($image, EVENT_ERROR, onError);
          resolve($image);
        };
        const onError = () => {
          off($image, EVENT_LOAD, onLoad);
          reject(error);
        };

        once($image, EVENT_LOAD, onLoad);
        once($image, EVENT_ERROR, onError);
      }
    });

    if (isFunction(callback)) {
      promise.then((image) => {
        callback(image);
        return image;
      });
    }

    return promise;
  }

  /**
   * Aligns the image to the center of its parent element.
   * @param {string} [size] The size of the image.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $center(size?: string): this {
    const { parentElement } = this;

    if (!parentElement) {
      return this;
    }

    const container = parentElement.getBoundingClientRect();
    const containerWidth = container.width;
    const containerHeight = container.height;
    const {
      x,
      y,
      width,
      height,
    } = this.getBoundingClientRect();
    const startX = x + (width / 2);
    const startY = y + (height / 2);
    const endX = container.x + (containerWidth / 2);
    const endY = container.y + (containerHeight / 2);

    this.$move(endX - startX, endY - startY);

    if (size && (width !== containerWidth || height !== containerHeight)) {
      const scaleX = containerWidth / width;
      const scaleY = containerHeight / height;

      switch (size) {
        case 'cover':
          this.$scale(Math.max(scaleX, scaleY));
          break;

        case 'contain':
          this.$scale(Math.min(scaleX, scaleY));
          break;

        default:
      }
    }

    return this;
  }

  /**
   * Moves the image.
   * @param {number} x The moving distance in the horizontal direction.
   * @param {number} [y] The moving distance in the vertical direction.
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
   * @param {number} [y] The new position in the vertical direction.
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
   * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
   * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $rotate(angle: number | string, x?: number, y?: number): this {
    if (this.rotatable) {
      const radian = toAngleInRadian(angle);
      const cos = Math.cos(radian);
      const sin = Math.sin(radian);
      const [scaleX, skewY, skewX, scaleY] = [cos, sin, -sin, cos];

      if (isNumber(x) && isNumber(y)) {
        const [a, b, c, d] = this.$matrix;
        const { width, height } = this.getBoundingClientRect();
        const originX = width / 2;
        const originY = height / 2;
        const moveX = x - originX;
        const moveY = y - originY;
        const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
        const translateY = (moveY - (b * translateX)) / d;

        /**
         * Equals to
         * this.$translate(translateX, translateX);
         * this.$rotate(angle);
         * this.$translate(-translateX, -translateX);
         */
        this.$transform(
          scaleX,
          skewY,
          skewX,
          scaleY,
          translateX * (1 - scaleX) - translateY * skewX,
          translateY * (1 - scaleY) - translateX * skewY,
        );
      } else {
        this.$transform(scaleX, skewY, skewX, scaleY, 0, 0);
      }
    }

    return this;
  }

  /**
   * Zooms the image.
   * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
   * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
   * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $zoom(scale: number, x?: number, y?: number): this {
    if (!this.scalable || scale === 0) {
      return this;
    }

    if (scale < 0) {
      scale = 1 / (1 - scale);
    } else {
      scale += 1;
    }

    if (isNumber(x) && isNumber(y)) {
      const [a, b, c, d] = this.$matrix;
      const { width, height } = this.getBoundingClientRect();
      const originX = width / 2;
      const originY = height / 2;
      const moveX = x - originX;
      const moveY = y - originY;
      const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
      const translateY = (moveY - (b * translateX)) / d;

      /**
       * Equals to
       * this.$translate(translateX, translateX);
       * this.$scale(scale);
       * this.$translate(-translateX, -translateX);
       */
      this.$transform(scale, 0, 0, scale, translateX * (1 - scale), translateY * (1 - scale));
    } else {
      this.$scale(scale);
    }

    return this;
  }

  /**
   * Scales the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
   * @param {number} x The scaling factor in the horizontal direction.
   * @param {number} [y] The scaling factor in the vertical direction.
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
   * @param {number|string} [y] The skewing angle in the vertical direction.
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
   * @param {number} [y] The translating distance in the vertical direction.
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
      return this.$setTransform(multiplyMatrices(this.$matrix, [a, b, c, d, e, f]));
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
