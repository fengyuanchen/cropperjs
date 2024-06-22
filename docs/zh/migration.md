---
sidebar: auto
---

# 迁移

## 选项

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `viewMode` | 改用 `<cropper-image>` 元素的 `transform` 事件去[限制图片边界](api/cropper-image.html#限制边界), 或者改用 `<cropper-selection>` 元素的  `change` 事件去[限制选区边界](api/cropper-selection.html#限制边界). |
| `dragMode` | 改用 `<cropper-handle>` 元素的 `action` 属性。 |
| `initialAspectRatio` | 改用 `<cropper-selection>` 元素的 `initialAspectRatio` 属性。 |
| `aspectRatio` | 改用 `<cropper-selection>` 元素的 `aspectRatio` 属性。 |
| `data` | 改用 `<cropper-image>` 元素的 `$setTransform` 方法，以及 `<cropper-selection>` 元素的 `x`、`y`、`width`、`height` 属性。 |
| `preview` | 改用 `<cropper-viewer>` 元素。 |
| `responsive` | 已废弃。 |
| `restore` | 已废弃。 |
| `checkCrossOrigin` | 已废弃。 |
| `checkOrientation` | 出于性能原因已废弃。作为替代方案，建议使用第三方库，例如 [JavaScript-Load-Image](https://github.com/blueimp/JavaScript-Load-Image)。 |
| `modal` | 改用 `<cropper-shade>` 元素。 |
| `guides` | 改用 `<cropper-grid>` 元素。 |
| `center` | 改用 `<cropper-crosshair>` 元素。 |
| `highlight` | 改用 `<cropper-action>` 元素。 |
| `background` | 改用 `<cropper-canvas>` 元素的 `background` 属性。 |
| `autoCrop` | 改用 `<cropper-selection>` 元素的 `initialCoverage` 属性。 |
| `autoCropArea` | 改用 `<cropper-selection>` 元素的 `initialCoverage` 属性。 |
| `movable` | 改用 `<cropper-image>` 元素的 `translatable` 属性。 |
| `rotatable` | 改用 `<cropper-image>` 元素的 `rotatable` 属性。 |
| `scalable` | 改用 `<cropper-image>` 元素的 `scalable` 属性。 |
| `zoomable` | 已废弃。 |
| `zoomOnTouch` | 已废弃。 |
| `zoomOnWheel` | 已废弃。 |
| `wheelZoomRatio` | 改用 `<cropper-canvas>` 元素的 `scaleStep` 属性。 |
| `cropBoxMovable` | 改用 `<cropper-selection>` 元素的 `movable` 属性。 |
| `cropBoxResizable` | 改用 `<cropper-selection>` 元素的 `resizable` 属性。 |
| `toggleDragModeOnDblclick` | 改用 `<cropper-handle>` 元素的 `dblclick` 事件去[双击切换动作类型](api/cropper-handle.html#toggle-action-on-dblclick)。 |
| `minContainerWidth` | 已废弃。 |
| `minContainerHeight` | 已废弃。 |
| `minCanvasWidth` | 改用 `<cropper-canvas>` 元素的 `min-width` CSS 属性。 |
| `minCanvasHeight` | 改用 `<cropper-canvas>` 元素的 `min-height` CSS 属性。 |
| `minCropBoxWidth` | 改用 `<cropper-selection>` 元素的 `min-width` CSS 属性。 |
| `minCropBoxHeight` | 改用 `<cropper-selection>` 元素的 `min-height` CSS 属性。 |
| `ready` | 改用 `<cropper-image>` 元素的  `$ready` 方法。 |
| `cropstart` | 改用 `<cropper-canvas>` 元素的 `actionstart` 事件。 |
| `cropmove` | 改用 `<cropper-canvas>` 元素的 `actionmove` 事件。 |
| `cropend` | 改用 `<cropper-canvas>` 元素的 `actionend` 事件。 |
| `crop` | 改用 `<cropper-canvas>` 元素的 `action` 事件。 |
| `zoom` | 改用 `<cropper-canvas>` 元素的 `action` 事件。 |

## 方法

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `crop` | 改用 `<cropper-selection>` 元素的 `$change` 方法。 |
| `reset` | 改用 `<cropper-image>` 元素的 `$resetTransform` 方法，以及 `<cropper-selection>` 元素的 `$reset` 方法。 |
| `clear` | 改用 `<cropper-selection>` 元素的 `$reset` 方法和 `hidden` 属性。 |
| `replace` | 改用 `<cropper-image>` 元素的 `src` 属性。 |
| `enable` | 改用 `<cropper-canvas>` 元素的 `disabled` 属性。 |
| `disable` | 改用 `<cropper-canvas>` 元素的 `disabled` 属性。 |
| `destroy` | 已废弃。直接从 DOM 中删除所有 Cropper 元素。 |
| `move` | 改用 `<cropper-image>` 元素的 `$move` 方法。 |
| `moveTo` | 改用 `<cropper-image>` 元素的 `$moveTo` 方法。 |
| `zoom` | 改用 `<cropper-image>` 元素的 `$scale` 方法。 |
| `zoomTo` | 改用 `<cropper-image>` 元素的 `$setTransform` 方法。 |
| `rotate` | 改用 `<cropper-image>` 元素的 `$rotate` 方法。 |
| `rotateTo` | 改用 `<cropper-image>` 元素的 `$setTransform` 方法。 |
| `scale` | 改用 `<cropper-image>` 元素的 `$scale` 方法。 |
| `scaleX` | 改用 `<cropper-image>` 元素的 `$scale` 方法。 |
| `scaleY` | 改用 `<cropper-image>` 元素的 `$scale` 方法。 |
| `getData` | 改用 `<cropper-image>` 元素的 `$getTransform` 方法，以及 `<cropper-selection>` 元素的 `x`、`y`、`width`、`height` 属性。 |
| `setData` | 改用 `<cropper-image>` 元素的 `$setTransform` 方法，以及 `<cropper-selection>` 元素的 `x`、`y`、`width`、`height` 属性。 |
| `getContainerData` | 已废弃。 |
| `getImageData` | 改用 `<cropper-image>` 元素的 `$getTransform` 方法。 |
| `getCanvasData` | 已废弃。 |
| `setCanvasData` | 已废弃。 |
| `getCropBoxData` | 改用 `<cropper-selection>` 元素的 `x`、`y`、`width`、`height` 属性。 |
| `setCropBoxData` | 改用 `<cropper-selection>` 元素的 `x`、`y`、`width`、`height` 属性。 |
| `getCroppedCanvas` | 改用 `<cropper-selection>` 元素的 `$toCanvas` 方法。 |
| `setAspectRatio` | 改用 `<cropper-selection>` 元素的 `aspectRatio` 属性。 |
| `setDragMode` | 改用 `<cropper-handle>` 元素的 `action` 属性。 |

## 事件

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `ready` | 改用 `<cropper-image>` 元素的  `$ready` 方法。 |
| `cropstart` | 改用 `<cropper-canvas>` 元素的 `actionstart` 事件。 |
| `cropmove` | 改用 `<cropper-canvas>` 元素的 `actionmove` 事件。 |
| `cropend` | 改用 `<cropper-canvas>` 元素的 `actionend` 事件。 |
| `crop` | 改用 `<cropper-canvas>` 元素的 `action` 事件。 |
| `zoom` | 改用 `<cropper-canvas>` 元素的 `action` 事件。 |
