# CropperElement

The `CropperElement` interface represents any Cropper element, extends the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) interface.

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

  static get $observedProperties() {
    return super.$observedProperties.concat([
      'myBooleanProperty',
      'myNumberProperty',
      'myStringProperty',
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
| shadowRootMode | `string` | `"open"` | `"closed" | "open"` | Indicate the encapsulation mode for the shadow DOM tree. |
| slottable | `boolean` | `true` | - | Indicate whether this element contains a `<slot>` element. |
| themeColor | `string` | - | - | Indicate the theme color of this element and its children. |

## Methods

### $getShadowRoot

- **Syntax**: `$getShadowRoot()`
- **Returns**:
  - Type: `ShadowRoot | null`
  - The shadow root if any.

Outputs the shadow root of the element, even if its mode is `"closed"`.

### $addStyles

- **Syntax**: `$addStyles(styles)`
- **Arguments**:
  - `styles`:
    - Type: `string`
    - The styles to add.
- **Returns**:
  - Type: `CSSStyleSheet | HTMLStyleElement | null`
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

## Static methods

### $define

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

  // Define as a customized built-in element: `<div is="cropper-element"></div>`.
  CropperElement.$define({
    extends: 'div',
  });
  ```

Defines the constructor as a new custom element. It is just a shortcut to call [`CustomElementRegistry.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).
