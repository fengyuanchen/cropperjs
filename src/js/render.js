import {
  ACTION_ALL,
  ACTION_MOVE,
  CLASS_HIDDEN,
  DATA_ACTION,
  EVENT_CROP,
  MIN_CONTAINER_WIDTH,
  MIN_CONTAINER_HEIGHT,
} from './constants';
import {
  addClass,
  assign,
  dispatchEvent,
  getAdjustedSizes,
  getRotatedSizes,
  getTransforms,
  removeClass,
  setData,
  setStyle,
} from './utilities';

export default {
  render() {
    this.initContainer();
    this.initCanvas();
    this.initCropBox();
    this.renderCanvas();

    if (this.cropped) {
      this.renderCropBox();
    }
  },

  initContainer() {
    const {
      element,
      options,
      container,
      cropper,
    } = this;

    addClass(cropper, CLASS_HIDDEN);
    removeClass(element, CLASS_HIDDEN);

    const containerData = {
      width: Math.max(
        container.offsetWidth,
        Number(options.minContainerWidth) || MIN_CONTAINER_WIDTH,
      ),
      height: Math.max(
        container.offsetHeight,
        Number(options.minContainerHeight) || MIN_CONTAINER_HEIGHT,
      ),
    };

    setStyle(cropper, containerData);
    addClass(element, CLASS_HIDDEN);
    removeClass(cropper, CLASS_HIDDEN);
    this.containerData = containerData;
  },

  // Canvas (image wrapper)
  initCanvas() {
    const { options, containerData, imageData } = this;
    const { viewMode } = options;
    const rotated = Math.abs(imageData.rotate) % 180 === 90;
    const naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
    const naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
    const aspectRatio = naturalWidth / naturalHeight;
    let { width, height } = containerData;

    if (height * aspectRatio > width) {
      if (viewMode === 3) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
    } else if (viewMode === 3) {
      height = width / aspectRatio;
    } else {
      width = height * aspectRatio;
    }

    const canvasData = {
      aspectRatio,
      naturalWidth,
      naturalHeight,
      width,
      height,
      left: (containerData.width - width) / 2,
      top: (containerData.height - height) / 2,
      scale: width / naturalWidth,
    };

    canvasData.oldLeft = canvasData.left;
    canvasData.oldTop = canvasData.top;
    this.canvasData = canvasData;
    this.limited = (viewMode === 1 || viewMode === 2);
    this.limitCanvas(true, true);
    this.initialImageData = assign({}, imageData);
    this.initialCanvasData = assign({}, canvasData);
  },

  limitCanvas(sizeLimited = false, positionLimited = false) {
    const { options, containerData, canvasData } = this;
    const { viewMode } = options;
    const { width: containerWidth, height: containerHeight } = containerData;
    const { aspectRatio, width, height } = canvasData;

    if (sizeLimited) {
      let minCanvasWidth = Math.max(options.minCanvasWidth, 0) || 0;
      let minCanvasHeight = Math.max(options.minCanvasHeight, 0) || 0;
      let maxCanvasWidth = Math.max(options.maxCanvasWidth, minCanvasWidth) || Infinity;
      let maxCanvasHeight = Math.max(options.maxCanvasHeight, minCanvasHeight) || Infinity;

      if (viewMode > 1) {
        minCanvasWidth = Math.max(minCanvasWidth, containerWidth);
        minCanvasHeight = Math.max(minCanvasHeight, containerHeight);

        if (viewMode === 3) {
          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      }

      ({ width: minCanvasWidth, height: minCanvasHeight } = getAdjustedSizes({
        aspectRatio,
        width: minCanvasWidth,
        height: minCanvasHeight,
      }));
      ({ width: maxCanvasWidth, height: maxCanvasHeight } = getAdjustedSizes({
        aspectRatio,
        width: maxCanvasWidth,
        height: maxCanvasHeight,
      }));

      canvasData.minWidth = minCanvasWidth;
      canvasData.minHeight = minCanvasHeight;
      canvasData.maxWidth = maxCanvasWidth;
      canvasData.maxHeight = maxCanvasHeight;
    }

    if (positionLimited) {
      let minLeft = -width;
      let minTop = -height;
      let maxLeft = containerWidth;
      let maxTop = containerHeight;

      if (viewMode > 1) {
        const newLeft = containerWidth - width;
        const newTop = containerHeight - height;

        minLeft = Math.min(0, newLeft);
        minTop = Math.min(0, newTop);
        maxLeft = Math.max(0, newLeft);
        maxTop = Math.max(0, newTop);
      }

      canvasData.minLeft = minLeft;
      canvasData.minTop = minTop;
      canvasData.maxLeft = maxLeft;
      canvasData.maxTop = maxTop;
    }
  },

  renderCanvas(changed = false, transformed = false) {
    const { options, canvasData, imageData } = this;

    if (transformed) {
      const { width: naturalWidth, height: naturalHeight } = getRotatedSizes({
        width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
        height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
        degree: imageData.rotate || 0,
      });
      const width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
      const height = canvasData.height * (naturalHeight / canvasData.naturalHeight);

      canvasData.left -= (width - canvasData.width) / 2;
      canvasData.top -= (height - canvasData.height) / 2;
      canvasData.width = width;
      canvasData.height = height;
      canvasData.aspectRatio = naturalWidth / naturalHeight;
      canvasData.naturalWidth = naturalWidth;
      canvasData.naturalHeight = naturalHeight;
      this.limitCanvas(true, false);
    }

    if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
      canvasData.left = canvasData.oldLeft;
    }

    if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
      canvasData.top = canvasData.oldTop;
    }

    canvasData.width = Math.min(
      Math.max(canvasData.width, canvasData.minWidth),
      canvasData.maxWidth,
    );
    canvasData.height = Math.min(
      Math.max(canvasData.height, canvasData.minHeight),
      canvasData.maxHeight,
    );
    canvasData.scale = canvasData.width / canvasData.naturalWidth;

    this.limitCanvas(false, true);

    canvasData.left = Math.min(
      Math.max(canvasData.left, canvasData.minLeft),
      canvasData.maxLeft,
    );
    canvasData.top = Math.min(
      Math.max(canvasData.top, canvasData.minTop),
      canvasData.maxTop,
    );
    canvasData.oldLeft = canvasData.left;
    canvasData.oldTop = canvasData.top;

    setStyle(this.canvas, assign({
      width: canvasData.width,
      height: canvasData.height,
    }, getTransforms({
      translateX: canvasData.left,
      translateY: canvasData.top,
    })));

    this.renderImage();

    if (changed) {
      if (this.cropped) {
        if (options.viewMode > 0) {
          this.limitCropBox(true, true);
        }

        this.renderCropBox();
      } else {
        this.output();
      }
    }
  },

  renderImage() {
    const { canvasData, imageData } = this;
    const width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
    const height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);

    assign(imageData, {
      width,
      height,
      left: (canvasData.width - width) / 2,
      top: (canvasData.height - height) / 2,
    });
    setStyle(this.image, assign({
      width: imageData.width,
      height: imageData.height,
    }, getTransforms(assign({
      translateX: imageData.left,
      translateY: imageData.top,
    }, imageData))));
  },

  initCropBox() {
    const { options, canvasData } = this;
    const aspectRatio = options.aspectRatio || options.initialAspectRatio;
    let { width, height } = canvasData;

    if (aspectRatio) {
      if (height * aspectRatio > width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    }

    const cropBoxData = {
      width,
      height,
    };

    this.cropBoxData = cropBoxData;
    this.limitCropBox(true, true);

    // Initialize auto crop area
    cropBoxData.width = Math.min(
      Math.max(cropBoxData.width, cropBoxData.minWidth),
      cropBoxData.maxWidth,
    );
    cropBoxData.height = Math.min(
      Math.max(cropBoxData.height, cropBoxData.minHeight),
      cropBoxData.maxHeight,
    );

    const autoCropArea = Number(options.autoCropArea) || 0.8;

    // The width/height of auto crop area must large than "minWidth/Height"
    cropBoxData.width = Math.max(
      cropBoxData.minWidth,
      cropBoxData.width * autoCropArea,
    );
    cropBoxData.height = Math.max(
      cropBoxData.minHeight,
      cropBoxData.height * autoCropArea,
    );
    cropBoxData.left = (
      canvasData.left + ((canvasData.width - cropBoxData.width) / 2)
    );
    cropBoxData.top = (
      canvasData.top + ((canvasData.height - cropBoxData.height) / 2)
    );
    cropBoxData.oldLeft = cropBoxData.left;
    cropBoxData.oldTop = cropBoxData.top;
    cropBoxData.naturalWidth = cropBoxData.width / canvasData.scale;
    cropBoxData.naturalHeight = cropBoxData.height / canvasData.scale;
    this.initialCropBoxData = assign({}, cropBoxData);
  },

  limitCropBox(sizeLimited = false, positionLimited = false) {
    const { options, canvasData, cropBoxData } = this;
    const { aspectRatio, viewMode } = options;
    const {
      width: canvasWidth,
      height: canvasHeight,
      left: canvasLeft,
      top: canvasTop,
    } = canvasData;

    if (sizeLimited) {
      let minCropBoxWidth = Math.max(options.minCropBoxWidth, 0) || 0;
      let minCropBoxHeight = Math.max(options.minCropBoxHeight, 0) || 0;
      let maxCropBoxWidth = Math.max(options.maxCropBoxWidth, minCropBoxWidth) || Infinity;
      let maxCropBoxHeight = Math.max(options.maxCropBoxHeight, minCropBoxHeight) || Infinity;

      if (viewMode > 0) {
        minCropBoxWidth = Math.min(canvasWidth, minCropBoxWidth);
        minCropBoxHeight = Math.min(canvasHeight, minCropBoxHeight);
        maxCropBoxWidth = Math.min(canvasWidth, maxCropBoxWidth);
        maxCropBoxHeight = Math.min(canvasHeight, maxCropBoxHeight);
      }

      if (aspectRatio > 0) {
        ({ width: minCropBoxWidth, height: minCropBoxHeight } = getAdjustedSizes({
          aspectRatio,
          width: minCropBoxWidth,
          height: minCropBoxHeight,
        }));
        ({ width: maxCropBoxWidth, height: maxCropBoxHeight } = getAdjustedSizes({
          aspectRatio,
          width: maxCropBoxWidth,
          height: maxCropBoxHeight,
        }));
      }

      cropBoxData.minWidth = minCropBoxWidth;
      cropBoxData.minHeight = minCropBoxHeight;
      cropBoxData.maxWidth = maxCropBoxWidth;
      cropBoxData.maxHeight = maxCropBoxHeight;
    }

    if (positionLimited) {
      let minLeft = -Infinity;
      let minTop = -Infinity;
      let maxLeft = Infinity;
      let maxTop = Infinity;

      if (viewMode > 0) {
        minLeft = canvasLeft;
        minTop = canvasTop;
        maxLeft = (canvasLeft + canvasWidth) - cropBoxData.width;
        maxTop = (canvasTop + canvasHeight) - cropBoxData.height;
      }

      cropBoxData.minLeft = minLeft;
      cropBoxData.minTop = minTop;
      cropBoxData.maxLeft = maxLeft;
      cropBoxData.maxTop = maxTop;
    }
  },

  renderCropBox() {
    const {
      options,
      containerData,
      canvasData,
      cropBoxData,
    } = this;

    if (cropBoxData.width > cropBoxData.maxWidth
      || cropBoxData.width < cropBoxData.minWidth) {
      cropBoxData.left = cropBoxData.oldLeft;
    }

    if (cropBoxData.height > cropBoxData.maxHeight
      || cropBoxData.height < cropBoxData.minHeight) {
      cropBoxData.top = cropBoxData.oldTop;
    }

    cropBoxData.width = Math.min(
      Math.max(cropBoxData.width, cropBoxData.minWidth),
      cropBoxData.maxWidth,
    );
    cropBoxData.height = Math.min(
      Math.max(cropBoxData.height, cropBoxData.minHeight),
      cropBoxData.maxHeight,
    );

    this.limitCropBox(false, true);

    cropBoxData.left = Math.min(
      Math.max(cropBoxData.left, cropBoxData.minLeft),
      cropBoxData.maxLeft,
    );
    cropBoxData.top = Math.min(
      Math.max(cropBoxData.top, cropBoxData.minTop),
      cropBoxData.maxTop,
    );
    cropBoxData.oldLeft = cropBoxData.left;
    cropBoxData.oldTop = cropBoxData.top;

    cropBoxData.naturalWidth = cropBoxData.width / canvasData.scale;
    cropBoxData.naturalHeight = cropBoxData.height / canvasData.scale;

    if (options.movable && options.cropBoxMovable) {
      // Turn to move the canvas when the crop box is equal to the container
      setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width
        && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
    }

    setStyle(this.cropBox, assign({
      width: cropBoxData.width,
      height: cropBoxData.height,
    }, getTransforms({
      translateX: cropBoxData.left,
      translateY: cropBoxData.top,
    })));

    if (this.cropped && this.limited) {
      this.limitCanvas(true, true);
    }

    if (!this.disabled) {
      this.output();
    }
  },

  output() {
    this.preview();
    dispatchEvent(this.element, EVENT_CROP, this.getData());
  },
};
