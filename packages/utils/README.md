# @cropper/utils

> A series of common constants and utility functions for Cropper.

## Main npm package files

```text
dist/
├── utils.js         (UMD, bundled, default)
├── utils.min.js     (UMD, bundled, compressed)
├── utils.raw.js     (UMD, unbundled, default)
├── utils.esm.js     (ECMAScript Module, bundled)
├── utils.esm.min.js (ECMAScript Module, bundled, compressed)
├── utils.esm.raw.js (ECMAScript Module, unbundled)
└── utils.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install @cropper/utils
```

### Usage

```js
import { NAMESPACE, isObject } from '@cropper/utils';

console.log(NAMESPACE);
// > "cropper"

console.log(isObject({}));
// > true

console.log(isObject(null));
// > false
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT)
