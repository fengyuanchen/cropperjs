window.Util = {
  isNumber: function (n) {
    return typeof n === 'number' && !isNaN(n);
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
      attrs.src = '../assets/img/picture.jpg';
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
  dispatchEvent: function (element, type) {
    var event;

    if (element.dispatchEvent) {

      // Event on IE is a global object, not a constructor
      if (typeof Event === 'function') {
        event = new Event(type, {
          bubbles: true,
          cancelable: true
        });
      } else {
        event = document.createEvent('Event');
        event.initEvent(type, true, true);
      }

      // IE9+
      return element.dispatchEvent(event);
    } else if (element.fireEvent) {

      // IE6-10
      return element.fireEvent('on' + type);
    }
  }
};
