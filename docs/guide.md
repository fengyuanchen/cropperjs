---
sidebar: auto
---

# Guide

## Introduction

Cropper.js 2.0 is a series of web components for image cropping.

- **What is the difference between Cropper.js 1.0 and Cropper.js 2.0?**

| Type | Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- | --- |
| Created | 2015 | 2021 |
| Status | Maintaining | Active |
| Package Number | 1 | 12+ |
| Architecture | All in one | Modular |
| Browser Compatibility | Modern browsers / IE 9+ | Modern browsers |
| Extensible | No | Yes |
| Customizable | No | Yes |
| CSS-in-JS | No | Yes |
| Import on-demand | No | Yes |
| Multiple selections | No | Yes |
| Rotate image on touch | No | Yes |

- **What is the difference between Cropper, Cropper.js, and jQuery Cropper?**

| GitHub Project | npm Package | Dependencies | Created | Status | Description |
| --- | --- | --- | --- | --- | --- |
| [Cropper](https://github.com/fengyuanchen/cropper) | [`cropper`](https://www.npmjs.com/package/cropper) | [`jquery`](https://www.npmjs.com/package/jquery) | 2014 | Deprecated | A simple jQuery image cropping plugin. |
| [Cropper.js](https://github.com/fengyuanchen/cropperjs) | [`cropperjs`](https://www.npmjs.com/package/cropperjs) | - | 2015 | Active | JavaScript image cropper. |
| [jQuery Cropper](https://github.com/fengyuanchen/jquery-cropper) | [`jquery-cropper`](https://www.npmjs.com/package/jquery-cropper) | [`jquery`](https://www.npmjs.com/package/jquery) + [`cropperjs`](https://www.npmjs.com/package/cropperjs) | 2018 | Maintaining | A jQuery plugin wrapper for Cropper.js. |

## Getting started

### Installation

#### npm

npm is the recommended installation method when building large-scale applications with Cropper.js.

```sh
npm install cropperjs@next
```

For a specific package:

```sh
npm install @cropper/element-canvas
```

#### CDN

For prototyping or learning purposes, you can use the latest version with:

```html
<script src="https://unpkg.com/cropperjs@next"></script>
```

For production, we recommend linking to a specific version number and build to avoid unexpected breakage from newer versions.

### Usage

#### Use in JavaScript

Import the Cropper class and constructing a new Cropper instance.

```js
import Cropper from 'cropperjs';

const cropper = new Cropper('#image');
```

```html
<img id="image" src="/cropperjs/v2/picture.jpg" alt="Picture">
```

#### Use in DOM

Import all Cropper elements from the `cropperjs` package and [define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) them as custom elements automatically.

```js
import 'cropperjs';
```

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection initial-coverage="0.5" movable resizable>
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-crosshair centered></cropper-crosshair>
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
```

:::

#### Use on-demand

Import the required Cropper elements only and [define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) them as custom elements manually.

```js
import CropperCanvas from '@cropper/element-canvas';
import CropperImage from '@cropper/element-image';
import CropperHandle from '@cropper/element-handle';

CropperCanvas.$define();
CropperImage.$define();
CropperHandle.$define();
```

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture" rotatable scalable skewable translatable></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
```

:::

## Packages

Cropper.js contains a series of [npm](https://www.npmjs.com/) packages:

| Package | Version | Description |
| --- | --- | --- |
| `cropperjs` | [![Version](https://img.shields.io/npm/v/cropperjs/next)](https://www.npmjs.com/package/cropperjs/v/next) | The all-in-one package. |
| `@cropper/element` | [![Version](https://img.shields.io/npm/v/@cropper/element/next)](https://www.npmjs.com/package/@cropper/element) | An abstract class for constructing Cropper elements. |
| `@cropper/element-canvas` | [![Version](https://img.shields.io/npm/v/@cropper/element-canvas/next)](https://www.npmjs.com/package/@cropper/element-canvas) | A custom canvas element for the Cropper. |
| `@cropper/element-image` | [![Version](https://img.shields.io/npm/v/@cropper/element-image/next)](https://www.npmjs.com/package/@cropper/element-image) | A custom image element for the Cropper. |
| `@cropper/element-shade` | [![Version](https://img.shields.io/npm/v/@cropper/element-shade/next)](https://www.npmjs.com/package/@cropper/element-shade) | A custom shade element for the Cropper. |
| `@cropper/element-handle` | [![Version](https://img.shields.io/npm/v/@cropper/element-handle/next)](https://www.npmjs.com/package/@cropper/element-handle) | A custom handle element for the Cropper. |
| `@cropper/element-selection` | [![Version](https://img.shields.io/npm/v/@cropper/element-selection/next)](https://www.npmjs.com/package/@cropper/element-selection) | A custom selection element for the Cropper. |
| `@cropper/element-grid` | [![Version](https://img.shields.io/npm/v/@cropper/element-grid/next)](https://www.npmjs.com/package/@cropper/element-grid) | A custom grid element for the Cropper. |
| `@cropper/element-crosshair` | [![Version](https://img.shields.io/npm/v/@cropper/element-crosshair/next)](https://www.npmjs.com/package/@cropper/element-crosshair) | A custom crosshair element for the Cropper. |
| `@cropper/element-viewer` | [![Version](https://img.shields.io/npm/v/@cropper/element-viewer/next)](https://www.npmjs.com/package/@cropper/element-viewer) | A custom viewer element for the Cropper. |
| `@cropper/elements` | [![Version](https://img.shields.io/npm/v/@cropper/elements/next)](https://www.npmjs.com/package/@cropper/elements) | A series of custom elements for the Cropper. |
| `@cropper/utils` | [![Version](https://img.shields.io/npm/v/@cropper/utils/next)](https://www.npmjs.com/package/@cropper/utils) | A series of common constants and utility functions for Cropper. |

## Interfaces

| Interface | Inherits | Description |
| --- | --- | --- |
| `Cropper` | `Function` | The `Cropper` constructor creates a new Cropper instance. |
| `CropperElement` | `HTMLElement` | The `CropperElement` interface represents any Cropper element, extends the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) interface. |
| `CropperCanvas` | `CropperElement` | The `CropperCanvas` interface provides properties and methods for manipulating the layout and presentation of `<cropper-canvas>` elements. |
| `CropperImage` | `CropperElement` | The `CropperImage` interface provides properties and methods for manipulating the layout and presentation of `<cropper-image>` elements. |
| `CropperShade` | `CropperElement` | The `CropperShade` interface provides properties and methods for manipulating the layout and presentation of `<cropper-shade>` elements. |
| `CropperHandle` | `CropperElement` | The `CropperHandle` interface provides properties and methods for manipulating the layout and presentation of `<cropper-handle>` elements. |
| `CropperSelection` | `CropperElement` | The `CropperSelection` interface provides properties and methods for manipulating the layout and presentation of `<cropper-selection>` elements. |
| `CropperGrid` | `CropperElement` | The `CropperGrid` interface provides properties and methods for manipulating the layout and presentation of `<cropper-grid>` elements. |
| `CropperCrosshair` | `CropperElement` | The `CropperCrosshair` interface provides properties and methods for manipulating the layout and presentation of `<cropper-crosshair>` elements. |
| `CropperViewer` | `CropperElement` | The `CropperViewer` interface provides properties and methods for manipulating the layout and presentation of `<cropper-viewer>` elements. |

## Browser support

- Edge 79+
- Firefox 63+
- Chrome 54+
- Safari 10.1+
- Opera 41+
- iOS Safari 10.3+
- Android Browser 81+
- Opera Mobile 46+
- Chrome for Android 81+
- Firefox for Android 68+
- Samsung Internet 6.2+
