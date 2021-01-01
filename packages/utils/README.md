# @cropper/utils

> A series of common utility functions.

## Main files

```text
dist/
├── cropper-utils.js         (UMD, default)
├── cropper-utils.min.js     (UMD, compressed)
├── cropper-utils.esm.js     (ECMAScript Module)
├── cropper-utils.esm.min.js (ECMAScript Module, compressed)
└── cropper-utils.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install @cropper/utils
```

### Usage

```js
import { isObject } from '@cropper/utils';

console.log(isObject({}));
// > true

console.log(isObject(null));
// > false
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT)
