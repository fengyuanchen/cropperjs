import CropperElement from '@cropper/element';
import style from './style';

export default class CropperCrosshair extends CropperElement {
  static $version: string = '__VERSION__';

  protected $style = style;

  centered: boolean = false;

  slottable: boolean = false;

  themeColor: string = 'rgba(238, 238, 238, 0.5)';

  protected static get observedAttributes() {
    return super.observedAttributes.concat([
      'centered',
    ]);
  }

  protected static get $observedProperties() {
    return super.$observedProperties.concat([
      'centered',
    ]);
  }
}
