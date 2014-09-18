// Stick-Up
// =============
//
// Based off https://github.com/gcpantazis/sticky-stacky

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

    /**
     * Calculate new sticky header position
     */
    calculate: function() {

      var scrollTop = _ss.getScrollTop();
      var stickyHeight = 0;

      var len = _instances.length;
      for (var i = 0; i < len; i++) {
        var instance = _instances[i],
            instanceWrapRect = instance.wrapper.getBoundingClientRect(),
            elTop = instanceWrapRect.top + scrollTop;

        // Calculate next sticky element location on page
        var nextInstanceTop = i+1 >= len ? document.body.clientHeight :
                    _instances[i+1].wrapper.getBoundingClientRect().top + scrollTop;

        if (scrollTop > elTop && scrollTop < nextInstanceTop) {
          _ss.stickInstance(instance);
          stickyHeight = instanceWrapRect.height;
        } else if (scrollTop + stickyHeight > elTop && scrollTop < nextInstanceTop) {
          // Hover over fixed element with a higher z-index
          _ss.hoverInstance(instance);
        }
      }
    },

    hoverInstance: function(instance) {
      var elHeight = instance.wrapper.getBoundingClientRect().height;

      instance.wrapper.style.height = elHeight + 'px';
      instance.el.style.position = 'absolute';
    },

    stickInstance: function(instance) {
      var elHeight = instance.wrapper.getBoundingClientRect().height,
          elWidth = instance.wrapper.getBoundingClientRect().width;

      instance.wrapper.style.height = elHeight + 'px';
      instance.el.style.position = 'fixed';
      instance.el.style.top = 0;
      instance.el.style.width = elWidth + 'px';
    },

    unstickAll: function() {
      var len = _instances.length;
      for (var i = 0; i < len; i++) {
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

  var StickUpElement = function(element, options) {

    var self = this;

    self.el = element;
    self.options = options;

    self.init();

    _instances.push(self);
    _ss.unstickAll();
    _ss.calculate();

    return self;
  };

  StickUpElement.prototype = {

    constructor: StickUpElement,

    init: function() {

      var self = this;

      self.wrapStickyElement();

      return self;
    },

    /**
     * Add element into a wrapper div with a classname
     */
    wrapStickyElement: function() {

      var self = this;

      self.wrapper = document.createElement('div');

      self.wrapper.className = 'stick-up';

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

  window.addEventListener('touchmove', function() {
    _ss.unstickAll();
    _ss.calculate();
  });

  if (typeof define === 'function' && define.amd) {
    define(['stickUp'], function() {
      return {
        element: StickUpElement
      };
    });
  } else {
    window.StickUp = StickUpElement;
  }
})();
