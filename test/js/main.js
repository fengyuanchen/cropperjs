window.Util = {
  isNumber: function (n) {
    return typeof n === 'number' && !isNaN(n);
  },
  isFunction: function (fn) {
    return typeof fn === 'function';
  },
  hasClass: function (element, className) {
    return element.classList.contains(className);
  },
  getByClass: function (element, className) {
    return element.getElementsByClassName ?
      element.getElementsByClassName(className) :
      element.querySelectorAll('.' + className);
  },
  createImage: function (attrs) {
    var container = document.createElement('div');
    var image = new Image();
    var attr;

    if (typeof attrs !== 'object') {
      attrs = {};
    }

    if (!attrs.src) {
      attrs.src = '../docs/images/picture.jpg';
    }

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        image[attr] = attrs[attr];
      }
    }

    container.className = 'container';
    container.appendChild(image);
    document.body.appendChild(container);

    return image;
  },
  dispatchEvent: function (element, type, data) {
    var event;

    if (element.dispatchEvent) {
      // Event and CustomEvent on IE9-11 are global objects, not constructors
      if (typeof Event === 'function' && typeof CustomEvent === 'function') {
        if (!data) {
          event = new Event(type, {
            bubbles: true,
            cancelable: true
          });
        } else {
          event = new CustomEvent(type, {
            detail: data,
            bubbles: true,
            cancelable: true
          });
        }
      } else if (!data) {
        event = document.createEvent('Event');
        event.initEvent(type, true, true);
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, data);
      }

      // IE9+
      return element.dispatchEvent(event);
    } else if (element.fireEvent) {
      // IE6-10 (native events only)
      return element.fireEvent('on' + type);
    }
  }
};
