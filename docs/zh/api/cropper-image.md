# CropperImage

`CropperImage` 接口提供了用于操作 `<cropper-image>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-image></cropper-image>
```

:::

:::tip
此元素的默认宽度和高度为 `0`。
:::

### 有图片源

:::live-demo

```html
<cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture" style="width: 100%;"></cropper-image>
```

:::

### 限制边界

<ClientOnly>
  <CropperImageExample />
</ClientOnly>

::: details
<<< @/.vitepress/components/CropperImageExample.vue
:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| rotatable | `boolean` | `true` | - | 指示此元素是否可旋转。 |
| scalable | `boolean` | `true` | - | 指示此元素是否可缩放。 |
| skewable | `boolean` | `true` | - | 指示此元素是否可倾斜。 |
| slottable | `boolean` | `false` | - | 指示此元素是否启用默认插槽。 |
| translatable | `boolean` | `true` | - | 指示此元素是否可移动。 |
| initial-center-size | `string` | `"contain"` | `"contain"`, `"cover"` | 指示图像与其父元素的中心对齐时的初始大小。 |

默认情况下，内置的 `<img>` 元素将继承以下属性：

- `alt`
- `crossorigin`
- `decoding`
- `importance`
- `loading`
- `referrerpolicy`
- `sizes`
- `src`
- `srcset`

## 方法

### $ready

- **语法**：
  - `$ready()`
  - `$ready(callback)`
- **参数**：
  - `callback`：
    - 类型：`Function`
    - 成功加载图片后执行的回调。
- **返回值**：
  - 类型：`Promise`
  - 一个以图片元素为给定值解析后的 Promise。
- **示例**：

  ```js
  const cropperImage = new CropperImage();

  cropperImage.$ready((image) => {
    console.log(image.naturalWidth, image.naturalHeight);
  });
  cropperImage.src = '/cropperjs/v2/picture.jpg';
  ```

成功加载图像后延迟执行回调。

### $center

- **语法**：
  - `$center()`
  - `$center(size)`
- **参数**：
  - `size`：
    - 类型：`string`
    - 可选值：`"contain"`, and `"cover"`.
    - 图像的尺寸模式。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

将图像与其父元素的中心对齐。

### $move

- **语法**：
  - `$move(x)`
  - `$move(x, y)`
- **参数**：
  - `x`：
    - 类型：`number`
    - 水平方向的移动距离。
  - `y`：
    - 类型：`number`
    - 默认值：`x`
    - 垂直方向的移动距离。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

移动图像。

### $moveTo

- **语法**：
  - `$moveTo(x)`
  - `$moveTo(x, y)`
- **参数**：
  - `x`：
    - 类型：`number`
    - 水平方向的新位置。
  - `y`：
    - 类型：`number`
    - 默认值：`x`
    - 垂直方向的新位置。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

移动图像到指定位置。

### $rotate

- **语法**：`$rotate(angle)`
- **参数**：
  - `angle`：
    - 类型：`number | string`
    - 旋转角度（以弧度为单位）。默认单位是 `rad`。
  - `x`：
    - 类型：`number`
    - 默认值：图像在水平方向的中心。
    - 水平方向的旋转原点。
  - `y`：
    - 类型：`number`
    - 默认值：图像在垂直方向的中心。
    - 垂直方向的旋转原点。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。
- **示例**：
  - `$rotate(0.8)`
  - `$rotate('0.8rad')`
  - `$rotate('45deg')`
  - `$rotate('50grad')`
  - `$rotate('0.1turn')`
  - `$rotate('90deg', 0, 0)`

旋转图像。它类似于 CSS 函数 [rotate()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate()) 或 [CanvasRenderingContext2D.rotate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate)。

### $zoom

- **语法**：
  - `$zoom(scale)`
  - `$zoom(scale, x, y)`
- **参数**：
  - `scale`：
    - 类型：`number`
    - 缩放系数。正数表示放大，负数表示缩小。
  - `x`：
    - 类型：`number`
    - 默认值：图像在水平方向的中心。
    - 水平方向的缩放原点。
  - `y`：
    - 类型：`number`
    - 默认值：图像在垂直方向的中心。
    - 垂直方向的缩放原点。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。
- **示例**：

  ```js
  cropperImage.$zoom(0.1); // 放大 10%
  cropperImage.$zoom(-0.1); // 缩小 10%
  cropperImage.$zoom(0.1, 0, 0); // 以图片左上角为原点放大 10%
  cropperImage.$zoom(-0.1, 0, 0); // 以图片左上角为原点缩小 10%
  ```

缩放图像。

### $scale

- **语法**：
  - `$scale(x)`
  - `$scale(x, y)`
- **参数**：
  - `x`：
    - 类型：`number`
    - 水平方向的缩放系数。
  - `y`：
    - 类型：`number`
    - 默认值：`x`
    - 垂直方向的缩放系数。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。
- **示例**：

  ```js
  cropperImage.$scale(1.1); // 放大 10%
  cropperImage.$scale(0.9); // 缩小 10%
  cropperImage.$scale(-1); // 翻转水平和垂直方向
  cropperImage.$scale(-1, 1); // 翻转水平方向
  cropperImage.$scale(1, -1); // 翻转垂直方向
  ```

缩放图像。它类似于 CSS 函数 [scale()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/scale()) 或 [CanvasRenderingContext2D.scale()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/scale)。

### $skew

- **语法**：
  - `$skew(x)`
  - `$skew(x, y)`
- **参数**：
  - `x`：
    - 类型：`number | string`
    - 水平方向的倾斜角度。默认单位是 `rad`。
  - `y`：
    - 类型：`number | string`
    - 默认值：`x`
    - 垂直方向的倾斜角度。默认单位是 `rad`。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。
- **示例**：
  - `$skew(0.8)`
  - `$skew('0.8rad')`
  - `$skew('45deg')`
  - `$skew('50grad')`
  - `$skew('0.1turn')`
  - `$skew(0, 0.8)`

倾斜图像。它类似于 CSS 函数 [skew()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/skew())。

### $translate

- **语法**：
  - `$translate(x)`
  - `$translate(x, y)`
- **参数**：
  - `x`：
    - 类型：`number`
    - 水平方向的平移距离。
  - `y`：
    - 类型：`number`
    - 默认值：`x`
    - 垂直方向的平移距离。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

平移图像。它类似于 CSS 函数 [translate()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate()) 或 [CanvasRenderingContext2D.translate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate)。

### $transform

- **语法**：`$transform(a, b, c, d, e, f)`
- **参数**：
  - `a`：
    - 类型：`number`
    - 水平方向的缩放系数。
  - `b`：
    - 类型：`number`
    - 垂直方向的倾斜角度。
  - `c`：
    - 类型：`number`
    - 水平方向的倾斜角度。
  - `d`：
    - 类型：`number`
    - 垂直方向的缩放系数。
  - `e`：
    - 类型：`number`
    - 水平方向的平移距离。
  - `f`：
    - 类型：`number`
    - 垂直方向的平移距离。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

变换图像。它类似于 CSS 函数 [matrix()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix()) 或 [CanvasRenderingContext2D.transform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/transform)。

### $setTransform

- **语法**：
  - `$setTransform(a, b, c, d, e, f)`
  - `$setTransform(a)`
- **参数**：
  - `a`：
    - 类型：`number | Array`
    - 水平方向的缩放系数，或变换矩阵。
  - `b`：
    - 类型：`number`
    - 垂直方向的倾斜角度。
  - `c`：
    - 类型：`number`
    - 水平方向的倾斜角度。
  - `d`：
    - 类型：`number`
    - 垂直方向的缩放系数。
  - `e`：
    - 类型：`number`
    - 水平方向的平移距离。
  - `f`：
    - 类型：`number`
    - 垂直方向的平移距离。
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

将当前变换重置（覆盖）为指定的单位矩阵，然后调用由该方法的参数描述的变换。这使你可以缩放、旋转、平移（移动）和倾斜上下文。它类似于 [CanvasRenderingContext2D.setTransform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform)。

### $getTransform

- **语法**：`$getTransform()`
- **返回值**：
  - 类型：`Array`
  - 元素的当前变换矩阵。

检索应用于元素的当前变换矩阵。它类似于 [CanvasRenderingContext2D.getTransform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getTransform)。

### $resetTransform

- **语法**：
  - `$resetTransform()`
- **等同于**：
  - `$setTransform(1, 0, 0, 1, 0, 0)`
  - `$setTransform([1, 0, 0, 1, 0, 0])`
- **返回值**：
  - 类型：`CropperImage`
  - 元素实例。

将当前变换重置为初始单位矩阵。它类似于 [CanvasRenderingContext2D.resetTransform()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/resetTransform)。

## 事件

### transform

- 事件：
  - **event.bubbles**：`true`
  - **event.cancelable**：`true`
  - **event.composed**：`true`
  - **event.detail**：
    - 类型：`Object`
    - 图像的变换信息。
  - **event.detail.matrix**：
    - 类型：`Array`
    - 新的（下一个）矩阵对象。
  - **event.detail.oldMatrix**：
    - 类型：`Array`
    - 旧的（当前）矩阵对象。

当元素的 [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) CSS 属性将要变更时，将触发该事件。

## 插槽

此元素中没有可用的插槽。

> 你可以通过将 `slottable` 属性设置为 `true` 来启用默认插槽：
>
> ```html
> <cropper-image slottable></cropper-image>
> ```
