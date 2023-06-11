# Cropper

The `Cropper` constructor creates a new Cropper instance.

## Usage

### Syntax

```js
new Cropper(element[, options])
```

- **element**
  - Type: `HTMLImageElement | HTMLCanvasElement | string`
  - The target image or canvas element for cropping. If it is a string, will be passed into the [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to find the element.

- **options** (optional)
  - Type: `Object`
  - The [options](#options) for cropping.

### Example

<ClientOnly>
  <CropperExample />
</ClientOnly>

```html
<div class="cropper-container"></div>
```

```js
import Cropper from 'cropperjs';

const image = new Image();

image.src = '/cropperjs/v2/picture.jpg';
image.alt = 'Picture';

const cropper = new Cropper(image, {
  container: '.cropper-container',
});

console.log(cropper);
```

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container | `Element \| string` | Defaults to the parent element of the target element, or `document.body` if the parent element is null. | The Cropper container. If it is a string, it will be passed into the `document.querySelector` to find the element. |
| template | `string` | Defaults to a built-in template, see below. | The Cropper template. |

The default template for the Cropper:

```html
<cropper-canvas background>
  <cropper-image></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection initial-coverage="0.5" movable resizable zoomable>
    <cropper-grid role="grid" bordered covered></cropper-grid>
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

## Instance Properties

| Name | Type | Description |
| --- | --- | --- |
| element | `HTMLImageElement \| HTMLCanvasElement` | The normalized Cropper element. |
| options | `Object` | The normalized Cropper options. |
| container | `Element` | The normalized Cropper container. |

## Instance Methods

### getCropperCanvas

- **Syntax**: `getCropperCanvas()`
- **Alternative**: `cropper.container.querySelector('cropper-canvas')`
- **Returns**:
  - Type: `CropperCanvas | null`
  - The `<cropper-canvas>` element if any.

Get the `<cropper-canvas>` element in the Cropper container.

### getCropperImage

- **Syntax**: `getCropperImage()`
- **Alternative**: `cropper.container.querySelector('cropper-image')`
- **Returns**:
  - Type: `CropperImage | null`
  - The `<cropper-image>` element if any.

Get the `<cropper-image>` element in the Cropper container.

### getCropperSelection

- **Syntax**: `getCropperSelection()`
- **Alternative**: `cropper.container.querySelector('cropper-selection')`
- **Returns**:
  - Type: `CropperSelection | null`
  - The `<cropper-selection>` element if any.

Get the `<cropper-selection>` element in the Cropper container.

### getCropperSelections

- **Syntax**: `getCropperSelections()`
- **Alternative**: `cropper.container.querySelectorAll('cropper-selection')`
- **Returns**:
  - Type: `NodeListOf<CropperSelection> | null`
  - The `<cropper-selection>` element if any.

Get all the `<cropper-selection>` elements in the Cropper container when there are multiple selections.
