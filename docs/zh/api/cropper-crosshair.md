# CropperCrosshair

`CropperCrosshair` 接口提供了用于操作 `<cropper-crosshair>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-crosshair></cropper-crosshair>
```

:::

### 自定义颜色

:::live-demo

```html
<cropper-crosshair theme-color="#39f"></cropper-crosshair>
```

:::

### 在 CropperCanvas 中

:::live-demo

```html
<cropper-canvas style="background-color: #39f;">
  <cropper-crosshair centered></cropper-crosshair>
</cropper-canvas>
```

:::

### 在 CropperSelection 中

:::live-demo

```html
<cropper-selection width="160" height="90" style="background-color: #39f;">
  <cropper-crosshair centered></cropper-crosshair>
</cropper-selection>
```

:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| centered | `boolean` | `false` | - | 指示此元素是否居中。 |
| slottable | `boolean` | `false` | - | 指示此元素是否启用默认插槽。 |
| themeColor | `string` | `"rgba(238, 238, 238, 0.5)"` | - | 指示十字准线的颜色。 |

## 插槽

此元素中没有可用的插槽。

> 你可以通过将 `slottable` 属性设置为 `true` 来启用默认插槽：
>
> ```html
> <cropper-crosshair slottable></cropper-crosshair>
> ```
