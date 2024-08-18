import CropperElement from '@cropper/element';
import type CropperCanvas from '@cropper/element-canvas';
import type CropperImage from '@cropper/element-image';
import {
  ACTION_MOVE,
  ACTION_RESIZE_EAST,
  ACTION_RESIZE_NORTH,
  ACTION_RESIZE_NORTHEAST,
  ACTION_RESIZE_NORTHWEST,
  ACTION_RESIZE_SOUTH,
  ACTION_RESIZE_SOUTHEAST,
  ACTION_RESIZE_SOUTHWEST,
  ACTION_RESIZE_WEST,
  ACTION_SCALE,
  ACTION_SELECT,
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  EVENT_ACTION,
  EVENT_ACTION_END,
  EVENT_ACTION_START,
  EVENT_CHANGE,
  EVENT_KEYDOWN,
  getAdjustedSizes,
  getOffset,
  isFunction,
  isNumber,
  isPlainObject,
  isPositiveNumber,
  off,
  on,
} from '@cropper/utils';
import style from './style';

const canvasCache = new WeakMap();

export interface Selection {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class CropperSelection extends CropperElement {
  static $name = CROPPER_SELECTION;

  static $version = '__VERSION__';

  protected $onCanvasAction: EventListener | null = null;

  protected $onCanvasActionStart: EventListener | null = null;

  protected $onCanvasActionEnd: EventListener | null = null;

  protected $onDocumentKeyDown: EventListener | null = null;

  protected $action = '';

  protected $actionStartTarget: EventTarget | null = null;

  protected $changing = false;

  protected $style = style;

  private $initialSelection = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  aspectRatio = NaN;

  initialAspectRatio = NaN;

  initialCoverage = NaN;

  active = false;

  // Deprecated as of v2.0.0-rc.0, use `dynamic` instead.
  linked = false;

  dynamic = false;

  movable = false;

  resizable = false;

  zoomable = false;

  multiple = false;

  keyboard = false;

  outlined = false;

  precise = false;

  protected set $canvas(element: CropperCanvas) {
    canvasCache.set(this, element);
  }

  protected get $canvas(): CropperCanvas {
    return canvasCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'active',
      'aspect-ratio',
      'dynamic',
      'height',
      'initial-aspect-ratio',
      'initial-coverage',
      'keyboard',
      'linked',
      'movable',
      'multiple',
      'outlined',
      'precise',
      'resizable',
      'width',
      'x',
      'y',
      'zoomable',
    ]);
  }

  protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void {
    if (Object.is(newValue, oldValue)) {
      return;
    }

    super.$propertyChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'x':
      case 'y':
      case 'width':
      case 'height':
        if (!this.$changing) {
          this.$nextTick(() => {
            this.$change(this.x, this.y, this.width, this.height, this.aspectRatio, true);
          });
        }
        break;

      case 'aspectRatio':
      case 'initialAspectRatio':
        this.$nextTick(() => {
          this.$initSelection();
        });
        break;

      case 'initialCoverage':
        this.$nextTick(() => {
          if (isPositiveNumber(newValue) && newValue <= 1) {
            this.$initSelection(true, true);
          }
        });
        break;

      case 'keyboard':
        this.$nextTick(() => {
          if (this.$canvas) {
            if (newValue) {
              if (!this.$onDocumentKeyDown) {
                this.$onDocumentKeyDown = this.$handleKeyDown.bind(this);
                on(this.ownerDocument, EVENT_KEYDOWN, this.$onDocumentKeyDown);
              }
            } else if (this.$onDocumentKeyDown) {
              off(this.ownerDocument, EVENT_KEYDOWN, this.$onDocumentKeyDown);
              this.$onDocumentKeyDown = null;
            }
          }
        });
        break;

      case 'multiple':
        this.$nextTick(() => {
          if (this.$canvas) {
            const selections = this.$getSelections();

            if (newValue) {
              selections.forEach((selection) => {
                selection.active = false;
              });
              this.active = true;
              this.$emit(EVENT_CHANGE, {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
              });
            } else {
              this.active = false;
              selections.slice(1).forEach((selection) => {
                this.$removeSelection(selection);
              });
            }
          }
        });
        break;

      case 'precise':
        this.$nextTick(() => {
          this.$change(this.x, this.y);
        });
        break;

      // Backwards compatible with 2.0.0-rc
      case 'linked':
        if (newValue) {
          this.dynamic = true;
        }
        break;

      default:
    }
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    const $canvas: CropperCanvas | null = this.closest(this.$getTagNameOf(CROPPER_CANVAS));

    if ($canvas) {
      this.$canvas = $canvas;
      this.$setStyles({
        position: 'absolute',
        transform: `translate(${this.x}px, ${this.y}px)`,
      });

      if (!this.hidden) {
        this.$render();
      }

      this.$initSelection(true);
      this.$onCanvasActionStart = this.$handleActionStart.bind(this);
      this.$onCanvasActionEnd = this.$handleActionEnd.bind(this);
      this.$onCanvasAction = this.$handleAction.bind(this);
      on($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
      on($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
      on($canvas, EVENT_ACTION, this.$onCanvasAction);
    } else {
      this.$render();
    }
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

      if (this.$onCanvasAction) {
        off($canvas, EVENT_ACTION, this.$onCanvasAction);
        this.$onCanvasAction = null;
      }
    }

    super.disconnectedCallback();
  }

  protected $getSelections(): CropperSelection[] {
    let selections: CropperSelection[] = [];

    if (this.parentElement) {
      selections = Array.from(this.parentElement.querySelectorAll(
        this.$getTagNameOf(CROPPER_SELECTION),
      ));
    }

    return selections;
  }

  protected $initSelection(center = false, resize = false) {
    const { initialCoverage, parentElement } = this;

    if (isPositiveNumber(initialCoverage) && parentElement) {
      const aspectRatio = this.aspectRatio || this.initialAspectRatio;
      let width = (resize ? 0 : this.width) || parentElement.offsetWidth * initialCoverage;
      let height = (resize ? 0 : this.height) || parentElement.offsetHeight * initialCoverage;

      if (isPositiveNumber(aspectRatio)) {
        ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }));
      }

      this.$change(this.x, this.y, width, height);

      if (center) {
        this.$center();
      }

      // Overrides the initial position and size
      this.$initialSelection = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };
    }
  }

  protected $createSelection(): CropperSelection {
    const newSelection = this.cloneNode(true) as CropperSelection;

    if (this.hasAttribute('id')) {
      newSelection.removeAttribute('id');
    }

    newSelection.initialCoverage = NaN;
    this.active = false;

    if (this.parentElement) {
      this.parentElement.insertBefore(newSelection, this.nextSibling);
    }

    return newSelection;
  }

  protected $removeSelection(selection: CropperSelection = this): void {
    if (this.parentElement) {
      const selections = this.$getSelections();

      if (selections.length > 1) {
        const index = selections.indexOf(selection);
        const activeSelection = selections[index + 1] || selections[index - 1];

        if (activeSelection) {
          selection.active = false;
          this.parentElement.removeChild(selection);
          activeSelection.active = true;
          activeSelection.$emit(EVENT_CHANGE, {
            x: activeSelection.x,
            y: activeSelection.y,
            width: activeSelection.width,
            height: activeSelection.height,
          });
        }
      } else {
        this.$clear();
      }
    }
  }

  protected $handleActionStart(event: Event): void {
    const relatedTarget = (event as CustomEvent).detail?.relatedEvent?.target;

    this.$action = '';
    this.$actionStartTarget = relatedTarget;

    if (
      !this.hidden
      && this.multiple
      && !this.active
      && relatedTarget === this
      && this.parentElement
    ) {
      this.$getSelections().forEach((selection) => {
        (selection as CropperSelection).active = false;
      });
      this.active = true;
      this.$emit(EVENT_CHANGE, {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      });
    }
  }

  protected $handleAction(event: Event): void {
    const { currentTarget, detail } = event as CustomEvent;

    if (!currentTarget || !detail) {
      return;
    }

    const { relatedEvent } = detail;
    let { action } = detail;

    // Switching to another selection
    if (!action && this.multiple) {
      // Get the `action` property from the focusing in selection
      action = this.$action || relatedEvent?.target.action;
      this.$action = action;
    }

    if (!action
      || (this.hidden && action !== ACTION_SELECT)
      || (this.multiple && !this.active && action !== ACTION_SCALE)) {
      return;
    }

    const moveX = detail.endX - detail.startX;
    const moveY = detail.endY - detail.startY;
    const { width, height } = this;
    let { aspectRatio } = this;

    // Locking aspect ratio by holding shift key
    if (!isPositiveNumber(aspectRatio) && relatedEvent.shiftKey) {
      aspectRatio = isPositiveNumber(width) && isPositiveNumber(height) ? width / height : 1;
    }

    switch (action) {
      case ACTION_SELECT:
        if (moveX !== 0 && moveY !== 0) {
          const { $canvas } = this;
          const offset = getOffset(currentTarget as Element);

          (this.multiple && !this.hidden ? this.$createSelection() : this).$change(
            detail.startX - offset.left,
            detail.startY - offset.top,
            Math.abs(moveX),
            Math.abs(moveY),
            aspectRatio,
          );

          if (moveX < 0) {
            if (moveY < 0) {
              // ↖️
              action = ACTION_RESIZE_NORTHWEST;
            } else if (moveY > 0) {
              // ↙️
              action = ACTION_RESIZE_SOUTHWEST;
            }
          } else if (moveX > 0) {
            if (moveY < 0) {
              // ↗️
              action = ACTION_RESIZE_NORTHEAST;
            } else if (moveY > 0) {
              // ↘️
              action = ACTION_RESIZE_SOUTHEAST;
            }
          }

          if ($canvas) {
            ($canvas as any).$action = action;
          }
        }
        break;

      case ACTION_MOVE:
        if (this.movable && (
          this.dynamic
          || (this.$actionStartTarget && this.contains(this.$actionStartTarget as Node))
        )) {
          this.$move(moveX, moveY);
        }
        break;

      case ACTION_SCALE:
        if (relatedEvent && this.zoomable && (
          this.dynamic
          || this.contains(relatedEvent.target as Node)
        )) {
          const offset = getOffset(currentTarget as Element);

          this.$zoom(
            detail.scale,
            relatedEvent.pageX - offset.left,
            relatedEvent.pageY - offset.top,
          );
        }
        break;

      default:
        this.$resize(action, moveX, moveY, aspectRatio);
    }
  }

  protected $handleActionEnd(): void {
    this.$action = '';
    this.$actionStartTarget = null;
  }

  protected $handleKeyDown(event: Event): void {
    if (
      this.hidden
      || !this.keyboard
      || (this.multiple && !this.active)
      || event.defaultPrevented
    ) {
      return;
    }

    const { activeElement } = document;

    // Disable keyboard control when input something
    if (activeElement && (
      ['INPUT', 'TEXTAREA'].includes(activeElement.tagName)
      || ['true', 'plaintext-only'].includes((activeElement as HTMLElement).contentEditable)
    )) {
      return;
    }

    switch ((event as KeyboardEvent).key) {
      case 'Backspace':
        if ((event as KeyboardEvent).metaKey) {
          event.preventDefault();
          this.$removeSelection();
        }
        break;

      case 'Delete':
        event.preventDefault();
        this.$removeSelection();
        break;

      // Move to the left
      case 'ArrowLeft':
        event.preventDefault();
        this.$move(-1, 0);
        break;

      // Move to the right
      case 'ArrowRight':
        event.preventDefault();
        this.$move(1, 0);
        break;

      // Move to the top
      case 'ArrowUp':
        event.preventDefault();
        this.$move(0, -1);
        break;

      // Move to the bottom
      case 'ArrowDown':
        event.preventDefault();
        this.$move(0, 1);
        break;

      case '+':
        event.preventDefault();
        this.$zoom(0.1);
        break;

      case '-':
        event.preventDefault();
        this.$zoom(-0.1);
        break;

      default:
    }
  }

  /**
   * Aligns the selection to the center of its parent element.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $center(): this {
    const { parentElement } = this;

    if (!parentElement) {
      return this;
    }

    const x = (parentElement.offsetWidth - this.width) / 2;
    const y = (parentElement.offsetHeight - this.height) / 2;

    return this.$change(x, y);
  }

  /**
   * Moves the selection.
   * @param {number} x The moving distance in the horizontal direction.
   * @param {number} [y] The moving distance in the vertical direction.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $move(x: number, y: number = x): this {
    return this.$moveTo(this.x + x, this.y + y);
  }

  /**
   * Moves the selection to a specific position.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} [y] The new position in the vertical direction.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $moveTo(x: number, y: number = x): this {
    if (!this.movable) {
      return this;
    }

    return this.$change(x, y);
  }

  /**
   * Adjusts the size the selection on a specific side or corner.
   * @param {string} action Indicates the side or corner to resize.
   * @param {number} [offsetX] The horizontal offset of the specific side or corner.
   * @param {number} [offsetY] The vertical offset of the specific side or corner.
   * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $resize(
    action: string,
    offsetX = 0,
    offsetY = 0,
    aspectRatio: number = this.aspectRatio,
  ): this {
    if (!this.resizable) {
      return this;
    }

    const hasValidAspectRatio = isPositiveNumber(aspectRatio);
    const { $canvas } = this;
    let {
      x,
      y,
      width,
      height,
    } = this;

    switch (action) {
      case ACTION_RESIZE_NORTH:
        y += offsetY;
        height -= offsetY;

        if (height < 0) {
          action = ACTION_RESIZE_SOUTH;
          height = -height;
          y -= height;
        }

        if (hasValidAspectRatio) {
          offsetX = offsetY * aspectRatio;
          x += offsetX / 2;
          width -= offsetX;

          if (width < 0) {
            width = -width;
            x -= width;
          }
        }

        break;

      case ACTION_RESIZE_EAST:
        width += offsetX;

        if (width < 0) {
          action = ACTION_RESIZE_WEST;
          width = -width;
          x -= width;
        }

        if (hasValidAspectRatio) {
          offsetY = offsetX / aspectRatio;
          y -= offsetY / 2;
          height += offsetY;

          if (height < 0) {
            height = -height;
            y -= height;
          }
        }

        break;

      case ACTION_RESIZE_SOUTH:
        height += offsetY;

        if (height < 0) {
          action = ACTION_RESIZE_NORTH;
          height = -height;
          y -= height;
        }

        if (hasValidAspectRatio) {
          offsetX = offsetY * aspectRatio;
          x -= offsetX / 2;
          width += offsetX;

          if (width < 0) {
            width = -width;
            x -= width;
          }
        }

        break;

      case ACTION_RESIZE_WEST:
        x += offsetX;
        width -= offsetX;

        if (width < 0) {
          action = ACTION_RESIZE_EAST;
          width = -width;
          x -= width;
        }

        if (hasValidAspectRatio) {
          offsetY = offsetX / aspectRatio;
          y += offsetY / 2;
          height -= offsetY;

          if (height < 0) {
            height = -height;
            y -= height;
          }
        }

        break;

      case ACTION_RESIZE_NORTHEAST:
        if (hasValidAspectRatio) {
          offsetY = -offsetX / aspectRatio;
        }

        y += offsetY;
        height -= offsetY;
        width += offsetX;

        if (width < 0 && height < 0) {
          action = ACTION_RESIZE_SOUTHWEST;
          width = -width;
          height = -height;
          x -= width;
          y -= height;
        } else if (width < 0) {
          action = ACTION_RESIZE_NORTHWEST;
          width = -width;
          x -= width;
        } else if (height < 0) {
          action = ACTION_RESIZE_SOUTHEAST;
          height = -height;
          y -= height;
        }

        break;

      case ACTION_RESIZE_NORTHWEST:
        if (hasValidAspectRatio) {
          offsetY = offsetX / aspectRatio;
        }

        x += offsetX;
        y += offsetY;
        width -= offsetX;
        height -= offsetY;

        if (width < 0 && height < 0) {
          action = ACTION_RESIZE_SOUTHEAST;
          width = -width;
          height = -height;
          x -= width;
          y -= height;
        } else if (width < 0) {
          action = ACTION_RESIZE_NORTHEAST;
          width = -width;
          x -= width;
        } else if (height < 0) {
          action = ACTION_RESIZE_SOUTHWEST;
          height = -height;
          y -= height;
        }

        break;

      case ACTION_RESIZE_SOUTHEAST:
        if (hasValidAspectRatio) {
          offsetY = offsetX / aspectRatio;
        }

        width += offsetX;
        height += offsetY;

        if (width < 0 && height < 0) {
          action = ACTION_RESIZE_NORTHWEST;
          width = -width;
          height = -height;
          x -= width;
          y -= height;
        } else if (width < 0) {
          action = ACTION_RESIZE_SOUTHWEST;
          width = -width;
          x -= width;
        } else if (height < 0) {
          action = ACTION_RESIZE_NORTHEAST;
          height = -height;
          y -= height;
        }

        break;

      case ACTION_RESIZE_SOUTHWEST:
        if (hasValidAspectRatio) {
          offsetY = -offsetX / aspectRatio;
        }

        x += offsetX;
        width -= offsetX;
        height += offsetY;

        if (width < 0 && height < 0) {
          action = ACTION_RESIZE_NORTHEAST;
          width = -width;
          height = -height;
          x -= width;
          y -= height;
        } else if (width < 0) {
          action = ACTION_RESIZE_SOUTHEAST;
          width = -width;
          x -= width;
        } else if (height < 0) {
          action = ACTION_RESIZE_NORTHWEST;
          height = -height;
          y -= height;
        }

        break;

      default:
    }

    if ($canvas) {
      ($canvas as any).$setAction(action);
    }

    return this.$change(x, y, width, height);
  }

  /**
   * Zooms the selection.
   * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
   * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
   * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $zoom(scale: number, x?: number, y?: number): this {
    if (!this.zoomable || scale === 0) {
      return this;
    }

    if (scale < 0) {
      scale = 1 / (1 - scale);
    } else {
      scale += 1;
    }

    const { width, height } = this;
    const newWidth = width * scale;
    const newHeight = height * scale;
    let newX = this.x;
    let newY = this.y;

    if (isNumber(x) && isNumber(y)) {
      newX -= (newWidth - width) * ((x - this.x) / width);
      newY -= (newHeight - height) * ((y - this.y) / height);
    } else {
      // Zoom from the center of the selection
      newX -= (newWidth - width) / 2;
      newY -= (newHeight - height) / 2;
    }

    return this.$change(newX, newY, newWidth, newHeight);
  }

  /**
   * Changes the position and/or size of the selection.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} y The new position in the vertical direction.
   * @param {number} [width] The new width.
   * @param {number} [height] The new height.
   * @param {number} [aspectRatio] The new aspect ratio for this change only.
   * @param {number} [_force] Force change.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $change(
    x: number,
    y: number,
    width: number = this.width,
    height: number = this.height,
    aspectRatio: number = this.aspectRatio,
    _force = false,
  ): this {
    if (
      this.$changing
      || !isNumber(x)
      || !isNumber(y)
      || !isNumber(width)
      || !isNumber(height)
      || width < 0
      || height < 0
    ) {
      return this;
    }

    if (isPositiveNumber(aspectRatio)) {
      ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }, 'cover'));
    }

    if (!this.precise) {
      x = Math.round(x);
      y = Math.round(y);
      width = Math.round(width);
      height = Math.round(height);
    }

    if (
      x === this.x
      && y === this.y
      && width === this.width
      && height === this.height
      && Object.is(aspectRatio, this.aspectRatio)
      && !_force
    ) {
      return this;
    }

    if (this.hidden) {
      this.hidden = false;
    }

    if (this.$emit(EVENT_CHANGE, {
      x,
      y,
      width,
      height,
    }) === false) {
      return this;
    }

    this.$changing = true;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.$changing = false;

    return this.$render();
  }

  /**
   * Resets the selection to its initial position and size.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $reset(): this {
    const {
      x,
      y,
      width,
      height,
    } = this.$initialSelection;

    return this.$change(x, y, width, height);
  }

  /**
   * Clears the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $clear(): this {
    this.$change(0, 0, 0, 0, NaN, true);
    this.hidden = true;
    return this;
  }

  /**
   * Refreshes the position or size of the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $render(): this {
    return this.$setStyles({
      transform: `translate(${this.x}px, ${this.y}px)`,
      width: this.width,
      height: this.height,
    });
  }

  /**
   * Generates a real canvas element, with the image (selected area only) draw into if there is one.
   * @param {object} [options] The available options.
   * @param {number} [options.width] The width of the canvas.
   * @param {number} [options.height] The height of the canvas.
   * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
   * @returns {Promise} Returns a promise that resolves to the generated canvas element.
   */
  $toCanvas(options?: {
    width?: number;
    height?: number;
    beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  }): Promise<HTMLCanvasElement> {
    return new Promise<HTMLCanvasElement>((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('The current element is not connected to the DOM.'));
        return;
      }

      const canvas = document.createElement('canvas');
      let { width, height } = this;
      let scale = 1;

      if (isPlainObject(options)
        && (isPositiveNumber(options.width) || isPositiveNumber(options.height))) {
        ({ width, height } = getAdjustedSizes({
          aspectRatio: width / height,
          width: options.width as number,
          height: options.height as number,
        }));
        scale = width / this.width;
      }

      canvas.width = width;
      canvas.height = height;

      if (!this.$canvas) {
        resolve(canvas);
        return;
      }

      const cropperImage: CropperImage | null = this.$canvas.querySelector(
        this.$getTagNameOf(CROPPER_IMAGE),
      );

      if (!cropperImage) {
        resolve(canvas);
        return;
      }

      cropperImage.$ready().then((image: HTMLImageElement) => {
        const context = canvas.getContext('2d');

        if (context) {
          const [a, b, c, d, e, f] = cropperImage.$getTransform();
          const offsetX = -this.x;
          const offsetY = -this.y;
          const translateX = ((offsetX * d) - (c * offsetY)) / ((a * d) - (c * b));
          const translateY = ((offsetY * a) - (b * offsetX)) / ((a * d) - (c * b));
          let newE = a * translateX + c * translateY + e;
          let newF = b * translateX + d * translateY + f;
          let destWidth = image.naturalWidth;
          let destHeight = image.naturalHeight;

          if (scale !== 1) {
            newE *= scale;
            newF *= scale;
            destWidth *= scale;
            destHeight *= scale;
          }

          const centerX = destWidth / 2;
          const centerY = destHeight / 2;

          context.fillStyle = 'transparent';
          context.fillRect(0, 0, width, height);

          if (isPlainObject(options) && isFunction(options.beforeDraw)) {
            options.beforeDraw.call(this, context, canvas);
          }

          context.save();

          // Move the transform origin to the center of the image.
          // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
          context.translate(centerX, centerY);
          context.transform(a, b, c, d, newE, newF);

          // Move the transform origin to the top-left of the image.
          context.translate(-centerX, -centerY);
          context.drawImage(image, 0, 0, destWidth, destHeight);
          context.restore();
        }

        resolve(canvas);
      }).catch(reject);
    });
  }
}
