import {
  CROPPER_IMAGE,
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

const ALLOWED_ELEMENTS = /^img|canvas$/;
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

export * from '@cropper/utils';
export * from '@cropper/elements';
export default class Cropper {
  static version = '__VERSION__';

  element?: HTMLImageElement | HTMLCanvasElement | string;

  options: CropperOptions = DEFAULT_OPTIONS;

  constructor(
    element: HTMLImageElement | HTMLCanvasElement | string,
    options?: CropperOptions,
  ) {
    if (isString(element)) {
      element = document.querySelector(element) as HTMLImageElement;
    }

    if (!isElement(element) || !ALLOWED_ELEMENTS.test(element.localName)) {
      throw new Error('The first argument is required and must be an <img> or <canvas> element.');
    }

    options = { ...DEFAULT_OPTIONS, ...options };
    this.options = options;
    this.element = element;

    const tagName = element.localName;
    let src = '';

    if (tagName === 'img') {
      src = element.getAttribute('src') || '';

      if (!src) {
        return;
      }

      ({ src } = element as HTMLImageElement);
    } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
      src = (element as HTMLCanvasElement).toDataURL();
    }

    const { template } = options;
    let { container } = options;

    if (template && isString(template)) {
      const templateElement = document.createElement('template');
      const documentFragment = document.createDocumentFragment();
      const { ownerDocument } = element;

      templateElement.innerHTML = template;
      documentFragment.appendChild(templateElement.content);

      Array.from(documentFragment.querySelectorAll(CROPPER_IMAGE)).forEach((image) => {
        image.setAttribute('src', src);
        image.setAttribute('alt', (element as HTMLImageElement).alt || 'The image to crop');
      });

      if (container) {
        if (isString(container)) {
          container = ownerDocument.querySelector(container) as Element;
        }

        if (!isElement(container)) {
          throw new Error('The `container` option must be an element or a valid selector.');
        }
      }

      if (isElement(container)) {
        container.appendChild(documentFragment);
      } else if (element.parentElement) {
        element.style.display = 'none';
        element.parentElement.insertBefore(documentFragment, element.nextSibling);
      } else {
        ownerDocument.body.appendChild(documentFragment);
      }
    }
  }
}
