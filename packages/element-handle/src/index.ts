import { ACTION_NONE } from '@cropper/utils';
import CropperElement from '@cropper/element';
import style from './style';

export default class CropperHandle extends CropperElement {
  static $version = '__VERSION__';

  protected $onCanvasCropEnd: EventListener | null = null;

  protected $onCanvasCropStart: EventListener | null = null;

  protected $style: string = style;

  action: string = ACTION_NONE;

  plain = false;

  slottable = false;

  themeColor = 'rgba(51, 153, 255, 0.5)';

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'action',
      'plain',
    ]);
  }

  protected static get $observedProperties(): string[] {
    return super.$observedProperties.concat([
      'plain',
    ]);
  }
}
