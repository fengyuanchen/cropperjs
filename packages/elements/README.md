# @cropper/elements

> A series of custom elements for the Cropper.

## Main files

```text
dist/
├── elements.js         (UMD, default)
├── elements.min.js     (UMD, compressed)
├── elements.esm.js     (ECMAScript Module)
├── elements.esm.min.js (ECMAScript Module, compressed)
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
