# Cropper

The `Cropper` constructor creates a new Cropper instance.

## Usage

### Syntax

```js
new Cropper(element[, options])
```

- **element**
  - Type: `HTMLImageElement | HTMLCanvasElement | string`
  - The target image or canvas element for cropping. If it is a sting, will be passed into the `document.querySelector` to find the element.

- **options** (optional)
  - Type: `Object`
  - The [options](#options) for cropping.

### Example

```js
import Cropper from 'cropperjs';

const image = new Image();

image.src = '/path/to/image.jpg';

const cropper = new Cropper(image);
```

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- | --- |
| container | `Element | string` | Defaults to the parent element of the target element, or `document.body` if the parent element is null. | The Cropper container. If it is a sting, will be passed into the `document.querySelector` to find the element. |
| template | `string` | Defaults to a built-in template, see below. | The Cropper template. |

The default template for the Cropper:

```html
<cropper-canvas background>
  <cropper-image></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection auto-select auto-select-area="0.5" movable resizable zoomable>
    <cropper-grid role="grid"></cropper-grid>
    <cropper-crosshair theme-color="rgba(238, 238, 238, 0.5)" centered></cropper-crosshair>
    <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
    <cropper-handle action="n-resize"></cropper-handle>
    <cropper-handle action="e-resize"></cropper-handle>
    <cropper-handle action="s-resize"></cropper-handle>
    <cropper-handle action="w-resize"></cropper-handle>
    <cropper-handle action="ne-resize"></cropper-handle>
    <cropper-handle action="nw-resize"></cropper-handle>
    <cropper-handle action="se-resize"></cropper-handle>
    <cropper-handle action="sw-resize"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
```
