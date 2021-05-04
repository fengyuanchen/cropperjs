---
sidebar: auto
---

# Migration

## Options

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `viewMode` | Deprecated. |
| `dragMode` | Use the `<cropper-handle>` element's `action` property. |
| `initialAspectRatio` | Use the `<cropper-selection>` element's `initialAspectRatio` property. |
| `aspectRatio` | Use the `<cropper-selection>` element's `aspectRatio` property. |
| `data` | Use the `<cropper-image>` element's `$setTransform` method, and the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `preview` | Use the `<cropper-viewer>` element. |
| `responsive` | Deprecated. |
| `restore` | Deprecated. |
| `checkCrossOrigin` | Deprecated. |
| `checkOrientation` | Deprecated for performance reasons. As an alternative, it is recommended to use a third-party library, such as [JavaScript-Load-Image](https://github.com/blueimp/JavaScript-Load-Image). |
| `modal` | Use the `<cropper-shade>` element. |
| `guides` | Use the `<cropper-grid>` element. |
| `center` | Use the `<cropper-crosshair>` element. |
| `highlight` | Use the `<cropper-action>` element. |
| `background` | Use the `<cropper-canvas>` element's `background` property. |
| `autoCrop` | Use the `<cropper-selection>` element's `autoSelect` property. |
| `autoCropArea` | Use the `<cropper-selection>` element's `autoSelectArea` property. |
| `movable` | Use the `<cropper-image>` element's `translatable` property. |
| `rotatable` | Use the `<cropper-image>` element's `rotatable` property. |
| `scalable` | Use the `<cropper-image>` element's `scalable` property. |
| `zoomable` | Deprecated. |
| `zoomOnTouch` | Deprecated. |
| `zoomOnWheel` | Deprecated. |
| `wheelZoomRatio` | Use the `<cropper-canvas>` element's `scale` property. |
| `cropBoxMovable` | Use the `<cropper-selection>` element's `movable` property. |
| `cropBoxResizable` | Use the `<cropper-selection>` element's `resizable` property. |
| `toggleDragModeOnDblclick` | Deprecated. |
| `minContainerWidth` | Deprecated. |
| `minContainerHeight` | Deprecated. |
| `minCanvasWidth` | Use the `<cropper-canvas>` element's `min-width` CSS property. |
| `minCanvasHeight` | Use the `<cropper-canvas>` element's `min-height` CSS property. |
| `minCropBoxWidth` | Use the `<cropper-selection>` element's `min-width` CSS property. |
| `minCropBoxHeight` | Use the `<cropper-selection>` element's `min-height` CSS property. |
| `ready` | Use the `<cropper-image>` element's `load` event. |
| `cropstart` | Use the `<cropper-canvas>` element's `actionstart` event. |
| `cropmove` | Use the `<cropper-canvas>` element's `actionmove` event. |
| `cropend` | Use the `<cropper-canvas>` element's `actionend` event. |
| `crop` | Use the `<cropper-canvas>` element's `action` event. |
| `zoom` | Use the `<cropper-canvas>` element's `action` event. |

## Methods

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `crop` | Use the `<cropper-selection>` element's `$change` method. |
| `reset` | Use the `<cropper-image>` element's `$resetTransform` method, and the `<cropper-selection>` element's `$reset` method. |
| `clear` | Use the `<cropper-selection>` element's `$reset` method and `hidden` property. |
| `replace` | Use the `<cropper-image>` element's `src` property. |
| `enable` | Use the `<cropper-canvas>` element's `disabled` property. |
| `disable` | Use the `<cropper-canvas>` element's `disabled` property. |
| `destroy` | Drops the Cropper elements from the DOM directly. |
| `move` | Use the `<cropper-image>` element's `$move` method. |
| `moveTo` | Use the `<cropper-image>` element's `$moveTo` method. |
| `zoom` | Use the `<cropper-image>` element's `$scale` method. |
| `zoomTo` | Use the `<cropper-image>` element's `$setTransform` method. |
| `rotate` | Use the `<cropper-image>` element's `$rotate` method. |
| `rotateTo` | Use the `<cropper-image>` element's `$setTransform` method. |
| `scale` | Use the `<cropper-image>` element's `$scale` method. |
| `scaleX` | Use the `<cropper-image>` element's `$scale` method. |
| `scaleY` | Use the `<cropper-image>` element's `$scale` method. |
| `getData` | Use the `<cropper-image>` element's `$getTransform` method, and the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `setData` | Use the `<cropper-image>` element's `$setTransform` method, and the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `getContainerData` | Deprecated. |
| `getImageData` | Use the `<cropper-image>` element's `$getTransform` method. |
| `getCanvasData` | Deprecated. |
| `setCanvasData` | Deprecated. |
| `getCropBoxData` | Use the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `setCropBoxData` | Use the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `getCroppedCanvas` | Use the `<cropper-selection>` element's `$toCanvas` method. |
| `setAspectRatio` | Use the `<cropper-selection>` element's `aspectRatio` property. |
| `setDragMode` | Deprecated. |

## Events

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `ready` | Use the `<cropper-image>` element's `load` event. |
| `cropstart` | Use the `<cropper-canvas>` element's `actionstart` event. |
| `cropmove` | Use the `<cropper-canvas>` element's `actionmove` event. |
| `cropend` | Use the `<cropper-canvas>` element's `actionend` event. |
| `crop` | Use the `<cropper-canvas>` element's `action` event. |
| `zoom` | Use the `<cropper-canvas>` element's `action` event. |
