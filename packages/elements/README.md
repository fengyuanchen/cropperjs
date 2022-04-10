# @cropper/elements

> A series of custom elements for the Cropper.

## Main npm package files

```text
dist/
├── elements.js         (UMD, bundled)
├── elements.min.js     (UMD, bundled, compressed)
├── elements.raw.js     (UMD, unbundled, default)
├── elements.esm.js     (ECMAScript Module, bundled)
├── elements.esm.min.js (ECMAScript Module, bundled, compressed)
├── elements.esm.raw.js (ECMAScript Module, unbundled)
└── elements.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install @cropper/elements
```

### Usage

```js
import { CropperElement, CropperCanvas, CropperImage } from '@cropper/elements';

class MyCropperElement extends CropperElement {}

MyCropperElement.$define();
CropperCanvas.$define();
CropperImage.$define();
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT)
