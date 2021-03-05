---
sidebar: auto
---

# Migration

## Options

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `viewMode` | Deprecated. |
| `dragMode` | Uses the `<cropper-handle>` element's `action` property. |
| `initialAspectRatio` | Uses the `<cropper-selection>` element's `initialAspectRatio` property. |
| `aspectRatio` | Uses the `<cropper-selection>` element's `aspectRatio` property. |
| `data` | Uses the `<cropper-image>` element's `$setTransform` method, and the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `preview` | Uses the `<cropper-viewer>` element. |
| `responsive` | Deprecated. |
| `restore` | Deprecated. |
| `checkCrossOrigin` | Deprecated. |
| `checkOrientation` | Deprecated for performance reasons. As an alternative, it is recommended to use a third-party library, such as [JavaScript-Load-Image](https://github.com/blueimp/JavaScript-Load-Image). |
| `modal` | Uses the `<cropper-shade>` element. |
| `guides` | Uses the `<cropper-grid>` element. |
| `center` | Uses the `<cropper-crosshair>` element. |
| `highlight` | Uses the `<cropper-action>` element. |
| `background` | Uses the `<cropper-canvas>` element's `background` property. |
| `autoCrop` | Uses the `<cropper-selection>` element's `autoSelect` property. |
| `autoCropArea` | Uses the `<cropper-selection>` element's `autoSelectArea` property. |
| `movable` | Uses the `<cropper-image>` element's `translatable` property. |
| `rotatable` | Uses the `<cropper-image>` element's `rotatable` property. |
| `scalable` | Uses the `<cropper-image>` element's `scalable` property. |
| `zoomable` | Deprecated. |
| `zoomOnTouch` | Deprecated. |
| `zoomOnWheel` | Deprecated. |
| `wheelZoomRatio` | Uses the `<cropper-canvas>` element's `scale` property. |
| `cropBoxMovable` | Uses the `<cropper-selection>` element's `movable` property. |
| `cropBoxResizable` | Uses the `<cropper-selection>` element's `resizable` property. |
| `toggleDragModeOnDblclick` | Deprecated. |
| `minContainerWidth` | Deprecated. |
| `minContainerHeight` | Deprecated. |
| `minCanvasWidth` | Uses the `<cropper-canvas>` element's `min-width` CSS property. |
| `minCanvasHeight` | Uses the `<cropper-canvas>` element's `min-height` CSS property. |
| `minCropBoxWidth` | Uses the `<cropper-selection>` element's `min-width` CSS property. |
| `minCropBoxHeight` | Uses the `<cropper-selection>` element's `min-height` CSS property. |
| `ready` | Uses the `<cropper-image>` element's `load` event. |
| `cropstart` | Uses the `<cropper-canvas>` element's `actionstart` event. |
| `cropmove` | Uses the `<cropper-canvas>` element's `actionmove` event. |
| `cropend` | Uses the `<cropper-canvas>` element's `actionend` event. |
| `crop` | Uses the `<cropper-canvas>` element's `action` event. |
| `zoom` | Uses the `<cropper-canvas>` element's `action` event. |

## Methods

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `crop` | Uses the `<cropper-selection>` element's `$change` method. |
| `reset` | Uses the `<cropper-image>` element's `$resetTransform` method, and the `<cropper-selection>` element's `$reset` method. |
| `clear` | Uses the `<cropper-selection>` element's `$reset` method and `hidden` property. |
| `replace` | Uses the `<cropper-image>` element's `src` property. |
| `enable` | Uses the `<cropper-canvas>` element's `disabled` property. |
| `disable` | Uses the `<cropper-canvas>` element's `disabled` property. |
| `destroy` | Drops the Cropper elements from the DOM directly. |
| `move` | Uses the `<cropper-image>` element's `$move` method. |
| `moveTo` | Uses the `<cropper-image>` element's `$moveTo` method. |
| `zoom` | Uses the `<cropper-image>` element's `$scale` method. |
| `zoomTo` | Uses the `<cropper-image>` element's `$setTransform` method. |
| `rotate` | Uses the `<cropper-image>` element's `$rotate` method. |
| `rotateTo` | Uses the `<cropper-image>` element's `$setTransform` method. |
| `scale` | Uses the `<cropper-image>` element's `$scale` method. |
| `scaleX` | Uses the `<cropper-image>` element's `$scale` method. |
| `scaleY` | Uses the `<cropper-image>` element's `$scale` method. |
| `getData` | Uses the `<cropper-image>` element's `$getTransform` method, and the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `setData` | Uses the `<cropper-image>` element's `$setTransform` method, and the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `getContainerData` | Deprecated. |
| `getImageData` | Uses the `<cropper-image>` element's `$getTransform` method. |
| `getCanvasData` | Deprecated. |
| `setCanvasData` | Deprecated. |
| `getCropBoxData` | Uses the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `setCropBoxData` | Uses the `<cropper-selection>` element's `x`, `y`, `width`, and `height` properties. |
| `getCroppedCanvas` | Uses the `<cropper-selection>` element's `$toCanvas` method. |
| `setAspectRatio` | Uses the `<cropper-selection>` element's `aspectRatio` property. |
| `setDragMode` | Deprecated. |

## Events

| Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- |
| `ready` | Uses the `<cropper-image>` element's `load` event. |
| `cropstart` | Uses the `<cropper-canvas>` element's `actionstart` event. |
| `cropmove` | Uses the `<cropper-canvas>` element's `actionmove` event. |
| `cropend` | Uses the `<cropper-canvas>` element's `actionend` event. |
| `crop` | Uses the `<cropper-canvas>` element's `action` event. |
| `zoom` | Uses the `<cropper-canvas>` element's `action` event. |
