export const IN_BROWSER = typeof window !== 'undefined';
export const WINDOW = IN_BROWSER ? window : {};
export const NAMESPACE = 'cropper';

// Actions
export const ACTION_ALL = 'all';
export const ACTION_CROP = 'crop';
export const ACTION_MOVE = 'move';
export const ACTION_ZOOM = 'zoom';
export const ACTION_EAST = 'e';
export const ACTION_WEST = 'w';
export const ACTION_SOUTH = 's';
export const ACTION_NORTH = 'n';
export const ACTION_NORTH_EAST = 'ne';
export const ACTION_NORTH_WEST = 'nw';
export const ACTION_SOUTH_EAST = 'se';
export const ACTION_SOUTH_WEST = 'sw';

// Classes
export const CLASS_CROP = `${NAMESPACE}-crop`;
export const CLASS_DISABLED = `${NAMESPACE}-disabled`;
export const CLASS_HIDDEN = `${NAMESPACE}-hidden`;
export const CLASS_HIDE = `${NAMESPACE}-hide`;
export const CLASS_INVISIBLE = `${NAMESPACE}-invisible`;
export const CLASS_MODAL = `${NAMESPACE}-modal`;
export const CLASS_MOVE = `${NAMESPACE}-move`;

// Data keys
export const DATA_ACTION = 'action';
export const DATA_PREVIEW = 'preview';

// Drag modes
export const DRAG_MODE_CROP = 'crop';
export const DRAG_MODE_MOVE = 'move';
export const DRAG_MODE_NONE = 'none';

// Events
export const EVENT_CROP = 'crop';
export const EVENT_CROP_END = 'cropend';
export const EVENT_CROP_MOVE = 'cropmove';
export const EVENT_CROP_START = 'cropstart';
export const EVENT_DBLCLICK = 'dblclick';
export const EVENT_LOAD = 'load';
export const EVENT_POINTER_DOWN = WINDOW.PointerEvent ? 'pointerdown' : 'touchstart mousedown';
export const EVENT_POINTER_MOVE = WINDOW.PointerEvent ? 'pointermove' : 'touchmove mousemove';
export const EVENT_POINTER_UP = WINDOW.PointerEvent ? 'pointerup pointercancel' : 'touchend touchcancel mouseup';
export const EVENT_READY = 'ready';
export const EVENT_RESIZE = 'resize';
export const EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
export const EVENT_ZOOM = 'zoom';

// RegExps
export const REGEXP_ACTIONS = /^(?:e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;
export const REGEXP_DATA_URL = /^data:/;
export const REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
export const REGEXP_TAG_NAME = /^(?:img|canvas)$/i;
