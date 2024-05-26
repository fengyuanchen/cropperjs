# CropperShade

The `CropperShade` interface provides properties and methods for manipulating the layout and presentation of `<cropper-shade>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-shade></cropper-shade>
```

:::

:::tip
The default width and height of this element is `0`.
:::

### Specify position and size

:::live-demo

```html
<cropper-canvas background>
  <cropper-shade x="240" y="5" width="160" height="90"></cropper-shade>
</cropper-canvas>
```

:::

### Customize the color

:::live-demo

```html
<cropper-canvas background>
  <cropper-shade x="240" y="5" width="160" height="90" theme-color="rgba(0, 0, 0, 0.35)"></cropper-shade>
</cropper-canvas>
```

:::

### Toggle visibility on pointer down/up dynamically

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection movable resizable zoomable hidden>
    <cropper-handle action="move" plain></cropper-handle>
  </cropper-selection>
</cropper-canvas>
```

:::

:::tip
The `<cropper-shade>` element will automatically synchronize the position and size of the currently active `<cropper-selection>` element.
:::

:::tip
The [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) attribute is a native global attribute.
:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| x | `number` | `0` | - | Indicates the x-axis coordinate of the element. |
| y | `number` | `0` | - | Indicates the y-axis coordinate of the element. |
| width | `number` | `0` | - | Indicates the width of the element. |
| height | `number` | `0` | - | Indicates the height of the element. |
| slottable | `boolean` | `false` | - | Indicates whether this element is slottable. |
| themeColor | `string` | `"rgba(0, 0, 0, 0.65)"` | - | Indicates the color of the shade. |

## Methods

### $change

- **Syntax**:
  - `$change(x, y)`
  - `$change(x, y, width, height)`
- **Arguments**:
  - `x`:
    - Type: `number`
    - The new position in the horizontal direction.
  - `y`:
    - Type: `number`
    - The new position in the vertical direction.
  - `width`:
    - Type: `number`
    - Default: `this.width`
    - The new width.
  - `height`:
    - Type: `number`
    - Default: `this.height`
    - The new height.
- **Returns**:
  - Type: `CropperShade`
  - The element instance for chaining.

Changes the position and/or size of the shade.

### $reset

- **Syntax**: `$reset()`
- **Returns**:
  - Type: `CropperShade`
  - The element instance for chaining.

Resets the shade to its initial position and size.

### $render

- **Syntax**: `$render()`
- **Returns**:
  - Type: `CropperShade`
  - The element instance for chaining.

Refreshes the position or size of the shade.

## Slots

There is only one default slot in this element.

> You can disable it by setting the `slottable` property to `false`:
>
> ```html
> <cropper-shade slottable="false"></cropper-shade>
> ```
