import CropperElement from '@cropper/element';
import style from './style';

export default class CropperGrid extends CropperElement {
  protected $style: string = style;

  bordered: boolean = false;

  columns: number = 3;

  covered: boolean = false;

  rows: number = 3;

  slottable: boolean = false;

  themeColor: string = 'rgba(238, 238, 238, 0.5)';

  protected static get observedAttributes() {
    return super.observedAttributes.concat([
      'bordered',
      'columns',
      'covered',
      'rows',
    ]);
  }

  protected get $observedProperties() {
    return super.$observedProperties.concat([
      'bordered',
      'covered',
    ]);
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (newValue === oldValue) {
      return;
    }

    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'rows' || name === 'columns') {
      this.$render();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.$render();
  }

  protected $render() {
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
