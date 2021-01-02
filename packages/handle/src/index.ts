import CropperElement from '@cropper/element';
import { ACTION_NONE } from '@cropper/constants';
import style from './style';

export default class CropperHandle extends CropperElement {
  static $version: string = '__VERSION__';

  protected $onCanvasCropEnd: EventListener | null = null;

  protected $onCanvasCropStart: EventListener | null = null;

  protected $style: string = style;

  action: string = ACTION_NONE;

  plain: boolean = false;

  slottable: boolean = false;

  themeColor: string = 'rgba(51, 153, 255, 0.5)';

  protected static get observedAttributes() {
    return super.observedAttributes.concat([
      'action',
      'plain',
    ]);
  }

  protected static get $observedProperties() {
    return super.$observedProperties.concat([
      'plain',
    ]);
  }
}
