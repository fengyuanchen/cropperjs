/*!
 * Cropper.js v@VERSION
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-@YEAR Fengyuan Chen
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ? factory(global, true) : function (window) {
      if (!window.document) {
        throw new Error('Cropper requires a window with a document');
      }

      return factory(window);
    };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  'use strict';
