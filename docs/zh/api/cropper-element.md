# CropperElement

`CropperElement` 接口代表任何 Cropper 元素，扩展了 [HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口。

## 规格

- 公共属性的名称应以字母字符开头。
- 私有属性的名称应该以 `$` 开头。
- 公共/私有自定义方法的名称应以 `$` 开头。
- 私有自定义侦听器的名称应以 `$on` 开头。

## 示例

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

  // ...
}

MyCropperElement.$define();
```

```html
<my-cropper-element my-string-property="foo" my-number-property="1" my-boolean-property></my-cropper-element>
```

## 属性

从其父级 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 继承属性，并实现以下属性：

| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| --- | --- | --- | --- | --- |
| shadowRootMode | `string` | `"open"` | `"closed" \| "open"` | 指示 shadow DOM 树的封装模式。 |
| slottable | `boolean` | `true` | - | 指示此元素是否启用默认插槽，即包含 `<slot>` 元素。 |
| themeColor | `string` | - | - | 指示此元素及其子元素的颜色。 |

## 方法

### $getShadowRoot

- **语法**：`$getShadowRoot()`
- **返回值**：
  - 类型：`ShadowRoot`
  - shadow root。

输出元素的 shadow root，即使它的模式是 `"closed"`。

### $addStyles

- **语法**：`$addStyles(styles)`
- **参数**：
  - `styles`：
    - 类型：`string`
    - 要添加的样式。
- **返回值**：
  - 类型：`CSSStyleSheet | HTMLStyleElement`
  - 生成的样式表。
- **示例**：

  ```js
  const canvas = new CropperCanvas();

  canvas.$addStyles(`
    :host {
      border: 1px solid #39f;
    }
  `);
  ```

将样式添加到 shadow root。

### $emit

- **语法**：
  - `$emit(type)`
  - `$emit(type, detail)`
  - `$emit(type, detail, options)`
- **参数**：
  - `type`：
    - 类型：`string`
    - 事件的名称。
  - `detail`：
    - 类型：`*`
    - 默认值：`undefined`
    - 初始化事件时传递的数据。
  - `options`：
    - 类型：`CustomEventInit`
    - 默认值：`{ bubbles：true, cancelable: true, composed: true }`
    - 其他事件选项。
- **返回值**：
  - 类型：`boolean`
  - 结果值。
- **示例**：

  ```js
  const selection = new CropperSelection();

  selection.$emit('change', {
    x: 10,
    y: 5,
    width: 160,
    height: 90,
  });
  ```

在当前元素上派发事件。

### $nextTick

- **语法**：
  - `$nextTick()`
  - `$nextTick(callback)`
- **参数**：
  - `callback`：
    - 类型：`Function`
    - 在下一个 DOM 更新周期后执行的回调。
- **返回值**：
  - 类型：`Promise`
  - 一个以 `undefined` 为给定值解析后的 Promise 对象。

推迟到下一个 DOM 更新周期后执行的回调。

## 静态属性

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| $name | `string` | 自定义元素的名称。 |
| $version | `string` | 安装包的版本。 |

## 静态方法

### $define

将构造函数定义为新的自定义元素。这只是调用 [`CustomElementRegistry.define()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define) 的快捷方式。

- **语法**：
  - `$define()`
  - `$define(name)`
  - `$define(options)`
  - `$define(name, options)`
- **等同于**：
  - `customElements.define(name, constructor)`
  - `customElements.define(name, constructor, options)`
- **参数**：
  - `name`：
    - 类型：`string`
    - 元素名称。默认为构造函数的 `$name` 静态属性。
  - `options`：
    - 类型：`Object`
    - 元素定义选项。
- **示例**：

  ```js
  // 定义为自主自定义元素：`<my-cropper-element></my-cropper-element>`.
  CropperElement.$define('my-cropper-element');
  ```
