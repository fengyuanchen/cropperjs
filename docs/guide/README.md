---
sidebar: auto
---

# Guide

## Introduction

Cropper.js is a series of web components for image cropping.

- **What is the different between Cropper.js 1.0 and Cropper.js 2.0?**

| Type | Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- | --- | --- | --- | --- |
| Funded | 2015 | 2020 |
| Status | Maintaining | Active |
| Package Number | Single | Multiple (12+) |
| Construction | All in one | Separated |
| Extensible | No | Yes |
| Customizable | No | Yes |
| Import on demand | No | Yes |
| Browser Compatibility | Modern browsers / IE 9+ | Modern browsers / IE 11+ |

- **What is the different between Cropper, Cropper.js and jQuery Cropper?**

| GitHub Project | npm Package | Dependencies | Funded | Status | Description |
| --- | --- | --- | --- | --- | --- |
| [Cropper](https://github.com/fengyuanchen/cropper) | [`cropper`](https://www.npmjs.com/package/cropper) | [`jquery`](https://www.npmjs.com/package/jquery) | 2014 | Deprecating | A simple jQuery image cropping plugin. |
| [Cropper.js](https://github.com/fengyuanchen/cropperjs) | [`cropperjs`](https://www.npmjs.com/package/cropperjs) | - | 2015 | Active | JavaScript image cropper. |
| [jQuery Cropper](https://github.com/fengyuanchen/jquery-cropper) | [`jquery-cropper`](https://www.npmjs.com/package/jquery-cropper) | [`jquery`](https://www.npmjs.com/package/jquery) + [`cropperjs`](https://www.npmjs.com/package/cropperjs) | 2018 | Maintaining | A jQuery plugin wrapper for Cropper.js. |

## Getting started

### Installation

#### npm

npm is the recommended installation method when building large scale applications with Cropper.js.

```sh
$ npm install cropperjs@next
```

For a specific package:

```sh
$ npm install @cropper/canvas
```

#### CDN

For prototyping or learning purposes, you can use the latest version with:

```html
<script src="https://unpkg.com/cropperjs@next"></script>

<!-- Or for ECMAScript Module -->
<script src="https://unpkg.com/cropperjs@next/dist/cropper.esm.js" type="module"></script>
```

For production, we recommend linking to a specific version number and build to avoid unexpected breakage from newer versions.

### Usage

#### Use is JavaScript

Import the Cropper class and constructing a new Cropper instance.

```js
import Cropper from 'cropperjs';

const cropper = new Cropper(document.getElementById('image'));
```

```html
<img id="image" src="/picture.jpg" alt="Cropper logo">
```

#### Use in DOM

Import all Cropper elements from the `cropperjs` package and [define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) them as custom elements automatically.

```js
import 'cropperjs';
```

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/picture.jpg" alt="Cropper logo"></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection auto-select auto-select-area="0.5">
    <cropper-grid role="grid"></cropper-grid>
    <cropper-crosshair></cropper-crosshair>
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

#### Use on demand

Import the required Cropper elements only and [define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) them as custom elements manually.

```js
import CropperCanvas from '@cropper/canvas';
import CropperImage from '@cropper/image';
import CropperHandle from '@cropper/handle';

CropperCanvas.$define();
CropperImage.$define();
CropperHandle.$define();
```

:::live-demo

```html
<cropper-canvas background>
  <cropper-image src="/picture.jpg" alt="Logo"></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
</cropper-canvas>
```

:::

## Packages

Cropper.js contains a series of [npm](https://www.npmjs.com/) packages:

| Package | Version | Description |
| --- | --- | --- |
| `cropperjs` | [![Version](https://img.shields.io/npm/v/cropperjs/next)](https://www.npmjs.com/package/cropperjs/v/next) | The all-in-one package. |
| `@cropper/constants` | [![Version](https://img.shields.io/npm/v/@cropper/constants)](https://www.npmjs.com/package/@cropper/constants) | A series of common constants. |
| `@cropper/utils` | [![Version](https://img.shields.io/npm/v/@cropper/utils)](https://www.npmjs.com/package/@cropper/utils) | A series of common utility functions. |
| `@cropper/element` | [![Version](https://img.shields.io/npm/v/@cropper/element)](https://www.npmjs.com/package/@cropper/element) | An abstract class for constructing Cropper elements. |
| `@cropper/canvas` | [![Version](https://img.shields.io/npm/v/@cropper/canvas)](https://www.npmjs.com/package/@cropper/canvas) | A custom canvas element for the Cropper. |
| `@cropper/image` | [![Version](https://img.shields.io/npm/v/@cropper/image)](https://www.npmjs.com/package/@cropper/image) | A custom image element for the Cropper. |
| `@cropper/selection` | [![Version](https://img.shields.io/npm/v/@cropper/selection)](https://www.npmjs.com/package/@cropper/selection) | A custom selection element for the Cropper. |
| `@cropper/handle` | [![Version](https://img.shields.io/npm/v/@cropper/handle)](https://www.npmjs.com/package/@cropper/handle) | A custom handle element for the Cropper. |
| `@cropper/shade` | [![Version](https://img.shields.io/npm/v/@cropper/shade)](https://www.npmjs.com/package/@cropper/shade) | A custom shade element for the Cropper. |
| `@cropper/grid` | [![Version](https://img.shields.io/npm/v/@cropper/grid)](https://www.npmjs.com/package/@cropper/grid) | A custom grid element for the Cropper. |
| `@cropper/crosshair` | [![Version](https://img.shields.io/npm/v/@cropper/crosshair)](https://www.npmjs.com/package/@cropper/crosshair) | A custom crosshair element for the Cropper.|
| `@cropper/viewer` | [![Version](https://img.shields.io/npm/v/@cropper/viewer)](https://www.npmjs.com/package/@cropper/viewer) | A custom viewer element for the Cropper. |

## Interfaces

| Interface | Inherits | Description |
| --- | --- | --- |
| `Cropper` | `Function` | The `Cropper` constructor creates a new Cropper instance. |
| `CropperElement` | `HTMLElement` | The `CropperElement` interface represents any Cropper element, extends the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) interface. |
| `CropperCanvas` | `CropperElement` | The `CropperCanvas` interface provides properties and methods for manipulating the layout and presentation of `<cropper-canvas>` elements. |
| `CropperImage` | `CropperElement` | The `CropperImage` interface provides properties and methods for manipulating the layout and presentation of `<cropper-image>` elements. |
| `CropperSelection` | `CropperElement` | The `CropperSelection` interface provides properties and methods for manipulating the layout and presentation of `<cropper-selection>` elements. |
| `CropperHandle` | `CropperElement` | The `CropperHandle` interface provides properties and methods for manipulating the layout and presentation of `<cropper-handle>` elements. |
| `CropperShade` | `CropperElement` | The `CropperShade` interface provides properties and methods for manipulating the layout and presentation of `<cropper-shade>` elements. |
| `CropperGrid` | `CropperElement` | The `CropperGrid` interface provides properties and methods for manipulating the layout and presentation of `<cropper-grid>` elements. |
| `CropperCrosshair` | `CropperElement` | The `CropperCrosshair` interface provides properties and methods for manipulating the layout and presentation of `<cropper-crosshair>` elements. |
| `CropperViewer` | `CropperElement` | The `CropperViewer` interface provides properties and methods for manipulating the layout and presentation of `<cropper-viewer>` elements. |
