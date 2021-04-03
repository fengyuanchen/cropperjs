window.createImage = (attrs = {}) => {
  const container = document.createElement('div');
  const image = document.createElement('img');

  if (!attrs.src) {
    attrs.src = '/base/docs/images/picture.jpg';
  }

  Object.keys(attrs).forEach((attr) => {
    image[attr] = attrs[attr];
  });

  container.appendChild(image);
  document.body.appendChild(container);

  return image;
};

window.createEvent = (type, data) => {
  let event;

  if (typeof Event === 'function' && typeof CustomEvent === 'function') {
    if (typeof data === 'undefined') {
      event = new Event(type, {
        bubbles: true,
        cancelable: true,
      });
    } else {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true,
      });
    }
  } else if (typeof data === 'undefined') {
    event = document.createEvent('Event');
    event.initEvent(type, true, true);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  event.buttons = 1;

  return event;
};
