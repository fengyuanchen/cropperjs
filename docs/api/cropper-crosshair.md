# CropperCrosshair

The `CropperCrosshair` interface provides properties and methods for manipulating the layout and presentation of `<cropper-crosshair>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-crosshair></cropper-crosshair>
```

:::

### Custom color

:::live-demo

```html
<cropper-crosshair theme-color="#39f"></cropper-crosshair>
```

:::

### Within CropperCanvas

:::live-demo

```html
<cropper-canvas>
  <cropper-crosshair centered></cropper-crosshair>
</cropper-canvas>
```

:::

### Within CropperSelection

:::live-demo

```html
<cropper-selection width="160" height="90">
  <cropper-crosshair centered></cropper-crosshair>
</cropper-selection>
```

:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| centered | `boolean` | `false` | - | Indicate whether this element is centered. |
| slottable | `boolean` | `false` | - | Indicate whether this element is slottable. |
| themeColor | `string` | `"rgba(238, 238, 238, 0.5)"` | - | Indicate the color of the crosshair. |

## Slots

There are no available slots in this element.

> You can enable the default slot by setting the `slottable` property to `true`:
>
> ```html
> <cropper-crosshair slottable></cropper-crosshair>
> ```
