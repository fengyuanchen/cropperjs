  extend(prototype, {
    init: function () {
      var _this = this;
      var element = _this.element;
      var tagName = element.tagName.toLowerCase();
      var url;

      if (getData(element, NAMESPACE)) {
        return;
      }

      setData(element, NAMESPACE, _this);

      if (tagName === 'img') {
        _this.isImg = true;

        // e.g.: "img/picture.jpg"
        _this.originalUrl = url = element.getAttribute('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // e.g.: "http://example.com/img/picture.jpg"
        url = element.src;
      } else if (tagName === 'canvas' && SUPPORT_CANVAS) {
        url = element.toDataURL();
      }

      _this.load(url);
    },

    load: function (url) {
      var _this = this;
      var options = _this.options;
      var xhr;

      if (!url) {
        return;
      }

      if (isFunction(options.build) && options.build.call(_this.element) === false) {
        return;
      }

      _this.url = url;
      _this.imageData = {};

      if (!options.checkOrientation || !window.ArrayBuffer) {
        return _this.clone();
      }

      xhr = new window.XMLHttpRequest();

      xhr.onerror = xhr.onabort = function () {
        _this.clone();
      };

      xhr.onload = function () {
        _this.read(this.response);
      };

      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    },

    read: function (arrayBuffer) {
      var _this = this;
      var options = _this.options;
      var orientation = getOrientation(arrayBuffer);
      var imageData = _this.imageData;
      var base64 = '';
      var rotate;
      var scaleX;
      var scaleY;

      if (orientation > 1) {
        each(new Uint8Array(arrayBuffer), function (code) {
          base64 += fromCharCode(code);
        });

        _this.url = 'data:image/jpeg;base64,' + btoa(base64);

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

      _this.clone();
    },

    clone: function () {
      var _this = this;
      var element = _this.element;
      var url = _this.url;
      var crossOrigin;
      var crossOriginUrl;
      var image;
      var start;
      var stop;

      if (_this.options.checkCrossOrigin && isCrossOriginURL(url)) {
        crossOrigin = element.crossOrigin;

        if (!crossOrigin) {
          crossOrigin = 'anonymous';

          // Add a timestamp to url for busting browser cache
          crossOriginUrl = addTimestamp(url);
        }
      }

      _this.crossOrigin = crossOrigin;
      _this.crossOriginUrl = crossOriginUrl;
      image = createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = crossOriginUrl || url;
      _this.image = image;
      _this._start = start = proxy(_this.start, _this);
      _this._stop = stop = proxy(_this.stop, _this);

      if (_this.isImg) {
        if (element.complete) {
          _this.start();
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
      var _this = this;
      var image = _this.isImg ? _this.element : _this.image;

      if (event) {
        removeListener(image, EVENT_LOAD, _this._start);
        removeListener(image, EVENT_ERROR, _this._stop);
      }

      getImageSize(image, function (naturalWidth, naturalHeight) {
        extend(_this.imageData, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        });

        _this.ready = true;
        _this.build();
      });
    },

    stop: function () {
      var _this = this;
      var image = _this.image;

      removeListener(image, EVENT_LOAD, _this._start);
      removeListener(image, EVENT_ERROR, _this._stop);

      removeChild(image);
      _this.image = null;
    }
  });
