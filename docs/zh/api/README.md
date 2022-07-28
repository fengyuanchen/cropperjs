# Cropper

`Cropper` 构造函数用于创建一个新的 Cropper 实例。

## 使用

### 语法

```js
new Cropper(element[, options])
```

- **element**
  - 类型：`HTMLImageElement | HTMLCanvasElement | string`
  - 用于裁剪的目标图像或画布元素。如果是字符串，将传入 [`document.querySelector`](https：//developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector) 中去查找元素。

- **options** (可选)
  - 类型：`Object`
  - 用于裁剪的[选项](#options)。

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

## 选项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| container | `Element \| string` | 默认为目标元素的父元素，如果父元素为空，则为 `document.body`。 | Cropper 容器。如果是字符串，将传入 `document.querySelector` 中去查找元素。 |
| template | `string` | 默认为内置模板，见下文。 | Cropper 模板。 |

Cropper 的默认模板：

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

## 实例属性

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| element | `HTMLImageElement \| HTMLCanvasElement` | 标准化的 Cropper 元素。 |
| options | `Object` | 标准化的 Cropper 选项。 |
| container | `Element` | 标准化的 Cropper 容器。 |

## 实例方法

### getCropperCanvas

- **语法**：`getCropperCanvas()`
- **等同于**：`cropper.container.querySelector('cropper-canvas')`
- **返回值**：
  - 类型：`CropperCanvas | null`
  - `<cropper-canvas>` 元素（如果有）。

获取 Cropper 容器中的 `<cropper-canvas>` 元素。

### getCropperImage

- **语法**：`getCropperImage()`
- **等同于**：`cropper.container.querySelector('cropper-image')`
- **返回值**：
  - 类型：`CropperImage | null`
  - `<cropper-image>` 元素（如果有）。

获取 Cropper 容器中的 `<cropper-image>` 元素。

### getCropperSelection

- **语法**：`getCropperSelection()`
- **等同于**：`cropper.container.querySelector('cropper-selection')`
- **返回值**：
  - 类型：`CropperSelection | null`
  - `<cropper-selection>` 元素（如果有）。

获取 Cropper 容器中的 `<cropper-selection>` 元素。

### getCropperSelections

- **语法**：`getCropperSelections()`
- **等同于**：`cropper.container.querySelectorAll('cropper-selection')`
- **返回值**：
  - 类型：`NodeListOf<CropperSelection> | null`
  - `<cropper-selection>` 元素（如果有）。

当有多个选择时，获取 Cropper 容器中的所有 `<cropper-selection>` 元素。
