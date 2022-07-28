# CropperViewer

`CropperViewer` 接口提供了用于操作 `<cropper-viewer>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-viewer></cropper-viewer>
```

:::

:::tip
此元素的默认高度为 `0`。
:::

### 连接到 CropperSelection

:::live-demo

```html
<cropper-canvas style="height: 240px;" background>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture"></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection id="cropperSelection" initial-aspect-ratio="1.5" initial-coverage="0.5" movable resizable>
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

<div class="cropper-viewers">
  <cropper-viewer selection="#cropperSelection" style="width: 320px;"></cropper-viewer>
  <cropper-viewer selection="#cropperSelection" style="width: 160px;"></cropper-viewer>
  <cropper-viewer selection="#cropperSelection" style="width: 80px;"></cropper-viewer>
  <cropper-viewer selection="#cropperSelection" style="width: 40px;"></cropper-viewer>
</div>

<style>
.cropper-viewers {
  margin-top: 1rem;
}

.cropper-viewers > cropper-viewer {
  border: 1px solid #ddd;
  display: inline-block;
  margin-right: 1rem;
}
</style>
```

:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| resize | `string` | `"vertical"` | `"both"`, `"horizontal"`, `"vertical"`, `"none"` | 指示此元素是否可调整大小，如果是，则在哪个方向。 |
| selection | `string` | `""` | - | 指示要查看的源选区。它必须是 `document.querySelector` 的有效选择器。 |
| slottable | `boolean` | `false` | - | 指示此元素是否启用默认插槽。 |

## 插槽

此元素中没有可用的插槽。

> 你可以通过将 `slottable` 属性设置为 `true` 来启用默认插槽：
>
> ```html
> <cropper-viewer slottable></cropper-viewer>
> ```
