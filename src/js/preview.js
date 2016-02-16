    initPreview: function () {
      var _this = this;
      var preview = _this.options.preview;
      var image = createElement('img');
      var crossOrigin = _this.crossOrigin;
      var url = crossOrigin ? _this.crossOriginUrl : _this.url;
      var previews;

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = url;
      appendChild(_this.viewBox, image);
      _this.image2 = image;

      if (!preview) {
        return;
      }

      _this.previews = previews = document.querySelectorAll(preview);

      each(previews, function (element) {
        var image = createElement('img');

        // Save the original size for recover
        setData(element, DATA_PREVIEW, {
          width: element.offsetWidth,
          height: element.offsetHeight,
          html: element.innerHTML
        });

        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }

        image.src = url;

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */

        image.style.cssText = (
          'display:block;' +
          'width:100%;' +
          'height:auto;' +
          'min-width:0!important;' +
          'min-height:0!important;' +
          'max-width:none!important;' +
          'max-height:none!important;' +
          'image-orientation:0deg!important;"'
        );

        empty(element);
        appendChild(element, image);
      });
    },

    resetPreview: function () {
      each(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);

        setStyle(element, {
          width: data.width,
          height: data.height
        });

        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },

    preview: function () {
      var _this = this;
      var imageData = _this.imageData;
      var canvasData = _this.canvasData;
      var cropBoxData = _this.cropBoxData;
      var cropBoxWidth = cropBoxData.width;
      var cropBoxHeight = cropBoxData.height;
      var width = imageData.width;
      var height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;
      var transform = getTransform(imageData);
      var transforms = {
            WebkitTransform: transform,
            msTransform: transform,
            transform: transform
          };

      if (!_this.cropped || _this.disabled) {
        return;
      }

      setStyle(_this.image2, extend({
        width: width,
        height: height,
        marginLeft: -left,
        marginTop: -top
      }, transforms));

      each(_this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;

        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }

        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }

        setStyle(element, {
          width: newWidth,
          height: newHeight
        });

        setStyle(getByTag(element, 'img')[0], extend({
          width: width * ratio,
          height: height * ratio,
          marginLeft: -left * ratio,
          marginTop: -top * ratio
        }, transforms));
      });
    },
