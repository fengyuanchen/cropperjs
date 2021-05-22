import { WINDOW } from './constants';

/**
 * Check if the given value is a string.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if the given value is not a number.
 */
export const isNaN = Number.isNaN || WINDOW.isNaN;

/**
 * Check if the given value is a number.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if the given value is a positive number.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
 */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0 && value < Infinity;
}

/**
 * Check if the given value is undefined.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/**
 * Check if the given value is an object.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

const { hasOwnProperty } = Object.prototype;

/**
 * Check if the given value is a plain object.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) {
    return false;
  }

  try {
    const { constructor } = value;
    const { prototype } = constructor;

    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}

/**
 * Check if the given value is a function.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Check if the given node is an element.
 *
 * @param {*} node The node to check.
 * @returns {boolean} Returns `true` if the given node is an element; otherwise, `false`.
 */
export function isElement(node: unknown): node is Element {
  return typeof node === 'object' && node !== null && (node as Node).nodeType === 1;
}

const REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

/**
 * Transform the given string from camelCase to kebab-case.
 *
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
export function toKebabCase(value: string): string {
  return String(value).replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
}

const REGEXP_KEBAB_CASE = /-[A-z\d]/g;

/**
 * Transform the given string from kebab-case to camelCase.
 *
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
export function toCamelCase(value: string): string {
  return value.replace(REGEXP_KEBAB_CASE, (substring: string) => substring.slice(1).toUpperCase());
}

const REGEXP_SPACES = /\s\s*/;

/**
 * Remove event listener from the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
 *
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {EventListenerOptions} [options] The options specify characteristics about the event listener.
 */
export function off(
  target: EventTarget,
  types: string,
  listener: EventListenerOrEventListenerObject,
  options?: EventListenerOptions,
): void {
  types.trim().split(REGEXP_SPACES).forEach((type) => {
    target.removeEventListener(type, listener, options);
  });
}

/**
 * Add event listener to the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
 *
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
 */
export function on(
  target: EventTarget,
  types: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions,
): void {
  types.trim().split(REGEXP_SPACES).forEach((type) => {
    target.addEventListener(type, listener, options);
  });
}

/**
 * Add once event listener to the event target.
 *
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
 */
export function once(
  target: EventTarget,
  types: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions,
): void {
  on(target, types, listener, {
    ...options,
    once: true,
  });
}

const defaultEventOptions: CustomEventInit = {
  bubbles: true,
  cancelable: true,
  composed: true,
};

/**
 * Dispatch event on the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent}
 *
 * @param {EventTarget} target The target of the event.
 * @param {string} type The name of the event.
 * @param {*} [detail] The data passed when initializing the event.
 * @param {CustomEventInit} [options] The other event options.
 * @returns {boolean} Returns the result value.
 */
export function emit(
  target: EventTarget,
  type: string,
  detail?: unknown,
  options?: CustomEventInit,
): boolean {
  return target.dispatchEvent(new CustomEvent(type, {
    ...defaultEventOptions,
    detail,
    ...options,
  }));
}

/**
 * Get the offset base on the document.
 *
 * @param {Element} element The target element.
 * @returns {object} The offset data.
 */
export function getOffset(element: Element): {
  left: number;
  top: number;
} {
  const { documentElement } = element.ownerDocument;
  const box = element.getBoundingClientRect();

  return {
    left: box.left + (WINDOW.pageXOffset - documentElement.clientLeft),
    top: box.top + (WINDOW.pageYOffset - documentElement.clientTop),
  };
}

const REGEXP_ANGLE_UNIT = /deg|g?rad|turn$/i;

/**
 * Convert an angle to a radian number.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/angle}
 *
 * @param {number|string} angle The angle to convert.
 * @returns {number} Returns the radian number.
 */
export function toAngleInRadian(angle: number | string): number {
  const value = parseFloat(angle as string) || 0;

  if (value !== 0) {
    const [unit = 'rad'] = String(angle).match(REGEXP_ANGLE_UNIT) || [];

    switch (unit.toLowerCase()) {
      case 'deg':
        return (value / 360) * (Math.PI * 2);

      case 'grad':
        return (value / 400) * (Math.PI * 2);

      case 'turn':
        return value * (Math.PI * 2);

      // case 'rad':
      default:
    }
  }

  return value;
}

interface SizeAdjustmentData {
  aspectRatio: number;
  height: number;
  width: number;
}

interface SizeAdjustmentDataWithoutWidth {
  aspectRatio: number;
  height: number;
}

interface SizeAdjustmentDataWithoutHeight {
  aspectRatio: number;
  width: number;
}

type SizeAdjustmentType = 'contain' | 'cover';
const SIZE_ADJUSTMENT_TYPE_CONTAIN: SizeAdjustmentType = 'contain';
const SIZE_ADJUSTMENT_TYPE_COVER: SizeAdjustmentType = 'cover';

/**
 * Get the max sizes in a rectangle under the given aspect ratio.
 *
 * @param {object} data The original sizes.
 * @param {string} [type='contain'] The adjust type.
 * @returns {object} Returns the result sizes.
 */
export function getAdjustedSizes(
  data: SizeAdjustmentData | SizeAdjustmentDataWithoutWidth | SizeAdjustmentDataWithoutHeight,
  type: SizeAdjustmentType = SIZE_ADJUSTMENT_TYPE_CONTAIN,
): {
    width: number;
    height: number;
  } {
  const { aspectRatio } = data;
  let { width, height } = data as SizeAdjustmentData;
  const isValidWidth = isPositiveNumber(width);
  const isValidHeight = isPositiveNumber(height);

  if (isValidWidth && isValidHeight) {
    const adjustedWidth = height * aspectRatio;

    if ((type === SIZE_ADJUSTMENT_TYPE_CONTAIN && adjustedWidth > width)
      || (type === SIZE_ADJUSTMENT_TYPE_COVER && adjustedWidth < width)) {
      height = width / aspectRatio;
    } else {
      width = height * aspectRatio;
    }
  } else if (isValidWidth) {
    height = width / aspectRatio;
  } else if (isValidHeight) {
    width = height * aspectRatio;
  }

  return {
    width,
    height,
  };
}
