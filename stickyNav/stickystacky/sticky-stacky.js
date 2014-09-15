// Sticky-Stacky
// =============
//
// * **Version:** 0.0.3
// * **Author:** George Pantazis

'use strict';

(function() {

  var _instances = [];

  var _ss = {

    // Polyfill for `window.pageYOffset`
    // See: https://developer.mozilla.org/en-US/docs/Web/API/window.scrollY

    getScrollTop: function() {

      var fallbackReferenceObject = document.documentElement || document.body.parentNode || document.body;

      return (window.pageYOffset !== undefined) ? window.pageYOffset : fallbackReferenceObject.scrollTop;
    },

    calculate: function() {

      var stickyHeight = 0,
        scrollTop = _ss.getScrollTop();

      for (var i in _instances) {
        var instance = _instances[i],
          instanceStyle = instance.el.style,
          insteadWrapRect = instance.wrapper.getBoundingClientRect(),
          elTop = insteadWrapRect.top - document.documentElement.getBoundingClientRect().top,
          elHeight = insteadWrapRect.height,
          elWidth = insteadWrapRect.width;

        if (scrollTop + stickyHeight > elTop) {
          instance.wrapper.style.height = elHeight + 'px';
          instanceStyle.position = 'fixed';
          instanceStyle.top = stickyHeight + 'px';
          instanceStyle.width = elWidth + 'px';
          stickyHeight += elHeight;
        }
      }
    },

    unstickAll: function() {
      for (var i in _instances) {
        _ss.unstickInstance(_instances[i]);
      }
    },

    unstickInstance: function(instance) {
      instance.wrapper.style.height = '';
      instance.el.style.position = '';
      instance.el.style.top = '';
      instance.el.style.width = '';
    }
  };

  var StickyStackyElement = function(element, options) {

    var self = this;

    self.el = element;
    self.options = options;

    self.init();

    _instances.push(self);
    _ss.unstickAll();
    _ss.calculate();

    return self;
  };

  StickyStackyElement.prototype = {

    constructor: StickyStackyElement,

    init: function() {

      var self = this;

      self.wrapStickyElement();

      return self;
    },

    wrapStickyElement: function() {

      var self = this;

      self.wrapper = document.createElement('div');

      self.wrapper.className = 'sticky-stacky';

      if (self.el.nextSibling) {
        self.el.parentNode.insertBefore(self.wrapper, self.el.nextSibling);
      } else {
        self.el.parentNode.appendChild(self.wrapper);
      }

      self.wrapper.appendChild(self.el);

      return self;
    }
  };

  window.addEventListener('resize', function() {
    _ss.unstickAll();
    _ss.calculate();
  });

  window.addEventListener('scroll', function() {
    _ss.unstickAll();
    _ss.calculate();
  });

  if (typeof define === 'function' && define.amd) {
    define(['stickyStacky'], function() {
      return {
        element: StickyStackyElement
      };
    });
  } else {
    window.StickyStacky = StickyStackyElement;
  }
})();