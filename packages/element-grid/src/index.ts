import CropperElement from '@cropper/element';
import { CROPPER_GIRD } from '@cropper/utils';
import style from './style';

export default class CropperGrid extends CropperElement {
  static $name = CROPPER_GIRD;

  static $version = '__VERSION__';

  protected $style = style;

  bordered = false;

  columns = 3;

  covered = false;

  rows = 3;

  slottable = false;

  themeColor = 'rgba(238, 238, 238, 0.5)';

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'bordered',
      'columns',
      'covered',
      'rows',
    ]);
  }

  protected $propertyChangedCallback(name: string, oldValue: unknown, newValue: unknown): void {
    if (Object.is(newValue, oldValue)) {
      return;
    }

    super.$propertyChangedCallback(name, oldValue, newValue);

    if (name === 'rows' || name === 'columns') {
      this.$nextTick(() => {
        this.$render();
      });
    }
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    this.$render();
  }

  protected $render(): void {
    const shadow = this.$getShadowRoot();
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.rows; i += 1) {
      const row = document.createElement('span');

      row.setAttribute('role', 'row');

      for (let j = 0; j < this.columns; j += 1) {
        const column = document.createElement('span');

        column.setAttribute('role', 'gridcell');
        row.appendChild(column);
      }

      fragment.appendChild(row);
    }

    if (shadow) {
      shadow.innerHTML = '';
      shadow.appendChild(fragment);
    }
  }
}
