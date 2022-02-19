# @cropper/element

> An abstract class for constructing Cropper elements.

## Main npm package files

```text
dist/
├── element.js         (UMD, bundled)
├── element.min.js     (UMD, bundled, compressed)
├── element.raw.js     (UMD, unbundled, default)
├── element.esm.js     (ECMAScript Module, bundled)
├── element.esm.min.js (ECMAScript Module, bundled, compressed)
├── element.esm.raw.js (ECMAScript Module, unbundled)
└── element.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

```sh
npm install @cropper/element
```

### Usage

```js
import { CropperElement } from 'cropperjs';
// Or
// import CropperElement from '@cropper/element';

class MyCropperElement extends CropperElement {
  myStringProperty = '';
  myNumberProperty = NaN;
  myBooleanProperty = false;

  static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'my-boolean-property',
      'my-number-property',
      'my-string-property',
    ]);
  }

  // ...
}

MyCropperElement.$define();
```

```html
<my-cropper-element my-string-property="foo" my-number-property="1" my-boolean-property></my-cropper-element>
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org).

## License

[MIT](https://opensource.org/licenses/MIT)
