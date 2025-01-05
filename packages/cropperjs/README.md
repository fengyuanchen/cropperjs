# Cropper.js

> JavaScript image cropper.

## Main npm package files

```text
dist/
├── cropper.js         (UMD, bundled)
├── cropper.min.js     (UMD, bundled, compressed)
├── cropper.raw.js     (UMD, unbundled, default)
├── cropper.esm.js     (ECMAScript Module, bundled)
├── cropper.esm.min.js (ECMAScript Module, bundled, compressed)
├── cropper.esm.raw.js (ECMAScript Module, unbundled)
└── cropper.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install cropperjs
```

### Usage

```js
import Cropper from 'cropperjs';

const image = new Image();

image.src = '/path/to/image.jpg';

const cropper = new Cropper(image);
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org).

## License

[MIT](https://opensource.org/licenses/MIT)
