import CropperElement from '@cropper/element';
import { CROPPER_CROSSHAIR } from '@cropper/utils';
import style from './style';

export default class CropperCrosshair extends CropperElement {
  static $name = CROPPER_CROSSHAIR;

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
}
