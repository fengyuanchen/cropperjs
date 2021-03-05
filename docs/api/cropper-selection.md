---
navbar: false
sidebar: false
---

# CropperSelection

<!-- The `CropperSelection` interface provides properties and methods for manipulating the layout and presentation of `<cropper-selection>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-selection></cropper-selection>
```

:::

:::tip
The default width and height of this element is `0`.
:::

### Within CropperCanvas

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection outlined></cropper-selection>
</cropper-canvas>
```

:::

### Auto select

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection auto-select auto-select-area="0.8" outlined></cropper-selection>
</cropper-canvas>
```

:::

### Customize position and size

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection x="10" y="5" width="160" height="90" outlined></cropper-selection>
</cropper-canvas>
```

:::

### With handles

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection auto-select auto-select-area="0.8" outlined>
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

::: -->

### Multiple

:::live-demo

```html
<cropper-canvas style="height: 300px" background>
  <cropper-image src="/picture.jpg" alt="Picture"></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection id="cropperSelection" auto-select auto-select-area="0.5" movable resizable zoomable multiple keyboard>
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-crosshair centered></cropper-crosshair>
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

:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| x | `number` | `0` | - | Indicate the x-axis coordinate of the selection. |
| y | `number` | `0` | - | Indicate the y-axis coordinate of the selection. |
| width | `number` | `0` | - | Indicate the width of the selection. |
| height | `number` | `0` | - | Indicate the height of the selection. |
| aspectRatio | `number` | `NaN` | - | Indicate the aspect ratio of the selection, must a positive number. |
| initialAspectRatio | `number` | `NaN` | - | Indicate the initial aspect ratio of the selection, must a positive number. |
| autoSelect | `boolean` | `false` | - | Indicate whether specify the position and size bases on the parent element automatically once connected to document. |
| autoSelectArea | `number` | `1` | - | Indicate the area of the selection, must a positive number between `0` and `1`, default to `1` (100%). |
| movable | `boolean` | `false` | - | Indicate whether this element is movable. |
| resizable | `boolean` | `false` | - | Indicate whether this element is resizable. |
| zoomable | `boolean` | `false` | - | Indicate whether this element is zoomable. |
| outlined | `boolean` | `false` | - | Indicate whether show the outlined or not. |
| precision | `boolean` | `false` | - | Indicate whether reserve the precision of the `x`, `y`, `width`, and `height` properties or not. |

## Methods

### $center

- **Syntax**: `$center()`
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Aligns the selection to the center of its parent element.

### $move

- **Syntax**:
  - `$move(x)`
  - `$move(x, y)`
- **Alternatives**:
  - `$moveTo(selection.x + x)`
  - `$moveTo(selection.x + x, selection.y + y)`
- **Arguments**:
  - `x`:
    - Type: `number`
    - The moving distance in the horizontal direction.
  - `y`:
    - Type: `number`
    - Default: `x`
    - The moving distance in the vertical direction.
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Moves the selection.

### $moveTo

- **Syntax**:
  - `$moveTo(x)`
  - `$moveTo(x, y)`
- **Arguments**:
  - `x`:
    - Type: `number`
    - The new position in the horizontal direction.
  - `y`:
    - Type: `number`
    - Default: `x`
    - The new position in the vertical direction.
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Moves the selection to a specific position.

### $resize

- **Syntax**:
  - `$resize(action)`
  - `$resize(action, offsetX)`
  - `$resize(action, offsetX, offsetY)`
  - `$resize(action, offsetX, offsetY, aspectRatio)`
- **Arguments**:
  - `action`:
    - Type: `string`
    - Options: `"n-resize"`, `"e-resize"`, `"s-resize"`, `"w-resize"`, `"ne-resize"`, `"nw-resize"`, `"se-resize"`, and `"sw-resize"`.
    - Indicate the side or corner to resize.
  - `offsetX`:
    - Type: `number`
    - Default: `0`
    - The horizontal offset of the specific side or corner.
  - `offsetY`:
    - Type: `number`
    - Default: `0`
    - The vertical offset of the specific side or corner.
  - `aspectRatio`:
    - Type: `number`
    - Default: `this.aspectRatio`
    - The aspect ratio for computing the new size if it is necessary.
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Adjusts the size the selection on a specific side or corner.

### $zoom

- **Syntax**: `$zoom(scale)`
- **Alternatives**: `$zoomTo(1 + scale)`
- **Arguments**:
  - `scale`:
    - Type: `number`
    - The zoom factor. A positive number for zooming in, and a negative number for zooming out.
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Zooms the selection.

### $zoomTo

- **Syntax**:
  - `$zoomTo(scale)`
  - `$zoomTo(scale, x, y)`
- **Arguments**:
  - `scale`:
    - Type: `number`
    - The zoom factor. It must be a positive number.
  - `x`:
    - Type: `number`
    - Default: The center of the selection in the horizontal.
    - The zoom origin in the horizontal.
  - `y`:
    - Type: `number`
    - Default: The center of the selection in the vertical.
    - The zoom origin in the vertical.
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Zooms the selection to a specific factor. Changes the width and height of the selection in pixels directly at the same time.

### $change

- **Syntax**:
  - `$change(x, y)`
  - `$change(x, y, width, height)`
  - `$change(x, y, width, height, aspectRatio)`
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
  - `aspectRatio`:
    - Type: `number`
    - Default: `this.aspectRatio`
    - The new aspect ratio for this change only.
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Changes the position and/or size of the selection.

### $reset

- **Syntax**: `$reset()`
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Resets the selection to its initial position and size.

### $render

- **Syntax**: `$render()`
- **Returns**:
  - Type: `CropperSelection`
  - The element instance for chaining.

Refreshes the position or size of the selection.

### $toCanvas

- **Syntax**: `$toCanvas(options)`
- **Arguments**:
  - `options`:
    - Type: `Object`
    - Default: `{}`
    - The available options.
    - Properties:
      - `options.beforeDraw`:
        - Type: `Function`
        - The function called before drawing the image onto the canvas.
        - Syntax: `beforeDraw(context, canvas)`
        - Arguments:
          - `context`:
            - Type: `CanvasRenderingContext2D`
            - The 2D rendering context of the canvas.
          - `canvas`:
            - Type: `HTMLCanvasElement`
            - The canvas element itself.
        - Example: `function (context) { context.filter = 'grayscale(100%)'; }`
- **Returns**:
  - Type: `Promise`
  - A promise that resolves to the generated canvas element.
- **Example**:
  <ClientOnly>
    <CropperSelectionToNativeCanvas />
  </ClientOnly>

Generates a real canvas element, with the image (selected area only) draw into if there is one.

## Events

### change

The event is fired when the position or size of the selection is going to change.

- Event:
  - **event.bubbles**: `true`
  - **event.cancelable**: `true`
  - **event.composed**: `true`
  - **event.detail**:
    - Type: `Object`
    - The position and size data of the selection.
  - **event.detail.x**:
    - Type: `number`
    - The x-axis coordinate of the selection.
  - **event.detail.y**:
    - Type: `number`
    - The y-axis coordinate of the selection.
  - **event.detail.width**:
    - Type: `number`
    - The width of the selection.
  - **event.detail.height**:
    - Type: `number`
    - The height of the selection.
- Example:

```html
<cropper-selection id="selection"></cropper-selection>

<script>
document.querySelector('#selection').addEventListener('change', function (event) {
  console.log(event);
});
</script>
```

## Slots

There is only one default slot in this element.

> You can disable it by setting the `slottable` property to `false`:
>
> ```html
> <cropper-selection slottable="false"></cropper-selection>
> ```
