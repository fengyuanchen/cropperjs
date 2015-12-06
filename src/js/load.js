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

        // e.g.: "img/picture.jpg"
        this.originalUrl = url = element.getAttribute('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // e.g.: "http://example.com/img/picture.jpg"
        url = element.src;
      } else if (tagName === 'canvas' && SUPPORT_CANVAS) {
        url = element.toDataURL();
      }

      this.load(url);
    },

    load: function (url) {
      var read;
      var xhr;

      if (!url) {
        return;
      }

      this.url = url;
      this.imageData = {};

      if (!this.options.checkOrientation || !ArrayBuffer) {
        return this.clone();
      }

      read = proxy(this.read, this);
      xhr = new XMLHttpRequest();

      xhr.onload = function () {
        read(this.response);
      };

      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    },

    read: function (arrayBuffer) {
      var options = this.options;
      var orientation = getOrientation(arrayBuffer);
      var imageData = this.imageData;
      var base64 = '';
      var rotate;
      var scaleX;
      var scaleY;

      if (orientation) {
        each(new Uint8Array(arrayBuffer), function (code) {
          base64 += fromCharCode(code);
        });

        this.url = 'data:image/jpeg;base64,' + btoa(base64);

        switch (orientation) {

          // flip horizontal
          case 2:
            scaleX = -1;
            break;

          // rotate left 180°
          case 3:
            rotate = -180;
            break;

          // flip vertical
          case 4:
            scaleY = -1;
            break;

          // flip vertical + rotate right 90°
          case 5:
            rotate = 90;
            scaleY = -1;
            break;

          // rotate right 90°
          case 6:
            rotate = 90;
            break;

          // flip horizontal + rotate right 90°
          case 7:
            rotate = 90;
            scaleX = -1;
            break;

          // rotate left 90°
          case 8:
            rotate = -90;
            break;
        }
      }

      if (options.rotatable) {
        imageData.rotate = rotate;
      }

      if (options.scalable) {
        imageData.scaleX = scaleX;
        imageData.scaleY = scaleY;
      }

      this.clone();
    },

    clone: function () {
      var options = this.options;
      var element = this.element;
      var url = this.url;
      var crossOrigin;
      var crossOriginUrl;
      var image;
      var start;
      var stop;

      if (isFunction(options.build) && options.build.call(element) === false) {
        return;
      }

      if (options.checkCrossOrigin && isCrossOriginURL(url)) {
        crossOrigin = element.crossOrigin;

        if (!crossOrigin) {
          crossOrigin = 'anonymous';

          // Add a timestamp to url for busting browser cache
          crossOriginUrl = addTimestamp(url);
        }
      }

      this.crossOrigin = crossOrigin;
      this.crossOriginUrl = crossOriginUrl;
      image = document.createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = crossOriginUrl || url;
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
        extend(this.imageData, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        });

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
