declare namespace Cropper {
  export enum DragMode {
    CROP = 'crop',
    MOVE = 'move',
    NONE = 'none',
  }

  export enum ViewMode {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
  }

  export enum ImageSmoothingQuality {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
  }

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
    fillColor?: string;
    imageSmoothingEnabled?: boolean;
    imageSmoothingQuality?: ImageSmoothingQuality;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
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

  export interface Options {
    aspectRatio?: number;
    autoCrop?: boolean;
    autoCropArea?: number;
    background?: boolean;
    center?: boolean;
    checkCrossOrigin?: boolean;
    checkOrientation?: boolean;
    crop?(event: CustomEvent): void;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    cropend?(event: CustomEvent): void;
    cropmove?(event: CustomEvent): void;
    cropstart?(event: CustomEvent): void;
    data?: Data;
    dragMode?: DragMode;
    guides?: boolean;
    highlight?: boolean;
    minCanvasHeight?: number;
    minCanvasWidth?: number;
    minContainerHeight?: number;
    minContainerWidth?: number;
    minCropBoxHeight?: number;
    minCropBoxWidth?: number;
    modal?: boolean;
    movable?: boolean;
    preview?: Element | Element[] | NodeList | string;
    ready?(event: CustomEvent): void;
    responsive?: boolean;
    restore?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    toggleDragModeOnDblclick?: boolean;
    viewMode?: ViewMode;
    wheelZoomRatio?: number;
    zoom?(event: CustomEvent): void;
    zoomOnTouch?: boolean;
    zoomOnWheel?: boolean;
    zoomable?: boolean;
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
  zoomTo(ratio: number): Cropper;
}

declare module 'cropperjs' {
  export default Cropper;
}
