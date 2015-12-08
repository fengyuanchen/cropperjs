  extend(prototype, {
    render: function () {
      var _this = this;

      _this.initContainer();
      _this.initCanvas();
      _this.initCropBox();

      _this.renderCanvas();

      if (_this.cropped) {
        _this.renderCropBox();
      }
    },

    initContainer: function () {
      var _this = this;
      var options = _this.options;
      var element = _this.element;
      var container = _this.container;
      var cropper = _this.cropper;
      var containerData;

      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);

      _this.containerData = containerData = {
        width: max(container.offsetWidth, num(options.minContainerWidth) || 200),
        height: max(container.offsetHeight, num(options.minContainerHeight) || 100)
      };

      addStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });

      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },

    // Canvas (image wrapper)
    initCanvas: function () {
      var _this = this;
      var viewMode = _this.options.viewMode;
      var containerData = _this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var imageData = _this.imageData;
      var imageNaturalWidth = imageData.naturalWidth;
      var imageNaturalHeight = imageData.naturalHeight;
      var is90Degree = abs(imageData.rotate) === 90;
      var naturalWidth = is90Degree ? imageNaturalHeight : imageNaturalWidth;
      var naturalHeight = is90Degree ? imageNaturalWidth : imageNaturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerWidth;
      var canvasHeight = containerHeight;
      var canvasData;

      if (containerHeight * aspectRatio > containerWidth) {
        if (viewMode === 3) {
          canvasWidth = containerHeight * aspectRatio;
        } else {
          canvasHeight = containerWidth / aspectRatio;
        }
      } else {
        if (viewMode === 3) {
          canvasHeight = containerWidth / aspectRatio;
        } else {
          canvasWidth = containerHeight * aspectRatio;
        }
      }

      canvasData = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: aspectRatio,
        width: canvasWidth,
        height: canvasHeight
      };

      canvasData.oldLeft = canvasData.left = (containerWidth - canvasWidth) / 2;
      canvasData.oldTop = canvasData.top = (containerHeight - canvasHeight) / 2;

      _this.canvasData = canvasData;
      _this.limited = (viewMode === 1 || viewMode === 2);
      _this.limitCanvas(true, true);
      _this.initialImageData = extend({}, imageData);
      _this.initialCanvasData = extend({}, canvasData);
    },

    limitCanvas: function (sizeLimited, positionLimited) {
      var _this = this;
      var options = _this.options;
      var viewMode = options.viewMode;
      var containerData = _this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var canvasData = _this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      var cropBoxData = _this.cropBoxData;
      var cropped = _this.cropped && cropBoxData;
      var minCanvasWidth;
      var minCanvasHeight;
      var newCanvasLeft;
      var newCanvasTop;

      if (sizeLimited) {
        minCanvasWidth = num(options.minCanvasWidth) || 0;
        minCanvasHeight = num(options.minCanvasHeight) || 0;

        if (viewMode) {
          if (viewMode > 1) {
            minCanvasWidth = max(minCanvasWidth, containerWidth);
            minCanvasHeight = max(minCanvasHeight, containerHeight);

            if (viewMode === 3) {
              if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                minCanvasWidth = minCanvasHeight * aspectRatio;
              } else {
                minCanvasHeight = minCanvasWidth / aspectRatio;
              }
            }
          } else {
            if (minCanvasWidth) {
              minCanvasWidth = max(minCanvasWidth, cropped ? cropBoxData.width : 0);
            } else if (minCanvasHeight) {
              minCanvasHeight = max(minCanvasHeight, cropped ? cropBoxData.height : 0);
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
          newCanvasLeft = containerWidth - canvasData.width;
          newCanvasTop = containerHeight - canvasData.height;

          canvasData.minLeft = min(0, newCanvasLeft);
          canvasData.minTop = min(0, newCanvasTop);
          canvasData.maxLeft = max(0, newCanvasLeft);
          canvasData.maxTop = max(0, newCanvasTop);

          if (cropped && _this.limited) {
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

            if (viewMode === 2) {
              if (canvasData.width >= containerWidth) {
                canvasData.minLeft = min(0, newCanvasLeft);
                canvasData.maxLeft = max(0, newCanvasLeft);
              }

              if (canvasData.height >= containerHeight) {
                canvasData.minTop = min(0, newCanvasTop);
                canvasData.maxTop = max(0, newCanvasTop);
              }
            }
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
      var _this = this;
      var canvasData = _this.canvasData;
      var imageData = _this.imageData;
      var rotate = imageData.rotate;
      var naturalWidth = imageData.naturalWidth;
      var naturalHeight = imageData.naturalHeight;
      var aspectRatio;
      var rotatedData;

      if (_this.rotated) {
        _this.rotated = false;

        // Computes rotated sizes with image sizes
        rotatedData = getRotatedSizes({
          width: imageData.width,
          height: imageData.height,
          degree: rotate
        });

        aspectRatio = rotatedData.width / rotatedData.height;

        if (aspectRatio !== canvasData.aspectRatio) {
          canvasData.left -= (rotatedData.width - canvasData.width) / 2;
          canvasData.top -= (rotatedData.height - canvasData.height) / 2;
          canvasData.width = rotatedData.width;
          canvasData.height = rotatedData.height;
          canvasData.aspectRatio = aspectRatio;
          canvasData.naturalWidth = naturalWidth;
          canvasData.naturalHeight = naturalHeight;

          // Computes rotated sizes with natural image sizes
          if (rotate % 180) {
            rotatedData = getRotatedSizes({
              width: naturalWidth,
              height: naturalHeight,
              degree: rotate
            });

            canvasData.naturalWidth = rotatedData.width;
            canvasData.naturalHeight = rotatedData.height;
          }

          _this.limitCanvas(true, false);
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

      _this.limitCanvas(false, true);

      canvasData.oldLeft = canvasData.left = min(
        max(canvasData.left, canvasData.minLeft),
        canvasData.maxLeft
      );
      canvasData.oldTop = canvasData.top = min(
        max(canvasData.top, canvasData.minTop),
        canvasData.maxTop
      );

      addStyle(_this.canvas, {
        width: canvasData.width,
        height: canvasData.height,
        left: canvasData.left,
        top: canvasData.top
      });

      _this.renderImage();

      if (_this.cropped && _this.limited) {
        _this.limitCropBox(true, true);
      }

      if (changed) {
        _this.output();
      }
    },

    renderImage: function (changed) {
      var _this = this;
      var canvasData = _this.canvasData;
      var imageData = _this.imageData;
      var reversedData;
      var transform;

      if (imageData.rotate) {
        reversedData = getRotatedSizes({
          width: canvasData.width,
          height: canvasData.height,
          degree: imageData.rotate,
          aspectRatio: imageData.aspectRatio
        }, true);
      }

      extend(imageData, reversedData ? {
        width: reversedData.width,
        height: reversedData.height,
        left: (canvasData.width - reversedData.width) / 2,
        top: (canvasData.height - reversedData.height) / 2
      } : {
        width: canvasData.width,
        height: canvasData.height,
        left: 0,
        top: 0
      });

      transform = getTransform(imageData);

      addStyle(_this.image, {
        width: imageData.width,
        height: imageData.height,
        marginLeft: imageData.left,
        marginTop: imageData.top,
        transform: transform
      });

      if (changed) {
        _this.output();
      }
    },

    initCropBox: function () {
      var _this = this;
      var options = _this.options;
      var aspectRatio = options.aspectRatio;
      var autoCropArea = num(options.autoCropArea) || 0.8;
      var canvasData = _this.canvasData;
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

      _this.cropBoxData = cropBoxData;
      _this.limitCropBox(true, true);

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

      _this.initialCropBoxData = extend({}, cropBoxData);
    },

    limitCropBox: function (sizeLimited, positionLimited) {
      var _this = this;
      var options = _this.options;
      var aspectRatio = options.aspectRatio;
      var containerData = _this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
      var limited = _this.limited;
      var minCropBoxWidth;
      var minCropBoxHeight;
      var maxCropBoxWidth;
      var maxCropBoxHeight;

      if (sizeLimited) {
        minCropBoxWidth = num(options.minCropBoxWidth) || 0;
        minCropBoxHeight = num(options.minCropBoxHeight) || 0;

        // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
        minCropBoxWidth = min(minCropBoxWidth, containerWidth);
        minCropBoxHeight = min(minCropBoxHeight, containerHeight);
        maxCropBoxWidth = min(containerWidth, limited ? canvasData.width : containerWidth);
        maxCropBoxHeight = min(containerHeight, limited ? canvasData.height : containerHeight);

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

      if (positionLimited) {
        if (limited) {
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
      var _this = this;
      var options = _this.options;
      var containerData = _this.containerData;
      var containerWidth = containerData.width;
      var containerHeight = containerData.height;
      var cropBoxData = _this.cropBoxData;

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

      _this.limitCropBox(false, true);

      cropBoxData.oldLeft = cropBoxData.left = min(
        max(cropBoxData.left, cropBoxData.minLeft),
        cropBoxData.maxLeft
      );
      cropBoxData.oldTop = cropBoxData.top = min(
        max(cropBoxData.top, cropBoxData.minTop),
        cropBoxData.maxTop
      );

      if (options.movable && options.cropBoxMovable) {

        // Turn to move the canvas when the crop box is equal to the container
        setData(_this.face, DATA_ACTION, (cropBoxData.width === containerWidth && cropBoxData.height === containerHeight) ? ACTION_MOVE : ACTION_ALL);
      }

      addStyle(_this.cropBox, {
        width: cropBoxData.width,
        height: cropBoxData.height,
        left: cropBoxData.left,
        top: cropBoxData.top
      });

      if (_this.cropped && _this.limited) {
        _this.limitCanvas(true, true);
      }

      if (!_this.disabled) {
        _this.output();
      }
    },

    output: function () {
      var _this = this;
      var options = _this.options;

      _this.preview();

      if (_this.complete && isFunction(options.crop)) {
        options.crop.call(_this.element, _this.getData());
      }
    }
  });
