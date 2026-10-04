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
  ACTION_TRANSFORM,
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  EVENT_ACTION,
  EVENT_ACTION_END,
  EVENT_ACTION_START,
  EVENT_CHANGE,
  EVENT_KEYDOWN,
  exceedsInset,
  getAdjustedSizes,
  getComposedPathTarget,
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
const imageCache = new WeakMap();

type Radius = [number, number];

/**
 * Converts a px or % length to pixels.
 * @param {string} value The length.
 * @param {number} base The base for percentages.
 * @param {number} scale The scale for pixel values.
 * @returns {number} The length in pixels.
 */
function toLength(value: string, base: number, scale: number): number {
  const number = parseFloat(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return value.trim().endsWith('%') ? (number / 100) * base : number * scale;
}

/**
 * Expands 1 to 4 values into top-left, top-right, bottom-right and bottom-left.
 * @param {string[]} values The values.
 * @returns {string[]} The four values.
 */
function expandCorners(values: string[]): string[] {
  const [a, b = a, c = a, d = b] = values;

  return [a, b, c, d];
}

/**
 * Resolves a CSS `border-radius` value into pixel radii of the four corners.
 * @param {string} value The border radius.
 * @param {number} width The width of the box.
 * @param {number} height The height of the box.
 * @param {number} scale The scale for pixel values.
 * @returns {Radius[]} The radii.
 */
function resolveBorderRadius(
  value: string,
  width: number,
  height: number,
  scale: number,
): Radius[] {
  const [horizontal, vertical = horizontal] = value.split('/').map((part) => {
    const values = part.trim().split(/\s+/).filter(Boolean).slice(0, 4);

    return values.length > 0 ? values : ['0'];
  });
  const xs = expandCorners(horizontal).map((item) => toLength(item, width, scale));
  const ys = expandCorners(vertical).map((item) => toLength(item, height, scale));
  const radii = xs.map((x, i) => [Math.max(x, 0), Math.max(ys[i], 0)] as Radius);
  const [tl, tr, br, bl] = radii;
  const ratio = Math.min(
    1,
    width / (tl[0] + tr[0] || 1),
    width / (bl[0] + br[0] || 1),
    height / (tl[1] + bl[1] || 1),
    height / (tr[1] + br[1] || 1),
  );

  return ratio < 1 ? radii.map(([x, y]) => [x * ratio, y * ratio] as Radius) : radii;
}

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

  protected $resizeStart: (
    Selection & {
      action: string;
      pageX: number;
      pageY: number;
    }
  ) | null = null;

  protected $changing = false;

  protected $insetRejected = false;

  protected $style = style;

  private $initialSelection = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private $changingAroundCenter = false;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  aspectRatio = NaN;

  borderRadius = '';

  initialAspectRatio = NaN;

  initialCoverage = NaN;

  active = false;

  // Deprecated as of v2.0.0-rc.0, use `dynamic` instead.
  linked = false;

  dynamic = false;

  movable = false;

  maxInset = 'auto';

  minInset = 'auto';

  resizable = false;

  resizeAroundCenter = false;

  zoomable = false;

  zoomAroundCenter = false;

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

  protected set $image(element: CropperImage) {
    imageCache.set(this, element);
  }

  protected get $image(): CropperImage {
    return imageCache.get(this);
  }

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'active',
      'aspect-ratio',
      'border-radius',
      'dynamic',
      'height',
      'initial-aspect-ratio',
      'initial-coverage',
      'keyboard',
      'linked',
      'max-inset',
      'min-inset',
      'movable',
      'multiple',
      'outlined',
      'precise',
      'resizable',
      'resize-around-center',
      'width',
      'x',
      'y',
      'zoom-around-center',
      'zoomable',
    ]);
  }

  protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void {
    if (Object.is(newValue, oldValue)) {
      return;
    }

    super.$propertyChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'borderRadius':
        this.$nextTick(() => {
          this.$render();

          // Lets the shade follow the new border radius
          this.$emit(EVENT_CHANGE, {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
          });
        });
        break;

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
            this.$initSelection(true, isPositiveNumber(oldValue as number));
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

      const $image: CropperImage | null = $canvas.querySelector(
        this.$getTagNameOf(CROPPER_IMAGE),
      );

      if ($image) {
        this.$image = $image;
      }

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

  protected $exceedsInset(x: number, y: number, width: number, height: number): boolean {
    const { parentElement, maxInset, minInset } = this;

    // An empty selection (e.g. cleared) is never limited.
    if (
      !parentElement
      || (width === 0 && height === 0)
      || (maxInset === 'auto' && minInset === 'auto')
    ) {
      return false;
    }

    const parentRect = parentElement.getBoundingClientRect();

    return exceedsInset(
      [
        y,
        parentRect.width - (x + width),
        parentRect.height - (y + height),
        x,
      ],
      maxInset,
      minInset,
      parentElement,
      parentRect,
    );
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

  protected async $initSelection(center = false, resize = false) {
    const { initialCoverage, parentElement } = this;

    if (isPositiveNumber(initialCoverage) && parentElement) {
      const { $canvas } = this;
      let $image: CropperImage | null = this.$image || null;

      if ($image) {
        try {
          await $image.$ready();
        } catch {
          $image = null;
        }

        if (this.parentElement !== parentElement || this.initialCoverage !== initialCoverage) {
          return;
        }
      }

      const boundsElement = $image || $canvas || parentElement;
      const bounds = boundsElement.getBoundingClientRect();
      const offsetElement = $canvas || parentElement;
      const offset = offsetElement.getBoundingClientRect();
      const boundsX = $image ? bounds.left - offset.left : 0;
      const boundsY = $image ? bounds.top - offset.top : 0;
      const aspectRatio = this.aspectRatio || this.initialAspectRatio;
      let width = (resize ? 0 : this.width) || bounds.width * initialCoverage;
      let height = (resize ? 0 : this.height) || bounds.height * initialCoverage;

      if (isPositiveNumber(aspectRatio)) {
        ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }));
      }

      if (center) {
        this.$change(
          boundsX + (bounds.width - width) / 2,
          boundsY + (bounds.height - height) / 2,
          width,
          height,
        );
      } else {
        this.$change(this.x, this.y, width, height);
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
    if (event.defaultPrevented) {
      return;
    }

    const { action, relatedEvent } = (event as CustomEvent).detail || {};
    const relatedTarget = relatedEvent?.target;

    this.$action = '';
    this.$actionStartTarget = relatedTarget;
    this.$resizeStart = typeof action === 'string'
      && action.endsWith('-resize')
      && relatedEvent
      ? {
        action,
        pageX: relatedEvent.pageX,
        pageY: relatedEvent.pageY,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      }
      : null;

    if (
      action === ACTION_SELECT
      && !this.resizable
      && (!this.multiple || this.active)
      && isPositiveNumber(this.width)
      && isPositiveNumber(this.height)
      && relatedEvent
      && event.currentTarget
    ) {
      const offset = getOffset(event.currentTarget as Element);
      const selection = this.multiple && !this.hidden ? this.$createSelection() : this;

      selection.$change(
        relatedEvent.pageX - offset.left,
        relatedEvent.pageY - offset.top,
        this.width,
        this.height,
      );
    }

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

    if (event.defaultPrevented || !currentTarget || !detail) {
      return;
    }

    const { relatedEvent } = detail;
    let { action } = detail;
    const relatedTarget = relatedEvent
      ? getComposedPathTarget(relatedEvent)
      : null;

    // Switching to another selection
    if (!action && this.multiple) {
      // Get the `action` property from the focusing in selection
      action = this.$action || (relatedTarget as any)?.action;
      this.$action = action;
    }

    if (!action
      || (this.hidden && action !== ACTION_SELECT)
      || (this.multiple && !this.active && action !== ACTION_SCALE)) {
      return;
    }

    const { width, height } = this;
    let moveX = detail.endX - detail.startX;
    let moveY = detail.endY - detail.startY;
    let { aspectRatio } = this;
    let resizeStart: Selection | null = null;

    if (this.$resizeStart && action.endsWith('-resize')) {
      const start = this.$resizeStart;

      action = start.action;
      moveX = detail.endX - start.pageX;
      moveY = detail.endY - start.pageY;
      resizeStart = start;
    }

    // Locking aspect ratio by holding shift key
    if (!isPositiveNumber(aspectRatio) && relatedEvent.shiftKey) {
      const ratioWidth = resizeStart?.width ?? width;
      const ratioHeight = resizeStart?.height ?? height;

      aspectRatio = isPositiveNumber(ratioWidth) && isPositiveNumber(ratioHeight)
        ? ratioWidth / ratioHeight
        : 1;
    }

    switch (action) {
      case ACTION_SELECT:
        if (!this.resizable && isPositiveNumber(this.width) && isPositiveNumber(this.height)) {
          break;
        }

        if (moveX !== 0 || moveY !== 0) {
          // Force to create a square selection for better user experience
          if (moveX === 0) {
            moveX = moveY;
          } else if (moveY === 0) {
            moveY = moveX;
          }

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
      case ACTION_TRANSFORM:
        if (relatedEvent && this.zoomable && (
          this.dynamic
          || this.contains(relatedEvent.target as Node)
        )) {
          if (this.zoomAroundCenter) {
            this.$zoom(detail.scale);
          } else {
            const offset = getOffset(currentTarget as Element);

            this.$zoom(
              detail.scale,
              relatedEvent.pageX - offset.left,
              relatedEvent.pageY - offset.top,
            );
          }
        }
        break;

      default:
        this.$resize(action, moveX, moveY, aspectRatio);
    }
  }

  protected $handleActionEnd(): void {
    this.$action = '';
    this.$actionStartTarget = null;
    this.$resizeStart = null;
  }

  protected $handleKeyDown(event: Event): void {
    if (
      event.defaultPrevented
      || this.hidden
      || !this.keyboard
      || (this.multiple && !this.active)
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

    this.$change(x, y);

    // Slides along the inset limit instead of sticking when only one axis breaks it.
    if (this.$insetRejected && x !== this.x && y !== this.y) {
      this.$change(x, this.y);
      this.$change(this.x, y);
    }

    return this;
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
    } = this.$resizeStart || this;

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

    const previousChangingAroundCenter = this.$changingAroundCenter;

    this.$changingAroundCenter = this.resizeAroundCenter || previousChangingAroundCenter;

    try {
      return this.$change(x, y, width, height);
    } finally {
      this.$changingAroundCenter = previousChangingAroundCenter;
    }
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

    const previousChangingAroundCenter = this.$changingAroundCenter;

    this.$changingAroundCenter = (
      this.zoomAroundCenter
      && !(isNumber(x) && isNumber(y))
    ) || previousChangingAroundCenter;

    try {
      return this.$change(newX, newY, newWidth, newHeight);
    } finally {
      this.$changingAroundCenter = previousChangingAroundCenter;
    }
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
    this.$insetRejected = false;

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

    if (this.$changingAroundCenter) {
      if (!this.precise) {
        width = Math.round(width);
        height = Math.round(height);

        if ((width - this.width) % 2 !== 0) {
          width += width < this.width ? -1 : 1;
        }

        if ((height - this.height) % 2 !== 0) {
          height += height < this.height ? -1 : 1;
        }
      }

      const resizeStart = this.$resizeStart || this;

      x = resizeStart.x + (resizeStart.width - width) / 2;
      y = resizeStart.y + (resizeStart.height - height) / 2;
    } else if (!this.precise) {
      width = Math.round(width);
      height = Math.round(height);
      x = Math.round(x);
      y = Math.round(y);
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

    if (this.$exceedsInset(x, y, width, height)) {
      this.$insetRejected = true;
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
      borderRadius: this.borderRadius,
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

      const { $image } = this;

      if (!$image) {
        resolve(canvas);
        return;
      }

      $image.$ready().then((image: HTMLImageElement) => {
        const context = canvas.getContext('2d');

        if (context) {
          const [a, b, c, d, e, f] = $image.$getTransform();
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

          const radii = resolveBorderRadius(this.borderRadius, width, height, scale);

          if (radii.some(([rx, ry]) => rx > 0 && ry > 0)) {
            const [[tlx, tly], [trx, tryy], [brx, bry], [blx, bly]] = radii;
            const half = Math.PI / 2;

            context.beginPath();
            context.moveTo(tlx, 0);
            context.lineTo(width - trx, 0);
            context.ellipse(width - trx, tryy, trx, tryy, 0, -half, 0);
            context.lineTo(width, height - bry);
            context.ellipse(width - brx, height - bry, brx, bry, 0, 0, half);
            context.lineTo(blx, height);
            context.ellipse(blx, height - bly, blx, bly, 0, half, Math.PI);
            context.lineTo(0, tly);
            context.ellipse(tlx, tly, tlx, tly, 0, Math.PI, Math.PI + half);
            context.closePath();
            context.clip();
          }

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
