# Cropper.js

> JavaScript image cropper.

## Main files

```text
dist/
├── cropper.js         (UMD, default)
├── cropper.min.js     (UMD, compressed)
├── cropper.esm.js     (ECMAScript Module)
├── cropper.esm.min.js (ECMAScript Module, compressed)
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
