# @cropper/element

> An abstract class for constructing Cropper elements.

## Main files

```text
dist/
├── cropper-element.js         (UMD, default)
├── cropper-element.min.js     (UMD, compressed)
├── cropper-element.esm.js     (ECMAScript Module)
├── cropper-element.esm.min.js (ECMAScript Module, compressed)
└── cropper-element.d.ts       (TypeScript Declaration File)
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

  static get observedAttributes() {
    return super.observedAttributes.concat([
      'my-boolean-property',
      'my-number-property',
      'my-string-property',
    ]);
  }

  static get $observedProperties() {
    return super.$observedProperties.concat([
      'myBooleanProperty',
      'myNumberProperty',
      'myStringProperty',
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
