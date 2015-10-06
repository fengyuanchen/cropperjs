  extend(prototype, {
    render: function () {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();

      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    initContainer: function () {
      var options = this.options;
      var element = this.element;
      var container = this.container;
      var cropper = this.cropper;
      var containerData;

      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);

      this.containerData = containerData = {
        width: max(container.offsetWidth, num(options.minContainerWidth) || 200),
        height: max(container.offsetHeight, num(options.minContainerHeight) || 100)
      };

      cropper.style.cssText = (
        'width:' + containerData.width + 'px;' +
        'height:' + containerData.height + 'px'
      );

      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },

    // Canvas (image wrapper)
    initCanvas: function () {
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var imageData = this.imageData;
      var aspectRatio = imageData.aspectRatio;
      var canvasData = {
            aspectRatio: aspectRatio,
            width: containerWidth,
            height: containerHeight
          };

      if (containerHeight * aspectRatio > containerWidth) {
        canvasData.height = containerWidth / aspectRatio;
      } else {
        canvasData.width = containerHeight * aspectRatio;
      }

      canvasData.oldLeft = canvasData.left = (containerWidth - canvasData.width) / 2;
      canvasData.oldTop = canvasData.top = (containerHeight - canvasData.height) / 2;

      this.canvasData = canvasData;
      this.limitCanvas(true, true);
      this.initialImageData = extend({}, imageData);
      this.initialCanvasData = extend({}, canvasData);
    },

    limitCanvas: function (size, position) {
      var options = this.options;
      var strict = options.strict;
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      var cropBoxData = this.cropBoxData;
      var cropped = this.cropped && cropBoxData;
      var initialCanvasData = this.initialCanvasData || canvasData;
      var initialCanvasWidth = initialCanvasData.width;
      var initialCanvasHeight = initialCanvasData.height;
      var minCanvasWidth;
      var minCanvasHeight;

      if (size) {
        minCanvasWidth = num(options.minCanvasWidth) || 0;
        minCanvasHeight = num(options.minCanvasHeight) || 0;

        if (minCanvasWidth) {
          if (strict) {
            minCanvasWidth = max(
              cropped ? cropBoxData.width : initialCanvasWidth,
              minCanvasWidth
            );
          }

          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else if (minCanvasHeight) {
          if (strict) {
            minCanvasHeight = max(
              cropped ? cropBoxData.height : initialCanvasHeight,
              minCanvasHeight
            );
          }

          minCanvasWidth = minCanvasHeight * aspectRatio;
        } else if (strict) {
          if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;

            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          } else {
            minCanvasWidth = initialCanvasWidth;
            minCanvasHeight = initialCanvasHeight;
          }
        }

        extend(canvasData, {
          minWidth: minCanvasWidth,
          minHeight: minCanvasHeight,
          maxWidth: Infinity,
          maxHeight: Infinity
        });
      }

      if (position) {
        if (strict) {
          if (cropped) {
            canvasData.minLeft = min(
              cropBoxData.left,
              cropBoxData.left + cropBoxData.width - canvasData.width
            );
            canvasData.minTop = min(
              cropBoxData.top,
              cropBoxData.top + cropBoxData.height - canvasData.height
            );
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;
          } else {
            canvasData.minLeft = min(0, containerWidth - canvasData.width);
            canvasData.minTop = min(0, containerHeight - canvasData.height);
            canvasData.maxLeft = max(0, containerWidth - canvasData.width);
            canvasData.maxTop = max(0, containerHeight - canvasData.height);
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerWidth;
          canvasData.maxTop = containerHeight;
        }
      }
    },

    renderCanvas: function (changed) {
      var options = this.options;
      var canvasData = this.canvasData;
      var imageData = this.imageData;
      var aspectRatio;
      var rotated;

      if (this.rotated) {
        this.rotated = false;

        // Computes rotated sizes with image sizes
        rotated = getRotatedSizes({
          width: imageData.width,
          height: imageData.height,
          degree: imageData.rotate
        });

        aspectRatio = rotated.width / rotated.height;

        if (aspectRatio !== canvasData.aspectRatio) {
          canvasData.left -= (rotated.width - canvasData.width) / 2;
          canvasData.top -= (rotated.height - canvasData.height) / 2;
          canvasData.width = rotated.width;
          canvasData.height = rotated.height;
          canvasData.aspectRatio = aspectRatio;
          this.limitCanvas(true, false);
        }
      }

      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }

      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }

      canvasData.width = min(
        max(canvasData.width, canvasData.minWidth),
        canvasData.maxWidth
      );
      canvasData.height = min(
        max(canvasData.height, canvasData.minHeight),
        canvasData.maxHeight
      );

      this.limitCanvas(false, true);

      canvasData.oldLeft = canvasData.left = min(
        max(canvasData.left, canvasData.minLeft),
        canvasData.maxLeft
      );
      canvasData.oldTop = canvasData.top = min(
        max(canvasData.top, canvasData.minTop),
        canvasData.maxTop
      );

      this.canvas.style.cssText = (
        'width:' + canvasData.width + 'px;' +
        'height:' + canvasData.height + 'px;' +
        'left:' + canvasData.left + 'px;' +
        'top:' + canvasData.top + 'px;'
      );

      this.renderImage();

      if (this.cropped && options.strict) {
        this.limitCropBox(true, true);
      }

      if (changed) {
        this.output();
      }
    },

    renderImage: function (changed) {
      var canvasData = this.canvasData;
      var imageData = this.imageData;
      var reversed;

      if (imageData.rotate) {
        reversed = getRotatedSizes({
          width: canvasData.width,
          height: canvasData.height,
          degree: imageData.rotate,
          aspectRatio: imageData.aspectRatio
        }, true);
      }

      extend(imageData, reversed ? {
        width: reversed.width,
        height: reversed.height,
        left: (canvasData.width - reversed.width) / 2,
        top: (canvasData.height - reversed.height) / 2
      } : {
        width: canvasData.width,
        height: canvasData.height,
        left: 0,
        top: 0
      });

      this.image.style.cssText = (
        'width:' + imageData.width + 'px;' +
        'height:' + imageData.height + 'px;' +
        'margin-left:' + imageData.left + 'px;' +
        'margin-top:' + imageData.top + 'px;' +
        'transform:' + getTransform(imageData)
      );

      if (changed) {
        this.output();
      }
    },

    initCropBox: function () {
      var options = this.options;
      var aspectRatio = options.aspectRatio;
      var autoCropArea = num(options.autoCropArea) || 0.8;
      var canvasData = this.canvasData;
      var cropBoxData = {
            width: canvasData.width,
            height: canvasData.height
          };

      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }

      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBoxData.width = min(
        max(cropBoxData.width, cropBoxData.minWidth),
        cropBoxData.maxWidth
      );
      cropBoxData.height = min(
        max(cropBoxData.height, cropBoxData.minHeight),
        cropBoxData.maxHeight
      );

      // The width/height of auto crop area must large than "minWidth/Height"
      cropBoxData.width = max(
        cropBoxData.minWidth,
        cropBoxData.width * autoCropArea
      );
      cropBoxData.height = max(
        cropBoxData.minHeight,
        cropBoxData.height * autoCropArea
      );
      cropBoxData.oldLeft = cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.oldTop = cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;

      this.initialCropBoxData = extend({}, cropBoxData);
    },

    limitCropBox: function (size, position) {
      var options = this.options;
      var strict = options.strict;
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
      var aspectRatio = options.aspectRatio;
      var minCropBoxWidth;
      var minCropBoxHeight;
      var maxCropBoxWidth;
      var maxCropBoxHeight;

      if (size) {
        minCropBoxWidth = num(options.minCropBoxWidth) || 0;
        minCropBoxHeight = num(options.minCropBoxHeight) || 0;

        // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
        minCropBoxWidth = min(minCropBoxWidth, containerWidth);
        minCropBoxHeight = min(minCropBoxHeight, containerHeight);
        maxCropBoxWidth = min(containerWidth, strict ? canvas.width : containerWidth);
        maxCropBoxHeight = min(containerHeight, strict ? canvas.height : containerHeight);

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
        cropBoxData.minWidth = min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }

      if (position) {
        if (strict) {
          cropBoxData.minLeft = max(0, canvasData.left);
          cropBoxData.minTop = max(0, canvasData.top);
          cropBoxData.maxLeft = min(containerWidth, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = min(containerHeight, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerWidth - cropBoxData.width;
          cropBoxData.maxTop = containerHeight - cropBoxData.height;
        }
      }
    },

    renderCropBox: function () {
      var options = this.options;
      var containerData = this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var cropBoxData = this.cropBoxData;

      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }

      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }

      cropBoxData.width = min(
        max(cropBoxData.width, cropBoxData.minWidth),
        cropBoxData.maxWidth
      );
      cropBoxData.height = min(
        max(cropBoxData.height, cropBoxData.minHeight),
        cropBoxData.maxHeight
      );

      this.limitCropBox(false, true);

      cropBoxData.oldLeft = cropBoxData.left = min(
        max(cropBoxData.left, cropBoxData.minLeft),
        cropBoxData.maxLeft
      );
      cropBoxData.oldTop = cropBoxData.top = min(
        max(cropBoxData.top, cropBoxData.minTop),
        cropBoxData.maxTop
      );

      if (options.movable && options.cropBoxDataMovable) {

        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, (cropBoxData.width === containerWidth && cropBoxData.height === containerHeight) ? ACTION_MOVE : ACTION_ALL);
      }

      this.cropBox.style.cssText = (
        'width:' + cropBoxData.width + 'px;' +
        'height:' + cropBoxData.height + 'px;' +
        'left:' + cropBoxData.left + 'px;' +
        'top:' + cropBoxData.top + 'px;'
      );

      if (this.cropped && options.strict) {
        this.limitCanvas(true, true);
      }

      if (!this.disabled) {
        this.output();
      }
    },

    output: function () {
      var options = this.options;

      this.preview();

      if (this.complete && isFunction(options.crop)) {
        options.crop.call(this.element, this.getData());
      }
    }
  });
