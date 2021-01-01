export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const WINDOW: any = IS_BROWSER ? window : {};
export const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
export const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
export const NAMESPACE = 'cropper';
export const CROPPER_CANVAS = `${NAMESPACE}-canvas`;
export const CROPPER_SELECTION = `${NAMESPACE}-selection`;
export const CROPPER_IMAGE = `${NAMESPACE}-image`;

// Actions
export const ACTION_SELECT = 'select';
export const ACTION_MOVE = 'move';
export const ACTION_SCALE = 'scale';
export const ACTION_NONE = 'none';
export const ACTION_RESIZE_NORTH = 'n-resize';
export const ACTION_RESIZE_EAST = 'e-resize';
export const ACTION_RESIZE_SOUTH = 's-resize';
export const ACTION_RESIZE_WEST = 'w-resize';
export const ACTION_RESIZE_NORTHEAST = 'ne-resize';
export const ACTION_RESIZE_NORTHWEST = 'nw-resize';
export const ACTION_RESIZE_SOUTHEAST = 'se-resize';
export const ACTION_RESIZE_SOUTHWEST = 'sw-resize';

// Attributes
export const ATTRIBUTE_ACTION = 'action';

// Native events
export const EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
export const EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
export const EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
export const EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
export const EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
export const EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
export const EVENT_ERROR = 'error';
export const EVENT_LOAD = 'load';
export const EVENT_RESIZE = 'resize';
export const EVENT_WHEEL = 'wheel';

// Custom events
export const EVENT_ACTION = 'action';
export const EVENT_ACTION_END = 'actionend';
export const EVENT_ACTION_MOVE = 'actionmove';
export const EVENT_ACTION_START = 'actionstart';
export const EVENT_CHANGE = 'change';
export const EVENT_TRANSFORM = 'transform';
