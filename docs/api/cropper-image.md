# CropperImage

The `CropperImage` interface provides properties and methods for manipulating the layout and presentation of `<cropper-image>` elements.

## Examples

### Basic

:::live-demo

```html
<cropper-image></cropper-image>
```

:::

:::tip
The default width and height of this element is `0`.
:::

### With image source

:::live-demo

```html
<cropper-image src="/cropperjs/picture.jpg" alt="Picture" style="width: 100%;" rotatable scalable skewable translatable></cropper-image>
```

:::

### Limit boundaries

<ClientOnly>
  <CropperImageExample />
</ClientOnly>

::: details
<<< @/.vitepress/components/CropperImageExample.vue
:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| initial-center-size | `string` | `"contain"` | `"contain"`, `"cover"` | Indicates the initial size of the image when aligned with the center of its parent element. |
| rotatable | `boolean` | `false` | - | Indicates whether this element is rotatable. |
| scalable | `boolean` | `false` | - | Indicates whether this element is scalable. |
| skewable | `boolean` | `false` | - | Indicates whether this element is skewable. |
| slottable | `boolean` | `false` | - | Indicates whether this element is slottable. |
| translatable | `boolean` | `false` | - | Indicates whether this element is translatable. |

The built-in `<img>` element will inherit the following attributes by default:

- `alt`
- `crossorigin`
- `decoding`
- `importance`
- `loading`
- `referrerpolicy`
- `sizes`
- `src`
- `srcset`

## Methods

### $ready

- **Syntax**:
  - `$ready()`
  - `$ready(callback)`
- **Arguments**:
  - `callback`:
    - Type: `Function`
    - The callback to execute after successfully loading the image.
- **Returns**:
  - Type: `Promise`
  - A promise that resolves to the image element.
- **Example**:

  ```js
  const cropperImage = new CropperImage();

  cropperImage.$ready((image) => {
    console.log(image.naturalWidth, image.naturalHeight);
  });
  cropperImage.src = '/cropperjs/picture.jpg';
  ```

Defers the callback to execute after successfully loading the image.

### $center

- **Syntax**:
  - `$center()`
  - `$center(size)`
- **Arguments**:
  - `size`:
    - Type: `string`
    - Options: `"contain"`, and `"cover"`.
    - The size of the image.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Aligns the image to the center of its parent element.

### $move

- **Syntax**:
  - `$move(x)`
  - `$move(x, y)`
- **Arguments**:
  - `x`:
    - Type: `number`
    - The moving distance in the horizontal direction.
  - `y`:
    - Type: `number`
    - Default: `x`
    - The moving distance in the vertical direction.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Moves the image.

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
  - Type: `CropperImage`
  - The element instance for chaining.

Moves the image to a specific position.

### $rotate

- **Syntax**: `$rotate(angle)`
- **Arguments**:
  - `angle`:
    - Type: `number | string`
    - The rotation angle (in radians). The default unit is `rad`.
  - `x`:
    - Type: `number`
    - Default: The center of the image in the horizontal.
    - The rotation origin in the horizontal.
  - `y`:
    - Type: `number`
    - Default: The center of the image in the vertical.
    - The rotation origin in the vertical.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.
- **Examples**:
  - `$rotate(0.8)`
  - `$rotate('0.8rad')`
  - `$rotate('45deg')`
  - `$rotate('50grad')`
  - `$rotate('0.1turn')`
  - `$rotate('90deg', 0, 0)`

Rotates the image. It is similar to CSS function [rotate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate()) or [CanvasRenderingContext2D.rotate()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate).

### $zoom

- **Syntax**:
  - `$zoom(scale)`
  - `$zoom(scale, x, y)`
- **Arguments**:
  - `scale`:
    - Type: `number`
    - The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
  - `x`:
    - Type: `number`
    - Default: The center of the image in the horizontal.
    - The zoom origin in the horizontal.
  - `y`:
    - Type: `number`
    - Default: The center of the image in the vertical.
    - The zoom origin in the vertical.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.
- **Examples**:

  ```js
  cropperImage.$zoom(0.1); // Zoom in 10%
  cropperImage.$zoom(-0.1); // Zoom out 10%
  cropperImage.$zoom(0.1, 0, 0); // Zoom in from the top-left corner
  cropperImage.$zoom(-0.1, 0, 0); // Zoom out from the top-left corner
  ```

Zooms the image.

### $scale

- **Syntax**:
  - `$scale(x)`
  - `$scale(x, y)`
- **Arguments**:
  - `x`:
    - Type: `number`
    - The scaling factor in the horizontal direction.
  - `y`:
    - Type: `number`
    - Default: `x`
    - The scaling factor in the vertical direction.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.
- **Examples**:

  ```js
  cropperImage.$scale(1.1); // Zoom in 10%
  cropperImage.$scale(0.9); // Zoom out 10%
  cropperImage.$scale(-1); // Flip both the horizontal and vertical directions
  cropperImage.$scale(-1, 1); // Flip the horizontal direction
  cropperImage.$scale(1, -1); // Flip the vertical direction
  ```

Scales the image. It is similar to CSS function [scale()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale()) or [CanvasRenderingContext2D.scale()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale).

### $skew

- **Syntax**:
  - `$skew(x)`
  - `$skew(x, y)`
- **Arguments**:
  - `x`:
    - Type: `number | string`
    - The skewing angle in the horizontal direction. The default unit is `rad`.
  - `y`:
    - Type: `number | string`
    - Default: `x`
    - The skewing angle in the vertical direction. The default unit is `rad`.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.
- **Examples**:
  - `$skew(0.8)`
  - `$skew('0.8rad')`
  - `$skew('45deg')`
  - `$skew('50grad')`
  - `$skew('0.1turn')`
  - `$skew(0, 0.8)`

Skews the image. It is similar to CSS function [skew()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew()).

### $translate

- **Syntax**:
  - `$translate(x)`
  - `$translate(x, y)`
- **Arguments**:
  - `x`:
    - Type: `number`
    - The translating distance in the horizontal direction.
  - `y`:
    - Type: `number`
    - Default: `x`
    - The translating distance in the vertical direction.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Translates the image. It is similar to CSS function [translate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate()) or [CanvasRenderingContext2D.translate()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate).

### $transform

- **Syntax**: `$transform(a, b, c, d, e, f)`
- **Arguments**:
  - `a`:
    - Type: `number`
    - The scaling factor in the horizontal direction.
  - `b`:
    - Type: `number`
    - The skewing angle in the vertical direction.
  - `c`:
    - Type: `number`
    - The skewing angle in the horizontal direction.
  - `d`:
    - Type: `number`
    - The scaling factor in the vertical direction.
  - `e`:
    - Type: `number`
    - The translating distance in the horizontal direction.
  - `f`:
    - Type: `number`
    - The translating distance in the vertical direction.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Transforms the image. It is similar to CSS function [matrix()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix()) or [CanvasRenderingContext2D.transform()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform).

### $setTransform

- **Syntax**:
  - `$setTransform(a, b, c, d, e, f)`
  - `$setTransform(a)`
- **Arguments**:
  - `a`:
    - Type: `number | Array`
    - The scaling factor in the horizontal direction, or the transformation matrix.
  - `b`:
    - Type: `number`
    - The skewing angle in the vertical direction.
  - `c`:
    - Type: `number`
    - The skewing angle in the horizontal direction.
  - `d`:
    - Type: `number`
    - The scaling factor in the vertical direction.
  - `e`:
    - Type: `number`
    - The translating distance in the horizontal direction.
  - `f`:
    - Type: `number`
    - The translating distance in the vertical direction.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Resets (overrides) the current transform to the specific identity matrix, and then invokes a transform described by the arguments of this method. This lets you scale, rotate, translate (move), and skew the context. It is similar to [CanvasRenderingContext2D.setTransform()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform).

### $getTransform

- **Syntax**: `$getTransform()`
- **Returns**:
  - Type: `Array`
  - The current transformation matrix of the element.

Retrieves the current transformation matrix being applied to the element. It is similar to [CanvasRenderingContext2D.getTransform()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform).

### $resetTransform

- **Syntax**:
  - `$resetTransform()`
- **Alternatives**:
  - `$setTransform(1, 0, 0, 1, 0, 0)`
  - `$setTransform([1, 0, 0, 1, 0, 0])`
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Resets the current transform to the initial identity matrix. It is similar to [CanvasRenderingContext2D.resetTransform()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform).

## Events

### transform

- Event:
  - **event.bubbles**: `true`
  - **event.cancelable**: `true`
  - **event.composed**: `true`
  - **event.detail**:
    - Type: `Object`
    - The transform information of the image.
  - **event.detail.matrix**:
    - Type: `Array`
    - The new (next) matrix object.
  - **event.detail.oldMatrix**:
    - Type: `Array`
    - The old (current) matrix object.

The event is fired when the [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) CSS property of the element is going to change.

## Slots

There are no available slots in this element.

> You can enable the default slot by setting the `slottable` property to `true`:
>
> ```html
> <cropper-image slottable></cropper-image>
> ```
