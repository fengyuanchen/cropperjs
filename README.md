# Cropper.js

> JavaScript image cropper.

- [Website](https://fengyuanchen.github.io/cropperjs)
- [Photo Editor](https://fengyuanchen.github.io/photo-editor) - An advanced example of Cropper.js.

[![Build Status Images](https://travis-ci.org/fengyuanchen/cropperjs.svg)](https://travis-ci.org/fengyuanchen/cropperjs)



## Table of contents

- [Features](#features)
- [Main](#main)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [License](#license)



## Features

- Supports 38 [options](#options)
- Supports 27 [methods](#methods)
- Supports 6 [events](#events)
- Supports touch (mobile)
- Supports zooming
- Supports rotating
- Supports scaling (flipping)
- Supports multiple croppers
- Supports to crop on a canvas
- Supports to crop image in the browser-side by canvas
- Supports to translate Exif Orientation information
- Cross-browser support



## Main

```
dist/
├── cropper.css     ( 5 KB)
├── cropper.min.css ( 4 KB)
├── cropper.js      (99 KB)
└── cropper.min.js  (38 KB)
```


## Getting started

### Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/cropperjs/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/cropperjs.git`.
- Install with [NPM](https://npmjs.com): `npm install cropperjs`.
- Install with [Bower](https://bower.io): `bower install cropperjs`.


### Installation

Include files:

```html
<link  href="/path/to/cropper.css" rel="stylesheet">
<script src="/path/to/cropper.js"></script>
```

The [cdnjs](https://github.com/cdnjs/cdnjs) provides CDN support for Cropper.js's CSS and JavaScript. You can find the links [here](https://cdnjs.com/libraries/cropperjs).


### Usage

Initialize with `Cropper` constructor:

- Browser: `window.Cropper`
- CommonJS: `var Cropper = require('cropperjs')`
- NodeJS: `var Cropper = require('cropperjs')(window)`

```html
<!-- Wrap the image or canvas element with a block element (container) -->
<div>
  <img id="image" src="picture.jpg">
</div>
```

```css
/* Limit image width to avoid overflow the container */
img {
  max-width: 100%; /* This rule is very important, please do not ignore this! */
}
```

```js
var image = document.getElementById('image');
var cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  crop: function(e) {
    console.log(e.detail.x);
    console.log(e.detail.y);
    console.log(e.detail.width);
    console.log(e.detail.height);
    console.log(e.detail.rotate);
    console.log(e.detail.scaleX);
    console.log(e.detail.scaleY);
  }
});
```


#### FAQ

##### How to crop a new area after zoom in or zoom out?

> Just double click your mouse to enter crop mode.


##### How to move the image after crop an area?

> Just double click your mouse to enter move mode.


##### How to fix aspect ratio in free ratio mode?

> Just hold the `shift` key when you resize the crop box.


##### How to crop a square area in free ratio mode?

> Just hold the `shift` key when you crop on the image.



#### Notes

- The size of the cropper inherits from the size of the image's parent element (wrapper), so be sure to wrap the image with a **visible block element**.
  > If you are using cropper in a modal, you should initialize the cropper after the modal shown completely. Otherwise, you will not get a correct cropper.

- The outputted cropped data bases on the original image size, so you can use them to crop the image directly.

- If you try to start cropper on a cross-origin image, please make sure that your browser supports HTML5 [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes), and your image server supports the `Access-Control-Allow-Origin` option (see the [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)).


#### Known issues

- [Known iOS resource limits](https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/CreatingContentforSafarioniPhone/CreatingContentforSafarioniPhone.html): As iOS devices limit memory, the browser may crash when you are cropping a large image (iPhone camera resolution). To avoid this, you may resize the image first (preferably below 1024 pixels) before start a cropper.

- Known image size increase: When export the cropped image on browser-side with the `HTMLCanvasElement.toDataURL` method, the the exported image'size may be greater than the original image's. This is because the exported image'type is not the same as the original image's. So just pass the original image's type as the first parameter to `toDataURL` to fix this. For example, if the original type is JPEG, then use `cropper.getCroppedCanvas().toDataURL('image/jpeg')` to export image.


[⬆ back to top](#table-of-contents)



## Options

You may set cropper options with `new Cropper(image, options)`.
If you want to change the global default options, You may use `Cropper.setDefaults(options)`.


### viewMode

- Type: `Number`
- Default: `0`
- Options:
  - `0`: the crop box is just within the container
  - `1`: the crop box should be within the canvas
  - `2`: the canvas should not be within the container
  - `3`: the container should be within the canvas

Define the view mode of the cropper.


### dragMode

- Type: `String`
- Default: `'crop'`
- Options:
  - `'crop'`: create a new crop box
  - `'move'`: move the canvas
  - `'none'`: do nothing

Define the dragging mode of the cropper.


### aspectRatio

- Type: `Number`
- Default: `NaN`

Set the aspect ratio of the crop box. By default, the crop box is free ratio.


### data

- Type: `Object`
- Default: `null`

The previous cropped data if you had stored, will be passed to `setData` method automatically when built.


### preview

- Type: `String`
- Default: `''`
- A valid selector for [Document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

Add extra elements (containers) for previewing.

**Notes:**

- The maximum width is the initial width of preview container.
- The maximum height is the initial height of preview container.
- If you set an `aspectRatio` option, be sure to set the same aspect ratio to the preview container.
- If preview is not getting properly displayed, set `overflow: hidden` style to the preview container.


### responsive

- Type: `Boolean`
- Default: `true`

Re-render the cropper when resize the window.


### restore

- Type: `Boolean`
- Default: `true`

Restore the cropped area after resize the window.


### checkCrossOrigin

- Type: `Boolean`
- Default: `true`

Check if the current image is a cross-origin image.

If it is, when clone the image, a `crossOrigin` attribute will be added to the cloned image element and a timestamp will be added to the `src` attribute to reload the source image to avoid browser cache error.

By adding `crossOrigin` attribute to image will stop adding timestamp to image url, and stop reload of image.


### checkOrientation

- Type: `Boolean`
- Default: `true`

Check the current image's Exif Orientation information.

More exactly, read the Orientation value for rotating or flipping the image, and then override the Orientation value with `1` (the default value) to avoid some issues ([1](https://github.com/fengyuanchen/cropper/issues/120), [2](https://github.com/fengyuanchen/cropper/issues/509)) on iOS devices.

Requires to set both the `rotatable` and `scalable` options to `true` at the same time.

**Note:** Don't trust this all the time as some JPG images have incorrect (not standard) Orientation values.

> Requires [Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) support ([IE 10+](http://caniuse.com/typedarrays)).


### modal

- Type: `Boolean`
- Default: `true`

Show the black modal above the image and under the crop box.


### guides

- Type: `Boolean`
- Default: `true`

Show the dashed lines above the crop box.


### center

- Type: `Boolean`
- Default: `true`

Show the center indicator above the crop box.


### highlight

- Type: `Boolean`
- Default: `true`

Show the white modal above the crop box (highlight the crop box).


### background

- Type: `Boolean`
- Default: `true`

Show the grid background of the container.


### autoCrop

- Type: `Boolean`
- Default: `true`

Enable to crop the image automatically when initialize.


### autoCropArea

- Type: `Number`
- Default: `0.8` (80% of the image)

A number between 0 and 1. Define the automatic cropping area size (percentage).


### movable

- Type: `Boolean`
- Default: `true`

Enable to move the image.


### rotatable

- Type: `Boolean`
- Default: `true`

Enable to rotate the image.


### scalable

- Type: `Boolean`
- Default: `true`

Enable to scale the image.


### zoomable

- Type: `Boolean`
- Default: `true`

Enable to zoom the image.


### zoomOnTouch

- Type: `Boolean`
- Default: `true`

Enable to zoom the image by dragging touch.


### zoomOnWheel

- Type: `Boolean`
- Default: `true`

Enable to zoom the image by wheeling mouse.


### wheelZoomRatio

- Type: `Number`
- Default: `0.1`

Define zoom ratio when zoom the image by wheeling mouse.


### cropBoxMovable

- Type: `Boolean`
- Default: `true`

Enable to move the crop box by dragging.


### cropBoxResizable

- Type: `Boolean`
- Default: `true`

Enable to resize the crop box by dragging.


### toggleDragModeOnDblclick

- Type: `Boolean`
- Default: `true`

Enable to toggle drag mode between "crop" and "move" when click twice on the cropper.


### minContainerWidth

- Type: `Number`
- Default: `200`

The minimum width of the container.


### minContainerHeight

- Type: `Number`
- Default: `100`

The minimum height of the container.


### minCanvasWidth

- Type: `Number`
- Default: `0`

The minimum width of the canvas (image wrapper).


### minCanvasHeight

- Type: `Number`
- Default: `0`

The minimum height of the canvas (image wrapper).


### minCropBoxWidth

- Type: `Number`
- Default: `0`

The minimum width of the crop box.

**Note:** This size is relative to the page, not the image.


### minCropBoxHeight

- Type: `Number`
- Default: `0`

The minimum height of the crop box.

**Note:** This size is relative to the page, not the image.


### ready

- Type: `Function`
- Default: `null`

A shortcut of the "ready" event.


### cropstart

- Type: `Function`
- Default: `null`

A shortcut of the "cropstart" event.


### cropmove

- Type: `Function`
- Default: `null`

A shortcut of the "cropmove" event.


### cropend

- Type: `Function`
- Default: `null`

A shortcut of the "cropend" event.


### crop

- Type: `Function`
- Default: `null`

A shortcut of the "crop" event.


### zoom

- Type: `Function`
- Default: `null`

A shortcut of the "zoom" event.


[⬆ back to top](#table-of-contents)



## Methods

As there is an **asynchronous** process when load the image, you **should call most of the methods after ready**, except "setAspectRatio", "replace" and "destroy".

> If a method doesn't need to return any value, it will return the cropper instance (`this`) for chain composition.

```js
new Cropper(image, {
  ready: function () {
    // this.cropper[method](argument1, , argument2, ..., argumentN);
    this.cropper.move(1, -1);

    // Allows chain composition
    this.cropper.move(1, -1).rotate(45).scale(1, -1);
  }
});
```


### crop()

Show the crop box manually.

```js
new Cropper(image, {
  autoCrop: false,
  ready: function () {
    // Do something here
    // ...

    // And then
    this.cropper.crop();
  }
});
```


### reset()

Reset the image and crop box to their initial states.


### clear()

Clear the crop box.


### replace(url[, onlyColorChanged])

- **url**:
  - Type: `String`
  - A new image url.

- **onlyColorChanged** (optional):
  - Type: `Boolean`
  - If only change the color, not the size, then the cropper only need to change the srcs of all related images, not need to rebuild the cropper. This can be used for applying filters.
  - If not present, its default value is `false`.


Replace the image's src and rebuild the cropper.


### enable()

Enable (unfreeze) the cropper.


### disable()

Disable (freeze) the cropper.


### destroy()

Destroy the cropper and remove the instance from the image.


### move(offsetX[, offsetY])

- **offsetX**:
  - Type: `Number`
  - Moving size (px) in the horizontal direction.

- **offsetY** (optional):
  - Type: `Number`
  - Moving size (px) in the vertical direction.
  - If not present, its default value is `offsetX`.

Move the canvas (image wrapper) with relative offsets.

```js
cropper.move(1);
cropper.move(1, 0);
cropper.move(0, -1);
```


### moveTo(x[, y])

- **x**:
  - Type: `Number`
  - The `left` value of the canvas

- **y** (optional):
  - Type: `Number`
  - The `top` value of the canvas
  - If not present, its default value is `x`.

Move the canvas (image wrapper) to an absolute point.


### zoom(ratio)

- **ratio**:
  - Type: `Number`
  - Zoom in: requires a positive number (ratio > 0)
  - Zoom out: requires a negative number (ratio < 0)

Zoom the canvas (image wrapper) with a relative ratio.

```js
cropper.zoom(0.1);
cropper.zoom(-0.1);
```


### zoomTo(ratio)

- **ratio**:
  - Type: `Number`

Zoom the canvas (image wrapper) to an absolute ratio.

```js
cropper.zoomTo(1); // 1:1 (canvasData.width === canvasData.naturalWidth)
```


### rotate(degree)

- **degree**:
  - Type: `Number`
  - Rotate right: requires a positive number (degree > 0)
  - Rotate left: requires a negative number (degree < 0)

Rotate the image with a relative degree.

> Requires [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) support ([IE 9+](http://caniuse.com/transforms2d)).

```js
cropper.rotate(90);
cropper.rotate(-90);
```


### rotateTo(degree)

- **degree**:
  - Type: `Number`

Rotate the image to an absolute degree.


### scale(scaleX[, scaleY])

- **scaleX**:
  - Type: `Number`
  - Default: `1`
  - The scaling factor to apply on the abscissa of the image.
  - When equal to `1` it does nothing.

- **scaleY** (optional):
  - Type: `Number`
  - The scaling factor to apply on the ordinate of the image.
  - If not present, its default value is `scaleX`.

Scale the image.

> Requires [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) support ([IE 9+](http://caniuse.com/transforms2d)).

```js
cropper.scale(-1); // Flip both horizontal and vertical
cropper.scale(-1, 1); // Flip horizontal
cropper.scale(1, -1); // Flip vertical
```


### scaleX(scaleX)

- **scaleX**:
  - Type: `Number`
  - Default: `1`
  - The scaling factor to apply on the abscissa of the image.
  - When equal to `1` it does nothing.

Scale the abscissa of the image.


### scaleY(scaleY)

- **scaleY**:
  - Type: `Number`
  - Default: `1`
  - The scaling factor to apply on the ordinate of the image.
  - When equal to `1` it does nothing.

Scale the ordinate of the image.


### getData([rounded])

- **rounded** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Set `true` to get rounded values.

- (return value):
  - Type: `Object`
  - Properties:
    - `x`: the offset left of the cropped area
    - `y`: the offset top of the cropped area
    - `width`: the width of the cropped area
    - `height`: the height of the cropped area
    - `rotate`: the rotated degrees of the image
    - `scaleX`: the scaling factor to apply on the abscissa of the image
    - `scaleY`: the scaling factor to apply on the ordinate of the image

Output the final cropped area position and size data (base on the natural size of the original image).

> You can send the data to server-side to crop the image directly.

![A schematic diagram for data's properties](assets/images/data.jpg)


### setData(data)

- **data**:
  - Type: `Object`
  - Properties: See the [`getData`](#getdatarounded) method.

Change the cropped area position and size with new data (base on the original image).

> **Note:** This method only available when the `viewMode` option great than or equal to `1`.


### getContainerData()

- (return  value):
  - Type: `Object`
  - Properties:
    - `width`: the current width of the container
    - `height`: the current height of the container

Output the container size data.

![A schematic diagram for cropper's layers](assets/images/layers.jpg)


### getImageData()

- (return  value):
  - Type: `Object`
  - Properties:
    - `left`: the offset left of the image
    - `top`: the offset top of the image
    - `width`: the width of the image
    - `height`: the height of the image
    - `naturalWidth`: the natural width of the image
    - `naturalHeight`: the natural height of the image
    - `aspectRatio`: the aspect ratio of the image
    - `rotate`: the rotated degrees of the image if rotated
    - `scaleX`: the scaling factor to apply on the abscissa of the image if scaled
    - `scaleY`: the scaling factor to apply on the ordinate of the image if scaled

Output the image position, size and other related data.


### getCanvasData()

- (return  value):
  - Type: `Object`
  - Properties:
    - `left`: the offset left of the canvas
    - `top`: the offset top of the canvas
    - `width`: the width of the canvas
    - `height`: the height of the canvas
    - `naturalWidth`: the natural width of the canvas (read only)
    - `naturalHeight`: the natural height of the canvas (read only)

Output the canvas (image wrapper) position and size data.

```js
var imageData = cropper.getImageData();
var canvasData = cropper.getCanvasData();

if (imageData.rotate % 180 === 0) {
  console.log(canvasData.naturalWidth === imageData.naturalWidth); // true
}
```


### setCanvasData(data)

- **data**:
  - Type: `Object`
  - Properties:
    - `left`: the new offset left of the canvas
    - `top`: the new offset top of the canvas
    - `width`: the new width of the canvas
    - `height`: the new height of the canvas

Change the canvas (image wrapper) position and size with new data.


### getCropBoxData()

- (return  value):
  - Type: `Object`
  - Properties:
    - `left`: the offset left of the crop box
    - `top`: the offset top of the crop box
    - `width`: the width of the crop box
    - `height`: the height of the crop box

Output the crop box position and size data.


### setCropBoxData(data)

- **data**:
  - Type: `Object`
  - Properties:
    - `left`: the new offset left of the crop box
    - `top`: the new offset top of the crop box
    - `width`: the new width of the crop box
    - `height`: the new height of the crop box

Change the crop box position and size with new data.


### getCroppedCanvas([options])

- **options** (optional):
  - Type: `Object`
  - Properties:
    - `width`: the destination width of the output canvas
    - `height`: the destination height of the output canvas
    - `fillColor`: a color to fill any alpha values in the output canvas
  - Note: The aspect ratio of the output canvas will be fitted to aspect ratio of the crop box automatically.

- (return  value):
  - Type: `HTMLCanvasElement`
  - A canvas drawn the cropped image.

- Browser support:
  - Basic image: requires [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) support ([IE 9+](http://caniuse.com/canvas)).
  - Rotated image: requires [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) support ([IE 9+](http://caniuse.com/transforms2d)).
  - Cross-origin image: requires HTML5 [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) support ([IE 11+](http://caniuse.com/cors)).

Get a canvas drawn the cropped image. If it is not cropped, then returns the whole canvas.

> After then, you can display the canvas as an image directly, or use [HTMLCanvasElement.toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) to get a Data URL, or use [HTMLCanvasElement.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) to get a blob and upload it to server with [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) if the browser supports these APIs.

```js
cropper.getCroppedCanvas();

cropper.getCroppedCanvas({
  width: 160,
  height: 90
});

// Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`
cropper.getCroppedCanvas().toBlob(function (blob) {
  var formData = new FormData();

  formData.append('croppedImage', blob);

  // Use `jQuery.ajax` method
  $.ajax('/path/to/upload', {
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function () {
      console.log('Upload success');
    },
    error: function () {
      console.log('Upload error');
    }
  });
});
```

### setAspectRatio(aspectRatio)

- **aspectRatio**:
  - Type: `Number`
  - Requires a positive number.

Change the aspect ratio of the crop box.


### setDragMode([mode])

- **mode** (optional):
  - Type: `String`
  - Default: `'none'`
  - Options: `'none'`, `'crop'`, `'move'`

Change the drag mode.

**Tips:** You can toggle the "crop" and "move" mode by double click on the cropper.


[⬆ back to top](#table-of-contents)



## Events


### ready

This event fires when the target image has been loaded and the cropper instance is ready for cropping.

```js
var cropper;

image.addEventListener('ready', function () {
  console.log(this.cropper === cropper);
  // -> true
});

cropper = new Cropper(image);
```


### cropstart

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `mousedown`, `touchstart` and `pointerdown`

- **event.detail.action**:
  - Type: `String`
  - Options:
    - `'crop'`: create a new crop box
    - `'move'`: move the canvas (image wrapper)
    - `'zoom'`: zoom in / out the canvas (image wrapper) by touch.
    - `'e'`: resize the east side of the crop box
    - `'w'`: resize the west side of the crop box
    - `'s'`: resize the south side of the crop box
    - `'n'`: resize the north side of the crop box
    - `'se'`: resize the southeast side of the crop box
    - `'sw'`: resize the southwest side of the crop box
    - `'ne'`: resize the northeast side of the crop box
    - `'nw'`: resize the northwest side of the crop box
    - `'all'`: move the crop box (all directions)

This event fires when the canvas (image wrapper) or the crop box starts to change.

```js
image.addEventListener('cropstart', function (e) {
  console.log(e.detail.originalEvent);
  console.log(e.detail.action);
});
```


### cropmove

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `mousemove`, `touchmove` and `pointermove`.

- **event.detail.action**: the same as "cropstart".

This event fires when the canvas (image wrapper) or the crop box is changing.


### cropend

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `mouseup`, `touchend`, `touchcancel`, `pointerup` and `pointercancel`.

- **event.detail.action**: the same as "cropstart".

This event fires when the canvas (image wrapper) or the crop box stops to change.


### crop

- **event.detail.x**
- **event.detail.y**
- **event.detail.width**
- **event.detail.height**
- **event.detail.rotate**
- **event.detail.scaleX**
- **event.detail.scaleY**

> About these properties, see the [`getData`](#getdatarounded) method.

This event fires when the canvas (image wrapper) or the crop box changed.


### zoom

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `wheel`, `touchmove`.

- **event.detail.oldRatio**:
  - Type: `Number`
  - The old (current) ratio of the canvas

- **event.detail.ratio**:
  - Type: `Number`
  - The new (next) ratio of the canvas (`canvasData.width / canvasData.naturalWidth`)

This event fires when a cropper instance starts to zoom in or zoom out its canvas (image wrapper).

```js
image.addEventListener('zoom', function (e) {

  // Zoom in
  if (e.detail.ratio > e.detail.oldRatio) {
    e.preventDefault(); // Prevent zoom in
  }

  // Zoom out
  // ...
});
```


[⬆ back to top](#table-of-contents)



## No conflict

If you have to use other cropper with the same namespace, just call the `Cropper.noConflict` static method to revert to it.

```html
<script src="other-cropper.js"></script>
<script src="cropper.js"></script>
<script>
  Cropper.noConflict();
  // Code that uses other `Cropper` can follow here.
</script>
```



## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+



## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md).



## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).



## License

[MIT](http://opensource.org/licenses/MIT) © [Fengyuan Chen](http://chenfengyuan.com)



## Related projects

- [react-cropperjs](https://github.com/TAPP-TV/react-cropperjs) by @pbojinov


[⬆ back to top](#table-of-contents)
