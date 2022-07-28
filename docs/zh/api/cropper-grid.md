# CropperGrid

`CropperGrid` 接口提供了用于操作 `<cropper-grid>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-grid></cropper-grid>
```

:::

:::tip
此元素的默认高度为 `0`。
:::

### 自定义行和列

:::live-demo

```html
<cropper-grid rows="4" columns="18" theme-color="#39f" style="height: 10rem;"></cropper-grid>
```

:::

### 在 CropperCanvas 中

:::live-demo

```html
<cropper-canvas style="background-color: #39f;">
  <cropper-grid bordered covered></cropper-grid>
</cropper-canvas>
```

:::

### 在 CropperSelection 中

:::live-demo

```html
<cropper-selection width="160" height="90" style="background-color: #39f;">
  <cropper-grid bordered covered></cropper-grid>
</cropper-selection>
```

:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| rows | `number` | `3` | - | 指示行的数量。 |
| columns | `number` | `3` | - | 指示列的数量。 |
| bordered | `boolean` | `false` | - | 指示此元素是否有边框。 |
| covered | `boolean` | `false` | - | 指示此元素是否覆盖其父元素。 |
| slottable | `boolean` | `false` | - | 指示此元素是否启用默认插槽。 |
| themeColor | `string` | `"rgba(238, 238, 238, 0.5)"` | - | 指示元素的颜色。 |

## 插槽

此元素中没有可用的插槽。

> 你可以通过将 `slottable` 属性设置为 `true` 来启用默认插槽：
>
> ```html
> <cropper-grid slottable></cropper-grid>
> ```
