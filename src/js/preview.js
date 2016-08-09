import * as $ from './utilities';

const DATA_PREVIEW = 'preview';

export default {
  initPreview() {
    const self = this;
    const preview = self.options.preview;
    const image = $.createElement('img');
    const crossOrigin = self.crossOrigin;
    const url = crossOrigin ? self.crossOriginUrl : self.url;

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = url;
    $.appendChild(self.viewBox, image);
    self.image2 = image;

    if (!preview) {
      return;
    }

    const previews = document.querySelectorAll(preview);

    self.previews = previews;

    $.each(previews, (element) => {
      const img = $.createElement('img');

      // Save the original size for recover
      $.setData(element, DATA_PREVIEW, {
        width: element.offsetWidth,
        height: element.offsetHeight,
        html: element.innerHTML,
      });

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = url;

      /**
       * Override img element styles
       * Add `display:block` to avoid margin top issue
       * Add `height:auto` to override `height` attribute on IE8
       * (Occur only when margin-top <= -height)
       */

      img.style.cssText = (
        'display:block;' +
        'width:100%;' +
        'height:auto;' +
        'min-width:0!important;' +
        'min-height:0!important;' +
        'max-width:none!important;' +
        'max-height:none!important;' +
        'image-orientation:0deg!important;"'
      );

      $.empty(element);
      $.appendChild(element, img);
    });
  },

  resetPreview() {
    $.each(this.previews, (element) => {
      const data = $.getData(element, DATA_PREVIEW);

      $.setStyle(element, {
        width: data.width,
        height: data.height,
      });

      element.innerHTML = data.html;
      $.removeData(element, DATA_PREVIEW);
    });
  },

  preview() {
    const self = this;
    const imageData = self.imageData;
    const canvasData = self.canvasData;
    const cropBoxData = self.cropBoxData;
    const cropBoxWidth = cropBoxData.width;
    const cropBoxHeight = cropBoxData.height;
    const width = imageData.width;
    const height = imageData.height;
    const left = cropBoxData.left - canvasData.left - imageData.left;
    const top = cropBoxData.top - canvasData.top - imageData.top;
    const transform = $.getTransform(imageData);
    const transforms = {
      WebkitTransform: transform,
      msTransform: transform,
      transform,
    };

    if (!self.cropped || self.disabled) {
      return;
    }

    $.setStyle(self.image2, $.extend({
      width,
      height,
      marginLeft: -left,
      marginTop: -top,
    }, transforms));

    $.each(self.previews, (element) => {
      const data = $.getData(element, DATA_PREVIEW);
      const originalWidth = data.width;
      const originalHeight = data.height;
      let newWidth = originalWidth;
      let newHeight = originalHeight;
      let ratio = 1;

      if (cropBoxWidth) {
        ratio = originalWidth / cropBoxWidth;
        newHeight = cropBoxHeight * ratio;
      }

      if (cropBoxHeight && newHeight > originalHeight) {
        ratio = originalHeight / cropBoxHeight;
        newWidth = cropBoxWidth * ratio;
        newHeight = originalHeight;
      }

      $.setStyle(element, {
        width: newWidth,
        height: newHeight,
      });

      $.setStyle($.getByTag(element, 'img')[0], $.extend({
        width: width * ratio,
        height: height * ratio,
        marginLeft: -left * ratio,
        marginTop: -top * ratio,
      }, transforms));
    });
  },
};
