# @cropper/helper-utils

> A series of common utility functions.

## Main files

```text
dist/
├── helper-utils.js         (UMD, bundled)
├── helper-utils.min.js     (UMD, bundled, compressed)
├── helper-utils.raw.js     (UMD, unbundled, default)
├── helper-utils.esm.js     (ECMAScript Module, bundled)
├── helper-utils.esm.min.js (ECMAScript Module, bundled, compressed)
├── helper-utils.esm.raw.js (ECMAScript Module, unbundled)
└── helper-utils.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install @cropper/helper-utils
```

### Usage

```js
import { isObject } from '@cropper/helper-utils';

console.log(isObject({}));
// > true

console.log(isObject(null));
// > false
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT)
