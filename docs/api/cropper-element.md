# CropperElement

The `CropperElement` interface represents any Cropper element, extends the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) interface.

## Specifications

- The name of public properties should start with alphabetic-character.
- The name of private properties should start with `$`.
- The name of public/private custom methods should start with `$`.
- The name of private custom listeners should start with `$on`.

## Example

```js
import { CropperElement } from 'cropperjs';
// Or
// import CropperElement from '@cropper/element';

class MyCropperElement extends CropperElement {
  myStringProperty = '';
  myNumberProperty = NaN;
  myBooleanProperty = false;

  static get observedAttributes() {
    return super.observedAttributes.concat([
      'my-boolean-property',
      'my-number-property',
      'my-string-property',
    ]);
  }

  // ...
}

MyCropperElement.$define();
```

```html
<my-cropper-element my-string-property="foo" my-number-property="1" my-boolean-property></my-cropper-element>
```

## Properties

Inherits properties from its parent, [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| shadowRootMode | `string` | `"open"` | `"closed" \| "open"` | Indicates the encapsulation mode for the shadow DOM tree. |
| slottable | `boolean` | `true` | - | Indicates whether this element contains a `<slot>` element. |
| themeColor | `string` | - | - | Indicates the theme color of this element and its children. |

## Methods

### $getShadowRoot

- **Syntax**: `$getShadowRoot()`
- **Returns**:
  - Type: `ShadowRoot`
  - The shadow root.

Outputs the shadow root of the element, even if its mode is `"closed"`.

### $addStyles

- **Syntax**: `$addStyles(styles)`
- **Arguments**:
  - `styles`:
    - Type: `string`
    - The styles to add.
- **Returns**:
  - Type: `CSSStyleSheet | HTMLStyleElement`
  - The generated style sheet.
- **Example**:

  ```js
  const canvas = new CropperCanvas();

  canvas.$addStyles(`
    :host {
      border: 1px solid #39f;
    }
  `);
  ```

Adds styles to the shadow root.

### $emit

- **Syntax**: `$emit(type, detail, options)`
- **Arguments**:
  - `type`:
    - Type: `string`
    - The name of the event.
  - `detail`:
    - Type: `*`
    - Default: `undefined`
    - The data passed when initializing the event.
  - `options`:
    - Type: `CustomEventInit`
    - Default: `{ bubbles: true, cancelable: true, composed: true }`
    - The other event options.
- **Returns**:
  - Type: `boolean`
  - The result value.
- **Example**:

  ```js
  const selection = new CropperSelection();

  selection.$emit('change', {
    x: 10,
    y: 5,
    width: 160,
    height: 90,
  });
  ```

Dispatches an event at the current element.

### $nextTick

- **Syntax**:
  - `$nextTick()`
  - `$nextTick(callback)`
- **Arguments**:
  - `callback`:
    - Type: `Function`
    - The callback to execute after the next DOM update cycle.
- **Returns**:
  - Type: `Promise`
  - A promise that resolves to nothing.

Defers the callback to be executed after the next DOM update cycle.

## Static methods

### $define

Defines the constructor as a new custom element. It is just a shortcut to call [`CustomElementRegistry.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **Syntax**:
  - `$define()`
  - `$define(options)`
- **Alternatives**:
  - `customElements.define('cropper-element', CropperElement)`
  - `customElements.define('cropper-element', CropperElement, options)`
- **Arguments**:
  - `options`:
    - Type: `Object`
    - The element definition options.
- **Example**:

  ```js
  // Define as a autonomous custom element: `<cropper-element></cropper-element>`.
  CropperElement.$define();
  ```
