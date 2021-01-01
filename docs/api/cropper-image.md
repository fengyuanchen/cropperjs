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

### Source

:::live-demo

```html
<cropper-image src="/picture.jpg" alt="Cropper logo"></cropper-image>
```

:::

## Properties

Inherits properties from its parent, [`CropperElement`](cropper-element.html), and implements the following properties:

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| rotatable | `boolean` | `true` | - | Indicate whether this element is rotatable. |
| scalable | `boolean` | `true` | - | Indicate whether this element is scalable. |
| skewable | `boolean` | `true` | - | Indicate whether this element is skewable. |
| slottable | `boolean` | `false` | - | Indicate whether this element is slottable. |
| translatable | `boolean` | `true` | - | Indicate whether this element is translatable. |

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

### $center

- **Syntax**: `$center()`
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Aligns the image to the center of its parent element.

### $fit

- **Syntax**: `$fit()`
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Fits the image to its parent element.

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
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.
- **Examples**:
  - `$rotate(0.8)`
  - `$rotate('0.8rad')`
  - `$rotate('45deg')`
  - `$rotate('50grad')`
  - `$rotate('0.1turn')`

Rotates the image.

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

Scales the image.

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

Skews the image.

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

Translates the image.

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

Transforms the image.

### $setTransform

- **Syntax**:
  - `$setTransform(a, b, c, d, e, f)`
  - `$setTransform(matrix)`
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
  - `matrix`:
    - Type: `Array`
    - The transformation matrix.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Resets (overrides) the current transform to the specific identity matrix, and then invokes a transform described by the arguments of this method. This lets you scale, rotate, translate (move), and skew the context. It is similar to [CanvasRenderingContext2D.setTransform()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform).

### $setTransformByOffset

- **Syntax**: `$setTransformByOffset(matrix, x = 0, y = 0)`
- **Arguments**:
  - `matrix`:
    - Type: `Array`
    - The transformation matrix.
  - `x`:
    - Type: `number`
    - Default: `0`
    - The horizontal offset of the transformation origin.
  - `y`:
    - Type: `number`
    - Default: `0`
    - The vertical offset of the transformation origin.
- **Returns**:
  - Type: `CropperImage`
  - The element instance for chaining.

Resets (overrides) the current transform to the specific identity matrix by a certain offset.

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
