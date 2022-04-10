# @cropper/element-viewer

> A custom viewer element for the Cropper.

## Main npm package files

```text
dist/
├── element-viewer.js         (UMD, bundled)
├── element-viewer.min.js     (UMD, bundled, compressed)
├── element-viewer.raw.js     (UMD, unbundled, default)
├── element-viewer.esm.js     (ECMAScript Module, bundled)
├── element-viewer.esm.min.js (ECMAScript Module, bundled, compressed)
├── element-viewer.esm.raw.js (ECMAScript Module, unbundled)
└── element-viewer.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install @cropper/element-viewer
```

### Usage

```js
import CropperViewer from '@cropper/element-viewer';

CropperViewer.$define();
```

```html
<cropper-viewer></cropper-viewer>
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org).

## License

[MIT](https://opensource.org/licenses/MIT)
