import CropperElement from '@cropper/element';
import {
  ACTION_SCALE,
  ATTRIBUTE_ACTION,
  CROPPER_IMAGE,
  EVENT_ACTION,
  EVENT_ACTION_END,
  EVENT_ACTION_MOVE,
  EVENT_ACTION_START,
  EVENT_ERROR,
  EVENT_LOAD,
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_WHEEL,
} from '@cropper/constants';
import {
  isElement,
  isFunction,
  isNumber,
  isString,
  off,
  on,
  once,
} from '@cropper/utils';
import style from './style';

interface ActionEventData {
  action: string;
  relatedEvent: Event;
  scale?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

export default class CropperCanvas extends CropperElement {
  protected $onPointerDown: EventListener | null = null;

  protected $onPointerMove: EventListener | null = null;

  protected $onPointerUp: EventListener | null = null;

  protected $onWheel: EventListener | null = null;

  protected $wheeling: boolean = false;

  protected readonly $pointers: Map<number, any> = new Map();

  protected $style = style;

  protected $action: string = '';

  background: boolean = false;

  disabled: boolean = false;

  scale: number = 0.1;

  themeColor: string = '#39f';

  protected static get observedAttributes() {
    return super.observedAttributes.concat([
      'background',
      'disabled',
    ]);
  }

  protected get $observedProperties() {
    return super.$observedProperties.concat([
      'background',
      'disabled',
    ]);
  }

  protected connectedCallback() {
    super.connectedCallback();
    on(
      this,
      EVENT_POINTER_DOWN,
      (this.$onPointerDown = this.$handlePointerDown.bind(this)),
    );
    on(
      this.ownerDocument,
      EVENT_POINTER_MOVE,
      (this.$onPointerMove = this.$handlePointerMove.bind(this)),
    );
    on(
      this.ownerDocument,
      EVENT_POINTER_UP,
      (this.$onPointerUp = this.$handlePointerUp.bind(this)),
    );
    on(
      this,
      EVENT_WHEEL,
      (this.$onWheel = this.$handleWheel.bind(this)),
      {
        passive: false,
        capture: true,
      },
    );
  }

  protected disconnectedCallback() {
    if (this.$onPointerDown) {
      off(this, EVENT_POINTER_DOWN, this.$onPointerDown);
    }

    if (this.$onPointerMove) {
      off(this.ownerDocument, EVENT_POINTER_MOVE, this.$onPointerMove);
    }

    if (this.$onPointerUp) {
      off(this.ownerDocument, EVENT_POINTER_UP, this.$onPointerUp);
    }

    if (this.$onWheel) {
      off(this, EVENT_WHEEL, this.$onWheel, {
        capture: true,
      });
    }

    super.disconnectedCallback();
  }

  protected $handlePointerDown(event: Event) {
    const { buttons, button, type } = event as PointerEvent;

    if (this.disabled || (
      // Handle pointer or mouse event, and ignore touch event
      ((type === 'pointerdown' && (event as PointerEvent).pointerType === 'mouse') || type === 'mousedown') && (
        // No primary button (Usually the left button)
        (isNumber(buttons) && buttons !== 1) || (isNumber(button) && button !== 0)

        // Open context menu
        || (event as PointerEvent).ctrlKey
      ))
    ) {
      return;
    }

    const { $pointers } = this;
    let action = '';

    if ((event as TouchEvent).changedTouches) {
      Array.from((event as TouchEvent).changedTouches).forEach(({
        identifier,
        pageX,
        pageY,
      }) => {
        $pointers.set(identifier, {
          startX: pageX,
          startY: pageY,
          endX: pageX,
          endY: pageY,
        });
      });
    } else {
      const { pointerId = 0, pageX, pageY } = (event as PointerEvent);

      $pointers.set(pointerId, {
        startX: pageX,
        startY: pageY,
        endX: pageX,
        endY: pageY,
      });
    }

    if ($pointers.size > 1) {
      action = ACTION_SCALE;
    } else if (isElement(event.target)) {
      action = (event.target as any).action || event.target.getAttribute(ATTRIBUTE_ACTION) || '';
    }

    if (this.$emit(EVENT_ACTION_START, {
      action,
      relatedEvent: event,
    }) === false) {
      return;
    }

    // Prevent page zooming in the browsers for iOS.
    event.preventDefault();
    this.$action = action;
  }

  protected $handlePointerMove(event: Event) {
    const { $action, $pointers } = this;

    if (this.disabled || !$action || $pointers.size === 0) {
      return;
    }

    if (this.$emit(EVENT_ACTION_MOVE, {
      action: $action,
      relatedEvent: event,
    }) === false) {
      return;
    }

    // Prevent page scrolling.
    event.preventDefault();

    if ((event as TouchEvent).changedTouches) {
      Array.from((event as TouchEvent).changedTouches).forEach(({
        identifier,
        pageX,
        pageY,
      }) => {
        const pointer = $pointers.get(identifier);

        if (pointer) {
          Object.assign(pointer, {
            endX: pageX,
            endY: pageY,
          });
        }
      });
    } else {
      const { pointerId = 0, pageX, pageY } = (event as PointerEvent);
      const pointer = $pointers.get(pointerId);

      if (pointer) {
        Object.assign(pointer, {
          endX: pageX,
          endY: pageY,
        });
      }
    }

    const detail: ActionEventData = {
      action: $action,
      relatedEvent: event,
    };

    if ($action === ACTION_SCALE) {
      const pointers2 = new Map($pointers);
      let { scale } = this;

      $pointers.forEach((pointer, pointerId) => {
        pointers2.delete(pointerId);
        pointers2.forEach((pointer2) => {
          const x1 = Math.abs(pointer.startX - pointer2.startX);
          const y1 = Math.abs(pointer.startY - pointer2.startY);
          const x2 = Math.abs(pointer.endX - pointer2.endX);
          const y2 = Math.abs(pointer.endY - pointer2.endY);
          const z1 = Math.sqrt((x1 * x1) + (y1 * y1));
          const z2 = Math.sqrt((x2 * x2) + (y2 * y2));
          const ratio = (z2 - z1) / z1;

          if (ratio > scale) {
            scale = ratio;
          }
        });
      });
      detail.scale = scale;
    } else {
      const [pointer] = Array.from($pointers.values());

      Object.assign(detail, pointer);
    }

    // Override the starting coordinate
    $pointers.forEach((pointer) => {
      pointer.startX = pointer.endX;
      pointer.startY = pointer.endY;
    });

    this.$emit(EVENT_ACTION, detail, {
      cancelable: false,
    });
  }

  protected $handlePointerUp(event: Event) {
    const { $action, $pointers } = this;

    if (this.disabled || !$action) {
      return;
    }

    if (this.$emit(EVENT_ACTION_END, {
      action: $action,
      relatedEvent: event,
    }) === false) {
      return;
    }

    event.preventDefault();

    if ((event as TouchEvent).changedTouches) {
      Array.from((event as TouchEvent).changedTouches).forEach(({
        identifier,
      }) => {
        $pointers.delete(identifier);
      });
    } else {
      const { pointerId = 0 } = (event as PointerEvent);

      $pointers.delete(pointerId);
    }

    if ($pointers.size === 0) {
      this.$action = '';
    }
  }

  protected $handleWheel(event: Event) {
    if (this.disabled) {
      return;
    }

    event.preventDefault();

    // Limit wheel speed to prevent zoom too fast (#21)
    if (this.$wheeling) {
      return;
    }

    this.$wheeling = true;

    // Debounce by 50ms
    setTimeout(() => {
      this.$wheeling = false;
    }, 50);

    const delta = (event as WheelEvent).deltaY > 0 ? 1 : -1;
    const scale = 1 - (delta * this.scale);

    this.$emit(EVENT_ACTION, {
      action: ACTION_SCALE,
      scale,
      relatedEvent: event,
    }, {
      cancelable: false,
    });
  }

  /**
   * Changes the current action to a new one.
   * @param {string} action The new action.
   * @returns {CropperCanvas} Returns `this` for chaining.
   */
  $setAction(action: string) {
    if (isString(action)) {
      this.$action = action;
    }

    return this;
  }

  /**
   * Generates a real canvas element, with the image draw into if there is one.
   * @param {Object} [options={}] The available options.
   * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
   * @returns {Promise} Returns a promise that resolves to the generated canvas element.
   */
  $toCanvas(options: {
    beforeDraw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  } = {}) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('The current element is not connected to the DOM.'));
        return;
      }

      const canvas = document.createElement('canvas');
      const width = this.offsetWidth;
      const height = this.offsetHeight;

      canvas.width = width;
      canvas.height = height;

      const cropperImage: any = this.querySelector(CROPPER_IMAGE);

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
          const matrix = cropperImage.$getTransform();
          const centerX = cropperImage.offsetWidth / 2;
          const centerY = cropperImage.offsetHeight / 2;

          context.fillStyle = 'transparent';
          context.fillRect(0, 0, width, height);

          if (isFunction(options.beforeDraw)) {
            options.beforeDraw.call(this, context, canvas);
          }

          context.save();

          // Move the transform origin to the center of the image.
          // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
          context.translate(centerX, centerY);
          context.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

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
