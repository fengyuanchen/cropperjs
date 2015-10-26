  extend(prototype, {
    init: function () {
      var element = this.element;
      var tagName = element.tagName.toLowerCase();
      var url;

      if (getData(element, NAMESPACE)) {
        return;
      }

      setData(element, NAMESPACE, this);

      if (tagName === 'img') {
        this.isImg = true;

        // Should use `fn.attr` here. e.g.: "img/picture.jpg"
        this.originalUrl = url = element.getAttribute('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // Should use `fn.prop` here. e.g.: "http://example.com/img/picture.jpg"
        url = element.src;
      } else if (tagName === 'canvas' && SUPPORT_CANVAS) {
        url = element.toDataURL();
      }

      this.load(url);
    },

    load: function (url) {
      var options = this.options;
      var element = this.element;
      var crossOrigin;
      var bustCacheUrl;
      var image;
      var start;
      var stop;

      if (!url) {
        return;
      }

      this.url = url;

      if (isFunction(options.build) && options.build.call(element) === false) {
        return;
      }

      if (options.checkImageOrigin && isCrossOriginURL(url)) {
        crossOrigin = element.crossOrigin;

        if (!crossOrigin) {
          crossOrigin = 'anonymous';
          bustCacheUrl = addTimestamp(url);
        }

        this.crossOrigin = crossOrigin;
      }

      image = document.createElement('img');
      setCrossOrigin(image, crossOrigin);
      image.src = bustCacheUrl || url;
      this.image = image;
      this._start = start = proxy(this.start, this);
      this._stop = stop = proxy(this.stop, this);

      if (this.isImg) {
        if (element.complete) {
          this.start();
        } else {
          addListener(element, EVENT_LOAD, start);
        }
      } else {
        addListener(image, EVENT_LOAD, start);
        addListener(image, EVENT_ERROR, stop);
        addClass(image, CLASS_HIDE);
        insertBefore(element, image);
      }
    },

    start: function (event) {
      var image = this.isImg ? this.element : this.image;

      if (event) {
        removeListener(image, EVENT_LOAD, this._start);
        removeListener(image, EVENT_ERROR, this._stop);
      }

      getImageSize(image, proxy(function (naturalWidth, naturalHeight) {
        this.imageData = {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        };

        this.isLoaded = true;
        this.build();
      }, this));
    },

    stop: function () {
      var image = this.image;

      removeListener(image, EVENT_LOAD, this._start);
      removeListener(image, EVENT_ERROR, this._stop);

      removeChild(image);
      this.image = null;
    }
  });
