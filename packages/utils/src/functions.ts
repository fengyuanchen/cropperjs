import { WINDOW } from './constants';

/**
 * Check if the given value is a string.
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
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if the given value is a positive number.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
 */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0 && value < Infinity;
}

/**
 * Check if the given value is undefined.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

const { hasOwnProperty } = Object.prototype;

/**
 * Check if the given value is a plain object.
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
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Check if the given node is an element.
 * @param {*} node The node to check.
 * @returns {boolean} Returns `true` if the given node is an element; otherwise, `false`.
 */
export function isElement(node: unknown): node is Element {
  return typeof node === 'object' && node !== null && (node as Node).nodeType === 1;
}

const REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

/**
 * Transform the given string from camelCase to kebab-case.
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
export function toKebabCase(value: string): string {
  return String(value).replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
}

const REGEXP_KEBAB_CASE = /-[A-z\d]/g;

/**
 * Transform the given string from kebab-case to camelCase.
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
 * Get the real event target by checking composed path.
 * This is useful when dealing with events that can cross shadow DOM boundaries.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath}
 * @param {Event} event The event object.
 * @returns {EventTarget | null} The first element in the composed path, or the original event target.
 */
export function getComposedPathTarget(event: Event): EventTarget | null {
  if (typeof (event as any).composedPath === 'function') {
    const path = (event as any).composedPath();
    return path.find(isElement) || event.target;
  }

  return event.target;
}

const resolvedPromise: Promise<any> = Promise.resolve();

/**
 * Defers the callback to be executed after the next DOM update cycle.
 * @param {*} [context] The `this` context.
 * @param {Function} [callback] The callback to execute after the next DOM update cycle.
 * @returns {Promise} A promise that resolves to nothing.
 */
export function nextTick(context?: unknown, callback?: () => void): Promise<void> {
  return callback
    ? resolvedPromise.then(context ? callback.bind(context) : callback)
    : resolvedPromise;
}

/**
 * Get the root document node.
 * @param {Element} element The target element.
 * @returns {Document|DocumentFragment|null} The document node.
 */
export function getRootDocument(element: Element): Document | DocumentFragment | null {
  const rootNode = element.getRootNode();

  switch (rootNode.nodeType) {
    case 1:
      return rootNode.ownerDocument;

    case 9:
      return rootNode as Document;

    case 11:
      return rootNode as DocumentFragment;

    default:
  }

  return null;
}

/**
 * Get the offset base on the document.
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

const REGEXP_INSET_LENGTH = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?(?:px)?$/i;
const REGEXP_INSET_PERCENTAGE = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?%$/i;

/**
 * Split an inset value into its top-level tokens, keeping functions such as `calc()` intact.
 * @param {string} value The inset value to split.
 * @returns {Array} Returns the tokens.
 */
export function splitInsetValue(value: string): string[] {
  const tokens: string[] = [];
  let depth = 0;
  let token = '';

  String(value).split('').forEach((char) => {
    if (char === '(') {
      depth += 1;
    } else if (char === ')') {
      depth = Math.max(0, depth - 1);
    }

    if (depth === 0 && /\s/.test(char)) {
      if (token) {
        tokens.push(token);
        token = '';
      }
    } else {
      token += char;
    }
  });

  if (token) {
    tokens.push(token);
  }

  return tokens;
}

/**
 * Convert a CSS `inset` value to pixel distances in the order of top, right, bottom, and left.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/inset}
 * @param {string} value The inset value, supports 1 to 4 values.
 * @param {number} width The reference width for percentages on the left and right sides.
 * @param {number} height The reference height for percentages on the top and bottom sides.
 * @param {Function} [resolve] Resolves the values that are neither numbers, pixels, nor percentages.
 * @returns {Array} Returns the distances, `null` stands for `auto` (unlimited).
 */
export function toInsetValues(
  value: string,
  width: number,
  height: number,
  resolve?: (token: string, horizontal: boolean) => number | null,
): Array<number | null> {
  const tokens = splitInsetValue(value);

  if (tokens.length === 0 || tokens.length > 4) {
    return [null, null, null, null];
  }

  const [top, right = top, bottom = top, left = right] = tokens;

  return [top, right, bottom, left].map((token, index) => {
    const horizontal = index % 2 === 1;

    if (REGEXP_INSET_LENGTH.test(token)) {
      return parseFloat(token);
    }

    if (REGEXP_INSET_PERCENTAGE.test(token)) {
      return (parseFloat(token) / 100) * (horizontal ? width : height);
    }

    if (token.toLowerCase() === 'auto' || !isFunction(resolve)) {
      return null;
    }

    const result = resolve(token, horizontal);

    return isNumber(result) ? result : null;
  });
}

/**
 * Check if the distances to the edges of a container are out of the `maxInset` or `minInset` limits.
 * @param {Array} distances The distances to the top, right, bottom, and left edges.
 * @param {string} maxInset The max inset value.
 * @param {string} minInset The min inset value.
 * @param {Element} container The container element.
 * @param {DOMRect} containerRect The bounding client rect of the container.
 * @returns {boolean} Returns `true` if any distance is out of the limits, else `false`.
 */
export function exceedsInset(
  distances: number[],
  maxInset: string,
  minInset: string,
  container: Element,
  containerRect: DOMRect,
): boolean {
  const resolve = (token: string, horizontal: boolean): number | null => {
    const property = horizontal ? 'left' : 'top';
    const probe = container.ownerDocument.createElement('div');

    probe.style.cssText = 'position: absolute; visibility: hidden; pointer-events: none;';
    probe.style.setProperty(property, token);

    // An invalid value is dropped by the browser.
    if (!probe.style.getPropertyValue(property)) {
      return null;
    }

    container.appendChild(probe);

    const rect = probe.getBoundingClientRect();
    const result = horizontal
      ? rect.left - containerRect.left - container.clientLeft
      : rect.top - containerRect.top - container.clientTop;

    container.removeChild(probe);
    return result;
  };
  const { width, height } = containerRect;
  const maxInsets = toInsetValues(maxInset, width, height, resolve);
  const minInsets = toInsetValues(minInset, width, height, resolve);
  // Tolerates floating-point errors from the transformed rects.
  const tolerance = 0.001;

  return distances.some((distance, index) => {
    const max = maxInsets[index];
    const min = minInsets[index];

    return (max !== null && distance > max + tolerance)
      || (min !== null && distance < min - tolerance);
  });
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
 * @param {object} data The original sizes.
 * @param {string} [type] The adjust type.
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

/**
 * Multiply multiple matrices.
 * @param {Array} matrix The first matrix.
 * @param {Array} args The rest matrices.
 * @returns {Array} Returns the result matrix.
 */
export function multiplyMatrices(matrix: number[], ...args: number[][]): number[] {
  if (args.length === 0) {
    return matrix;
  }

  const [a1, b1, c1, d1, e1, f1] = matrix;
  const [a2, b2, c2, d2, e2, f2] = args[0];

  // ┌ a1 c1 e1 ┐   ┌ a2 c2 e2 ┐
  // │ b1 d1 f1 │ × │ b2 d2 f2 │
  // └ 0  0  1  ┘   └ 0  0  1  ┘
  matrix = [
    a1 * a2 + c1 * b2/* + e1 * 0 */,
    b1 * a2 + d1 * b2/* + f1 * 0 */,
    a1 * c2 + c1 * d2/* + e1 * 0 */,
    b1 * c2 + d1 * d2/* + f1 * 0 */,
    a1 * e2 + c1 * f2 + e1/* * 1 */,
    b1 * e2 + d1 * f2 + f1/* * 1 */,
  ];

  return multiplyMatrices(matrix, ...args.slice(1));
}
