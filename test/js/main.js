(function () {

  'use strict';

  window.createCropperImage = function (attrs) {
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
  };

})();
