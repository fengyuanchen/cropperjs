import * as $ from './utilities';

export default {
  render() {
    const self = this;

    self.initContainer();
    self.initCanvas();
    self.initCropBox();

    self.renderCanvas();

    if (self.cropped) {
      self.renderCropBox();
    }
  },

  initContainer() {
    const self = this;
    const options = self.options;
    const element = self.element;
    const container = self.container;
    const cropper = self.cropper;
    const hidden = 'cropper-hidden';
    let containerData;

    $.addClass(cropper, hidden);
    $.removeClass(element, hidden);

    self.containerData = containerData = {
      width: Math.max(
        container.offsetWidth,
        Number(options.minContainerWidth) || 200
      ),
      height: Math.max(
        container.offsetHeight,
        Number(options.minContainerHeight) || 100
      ),
    };

    $.setStyle(cropper, {
      width: containerData.width,
      height: containerData.height,
    });

    $.addClass(element, hidden);
    $.removeClass(cropper, hidden);
  },

  // Canvas (image wrapper)
  initCanvas() {
    const self = this;
    const viewMode = self.options.viewMode;
    const containerData = self.containerData;
    const imageData = self.imageData;
    const rotated = Math.abs(imageData.rotate) % 180 === 90;
    const naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
    const naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
    const aspectRatio = naturalWidth / naturalHeight;
    let canvasWidth = containerData.width;
    let canvasHeight = containerData.height;

    if (containerData.height * aspectRatio > containerData.width) {
      if (viewMode === 3) {
        canvasWidth = containerData.height * aspectRatio;
      } else {
        canvasHeight = containerData.width / aspectRatio;
      }
    } else if (viewMode === 3) {
      canvasHeight = containerData.width / aspectRatio;
    } else {
      canvasWidth = containerData.height * aspectRatio;
    }

    const canvasData = {
      naturalWidth,
      naturalHeight,
      aspectRatio,
      width: canvasWidth,
      height: canvasHeight,
    };

    canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
    canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;

    self.canvasData = canvasData;
    self.limited = (viewMode === 1 || viewMode === 2);
    self.limitCanvas(true, true);
    self.initialImageData = $.extend({}, imageData);
    self.initialCanvasData = $.extend({}, canvasData);
  },

  limitCanvas(sizeLimited, positionLimited) {
    const self = this;
    const options = self.options;
    const viewMode = options.viewMode;
    const containerData = self.containerData;
    const canvasData = self.canvasData;
    const aspectRatio = canvasData.aspectRatio;
    const cropBoxData = self.cropBoxData;
    const cropped = self.cropped && cropBoxData;

    if (sizeLimited) {
      let minCanvasWidth = Number(options.minCanvasWidth) || 0;
      let minCanvasHeight = Number(options.minCanvasHeight) || 0;

      if (viewMode > 1) {
        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

        if (viewMode === 3) {
          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      } else if (viewMode > 0) {
        if (minCanvasWidth) {
          minCanvasWidth = Math.max(
            minCanvasWidth,
            cropped ? cropBoxData.width : 0
          );
        } else if (minCanvasHeight) {
          minCanvasHeight = Math.max(
            minCanvasHeight,
            cropped ? cropBoxData.height : 0
          );
        } else if (cropped) {
          minCanvasWidth = cropBoxData.width;
          minCanvasHeight = cropBoxData.height;

          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      }

      if (minCanvasWidth && minCanvasHeight) {
        if (minCanvasHeight * aspectRatio > minCanvasWidth) {
          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else {
          minCanvasWidth = minCanvasHeight * aspectRatio;
        }
      } else if (minCanvasWidth) {
        minCanvasHeight = minCanvasWidth / aspectRatio;
      } else if (minCanvasHeight) {
        minCanvasWidth = minCanvasHeight * aspectRatio;
      }

      canvasData.minWidth = minCanvasWidth;
      canvasData.minHeight = minCanvasHeight;
      canvasData.maxWidth = Infinity;
      canvasData.maxHeight = Infinity;
    }

    if (positionLimited) {
      if (viewMode) {
        const newCanvasLeft = containerData.width - canvasData.width;
        const newCanvasTop = containerData.height - canvasData.height;

        canvasData.minLeft = Math.min(0, newCanvasLeft);
        canvasData.minTop = Math.min(0, newCanvasTop);
        canvasData.maxLeft = Math.max(0, newCanvasLeft);
        canvasData.maxTop = Math.max(0, newCanvasTop);

        if (cropped && self.limited) {
          canvasData.minLeft = Math.min(
            cropBoxData.left,
            cropBoxData.left + (cropBoxData.width - canvasData.width)
          );
          canvasData.minTop = Math.min(
            cropBoxData.top,
            cropBoxData.top + (cropBoxData.height - canvasData.height)
          );
          canvasData.maxLeft = cropBoxData.left;
          canvasData.maxTop = cropBoxData.top;

          if (viewMode === 2) {
            if (canvasData.width >= containerData.width) {
              canvasData.minLeft = Math.min(0, newCanvasLeft);
              canvasData.maxLeft = Math.max(0, newCanvasLeft);
            }

            if (canvasData.height >= containerData.height) {
              canvasData.minTop = Math.min(0, newCanvasTop);
              canvasData.maxTop = Math.max(0, newCanvasTop);
            }
          }
        }
      } else {
        canvasData.minLeft = -canvasData.width;
        canvasData.minTop = -canvasData.height;
        canvasData.maxLeft = containerData.width;
        canvasData.maxTop = containerData.height;
      }
    }
  },

  renderCanvas(changed) {
    const self = this;
    const canvasData = self.canvasData;
    const imageData = self.imageData;
    const rotate = imageData.rotate;

    if (self.rotated) {
      self.rotated = false;

      // Computes rotated sizes with image sizes
      const rotatedData = $.getRotatedSizes({
        width: imageData.width,
        height: imageData.height,
        degree: rotate,
      });
      const aspectRatio = rotatedData.width / rotatedData.height;
      const isSquareImage = imageData.aspectRatio === 1;

      if (isSquareImage || aspectRatio !== canvasData.aspectRatio) {
        canvasData.left -= (rotatedData.width - canvasData.width) / 2;
        canvasData.top -= (rotatedData.height - canvasData.height) / 2;
        canvasData.width = rotatedData.width;
        canvasData.height = rotatedData.height;
        canvasData.aspectRatio = aspectRatio;
        canvasData.naturalWidth = imageData.naturalWidth;
        canvasData.naturalHeight = imageData.naturalHeight;

        // Computes rotated sizes with natural image sizes
        if ((isSquareImage && rotate % 90) || rotate % 180) {
          const rotatedData2 = $.getRotatedSizes({
            width: imageData.naturalWidth,
            height: imageData.naturalHeight,
            degree: rotate,
          });

          canvasData.naturalWidth = rotatedData2.width;
          canvasData.naturalHeight = rotatedData2.height;
        }

        self.limitCanvas(true, false);
      }
    }

    if (canvasData.width > canvasData.maxWidth ||
      canvasData.width < canvasData.minWidth) {
      canvasData.left = canvasData.oldLeft;
    }

    if (canvasData.height > canvasData.maxHeight ||
      canvasData.height < canvasData.minHeight) {
      canvasData.top = canvasData.oldTop;
    }

    canvasData.width = Math.min(
      Math.max(canvasData.width, canvasData.minWidth),
      canvasData.maxWidth
    );
    canvasData.height = Math.min(
      Math.max(canvasData.height, canvasData.minHeight),
      canvasData.maxHeight
    );

    self.limitCanvas(false, true);

    canvasData.oldLeft = canvasData.left = Math.min(
      Math.max(canvasData.left, canvasData.minLeft),
      canvasData.maxLeft
    );
    canvasData.oldTop = canvasData.top = Math.min(
      Math.max(canvasData.top, canvasData.minTop),
      canvasData.maxTop
    );

    $.setStyle(self.canvas, $.extend({
      width: canvasData.width,
      height: canvasData.height,
    }, $.getTransforms({
      translateX: canvasData.left,
      translateY: canvasData.top,
    })));

    self.renderImage();

    if (self.cropped && self.limited) {
      self.limitCropBox(true, true);
    }

    if (changed) {
      self.output();
    }
  },

  renderImage(changed) {
    const self = this;
    const canvasData = self.canvasData;
    const imageData = self.imageData;
    let newImageData;
    let reversedData;
    let reversedWidth;
    let reversedHeight;

    if (imageData.rotate) {
      reversedData = $.getRotatedSizes({
        width: canvasData.width,
        height: canvasData.height,
        degree: imageData.rotate,
        aspectRatio: imageData.aspectRatio,
      }, true);

      reversedWidth = reversedData.width;
      reversedHeight = reversedData.height;

      newImageData = {
        width: reversedWidth,
        height: reversedHeight,
        left: (canvasData.width - reversedWidth) / 2,
        top: (canvasData.height - reversedHeight) / 2,
      };
    }

    $.extend(imageData, newImageData || {
      width: canvasData.width,
      height: canvasData.height,
      left: 0,
      top: 0,
    });

    $.setStyle(self.image, $.extend({
      width: imageData.width,
      height: imageData.height,
    }, $.getTransforms($.extend({
      translateX: imageData.left,
      translateY: imageData.top,
    }, imageData))));

    if (changed) {
      self.output();
    }
  },

  initCropBox() {
    const self = this;
    const options = self.options;
    const aspectRatio = options.aspectRatio;
    const autoCropArea = Number(options.autoCropArea) || 0.8;
    const canvasData = self.canvasData;
    const cropBoxData = {
      width: canvasData.width,
      height: canvasData.height,
    };

    if (aspectRatio) {
      if (canvasData.height * aspectRatio > canvasData.width) {
        cropBoxData.height = cropBoxData.width / aspectRatio;
      } else {
        cropBoxData.width = cropBoxData.height * aspectRatio;
      }
    }

    self.cropBoxData = cropBoxData;
    self.limitCropBox(true, true);

    // Initialize auto crop area
    cropBoxData.width = Math.min(
      Math.max(cropBoxData.width, cropBoxData.minWidth),
      cropBoxData.maxWidth
    );
    cropBoxData.height = Math.min(
      Math.max(cropBoxData.height, cropBoxData.minHeight),
      cropBoxData.maxHeight
    );

    // The width/height of auto crop area must large than "minWidth/Height"
    cropBoxData.width = Math.max(
      cropBoxData.minWidth,
      cropBoxData.width * autoCropArea
    );
    cropBoxData.height = Math.max(
      cropBoxData.minHeight,
      cropBoxData.height * autoCropArea
    );
    cropBoxData.oldLeft = cropBoxData.left = (
      canvasData.left + ((canvasData.width - cropBoxData.width) / 2)
    );
    cropBoxData.oldTop = cropBoxData.top = (
      canvasData.top + ((canvasData.height - cropBoxData.height) / 2)
    );

    // Initialize pivot point
    if (options.pivot) {
      cropBoxData.pivotX = cropBoxData.left + (cropBoxData.width * 0.5);
      cropBoxData.pivotY = cropBoxData.top + (cropBoxData.height * 0.5);
    }

    self.initialCropBoxData = $.extend({}, cropBoxData);
  },

  limitCropBox(sizeLimited, positionLimited) {
    const self = this;
    const options = self.options;
    const aspectRatio = options.aspectRatio;
    const containerData = self.containerData;
    const canvasData = self.canvasData;
    const cropBoxData = self.cropBoxData;
    const limited = self.limited;

    if (sizeLimited) {
      let minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
      let minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
      let maxCropBoxWidth = Math.min(
        containerData.width,
        limited ? canvasData.width : containerData.width
      );
      let maxCropBoxHeight = Math.min(
        containerData.height,
        limited ? canvasData.height : containerData.height
      );

      // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
      minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
      minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);

      if (aspectRatio) {
        if (minCropBoxWidth && minCropBoxHeight) {
          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
        } else if (minCropBoxWidth) {
          minCropBoxHeight = minCropBoxWidth / aspectRatio;
        } else if (minCropBoxHeight) {
          minCropBoxWidth = minCropBoxHeight * aspectRatio;
        }

        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
        } else {
          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
        }
      }

      // The minWidth/Height must be less than maxWidth/Height
      cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
      cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
      cropBoxData.maxWidth = maxCropBoxWidth;
      cropBoxData.maxHeight = maxCropBoxHeight;
    }

    if (positionLimited) {
      if (limited) {
        cropBoxData.minLeft = Math.max(0, canvasData.left);
        cropBoxData.minTop = Math.max(0, canvasData.top);
        cropBoxData.maxLeft = Math.min(
          containerData.width,
          canvasData.left + canvasData.width
        ) - cropBoxData.width;
        cropBoxData.maxTop = Math.min(
          containerData.height,
          canvasData.top + canvasData.height
        ) - cropBoxData.height;
      } else {
        cropBoxData.minLeft = 0;
        cropBoxData.minTop = 0;
        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
        cropBoxData.maxTop = containerData.height - cropBoxData.height;
      }
    }
  },

  limitPivot() {
    const self = this;
    const cropBoxData = self.cropBoxData;
    const right = cropBoxData.left + cropBoxData.width;
    const bottom = cropBoxData.top + cropBoxData.height;

    cropBoxData.pivotX = Math.min(right, Math.max(cropBoxData.left, cropBoxData.pivotX));
    cropBoxData.pivotY = Math.min(bottom, Math.max(cropBoxData.top, cropBoxData.pivotY));
  },

  renderCropBox() {
    const self = this;
    const options = self.options;
    const containerData = self.containerData;
    const cropBoxData = self.cropBoxData;

    if (cropBoxData.width > cropBoxData.maxWidth ||
      cropBoxData.width < cropBoxData.minWidth) {
      cropBoxData.left = cropBoxData.oldLeft;
    }

    if (cropBoxData.height > cropBoxData.maxHeight ||
      cropBoxData.height < cropBoxData.minHeight) {
      cropBoxData.top = cropBoxData.oldTop;
    }

    cropBoxData.width = Math.min(
      Math.max(cropBoxData.width, cropBoxData.minWidth),
      cropBoxData.maxWidth
    );
    cropBoxData.height = Math.min(
      Math.max(cropBoxData.height, cropBoxData.minHeight),
      cropBoxData.maxHeight
    );

    self.limitCropBox(false, true);

    cropBoxData.oldLeft = cropBoxData.left = Math.min(
      Math.max(cropBoxData.left, cropBoxData.minLeft),
      cropBoxData.maxLeft
    );
    cropBoxData.oldTop = cropBoxData.top = Math.min(
      Math.max(cropBoxData.top, cropBoxData.minTop),
      cropBoxData.maxTop
    );

    if (options.movable && options.cropBoxMovable) {
      // Turn to move the canvas when the crop box is equal to the container
      $.setData(self.face, 'action', cropBoxData.width === containerData.width &&
        cropBoxData.height === containerData.height ? 'move' : 'all');
    }

    $.setStyle(self.cropBox, $.extend({
      width: cropBoxData.width,
      height: cropBoxData.height,
    }, $.getTransforms({
      translateX: cropBoxData.left,
      translateY: cropBoxData.top,
    })));

    if (self.cropped && self.limited) {
      self.limitCanvas(true, true);
    }

    if (options.pivot) {
      $.setStyle(self.pivot, {
        left: cropBoxData.pivotX - cropBoxData.left,
        top: cropBoxData.pivotY - cropBoxData.top
      });
    }

    if (!self.disabled) {
      self.output();
    }
  },

  output() {
    const self = this;

    self.preview();

    if (self.complete) {
      $.dispatchEvent(self.element, 'crop', self.getData());
    }
  },
};
