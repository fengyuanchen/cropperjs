# CropperHandle

The `CropperHandle` interface provides properties and methods for manipulating the layout and presentation of `<cropper-handle>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-handle></cropper-handle>
```

:::

:::tip
The default width and height of this element is `0`.
:::

### Within CropperCanvas

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/picture.jpg" alt="Picture"></cropper-image>
  <cropper-handle action="move"></cropper-handle>
</cropper-canvas>
```

:::

### Within CropperSelection

:::live-demo

```html

<cropper-canvas background>
  <cropper-image src="/picture.jpg" alt="Picture"></cropper-image>
  <cropper-selection width="100" height="100">
    <cropper-handle action="move"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
```

:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| action | `string` | `"none"` | `"select"`, `"move"`, `"scale"`, `"n-resize"`, `"e-resize"`, `"s-resize"`, `"w-resize"`, `"ne-resize"`, `"nw-resize"`, `"se-resize"`, `"sw-resize"`, `"none"` | Indicate the action type of the handle. |
| slottable | `boolean` | `false` | - | Indicate whether this element is slottable. |
| themeColor | `string` | `"rgba(51, 153, 255, 0.5)"` | - | Indicate the color of the handle. |

## Slots

There are no available slots in this element.

> You can enable the default slot by setting the `slottable` property to `true`:
>
> ```html
> <cropper-handle slottable></cropper-handle>
> ```
