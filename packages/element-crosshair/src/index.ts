import CropperElement from '@cropper/element';
import style from './style';

export default class CropperCrosshair extends CropperElement {
  static $version = '__VERSION__';

  protected $style = style;

  centered = false;

  slottable = false;

  themeColor = 'rgba(238, 238, 238, 0.5)';

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'centered',
    ]);
  }

  protected static get $observedProperties(): string[] {
    return super.$observedProperties.concat([
      'centered',
    ]);
  }
}
