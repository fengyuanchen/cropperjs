# CropperShade

`CropperShade` 接口提供了用于操作 `<cropper-shade>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-shade></cropper-shade>
```

:::

:::tip
此元素的默认宽度和高度为 `0`。
:::

### 指定位置和大小

:::live-demo

```html
<cropper-canvas background>
  <cropper-shade x="240" y="5" width="160" height="90"></cropper-shade>
</cropper-canvas>
```

:::

### 自定义颜色

:::live-demo

```html
<cropper-canvas background>
  <cropper-shade x="240" y="5" width="160" height="90" theme-color="rgba(0, 0, 0, 0.35)"></cropper-shade>
</cropper-canvas>
```

:::

### 当指针按下/松开时动态切换可见性

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection movable resizable hidden>
    <cropper-handle action="move" plain></cropper-handle>
  </cropper-selection>
</cropper-canvas>
```

:::

:::tip
`<cropper-shade>` 元素将自动同步当前活动的 `<cropper-selection>` 元素的位置和大小。
:::

:::tip
[`hidden`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/hidden) 属性是原生全局属性。
:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| x | `number` | `0` | - | 指示元素的 x 轴坐标。 |
| y | `number` | `0` | - | 指示元素的 y 轴坐标。 |
| width | `number` | `0` | - | 指示元素的宽度。 |
| height | `number` | `0` | - | 指示元素的高度。 |
| slottable | `boolean` | `false` | - | 指示此元素是否启用默认插槽。 |
| themeColor | `string` | `"rgba(0, 0, 0, 0.65)"` | - | 指示此元素的颜色。 |

## 方法

### $change

- **语法**：
  - `$change(x, y)`
  - `$change(x, y, width, height)`
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
- **返回值**：
  - 类型：`CropperShade`
  - 用于链接的元素实例。

变更阴影的位置和/或大小。

### $reset

- **语法**：`$reset()`
- **返回值**：
  - 类型：`CropperShade`
  - 元素实例。

将阴影重置为其初始位置和大小。

### $render

- **语法**：`$render()`
- **返回值**：
  - 类型：`CropperShade`
  - 元素实例。

刷新阴影的位置或大小。

## 插槽

此元素中只有一个默认插槽。

> 你可以通过将 `slottable` 属性设置为 `false` 来禁用它：
>
> ```html
> <cropper-shade slottable="false"></cropper-shade>
> ```
