import CropperElement from '@cropper/element';
import { ACTION_NONE } from '@cropper/utils';
import style from './style';

export default class CropperHandle extends CropperElement {
  static $version = '__VERSION__';

  protected $onCanvasCropEnd: EventListener | null = null;

  protected $onCanvasCropStart: EventListener | null = null;

  protected $style: string = style;

  action = ACTION_NONE;

  plain = false;

  slottable = false;

  themeColor = 'rgba(51, 153, 255, 0.5)';

  protected static get observedAttributes(): string[] {
    return super.observedAttributes.concat([
      'action',
      'plain',
    ]);
  }
}
