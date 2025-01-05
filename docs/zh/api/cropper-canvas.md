# CropperCanvas

`CropperCanvas` 接口提供了用于操作 `<cropper-canvas>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-canvas></cropper-canvas>
```

:::

:::tip
此元素的默认最小宽度和最小高度为 `200px` 和 `100px`。
:::

### 背景

:::live-demo

```html
<cropper-canvas background></cropper-canvas>
```

:::

### 交互

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
```

:::

### 禁用

所有指针事件均被禁用。

:::live-demo

```html
<cropper-canvas background disabled>
  <cropper-image src="/cropperjs/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
```

:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| background | `boolean` | `false` | - | 指示此元素是否具有网格背景。 |
| disabled | `boolean` | `false` | - | 指示此元素是否已禁用。 |
| scaleStep | `number` | `0.1` | - | 指示滚轮放大/缩小时缩放系数的步进间隔，必须为正数。 |
| themeColor | `string` | `"#39f"` | - | 指示此元素及其子元素的颜色。 |

## 方法

### $setAction

- **语法**：`$setAction(action)`
- **参数**：
  - `action`：
    - 类型：`string`
    - 新的动作。
- **返回值**：
  - 类型：`CropperCanvas`
  - 元素实例。

将当前动作变更为新动作。

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
- **示例**：
  <ClientOnly>
    <CropperCanvasToNativeCanvas />
  </ClientOnly>

生成一个真实的画布元素，如果有图像，则将其绘制到其中。

## 事件

### action

当指针在画布上变化时触发该事件。

- 事件：
  - **event.bubbles**：`true`
  - **event.cancelable**：`false`
  - **event.composed**：`true`
  - **event.detail**：
    - 类型：`Object`
    - 动作的相关数据。
  - **event.detail.action**：
    - 类型：`string`
    - 可选值：`"select"`, `"move"`, `"scale"`, `"rotate"`, `"transform"`, `"n-resize"`, `"e-resize"`, `"s-resize"`, `"w-resize"`, `"ne-resize"`, `"nw-resize"`, `"se-resize"`, and `"sw-resize"`.
    - 动作类型。
  - **event.detail.relatedEvent**：
    - 类型：`PointerEvent | TouchEvent | MouseEvent | WheelEvent`
    - 触发此事件的相关原生事件。
  - **event.detail.scale**：
    - 类型：`number`
    - 缩放系数，仅当 `action` 为 `"scale"` 或 `"transform"` 时可用。
  - **event.detail.rotate**：
    - 类型：`number`
    - 缩放系数，仅当 `action` 为 `"rotate"` 或 `"transform"` 时可用。
  - **event.detail.startX**：
    - 类型：`number`
    - 起始 `pageX` 值，仅当 `relatedEvent` 为 `PointerEvent`、`TouchEvent` 或 `MouseEvent` 时可用。
  - **event.detail.startY**：
    - 类型：`number`
    - 起始 `pageY` 值，仅在 `relatedEvent` 为 `PointerEvent`、`TouchEvent` 或 `MouseEvent` 时可用。
  - **event.detail.endX**：
    - 类型：`number`
    - 结束 `pageX` 值，仅当 `relatedEvent` 为 `PointerEvent`、`TouchEvent` 或 `MouseEvent` 时可用。
  - **event.detail.endY**：
    - 类型：`number`
    - 结束 `pageY` 值，仅当 `relatedEvent` 为 `PointerEvent`、`TouchEvent` 或 `MouseEvent` 时可用。
- 示例：

```html
<cropper-canvas id="canvas"></cropper-canvas>

<script>
document.querySelector('#canvas').addEventListener('action', function (event) {
  console.log(event);
});
</script>
```

### actionstart

当指针变为活动状态时触发该事件。

- 事件：
  - **event.bubbles**：`true`
  - **event.cancelable**：`true`
  - **event.composed**：`true`
  - **event.detail**：
    - 类型：`Object`
    - 动作的相关数据。
  - **event.detail.action**：
    - 类型：`string`
    - 可选值：与 `action` 事件相同，除了 `"scale"` 选项。
    - 动作类型。
  - **event.detail.relatedEvent**：
    - 类型：`PointerEvent | TouchEvent | MouseEvent`
    - 触发此事件的相关原生事件。

### actionmove

当指针改变坐标时触发此事件。

- 事件：
  - **event.bubbles**：`true`
  - **event.cancelable**：`true`
  - **event.composed**：`true`
  - **event.detail**：
    - 类型：`Object`
    - 动作的相关数据。
  - **event.detail.action**：
    - 类型：`string`
    - 可选值：与 `action` 事件相同，除了 `"scale"` 选项。
    - 动作类型。
  - **event.detail.relatedEvent**：
    - 类型：`PointerEvent | TouchEvent | MouseEvent`
    - 触发此事件的相关原生事件。

### actionend

当指针不再处于活动状态时会触发此事件。

- 事件：
  - **event.bubbles**：`true`
  - **event.cancelable**：`true`
  - **event.composed**：`true`
  - **event.detail**：
    - 类型：`Object`
    - 动作的相关数据。
  - **event.detail.action**：
    - 类型：`string`
    - 可选值：与 `action` 事件相同，除了 `"scale"` 选项。
    - 动作类型。
  - **event.detail.relatedEvent**：
    - 类型：`PointerEvent | TouchEvent | MouseEvent`
    - 触发此事件的相关原生事件。

## 插槽

此元素中只有一个默认插槽。

> 你可以通过将 `slottable` 属性设置为 `false` 来禁用它：
>
> ```html
> <cropper-canvas slottable="false"></cropper-canvas>
> ```
