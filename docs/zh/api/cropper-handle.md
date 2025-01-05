# CropperHandle

`CropperHandle` 接口提供了用于操作 `<cropper-handle>` 元素的布局和表示的属性和方法。

## 示例

### 基本

:::live-demo

```html
<cropper-handle></cropper-handle>
```

:::

:::tip
此元素的默认宽度和高度为 `0`。
:::

### 在 CropperCanvas 中

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-handle action="move"></cropper-handle>
</cropper-canvas>
```

:::

### 在 CropperSelection 中

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-selection width="100" height="100" movable>
    <cropper-handle action="move"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
```

:::

### 双击切换动作类型

<ClientOnly>
  <CropperActionExample />
</ClientOnly>

::: details
<<< @/.vitepress/components/CropperActionExample.vue
:::

## 属性

从其父级 [`CropperElement`](cropper-element.html) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| action | `string` | `"none"` | `"select"`, `"move"`, `"scale"`, `"n-resize"`, `"e-resize"`, `"s-resize"`, `"w-resize"`, `"ne-resize"`, `"nw-resize"`, `"se-resize"`, `"sw-resize"`, `"none"` | 表示手柄的动作类型。 |
| plain | `boolean` | `false` | - | 指示此元素是否为素色元素。 |
| slottable | `boolean` | `false` | - | 指示此元素是否启用默认插槽。 |
| themeColor | `string` | `"rgba(51, 153, 255, 0.5)"` | - | 指示手柄的颜色。 |

## 插槽

此元素中没有可用的插槽。

> 你可以通过将 `slottable` 属性设置为 `true` 来启用默认插槽：
>
> ```html
> <cropper-handle slottable></cropper-handle>
> ```
