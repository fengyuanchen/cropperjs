# CropperViewer

The `CropperViewer` interface provides properties and methods for manipulating the layout and presentation of `<cropper-viewer>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-viewer></cropper-viewer>
```

:::

:::tip
The default height of this element is `0`.
:::

### Connect to CropperSelection

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/picture.jpg" alt="Picture"></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection id="cropperSelection" initial-aspect-ratio="1.5" movable resizable zoomable>
    <cropper-handle action="move" plain></cropper-handle>
    <cropper-handle action="se-resize"></cropper-handle>
  </cropper-selection>
</cropper-canvas>

<div class="cropper-viewers">
  <cropper-viewer selection="#cropperSelection" style="width: 320px;"></cropper-viewer>
  <cropper-viewer selection="#cropperSelection" style="width: 160px;"></cropper-viewer>
  <cropper-viewer selection="#cropperSelection" style="width: 80px;"></cropper-viewer>
  <cropper-viewer selection="#cropperSelection" style="width: 40px;"></cropper-viewer>
</div>

<style>
.cropper-viewers {
  margin-top: 1rem;
}

.cropper-viewers > cropper-viewer {
  border: 1px solid #ddd;
  display: inline-block;
  margin-right: 1rem;
}
</style>
```

:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| resize | `string` | `"vertical"` | `"both"`, `"horizontal"`, `"vertical"`, `"none"` | Indicates whether this element is resizable, and if so, in which directions. |
| selection | `string` | `""` | - | Indicates the source selection to view. It must be a valid selector for `document.querySelector`. |
| slottable | `boolean` | `false` | - | Indicates whether this element is slottable. |

## Slots

There are no available slots in this element.

> You can enable the default slot by setting the `slottable` property to `true`:
>
> ```html
> <cropper-viewer slottable></cropper-viewer>
> ```
