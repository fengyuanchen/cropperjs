# Changelog


## 1.0.0-rc (Mar 25, 2017)

- Fixed the bug of touch zoom (#161).
- Fixed the bug of window resize (#162).
- Improve the `toggleDragModeOnDblclick` option (only available when the `dragMode` option is set to `crop` or `move`)


## 1.0.0-beta.2 (Feb 25, 2017)

- Fixed the bug of rotate square image lead image shrink (#155).
- Improved RegExps for DataURL processing (#156).


## 1.0.0-beta.1 (Jan 21, 2017)

- Use CSS3 2D Transforms instead of `left` and `top` for better performance (#138).
- Set `withCredentials` attribute when read the image data by XMLHttpRequest (#141).


## 1.0.0-beta (Jan 1, 2017)

- Supports to set an element for preview (#113).
- Improved event handler for Pointer Events (#127).


## 1.0.0-alpha (Dec 4, 2016)

- Built JavaScript with Rollup.
- Build CSS with PostCSS.
- Fixed a bug of auto crop when replace the image (#83).


## 0.8.1 (Sep 3, 2016)

- Fixed the bug of cropping (#80).
- Fixed the bug of calling `ready` event twice when call `replace` method (#81).
- Fixed the bug of `getCroppedCanvas` when set `scalable` or `rotatable` to `false` (#82).


## 0.8.0 (Aug 18, 2016)

- Removed `build` event.
- Renamed `built` event to `ready`.
- Fixed the error of orientation transform.
- Ported code to ECMAScript 6.


## 0.7.2 (Jun 8, 2016)

- Fixed a bug of `data-*` attributes setting and getting.
- Fixed the calling order of `scale` and `rotate`.


## 0.7.1 (May 28, 2016)

- Improved the rotate and scale transform behaviour.
- Improved the `getCroppedCanvas` method (returns the whole canvas if it is not cropped).
- Check cross origin setting when load image by XMLHTTPRequest.


## 0.7.0 (Mar 20, 2016)

- Supports 7 custom events: `build`, `built`, `cropstart`, `cropmove`, `cropend`, `crop` and `zoom`.
- The original callback options become shortcuts of these events now.
- IE8 is no longer supported after added these custom events.


## 0.6.0 (Feb 22, 2016)

- Added a new parameter to the `replace` method for applying filters.
- Improved the image initializing for Safari.
- Fixed incorrect size limitation of the crop box (#30).
- Fixed incorrect cropped canvas when scaleX or scaleY great than 1.


## 0.5.6 (Jan 18, 2016)

- Fixed crossOriginUrl undefined error when exists the `crossOrigin` property.
- Fixed the issue in the "destroy" method (#24).
- Optimized tests.


## 0.5.5 (Jan 1, 2016)

- Fixed a dimension bug in the "getCroppedCanvas" method.
- Added an example for cropping round image.


## 0.5.4 (Dec 28, 2015)

- Supports to zoom from event triggering point.


## 0.5.3 (Dec 24, 2015)

- Limit wheel speed to prevent zoom too fast (#21)
- Improve the `setCropBoxData` method (#22)


## 0.5.2 (Dec 15, 2015)

- Fix event handlers


## 0.5.1 (Dec 12, 2015)

- Handle Data URL (avoid to use XMLHttpRequest to open a Data URL)
- Handle ajax error when load ArrayBuffer
- Not to transform the image to base64 when Orientation equals to `1`
- Fix some typos


## 0.5.0 (Dec 5, 2015)

- Added a new option: `checkOrientation`
- Added a timestamp to the url of preview image


## 0.4.0 (Dec 2, 2015)

- Added a new option: `restore`
- Fixed #12: Added vendor prefixes to CSS `transform`


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
