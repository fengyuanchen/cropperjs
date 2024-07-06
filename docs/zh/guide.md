---
sidebar: auto
---

# 指南

## 介绍

Cropper.js 2.0 是一系列用于图像裁剪的 Web 组件。

- **Cropper.js 1.0 和 Cropper.js 2.0 有什么区别？**

| 类型 | Cropper.js 1.0 | Cropper.js 2.0 |
| --- | --- | --- |
| 创建于 | 2015 | 2021 |
| 状态 | 维护中 | 活跃中 |
| 包数量 | 1 | 12+ |
| 架构 | 一体化 | 模块化 |
| 浏览器兼容性 | 现代浏览器 / IE 9+ | 现代浏览器 |
| 可扩展 | 否 | 是 |
| 可定制 | 否 | 是 |
| CSS-in-JS | 否 | 是 |
| 按需引用 | 否 | 是 |
| 多选区 | 否 | 是 |
| 触摸旋转图片 | 否 | 是 |

- **Cropper、Cropper.js 和 jQuery Cropper 之间有什么区别？**

| GitHub 项目 | npm 包 | 依赖 | 创建于 | 状态 | 描述 |
| --- | --- | --- | --- | --- | --- |
| [Cropper](https://github.com/fengyuanchen/cropper) | [`cropper`](https://www.npmjs.com/package/cropper) | [`jquery`](https://www.npmjs.com/package/jquery) | 2014 | 已废弃 | 一个简单的 jQuery 图像裁剪插件。 |
| [Cropper.js](https://github.com/fengyuanchen/cropperjs) | [`cropperjs`](https://www.npmjs.com/package/cropperjs) | - | 2015 | 活跃中 | JavaScript 图片裁剪器。 |
| [jQuery Cropper](https://github.com/fengyuanchen/jquery-cropper) | [`jquery-cropper`](https://www.npmjs.com/package/jquery-cropper) | [`jquery`](https://www.npmjs.com/package/jquery) + [`cropperjs`](https://www.npmjs.com/package/cropperjs) | 2018 | 维护中 | Cropper.js 的 jQuery 插件包装器。 |

## 入门

### 安装

#### npm

在使用 Cropper.js 构建大型应用程序时，推荐使用 npm 安装方法。

```sh
npm install cropperjs@next
```

对于特定的包：

```sh
npm install @cropper/element-canvas
```

#### CDN

出于原型设计或学习目的，你可以使用最新版本：

```html
<script src="https://unpkg.com/cropperjs@next"></script>
```

对于生产，我们建议链接到特定版本号和文件名以避免新版本意外损坏。

### 使用

#### 在 JavaScript 中使用

导入 Cropper 类并构造一个新的 Cropper 实例。

```js
import Cropper from 'cropperjs';

const cropper = new Cropper('#image');
```

```html
<img id="image" src="/cropperjs/v2/picture.jpg" alt="Picture">
```

#### 在 DOM 中使用

从 `cropperjs` 包中导入所有 Cropper 元素，并自动将它们[定义](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define)为自定义元素。

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

#### 按需引用

仅导入所需的 Cropper 元素，然后手动将它们[定义](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define)为自定义元素。

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

## 安装包

Cropper.js 包含一系列 [npm](https://www.npmjs.com/) 包：

| 安装包名称 | 版本 | 描述 |
| --- | --- | --- |
| `cropperjs` | [![Version](https://img.shields.io/npm/v/cropperjs/next)](https://www.npmjs.com/package/cropperjs/v/next) | 完整包。 |
| `@cropper/element` | [![Version](https://img.shields.io/npm/v/@cropper/element/next)](https://www.npmjs.com/package/@cropper/element) | 用于构造 Cropper 元素的抽象类。 |
| `@cropper/element-canvas` | [![Version](https://img.shields.io/npm/v/@cropper/element-canvas/next)](https://www.npmjs.com/package/@cropper/element-canvas) | Cropper 的自定义画布元素。 |
| `@cropper/element-image` | [![Version](https://img.shields.io/npm/v/@cropper/element-image/next)](https://www.npmjs.com/package/@cropper/element-image) | Cropper 的自定义图像元素。 |
| `@cropper/element-shade` | [![Version](https://img.shields.io/npm/v/@cropper/element-shade/next)](https://www.npmjs.com/package/@cropper/element-shade) | Cropper 的自定义阴影元素。 |
| `@cropper/element-handle` | [![Version](https://img.shields.io/npm/v/@cropper/element-handle/next)](https://www.npmjs.com/package/@cropper/element-handle) | Cropper 的自定义手柄元素。 |
| `@cropper/element-selection` | [![Version](https://img.shields.io/npm/v/@cropper/element-selection/next)](https://www.npmjs.com/package/@cropper/element-selection) | Cropper 的自定义选区元素。 |
| `@cropper/element-grid` | [![Version](https://img.shields.io/npm/v/@cropper/element-grid/next)](https://www.npmjs.com/package/@cropper/element-grid) | Cropper 的自定义网格元素。 |
| `@cropper/element-crosshair` | [![Version](https://img.shields.io/npm/v/@cropper/element-crosshair/next)](https://www.npmjs.com/package/@cropper/element-crosshair) | Cropper 的自定义十字准线元素。 |
| `@cropper/element-viewer` | [![Version](https://img.shields.io/npm/v/@cropper/element-viewer/next)](https://www.npmjs.com/package/@cropper/element-viewer) | Cropper 的自定义查看器元素。 |
| `@cropper/elements` | [![Version](https://img.shields.io/npm/v/@cropper/elements/next)](https://www.npmjs.com/package/@cropper/elements) | Cropper 的一系列自定义元素。 |
| `@cropper/utils` | [![Version](https://img.shields.io/npm/v/@cropper/utils/next)](https://www.npmjs.com/package/@cropper/utils) | Cropper 的一系列常用常量和实用函数。 |

## 接口

| 接口名称 | 继承自 | 描述 |
| --- | --- | --- |
| `Cropper` | `Function` | `Cropper` 构造函数用于创建一个新的 Cropper 实例。 |
| `CropperElement` | `HTMLElement` | `CropperElement` 接口代表任何 Cropper 元素，扩展了 [HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口。 |
| `CropperCanvas` | `CropperElement` | `CropperCanvas` 接口提供了用于操作 `<cropper-canvas>` 元素的布局和表示的属性和方法。 |
| `CropperImage` | `CropperElement` | `CropperImage` 接口提供了用于操作 `<cropper-image>` 元素的布局和表示的属性和方法。 |
| `CropperShade` | `CropperElement` | `CropperShade` 接口提供了用于操作 `<cropper-shade>` 元素的布局和表示的属性和方法。 |
| `CropperHandle` | `CropperElement` | `CropperHandle` 接口提供了用于操作 `<cropper-handle>` 元素的布局和表示的属性和方法。 |
| `CropperSelection` | `CropperElement` | `CropperSelection` 接口提供了用于操作 `<cropper-selection>` 元素的布局和表示的属性和方法。 |
| `CropperGrid` | `CropperElement` | `CropperGrid` 接口提供了用于操作 `<cropper-grid>` 元素的布局和表示的属性和方法。 |
| `CropperCrosshair` | `CropperElement` | `CropperCrosshair` 接口提供了用于操作 `<cropper-crosshair>` 元素的布局和表示的属性和方法。 |
| `CropperViewer` | `CropperElement` | `CropperViewer` 接口提供了用于操作 `<cropper-viewer>` 元素的布局和表示的属性和方法。 |

## 浏览器支持

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
