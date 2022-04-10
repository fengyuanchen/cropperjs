# CropperCanvas

The `CropperCanvas` interface provides properties and methods for manipulating the layout and presentation of `<cropper-canvas>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-canvas></cropper-canvas>
```

:::

:::tip
The default minimum width and minimum height of this element are `200px` and `100px`.
:::

### Background

:::live-demo

```html
<cropper-canvas background></cropper-canvas>
```

:::

### Interactive

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture"></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
```

:::

### Disabled

All pointer events are disabled.

:::live-demo

```html
<cropper-canvas background disabled>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture"></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
```

:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| background | `boolean` | `false` | - | Indicates whether this element has a grid background. |
| disabled | `boolean` | `false` | - | Indicates whether this element is disabled. |
| scaleStep | `number` | `0.1` | - | Indicates the stepping interval of the scaling factor when zooming in/out by wheeling, must a positive number. |
| themeColor | `string` | `"#39f"` | - | Indicates the primary color of this element and its children. |

## Methods

### $setAction

- **Syntax**: `$setAction(action)`
- **Arguments**:
  - `action`:
    - Type: `string`
    - The new action.
- **Returns**:
  - Type: `CropperCanvas`
  - The element instance for chaining.

Changes the current action to a new one.

### $toCanvas

- **Syntax**:
  - `$toCanvas()`
  - `$toCanvas(options)`
- **Arguments**:
  - `options`:
    - Type: `Object`
    - The available options.
    - Properties:
      - `width`:
        - Type: `number`
        - The width of the canvas.
      - `height`:
        - Type: `number`
        - The height of the canvas.
      - `beforeDraw`:
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
    <CropperCanvasToNativeCanvas />
  </ClientOnly>

Generates a real canvas element, with the image drawn into if there is one.

## Events

### action

The event is fired when a pointer changes on the canvas.

- Event:
  - **event.bubbles**: `true`
  - **event.cancelable**: `false`
  - **event.composed**: `true`
  - **event.detail**:
    - Type: `Object`
    - The related data of the action.
  - **event.detail.action**:
    - Type: `string`
    - Options: `"select"`, `"move"`, `"scale"`, `"rotate"`, `"transform"`, `"n-resize"`, `"e-resize"`, `"s-resize"`, `"w-resize"`, `"ne-resize"`, `"nw-resize"`, `"se-resize"`, and `"sw-resize"`.
    - The action type.
  - **event.detail.relatedEvent**:
    - Type: `PointerEvent | TouchEvent | MouseEvent | WheelEvent`
    - The related native event that triggered this event.
  - **event.detail.scale**:
    - Type: `number`
    - The scaling factor, only available when the `action` is `"scale"` or `"transform"`.
  - **event.detail.rotate**:
    - Type: `number`
    - The scaling factor, only available when the `action` is `"rotate"`or `"transform"`.
  - **event.detail.startX**:
    - Type: `number`
    - The starting `pageX` value, only available when the `relatedEvent` is `PointerEvent`, `TouchEvent`, or `MouseEvent`.
  - **event.detail.startY**:
    - Type: `number`
    - The starting `pageY` value, only available when the `relatedEvent` is `PointerEvent`, `TouchEvent`, or `MouseEvent`.
  - **event.detail.endX**:
    - Type: `number`
    - The ending `pageX` value, only available when the `relatedEvent` is `PointerEvent`, `TouchEvent`, or `MouseEvent`.
  - **event.detail.endY**:
    - Type: `number`
    - The ending `pageY` value, only available when the `relatedEvent` is `PointerEvent`, `TouchEvent`, or `MouseEvent`.
- Example:

```html
<cropper-canvas id="canvas"></cropper-canvas>

<script>
document.querySelector('#canvas').addEventListener('action', function (event) {
  console.log(event);
});
</script>
```

### actionstart

The event is fired when a pointer becomes active.

- Event:
  - **event.bubbles**: `true`
  - **event.cancelable**: `true`
  - **event.composed**: `true`
  - **event.detail**:
    - Type: `Object`
    - The related data of the action.
  - **event.detail.action**:
    - Type: `string`
    - Options: same as the `action` event.
    - The action type.
  - **event.detail.relatedEvent**:
    - Type: `PointerEvent | TouchEvent | MouseEvent`
    - The related native event that triggered this event.

### actionmove

This event is fired when a pointer changes coordinates.

- Event:
  - **event.bubbles**: `true`
  - **event.cancelable**: `true`
  - **event.composed**: `true`
  - **event.detail**:
    - Type: `Object`
    - The related data of the action.
  - **event.detail.action**:
    - Type: `string`
    - Options: same as the `action` event.
    - The action type.
  - **event.detail.relatedEvent**:
    - Type: `PointerEvent | TouchEvent | MouseEvent`
    - The related native event that triggered this event.

### actionend

This event is fired when a pointer is no longer active.

- Event:
  - **event.bubbles**: `true`
  - **event.cancelable**: `true`
  - **event.composed**: `true`
  - **event.detail**:
    - Type: `Object`
    - The related data of the action.
  - **event.detail.action**:
    - Type: `string`
    - Options: same as the `action` event.
    - The action type.
  - **event.detail.relatedEvent**:
    - Type: `PointerEvent | TouchEvent | MouseEvent`
    - The related native event that triggered this event.

## Slots

There is only one default slot in this element.

> You can disable it by setting the `slottable` property to `false`:
>
> ```html
> <cropper-canvas slottable="false"></cropper-canvas>
> ```
