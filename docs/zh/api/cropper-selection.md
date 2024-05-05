# CropperSelection

`CropperSelection` 接口提供了用于操作 `<cropper-selection>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-selection></cropper-selection>
```

:::

:::tip
此元素的默认宽度和高度为 `0`。
:::

### 自定义初始覆盖范围

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection initial-coverage="0.5" outlined></cropper-selection>
</cropper-canvas>
```

:::

### 自定义位置和大小

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection x="10" y="5" width="160" height="90" outlined></cropper-selection>
</cropper-canvas>
```

:::

### 带有手柄

:::live-demo

```html
<cropper-canvas background>
  <cropper-selection initial-coverage="0.5" movable resizable outlined>
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

### 多选区

将 `multiple` 属性设置为 `true`，以支持在同一图像上的创建多个选区。

:::live-demo

```html
<cropper-canvas style="height: 360px;" background>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture"></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection id="cropperSelection" x="20" y="20" width="40" height="40" movable resizable zoomable multiple keyboard>
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
  <cropper-selection id="cropperSelection1" x="60" y="60" width="80" height="80" movable resizable zoomable multiple keyboard>
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
  <cropper-selection id="cropperSelection2" x="140" y="140" width="120" height="120" movable resizable zoomable multiple keyboard>
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

### 限制边界

<ClientOnly>
  <CropperSelectionExample />
</ClientOnly>

::: details
<<< @/.vitepress/components/CropperSelectionExample.vue
:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| x | `number` | `0` | - | 指示选区的 x 轴坐标。 |
| y | `number` | `0` | - | 指示选区的 y 轴坐标。 |
| width | `number` | `0` | - | 指示选区的宽度。
| height | `number` | `0` | - | 指示选区的高度。 |
| aspectRatio | `number` | `NaN` | - | 指示选区的纵横比，必须是正数。 |
| initialAspectRatio | `number` | `NaN` | - | 指示选区的初始长宽比，必须一个正数。 |
| initialCoverage | `number` | `NaN` | - | 指示选区的初始覆盖范围，必须是在 `0` （0％）和 `1` （100%）之间的正数。 |
| movable | `boolean` | `false` | - | 指示此元素是否可移动。 |
| resizable | `boolean` | `false` | - | 指示此元素是否可调整大小。 |
| zoomable | `boolean` | `false` | - | 指示此元素是否可缩放。 |
| multiple | `boolean` | `false` | - | 指示是否支持多选区。 |
| keyboard | `boolean` | `false` | - | 指示是否支持键盘控制。 |
| outlined | `boolean` | `false` | - | 指示是否显示轮廓线。 |
| precise | `boolean` | `false` | - | 指示是否保留 `x`、`y`、`width` 和 `height` 属性的精确值。 |

支持的键盘键：

- `Delete` 或 `Command + Backspace`：删除活动选区。
- `ArrowLeft`：将活动选区向左移动 1 个像素。
- `ArrowRight`：将活动选区向右移动 1 个像素。
- `ArrowUp`：将活动选区向上移动 1 个像素。
- `ArrowDown`：将活动选区向下移动 1 个像素。
- `+`：将活动选区放大 10%。
- `-`：将活动选区缩小 10%。

## 方法

### $center

- **语法**：`$center()`
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

将选区与其父元素的中心对齐。

### $move

- **语法**：
  - `$move(x)`
  - `$move(x, y)`
- **等同于**：
  - `$moveTo(selection.x + x)`
  - `$moveTo(selection.x + x, selection.y + y)`
- **参数**：
  - `x`：
    - 类型：`number`
    - 水平方向的移动距离。
  - `y`：
    - 类型：`number`
    - 默认值：`x`
    - 垂直方向的移动距离。
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

移动选区。

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
  - 类型：`CropperSelection`
  - 元素实例。

移动选区到指定位置。

### $resize

- **语法**：
  - `$resize(action)`
  - `$resize(action, offsetX)`
  - `$resize(action, offsetX, offsetY)`
  - `$resize(action, offsetX, offsetY, aspectRatio)`
- **参数**：
  - `action`：
    - 类型：`string`
    - 可选值：`"n-resize"`, `"e-resize"`, `"s-resize"`, `"w-resize"`, `"ne-resize"`, `"nw-resize"`, `"se-resize"`, and `"sw-resize"`.
    - 指示要调整大小的边或角。
  - `offsetX`：
    - 类型：`number`
    - 默认值：`0`
    - 指定边或角的水平偏移。
  - `offsetY`：
    - 类型：`number`
    - 默认值：`0`
    - 指定边或角的垂直偏移。
  - `aspectRatio`：
    - 类型：`number`
    - 默认值：`this.aspectRatio`
    - 必要时计算新尺寸的纵横比。
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

调整指定边或角上选区的大小。

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
    - 默认值：选区在水平方向上的中心。
    - 水平方向的缩放原点。
  - `y`：
    - 类型：`number`
    - 默认值：选区在垂直方向上的中心。
    - 垂直方向的缩放原点。
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。
- **示例**：

  ```js
  cropperSelection.$zoom(0.1); // 放大 10%
  cropperSelection.$zoom(-0.1); // 缩小 10%
  ```

缩放选区。同时直接变更选区的宽度和高度（以像素为单位）。

### $change

- **语法**：
  - `$change(x, y)`
  - `$change(x, y, width, height)`
  - `$change(x, y, width, height, aspectRatio)`
- **参数**：
  - `x`：
    - 类型：`number`
    - 水平方向的新位置。
  - `y`：
    - 类型：`number`
    - 垂直方向的新位置。
  - `width`：
    - 类型：`number`
    - 默认值：`this.width`
    - 新宽度。
  - `height`：
    - 类型：`number`
    - 默认值：`this.height`
    - 新高度。
  - `aspectRatio`：
    - 类型：`number`
    - 默认值：`this.aspectRatio`
    - 仅限当前变更的新纵横比。
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

变更选区的位置和/或大小。

### $reset

- **语法**：`$reset()`
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

将选区重置为其初始位置和大小。

### $clear

- **语法**：`$clear()`
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

清空选区。

### $render

- **语法**：`$render()`
- **返回值**：
  - 类型：`CropperSelection`
  - 元素实例。

刷新选区的位置或大小。

### $toCanvas

- **语法**：
  - `$toCanvas()`
  - `$toCanvas(options)`
- **参数**：
  - `options`：
    - 类型：`Object`
    - 可用选项。
    - 属性：
      - `width`：
        - 类型：`number`
        - 画布的宽度。
      - `height`：
        - 类型：`number`
        - 画布的高度。
      - `beforeDraw`：
        - 类型：`Function`
        - 在将图像绘制到画布上之前调用的函数。
        - 语法：`beforeDraw(context, canvas)`
        - 参数：
          - `context`：
            - 类型：`CanvasRenderingContext2D`
            - 画布的 2D 渲染上下文。
          - `canvas`：
            - 类型：`HTMLCanvasElement`
            - 画布元素本身。
        - 示例：`function (context) { context.filter = 'grayscale(100%)'; }`
- **返回值**：
  - 类型：`Promise`
  - 一个以生成的画布元素为给定值解析后的 Promise 对象。
- **Example**：
  <ClientOnly>
    <CropperSelectionToNativeCanvas />
  </ClientOnly>

生成一个真实的画布元素，如果有图像（仅限选定区域），则将其绘制到其中。

## 事件

### change

当选区的位置和尺寸即将发送变化时触发该事件。

- 事件：
  - **event.bubbles**：`true`
  - **event.cancelable**：`true`
  - **event.composed**：`true`
  - **event.detail**：
    - 类型：`Object`
    - 选区的位置和大小数据。
  - **event.detail.x**：
    - 类型：`number`
    - 选区的 x 轴坐标。
  - **event.detail.y**：
    - 类型：`number`
    - 选区的 y 轴坐标。
  - **event.detail.width**：
    - 类型：`number`
    - 选区的宽度。
  - **event.detail.height**：
    - 类型：`number`
    - 选区的高度。
- 示例：

```html
<cropper-selection id="selection"></cropper-selection>

<script>
document.querySelector('#selection').addEventListener('change', function (event) {
  console.log(event);
});
</script>
```

## 插槽

此元素中只有一个默认插槽。

> 你可以通过将 `slottable` 属性设置为 `false` 来禁用它：
>
> ```html
> <cropper-selection slottable="false"></cropper-selection>
> ```
