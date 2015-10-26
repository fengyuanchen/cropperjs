window.onload = function () {

  'use strict';

  var Cropper = window.Cropper;
  var console = window.console || { log: function () {} };
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var actions = document.getElementById('actions');
  var dataX = document.getElementById('dataX');
  var dataY = document.getElementById('dataY');
  var dataHeight = document.getElementById('dataHeight');
  var dataWidth = document.getElementById('dataWidth');
  var dataRotate = document.getElementById('dataRotate');
  var dataScaleX = document.getElementById('dataScaleX');
  var dataScaleY = document.getElementById('dataScaleY');
  var options = {
        aspectRatio: 16 / 9,
        preview: '.img-preview',
        build: function () {
          console.log('build');
        },
        built: function () {
          console.log('built');
        },
        cropstart: function (data) {
          console.log('cropstart', data.action);
        },
        cropmove: function (data) {
          console.log('cropmove', data.action);
        },
        cropend: function (data) {
          console.log('cropend', data.action);
        },
        crop: function (data) {
          console.log('crop');
          dataX.value = Math.round(data.x);
          dataY.value = Math.round(data.y);
          dataHeight.value = Math.round(data.height);
          dataWidth.value = Math.round(data.width);
          dataRotate.value = data.rotate;
          dataScaleX.value = data.scaleX;
          dataScaleY.value = data.scaleY;
        },
        zoom: function (data) {
          console.log('zoom', data.ratio);
        }
      };
  var cropper = new Cropper(image, options);

  function preventDefault(e) {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }


  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // Buttons
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof download.download === 'undefined') {
    download.className += ' disabled';
  }


  // Methods
  actions.onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option'),
      secondOption: target.getAttribute('data-second-option')
    };

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {

            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.href = result.toDataURL();
            }
          }

          break;

        case 'destroy':
          cropper = null;
          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  };

  document.body.onkeydown = function (event) {
    var e = event || window.event;

    if (!cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.charCode || e.keyCode) {
      case 37:
        preventDefault(e);
        cropper.move(-1, 0);
        break;

      case 38:
        preventDefault(e);
        cropper.move(0, -1);
        break;

      case 39:
        preventDefault(e);
        cropper.move(1, 0);
        break;

      case 40:
        preventDefault(e);
        cropper.move(0, 1);
        break;
    }
  };


  // Import image
  var inputImage = document.getElementById('inputImage');
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          cropper.reset().replace(blobURL);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }


  // Options
  actions.querySelector('.docs-toggles').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropBoxData;
    var canvasData;
    var isCheckbox;
    var isRadio;

    if (!cropper) {
      return;
    }

    if (target.tagName.toLowerCase() === 'span') {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === 'label') {
      target = target.getElementsByTagName('input').item(0);
    }

    isCheckbox = target.type === 'checkbox';
    isRadio = target.type === 'radio';

    if (isCheckbox || isRadio) {
      if (isCheckbox) {
        options[target.value] = target.checked;
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();

        options.built = function () {
          console.log('built');
          cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        };
      } else {
        options[target.name] = parseInt(target.value, 10);
        options.built = function () {
          console.log('built');
        };
      }

      // Restart
      cropper.destroy();
      cropper = new Cropper(image, options);
    }
  };

};
