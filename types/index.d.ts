declare namespace Cropper {
  export type Action = 'crop' | 'move' | 'zoom' | 'e' | 's' | 'w' | 'n' | 'ne' | 'nw' | 'se' | 'sw' | 'all';
  export type DragMode = 'crop' | 'move' | 'none';
  export type ImageSmoothingQuality = 'low' | 'medium' | 'high';
  export type ViewMode = 0 | 1 | 2 | 3;
  export type Preview = HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | string;

  export interface Data {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
  }

  export interface ContainerData {
    width: number;
    height: number;
  }

  export interface ImageData {
    left: number;
    top: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
    naturalWidth: number;
    naturalHeight: number;
    aspectRatio: number;
  }

  export interface CanvasData {
    left: number;
    top: number;
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
  }

  export interface CropBoxData {
    left: number;
    top: number;
    width: number;
    height: number;
  }

  export interface GetCroppedCanvasOptions {
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    rounded?: boolean;
    fillColor?: string;
    imageSmoothingEnabled?: boolean;
    imageSmoothingQuality?: ImageSmoothingQuality;
  }

  export interface SetDataOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotate?: number;
    scaleX?: number;
    scaleY?: number;
  }

  export interface SetCanvasDataOptions {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  }

  export interface SetCropBoxDataOptions {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  }

  export interface CropperEvent<T extends EventTarget = EventTarget> extends CustomEvent<any> {
    currentTarget: (T & { cropper: Cropper }) | null;
  }

  export type ReadyEvent<T extends EventTarget = EventTarget> = CropperEvent<T>;

  export interface CropEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
    detail: Data;
  }

  export interface CropEventData {
    originalEvent: PointerEvent | TouchEvent | MouseEvent;
    action: Action;
  }

  export interface CropStartEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
    detail: CropEventData;
  }

  export interface CropMoveEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
    detail: CropEventData;
  }

  export interface CropEndEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
    detail: CropEventData;
  }

  export interface ZoomEventData {
    originalEvent: WheelEvent | PointerEvent | TouchEvent | MouseEvent;
    oldRatio: number;
    ratio: number;
  }

  export interface ZoomEvent<T extends EventTarget = EventTarget> extends CropperEvent<T> {
    detail: ZoomEventData;
  }

  export interface Options<T extends EventTarget = EventTarget> {
    aspectRatio?: number;
    autoCrop?: boolean;
    autoCropArea?: number;
    background?: boolean;
    center?: boolean;
    checkCrossOrigin?: boolean;
    checkOrientation?: boolean;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    data?: SetDataOptions;
    dragMode?: DragMode;
    guides?: boolean;
    highlight?: boolean;
    initialAspectRatio?: number;
    minCanvasHeight?: number;
    minCanvasWidth?: number;
    minContainerHeight?: number;
    minContainerWidth?: number;
    minCropBoxHeight?: number;
    minCropBoxWidth?: number;
    modal?: boolean;
    movable?: boolean;
    preview?: Preview;
    responsive?: boolean;
    restore?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    toggleDragModeOnDblclick?: boolean;
    viewMode?: ViewMode;
    wheelZoomRatio?: number;
    zoomOnTouch?: boolean;
    zoomOnWheel?: boolean;
    zoomable?: boolean;
    ready?(event: ReadyEvent<T>): void;
    crop?(event: CropEvent<T>): void;
    cropend?(event: CropEndEvent<T>): void;
    cropmove?(event: CropMoveEvent<T>): void;
    cropstart?(event: CropStartEvent<T>): void;
    zoom?(event: ZoomEvent<T>): void;
  }
}

declare class Cropper {
  constructor(element: HTMLImageElement, options?: Cropper.Options<HTMLImageElement>);
  constructor(element: HTMLCanvasElement, options?: Cropper.Options<HTMLCanvasElement>);
  clear(): this;
  crop(): this;
  destroy(): this;
  disable(): this;
  enable(): this;
  getCanvasData(): Cropper.CanvasData;
  getContainerData(): Cropper.ContainerData;
  getCropBoxData(): Cropper.CropBoxData;
  getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement;
  getData(rounded?: boolean): Cropper.Data;
  getImageData(): Cropper.ImageData;
  move(offsetX: number, offsetY?: number): this;
  moveTo(x: number, y?: number): this;
  replace(url: string, hasSameSize?: boolean): this;
  reset(): this;
  rotate(degree: number): this;
  rotateTo(degree: number): this;
  scale(scaleX: number, scaleY?: number): this;
  scaleX(scaleX: number): this;
  scaleY(scaleY: number): this;
  setAspectRatio(aspectRatio: number): this;
  setCanvasData(data: Cropper.SetCanvasDataOptions): this;
  setCropBoxData(data: Cropper.SetCropBoxDataOptions): this;
  setData(data: Cropper.SetDataOptions): this;
  setDragMode(dragMode: Cropper.DragMode): this;
  zoom(ratio: number): this;
  zoomTo(ratio: number, pivot?: { x: number; y: number }): this;
  static create(element: HTMLImageElement, options?: Cropper.Options<HTMLImageElement>): Cropper;
  static create(element: HTMLCanvasElement, options?: Cropper.Options<HTMLCanvasElement>): Cropper;
  static noConflict(): typeof Cropper;
  static setDefaults(options: Partial<Cropper.Options<EventTarget>>): void;
}

declare module 'cropperjs' {
  export default Cropper;
}
