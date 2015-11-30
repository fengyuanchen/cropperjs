# Changelog


## 0.3.3 (Nov 30, 2015)

- Floor the numerical parameters for `CanvasRenderingContext2D.drawImage`


## 0.3.2 (Nov 18, 2015)

- Fixed #10: improve new crop box creating


## 0.3.1 (Nov 11, 2015)

- Fixed #7: reset the `crossOrigin` when call the `replace` method


## 0.3.0 (Oct 28, 2015)

- Supports four view modes
- Supports three drag modes
- Makes the crop box's borders and handlers visible when overflow
- Added some examples
- Fixed some issues


### Options

- Added `viewMode`
- Added `dragMode`
- Renamed `touchDragZoom` to `zoomOnTouch`
- Renamed `mouseWheelZoom` to `zoomOnWheel`
- Renamed `doubleClickToggle` to `toggleDragModeOnDblclick`
- Renamed `checkImageOrigin` to `checkCrossOrigin`
- Removed `strict` (supported by `viewMode: 1`)
- Removed `dragCrop` (supported by `dragMode: 'crop'`)


## 0.2.1 (Oct 28, 2015)

- Fix the error jQuery reference on the `setCanvasData` method
- Fix typo on the `destroy` method


## 0.2.0 (Oct 25, 2015)

- Added 5 new methods: `moveTo`, `zoomTo`, `rotateTo`, `scaleX` and `scaleY`
- Improved 4 methods:  `move`, `zoom`, `rotate` and `getCanvasData`
- Improved cropping


## 0.1.1 (Oct 10, 2015)

- Improved canvas limitation
- Improved crop box limitation
- Improved preview for cross origin image


## 0.1.0 (Sep 25, 2015)

- Supports touch (mobile)
- Supports zoom
- Supports rotation
- Supports scale (flip)
- Supports canvas
- Supports multiple croppers
- Cross-browser support
- Supports 37 options: `aspectRatio`, `data`, `preview`, `strict`, `responsive`, `checkImageOrigin`, `modal`, `guides`, `center`, `highlight`, `background`, `autoCrop`, `autoCropArea`, `dragCrop`, `movable`, `rotatable`, `scalable`, `zoomable`, `mouseWheelZoom`, `wheelZoomRatio`, `touchDragZoom`, `cropBoxMovable`, `cropBoxResizable`, `doubleClickToggle`, `minCanvasWidth`, `minCanvasHeight`, `minCropBoxWidth`, `minCropBoxHeight`, `minContainerWidth`, `minContainerHeight`, `build`, `built`, `cropstart`, `cropmove`, `cropend`, `crop`, `zoom`.
- Support 22 methods: `crop`, `reset`, `clear`, `replace`, `enable`, `disable`, `destroy`, `move`, `zoom`, `rotate`, `scale`, `getData`, `setData`, `getContainerData`, `getImageData`, `getCanvasData`, `setCanvasData`, `getCropBoxData`, `setCropBoxData`, `getCroppedCanvas`, `setAspectRatio`, `setDragMode`.
