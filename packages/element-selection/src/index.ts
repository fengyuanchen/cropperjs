import CropperElement from '@cropper/element';
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
  EVENT_ACTION_START,
  EVENT_CHANGE,
  EVENT_ERROR,
  EVENT_KEYDOWN,
  EVENT_LOAD,
} from '@cropper/helper-constants';
import {
  getAdjustedSizes,
  getOffset,
  isElement,
  isFunction,
  isNumber,
  isPositiveNumber,
  off,
  on,
  once,
} from '@cropper/helper-utils';
import style from './style';

const canvasCache = new WeakMap();

export default class CropperSelection extends CropperElement {
  static $version = '__VERSION__';

  protected $onCanvasAction: EventListener | null = null;

  protected $onCanvasActionStart: EventListener | null = null;

  protected $onDocumentKeyDown: EventListener | null = null;

  protected $style = style;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  aspectRatio = NaN;

  initialAspectRatio = NaN;

  active = false;

  autoSelect = false;

  autoSelectArea = 1;

  movable = false;

  resizable = false;

  zoomable = false;

  multiple = false;

  keyboard = false;

  outlined = false;

  precision = false;

  protected set $canvas(element: Element) {
    if (isElement(element)) {
      canvasCache.set(this, element);
    } else {
      canvasCache.delete(this);
    }
  }

  protected get $canvas(): Element {
    return canvasCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'active',
      'aspect-ratio',
      'auto-select',
      'auto-select-area',
      'height',
      'initial-aspect-ratio',
      'keyboard',
      'movable',
      'multiple',
      'outlined',
      'precision',
      'resizable',
      'width',
      'x',
      'y',
      'zoomable',
    ]);
  }

  protected static get $observedProperties(): string[] {
    return super.$observedProperties.concat([
      'active',
      'multiple',
    ]);
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (newValue === oldValue) {
      return;
    }

    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'aspect-ratio':
        if (!isPositiveNumber(this.aspectRatio)) {
          this.aspectRatio = NaN;
        }
        break;

      case 'auto-select-area':
        if (!isPositiveNumber(this.autoSelectArea) || this.autoSelectArea > 1) {
          this.autoSelectArea = 1;
        }
        break;

      case 'initialAspect-ratio':
        if (!isPositiveNumber(this.initialAspectRatio)) {
          this.initialAspectRatio = NaN;
        }
        break;

      default:
    }
  }

  protected connectedCallback(): void {
    super.connectedCallback();

    if (this.multiple && !this.active) {
      this.active = true;
    }

    const $canvas = this.closest(CROPPER_CANVAS);

    if ($canvas) {
      this.$canvas = $canvas;
      this.$setStyles({
        position: 'absolute',
        left: this.x,
        top: this.y,
      });

      if (!this.hidden) {
        this.$render();
      }

      if (this.autoSelect) {
        const { autoSelectArea, parentElement } = this;

        if (isPositiveNumber(autoSelectArea) && parentElement) {
          const aspectRatio = this.aspectRatio || this.initialAspectRatio;
          const { offsetWidth, offsetHeight } = parentElement;
          let width = offsetWidth * this.autoSelectArea;
          let height = offsetHeight * this.autoSelectArea;

          if (isPositiveNumber(aspectRatio)) {
            ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }));
          }

          this.$change(this.x, this.y, width, height);
          this.$center();
        }
      }

      on(
        $canvas,
        EVENT_ACTION_START,
        (this.$onCanvasActionStart = this.$handleActionStart.bind(this)),
      );
      on(
        $canvas,
        EVENT_ACTION,
        (this.$onCanvasAction = this.$handleAction.bind(this)),
      );

      if (this.keyboard) {
        on(
          this.ownerDocument,
          EVENT_KEYDOWN,
          (this.$onDocumentKeyDown = this.$handleKeyDown.bind(this)),
        );
      }
    } else {
      this.$render();
    }
  }

  protected disconnectedCallback(): void {
    const { $canvas } = this;

    if ($canvas) {
      if (this.$onCanvasActionStart) {
        off($canvas, EVENT_ACTION, this.$onCanvasActionStart);
      }

      if (this.$onCanvasAction) {
        off($canvas, EVENT_ACTION, this.$onCanvasAction);
      }

      if (this.keyboard && this.$onDocumentKeyDown) {
        off(this.ownerDocument, EVENT_KEYDOWN, this.$onDocumentKeyDown);
      }
    }

    super.disconnectedCallback();
  }

  protected $getSelections(): CropperSelection[] {
    let selections: CropperSelection[] = [];

    if (this.parentElement) {
      selections = Array.from(this.parentElement.querySelectorAll(CROPPER_SELECTION));
    }

    return selections;
  }

  protected $handleActionStart(event: Event): void {
    if (this.hidden || this.active) {
      return;
    }

    const { detail } = event as CustomEvent;
    const { relatedEvent } = detail;
    const relatedTarget = relatedEvent.target;

    if (relatedTarget === this && this.parentElement) {
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
    if (this.hidden || !this.active) {
      return;
    }

    const { $canvas } = this;
    const { currentTarget, detail } = event as CustomEvent;
    const moveX = detail.endX - detail.startX;
    const moveY = detail.endY - detail.startY;
    const { width, height } = this;
    let { aspectRatio } = this;
    let { action } = detail;

    // Locking aspect ratio by holding shift key
    if (!isPositiveNumber(aspectRatio) && (event as PointerEvent).shiftKey) {
      aspectRatio = isPositiveNumber(width) && isPositiveNumber(height) ? width / height : 1;
    }

    if (currentTarget && detail) {
      switch (action) {
        case ACTION_SELECT: {
          const offset = getOffset(currentTarget as Element);
          const createSelection = () => {
            const newSelection = this.cloneNode(true) as CropperSelection;

            if (this.hasAttribute('id')) {
              newSelection.removeAttribute('id');
            }

            this.active = false;

            if (this.parentElement) {
              this.parentElement.insertBefore(newSelection, this.nextSibling);
            }

            return newSelection;
          };

          (this.multiple ? createSelection() : this).$change(
            detail.startX - offset.left,
            detail.startY - offset.top,
            moveX,
            moveY,
            aspectRatio,
          );

          action = ACTION_RESIZE_SOUTHEAST;

          if (moveX < 0) {
            if (moveY > 0) {
              action = ACTION_RESIZE_SOUTHWEST;
            } else if (moveY < 0) {
              action = ACTION_RESIZE_NORTHWEST;
            }
          } else if (moveX > 0) {
            if (moveY < 0) {
              action = ACTION_RESIZE_NORTHEAST;
            }
          }

          if ($canvas) {
            ($canvas as any).$action = action;
          }
          break;
        }

        case ACTION_MOVE:
          this.$move(moveX, moveY);
          break;

        case ACTION_SCALE:
          this.$zoomTo(detail.scale);
          break;

        default:
          this.$resize(action, moveX, moveY, aspectRatio);
      }
    }
  }

  protected $handleKeyDown(event: Event): void {
    if (this.hidden || !this.active) {
      return;
    }

    switch ((event as KeyboardEvent).key) {
      case 'Delete':
        if (this.parentElement) {
          const selections = this.$getSelections();

          if (selections.length > 1) {
            let previous;

            selections.some((selection) => {
              if (selection === this) {
                return true;
              }

              previous = selection;

              return false;
            });

            if (previous) {
              const activeSelection = previous as CropperSelection;

              this.parentElement.removeChild(this);
              activeSelection.active = true;
              activeSelection.$emit(EVENT_CHANGE, {
                x: activeSelection.x,
                y: activeSelection.y,
                width: activeSelection.width,
                height: activeSelection.height,
              });
            }
          } else {
            this.$reset();
            this.hidden = true;
          }
        }

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
   * @param {number} [y=x] The moving distance in the vertical direction.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $move(x: number, y: number = x): this {
    return this.$moveTo(this.x + x, this.y + y);
  }

  /**
   * Moves the selection to a specific position.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} [y=x] The new position in the vertical direction.
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
   * @param {string} action Indicate the side or corner to resize.
   * @param {number} [offsetX=0] The horizontal offset of the specific side or corner.
   * @param {number} [offsetY=0] The vertical offset of the specific side or corner.
   * @param {number} [aspectRatio=this.aspectRatio] The aspect ratio for computing the new size if it is necessary.
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
      x, y, width, height,
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
   * @param {number} scale The zoom factor.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $zoom(scale: number): this {
    scale = Number(scale);

    if (scale < 0) {
      scale = 1 / (1 - scale);
    } else {
      scale = 1 + scale;
    }

    return this.$zoomTo(scale);
  }

  /**
   * Zooms the selection to a specific factor.
   * @param {number} scale The zoom factor.
   * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
   * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $zoomTo(scale: number, x?: number, y?: number): this {
    if (!this.zoomable || scale < 0) {
      return this;
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
   * @param {number} [width=this.width] The new width.
   * @param {number} [height=this.height] The new height.
   * @param {number} [aspectRatio=this.aspectRatio] The new aspect ratio for this change only.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $change(
    x: number,
    y: number,
    width: number = this.width,
    height: number = this.height,
    aspectRatio: number = this.aspectRatio,
  ): this {
    if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height)) {
      return this;
    }

    if (!this.precision) {
      x = Math.round(x);
      y = Math.round(y);
      width = Math.round(width);
      height = Math.round(height);
    }

    if (x === this.x && y === this.y && width === this.width && height === this.height) {
      return this;
    }

    if (this.hidden) {
      this.hidden = false;
    }

    if (isPositiveNumber(aspectRatio)) {
      ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }, 'cover'));
    }

    if (this.$emit(EVENT_CHANGE, {
      x,
      y,
      width,
      height,
    }) === false) {
      return this;
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    return this.$render();
  }

  /**
   * Resets the selection to its initial position and size.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $reset(): this {
    return this.$change(0, 0, 0, 0);
  }

  /**
   * Refreshes the position or size of the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $render(): this {
    return this.$setStyles({
      left: this.x,
      top: this.y,
      width: this.width,
      height: this.height,
    });
  }

  /**
   * Generates a real canvas element, with the image (selected area only) draw into if there is one.
   * @param {Object} [options={}] The available options.
   * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
   * @returns {Promise} Returns a promise that resolves to the generated canvas element.
   */
  $toCanvas(options: {
    beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  } = {}): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('The current element is not connected to the DOM.'));
        return;
      }

      const canvas = document.createElement('canvas');
      const { width, height } = this;

      canvas.width = width;
      canvas.height = height;

      const cropperCanvas: any = this.closest(CROPPER_CANVAS);

      if (!cropperCanvas) {
        resolve(canvas);
        return;
      }

      const cropperImage: any = cropperCanvas.querySelector(CROPPER_IMAGE);

      if (!cropperImage) {
        resolve(canvas);
        return;
      }

      new Promise((resolve2) => {
        const image = cropperImage.$image;

        if (image.complete) {
          resolve2(image);
        } else {
          const types = [EVENT_LOAD, EVENT_ERROR].join(' ');
          const onLoad = () => {
            off(image, types, onLoad);
            resolve2(image);
          };

          once(image, types, onLoad);
        }
      }).then((image: any) => {
        const context = canvas.getContext('2d');

        if (context) {
          const centerX = cropperImage.offsetWidth / 2;
          const centerY = cropperImage.offsetHeight / 2;
          const [a, b, c, d, e, f] = cropperImage.$getTransform();
          const offsetX = -this.x;
          const offsetY = -this.y;
          const translateX = ((offsetX * d) - (c * offsetY)) / ((a * d) - (c * b));
          const translateY = (offsetY - (b * e)) / d;
          const newE = a * translateX + c * translateY + e;
          const newF = b * translateX + d * translateY + f;

          context.fillStyle = 'transparent';
          context.fillRect(0, 0, width, height);

          if (isFunction(options.beforeDraw)) {
            options.beforeDraw.call(this, context, canvas);
          }

          context.save();

          // Move the transform origin to the center of the image.
          // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
          context.translate(centerX, centerY);
          context.transform(a, b, c, d, newE, newF);

          // Move the transform origin to the top-left of the image.
          context.translate(-centerX, -centerY);
          context.drawImage(image, 0, 0);
          context.restore();
        }

        resolve(canvas);
      }).catch(reject);
    });
  }
}
