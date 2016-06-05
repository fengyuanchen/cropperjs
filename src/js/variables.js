  // Globals
  var document = window.document;
  var location = window.location;
  var navigator = window.navigator;
  var ArrayBuffer = window.ArrayBuffer;
  var Object = window.Object;
  var Array = window.Array;
  var String = window.String;
  var Number = window.Number;
  var Math = window.Math;

  // Constants
  var NAMESPACE = 'cropper';

  // Classes
  var CLASS_MODAL = NAMESPACE + '-modal';
  var CLASS_HIDE = NAMESPACE + '-hide';
  var CLASS_HIDDEN = NAMESPACE + '-hidden';
  var CLASS_INVISIBLE = NAMESPACE + '-invisible';
  var CLASS_MOVE = NAMESPACE + '-move';
  var CLASS_CROP = NAMESPACE + '-crop';
  var CLASS_DISABLED = NAMESPACE + '-disabled';
  var CLASS_BG = NAMESPACE + '-bg';

  // Events
  var EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
  var EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
  var EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel';
  var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_RESIZE = 'resize';
  var EVENT_ERROR = 'error';
  var EVENT_LOAD = 'load';
  var EVENT_BUILD = 'build';
  var EVENT_BUILT = 'built';
  var EVENT_CROP_START = 'cropstart';
  var EVENT_CROP_MOVE = 'cropmove';
  var EVENT_CROP_END = 'cropend';
  var EVENT_CROP = 'crop';
  var EVENT_ZOOM = 'zoom';

  // RegExps
  var REGEXP_ACTIONS = /e|w|s|n|se|sw|ne|nw|all|crop|move|zoom/;
  var REGEXP_SUFFIX = /width|height|left|top|marginLeft|marginTop/;
  var REGEXP_ORIGINS = /^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i;
  var REGEXP_TRIM = /^\s+(.*)\s+$/;
  var REGEXP_SPACES = /\s+/;
  var REGEXP_DATA_URL = /^data\:/;
  var REGEXP_DATA_URL_HEAD = /^data\:([^\;]+)\;base64,/;
  var REGEXP_DATA_URL_JPEG = /^data\:image\/jpeg.*;base64,/;
  var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;

  // Data
  var DATA_PREVIEW = 'preview';
  var DATA_ACTION = 'action';

  // Actions
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_NONE = 'none';

  // Supports
  var SUPPORT_CANVAS = !!document.createElement('canvas').getContext;
  var IS_SAFARI_OR_UIWEBVIEW = navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);

  // Maths
  var min = Math.min;
  var max = Math.max;
  var abs = Math.abs;
  var sin = Math.sin;
  var cos = Math.cos;
  var sqrt = Math.sqrt;
  var round = Math.round;
  var floor = Math.floor;
  var PI = Math.PI;

  // Utilities
  var objectProto = Object.prototype;
  var toString = objectProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var slice = Array.prototype.slice;
  var fromCharCode = String.fromCharCode;
