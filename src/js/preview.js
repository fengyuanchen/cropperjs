  extend(prototype, {
    initPreview: function () {
      var preview = this.options.preview;
      var image = document.createElement('img');
      var crossOrigin = this.crossOrigin;
      var url = this.url;
      var previews;

      setCrossOrigin(image, crossOrigin);
      image.src = url;
      appendChild(this.viewBox, image);

      if (!preview) {
        return;
      }

      this.previews = previews = querySelectorAll(document, preview);
      each(previews, function (element) {
        var image = document.createElement('img');

        element.style.overflow = 'hidden';

        // Save the original size for recover
        setData(element, DATA_PREVIEW, {
          width: element.offsetWidth,
          height: element.offsetHeight,
          html: element.innerHTML
        });

        setCrossOrigin(image, crossOrigin);
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
        var style = element.style;

        style.width = data.width + 'px';
        style.height = data.height + 'px';
        style.overflow = 'visible';
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },

    preview: function () {
      var imageData = this.imageData;
      var canvasData = this.canvasData;
      var cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width;
      var cropBoxHeight = cropBoxData.height;
      var width = imageData.width;
      var height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;

      if (!this.isCropped || this.isDisabled) {
        return;
      }

      querySelector(this.viewBox, 'img').style.cssText = (
        'width:' + width + 'px;' +
        'height:' + height + 'px;' +
        'margin-left:' + -left + 'px;' +
        'margin-top:' + -top + 'px;' +
        'transform:' + getTransform(imageData) + ';'
      );

      each(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;
        var elementStyle = element.style;
        var imageStyle = querySelector(element, 'img').style;

        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }

        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }

        elementStyle.width = newWidth + 'px';
        elementStyle.height = newHeight + 'px';
        imageStyle.width = width * ratio + 'px';
        imageStyle.height = height * ratio + 'px';
        imageStyle.marginLeft = -left * ratio + 'px';
        imageStyle.marginTop = -top * ratio + 'px';
        imageStyle.transform = getTransform(imageData);
      });
    }
  });
