declare namespace Cropper {
  export type Action = 'crop' | 'move' | 'zoom' | 'e' | 's' | 'w' | 'n' | 'ne' | 'nw' | 'se' | 'sw' | 'all';
  export type DragMode = 'crop' | 'move' | 'none';
  export type ImageSmoothingQuality = 'low' | 'medium' | 'high';
  export type ViewMode = 0 | 1 | 2 | 3;

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

  export type ReadyEvent = CustomEvent;

  export interface CropEvent extends CustomEvent {
    detail: Data;
  }

  export interface CropEventData {
    originalEvent: PointerEvent | MouseEvent | TouchEvent;
    action: Action;
  }

  export interface CropStartEvent extends CustomEvent {
    detail: CropEventData;
  }

  export interface CropMoveEvent extends CustomEvent {
    detail: CropEventData;
  }

  export interface CropEndEvent extends CustomEvent {
    detail: CropEventData;
  }

  export interface ZoomEventData {
    originalEvent: WheelEvent | PointerEvent | TouchEvent;
    oldRatio: number;
    ratio: number;
  }

  export interface ZoomEvent extends CustomEvent {
    detail: ZoomEventData;
  }

  export interface Options {
    aspectRatio?: number;
    autoCrop?: boolean;
    autoCropArea?: number;
    background?: boolean;
    center?: boolean;
    checkCrossOrigin?: boolean;
    checkOrientation?: boolean;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    data?: Data;
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
    preview?: Element | Element[] | NodeList | string;
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
    crop?(event: CropEvent): void;
    cropend?(event: CropEndEvent): void;
    cropmove?(event: CropMoveEvent): void;
    cropstart?(event: CropStartEvent): void;
    ready?(event: ReadyEvent): void;
    zoom?(event: ZoomEvent): void;
  }
}

declare class Cropper {
  constructor(element: HTMLImageElement | HTMLCanvasElement, options?: Cropper.Options);
  clear(): Cropper;
  crop(): Cropper;
  destroy(): Cropper;
  disable(): Cropper;
  enable(): Cropper;
  getCanvasData(): Cropper.CanvasData;
  getContainerData(): Cropper.ContainerData;
  getCropBoxData(): Cropper.CropBoxData;
  getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement;
  getData(rounded?: boolean): Cropper.Data;
  getImageData(): Cropper.ImageData;
  move(offsetX: number, offsetY?: number): Cropper;
  moveTo(x: number, y?: number): Cropper;
  replace(url: string, onlyColorChanged?: boolean): Cropper;
  reset(): Cropper;
  rotate(degree: number): Cropper;
  rotateTo(degree: number): Cropper;
  scale(scaleX: number, scaleY?: number): Cropper;
  scaleX(scaleX: number): Cropper;
  scaleY(scaleY: number): Cropper;
  setAspectRatio(aspectRatio: number): Cropper;
  setCanvasData(data: Cropper.SetCanvasDataOptions): Cropper;
  setCropBoxData(data: Cropper.SetCropBoxDataOptions): Cropper;
  setData(data: Cropper.SetDataOptions): Cropper;
  setDragMode(dragMode: Cropper.DragMode): Cropper;
  zoom(ratio: number): Cropper;
  zoomTo(ratio: number, pivot?: { x: number; y: number }): Cropper;
  static noConflict(): Cropper;
  static setDefaults(options: Cropper.Options): void;
}

declare module 'cropperjs' {
  export default Cropper;
}
