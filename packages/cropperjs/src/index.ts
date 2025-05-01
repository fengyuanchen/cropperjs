import {
  CROPPER_CANVAS,
  CROPPER_IMAGE,
  CROPPER_SELECTION,
  getRootDocument,
  isElement,
  isString,
} from '@cropper/utils';
import {
  CropperCanvas,
  CropperCrosshair,
  CropperGrid,
  CropperHandle,
  CropperImage,
  CropperSelection,
  CropperShade,
  CropperViewer,
} from '@cropper/elements';
import DEFAULT_TEMPLATE from './template';

export interface CropperOptions {
  container?: Element | string;
  template?: string;
}

const REGEXP_ALLOWED_ELEMENTS = /^img|canvas$/;
const REGEXP_BLOCKED_TAGS = /<(\/?(?:script|style)[^>]*)>/gi;
const DEFAULT_OPTIONS: CropperOptions = {
  template: DEFAULT_TEMPLATE,
};

CropperCanvas.$define();
CropperCrosshair.$define();
CropperGrid.$define();
CropperHandle.$define();
CropperImage.$define();
CropperSelection.$define();
CropperShade.$define();
CropperViewer.$define();

export { DEFAULT_TEMPLATE };
export * from '@cropper/utils';
export * from '@cropper/elements';
export default class Cropper {
  static version = '__VERSION__';

  element: HTMLImageElement | HTMLCanvasElement;

  options: CropperOptions = DEFAULT_OPTIONS;

  container: Element;

  constructor(
    element: HTMLImageElement | HTMLCanvasElement | string,
    options?: CropperOptions,
  ) {
    if (isString(element)) {
      element = document.querySelector(element) as HTMLImageElement;
    }

    if (!isElement(element) || !REGEXP_ALLOWED_ELEMENTS.test(element.localName)) {
      throw new Error('The first argument is required and must be an <img> or <canvas> element.');
    }

    this.element = element;
    options = { ...DEFAULT_OPTIONS, ...options };
    this.options = options;

    let { container } = options;

    if (container) {
      if (isString(container)) {
        container = getRootDocument(element)?.querySelector(container) as Element;
      }

      if (!isElement(container)) {
        throw new Error('The `container` option must be an element or a valid selector.');
      }
    }

    if (!isElement(container)) {
      if (element.parentElement) {
        container = element.parentElement;
      } else {
        container = element.ownerDocument.body;
      }
    }

    this.container = container;

    const tagName = element.localName;
    let src = '';

    if (tagName === 'img') {
      ({ src } = element as HTMLImageElement);
    } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
      src = (element as HTMLCanvasElement).toDataURL();
    }

    const { template } = options;

    if (template && isString(template)) {
      const templateElement = document.createElement('template');
      const documentFragment = document.createDocumentFragment();

      templateElement.innerHTML = template.replace(REGEXP_BLOCKED_TAGS, '&lt;$1&gt;');
      documentFragment.appendChild(templateElement.content);

      Array.from(documentFragment.querySelectorAll(CROPPER_IMAGE)).forEach((image) => {
        image.setAttribute('src', src);
        image.setAttribute('alt', (element as HTMLImageElement).alt || 'The image to crop');
      });

      if (element.parentElement) {
        element.style.display = 'none';
        container.insertBefore(documentFragment, element.nextSibling);
      } else {
        container.appendChild(documentFragment);
      }
    }
  }

  getCropperCanvas(): CropperCanvas | null {
    return this.container.querySelector(CROPPER_CANVAS);
  }

  getCropperImage(): CropperImage | null {
    return this.container.querySelector(CROPPER_IMAGE);
  }

  getCropperSelection(): CropperSelection | null {
    return this.container.querySelector(CROPPER_SELECTION);
  }

  getCropperSelections(): NodeListOf<CropperSelection> | null {
    return this.container.querySelectorAll(CROPPER_SELECTION);
  }
}
