  extend(prototype, {
    initPreview: function () {
      var _this = this;
      var preview = _this.options.preview;
      var image = document.createElement('img');
      var crossOrigin = _this.crossOrigin;
      var url = crossOrigin ? _this.crossOriginUrl : _this.url;
      var previews;

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = url;
      appendChild(_this.viewBox, image);

      if (!preview) {
        return;
      }

      _this.previews = previews = querySelectorAll(document, preview);
      each(previews, function (element) {
        var image = document.createElement('img');

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
          'display:block;width:100%;height:auto;' +
          'min-width:0!important;min-height:0!important;' +
          'max-width:none!important;max-height:none!important;' +
          'image-orientation:0deg!important;"'
        );

        empty(element);
        appendChild(element, image);
      });
    },

    resetPreview: function () {
      each(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);

        element.style.width = data.width + 'px';
        element.style.height = data.height + 'px';
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

      if (!_this.cropped || _this.disabled) {
        return;
      }

      querySelector(_this.viewBox, 'img').style.cssText = (
        'width:' + width + 'px;' +
        'height:' + height + 'px;' +
        'margin-left:' + -left + 'px;' +
        'margin-top:' + -top + 'px;' +
        '-webkit-transform:' + transform + ';' +
        '-ms-transform:' + transform + ';' +
        'transform:' + transform + ';'
      );

      each(_this.previews, function (element) {
        var imageStyle = querySelector(element, 'img').style;
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

        element.style.width = newWidth + 'px';
        element.style.height = newHeight + 'px';
        imageStyle.width = width * ratio + 'px';
        imageStyle.height = height * ratio + 'px';
        imageStyle.marginLeft = -left * ratio + 'px';
        imageStyle.marginTop = -top * ratio + 'px';
        imageStyle.WebkitTransform = transform;
        imageStyle.msTransform = transform;
        imageStyle.transform = transform;
      });
    }
  });
