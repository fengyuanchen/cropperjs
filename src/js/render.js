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
        width: max(
          container.offsetWidth,
          Number(options.minContainerWidth) || 200
        ),
        height: max(
          container.offsetHeight,
          Number(options.minContainerHeight) || 100
        )
      };

      setStyle(cropper, {
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
      var imageData = _this.imageData;
      var rotated = abs(imageData.rotate) === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;
      var canvasData;

      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else {
        if (viewMode === 3) {
          canvasHeight = containerData.width / aspectRatio;
        } else {
          canvasWidth = containerData.height * aspectRatio;
        }
      }

      canvasData = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: aspectRatio,
        width: canvasWidth,
        height: canvasHeight
      };

      canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
      canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;

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
      var canvasData = _this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      var cropBoxData = _this.cropBoxData;
      var cropped = _this.cropped && cropBoxData;
      var minCanvasWidth;
      var minCanvasHeight;
      var newCanvasLeft;
      var newCanvasTop;

      if (sizeLimited) {
        minCanvasWidth = Number(options.minCanvasWidth) || 0;
        minCanvasHeight = Number(options.minCanvasHeight) || 0;

        if (viewMode > 1) {
          minCanvasWidth = max(minCanvasWidth, containerData.width);
          minCanvasHeight = max(minCanvasHeight, containerData.height);

          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = max(
              minCanvasWidth,
              cropped ? cropBoxData.width : 0
            );
          } else if (minCanvasHeight) {
            minCanvasHeight = max(
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
          newCanvasLeft = containerData.width - canvasData.width;
          newCanvasTop = containerData.height - canvasData.height;

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
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = min(0, newCanvasLeft);
                canvasData.maxLeft = max(0, newCanvasLeft);
              }

              if (canvasData.height >= containerData.height) {
                canvasData.minTop = min(0, newCanvasTop);
                canvasData.maxTop = max(0, newCanvasTop);
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

    renderCanvas: function (changed) {
      var _this = this;
      var canvasData = _this.canvasData;
      var imageData = _this.imageData;
      var rotate = imageData.rotate;
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
          canvasData.naturalWidth = imageData.naturalWidth;
          canvasData.naturalHeight = imageData.naturalHeight;

          // Computes rotated sizes with natural image sizes
          if (rotate % 180) {
            rotatedData = getRotatedSizes({
              width: imageData.naturalWidth,
              height: imageData.naturalHeight,
              degree: rotate
            });

            canvasData.naturalWidth = rotatedData.width;
            canvasData.naturalHeight = rotatedData.height;
          }

          _this.limitCanvas(true, false);
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

      setStyle(_this.canvas, {
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
      var newImageData;
      var reversedData;
      var reversedWidth;
      var reversedHeight;
      var transform;

      if (imageData.rotate) {
        reversedData = getRotatedSizes({
          width: canvasData.width,
          height: canvasData.height,
          degree: imageData.rotate,
          aspectRatio: imageData.aspectRatio
        }, true);

        reversedWidth = reversedData.width;
        reversedHeight = reversedData.height;

        newImageData = {
          width: reversedWidth,
          height: reversedHeight,
          left: (canvasData.width - reversedWidth) / 2,
          top: (canvasData.height - reversedHeight) / 2
        };
      }

      extend(imageData, newImageData || {
        width: canvasData.width,
        height: canvasData.height,
        left: 0,
        top: 0
      });

      transform = getTransform(imageData);

      setStyle(_this.image, {
        width: imageData.width,
        height: imageData.height,
        marginLeft: imageData.left,
        marginTop: imageData.top,
        WebkitTransform: transform,
        msTransform: transform,
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
      var autoCropArea = Number(options.autoCropArea) || 0.8;
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
      cropBoxData.oldLeft = cropBoxData.left = (
        canvasData.left + (canvasData.width - cropBoxData.width) / 2
      );
      cropBoxData.oldTop = cropBoxData.top = (
        canvasData.top + (canvasData.height - cropBoxData.height) / 2
      );

      _this.initialCropBoxData = extend({}, cropBoxData);
    },

    limitCropBox: function (sizeLimited, positionLimited) {
      var _this = this;
      var options = _this.options;
      var aspectRatio = options.aspectRatio;
      var containerData = _this.containerData;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
      var limited = _this.limited;
      var minCropBoxWidth;
      var minCropBoxHeight;
      var maxCropBoxWidth;
      var maxCropBoxHeight;

      if (sizeLimited) {
        minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        minCropBoxHeight = Number(options.minCropBoxHeight) || 0;

        // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
        minCropBoxWidth = min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = min(minCropBoxHeight, containerData.height);
        maxCropBoxWidth = min(
          containerData.width,
          limited ? canvasData.width : containerData.width
        );
        maxCropBoxHeight = min(
          containerData.height,
          limited ? canvasData.height : containerData.height
        );

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
          cropBoxData.maxLeft = min(
            containerData.width,
            canvasData.left + canvasData.width
          ) - cropBoxData.width;
          cropBoxData.maxTop = min(
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

    renderCropBox: function () {
      var _this = this;
      var options = _this.options;
      var containerData = _this.containerData;
      var cropBoxData = _this.cropBoxData;

      if (cropBoxData.width > cropBoxData.maxWidth ||
        cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }

      if (cropBoxData.height > cropBoxData.maxHeight ||
        cropBoxData.height < cropBoxData.minHeight) {
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
        setData(_this.face, DATA_ACTION, cropBoxData.width === containerData.width &&
          cropBoxData.height === containerData.height ? ACTION_MOVE : ACTION_ALL);
      }

      setStyle(_this.cropBox, {
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

      _this.preview();

      if (_this.complete) {
        dispatchEvent(_this.element, EVENT_CROP, _this.getData());
      }
    },
