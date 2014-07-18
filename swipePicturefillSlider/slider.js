var Slider = (function() {
    'use strict';

    function Slider(slideId) {
        // enforces new
        if (!(this instanceof Slider)) {
            return new Slider(slideId);
        }
        
        this.el = document.getElementById(slideId);

        // Add necessary swipejs markup
        this.el.className += 'swipe';
        var wrapper = document.createElement('div');
        wrapper.className = 'swipe-wrap';
        this.el.appendChild(wrapper);
    }

    Slider.prototype.addImage = function(url) {
        var item = document.createElement('div');
        var pic = document.createElement('picture');
        var source = document.createElement('source');
        var fallback = document.createElement('img');

        source.setAttribute('srcset', url);
        source.setAttribute('media', '');
        fallback.setAttribute('srcset', url);
        fallback.setAttribute('alt', '');

        pic.appendChild(fallback)
        pic.appendChild(source);
        item.appendChild(pic);
        this.el.appendChild(item);
    };

    Slider.prototype.addImages = function(urls) {
        _(urls).forEach(function(url) {
            this.addImage(url);
        });
    }

    /* swipejs bindings */
    Slider.prototype.swipeInit = function(config) {
        config = {} || config;
        window.mySwipe = new Swipe(this.el, config);
    }
    Slider.prototype.prev = function() {
        this.el.prev();
    }
    Slider.prototype.next = function() {
        this.el.next();
    }
    Slider.prototype.getPos = function() {
        this.el.getPos();
    }
    Slider.prototype.getNumSlides = function() {
        this.el.getNumSlides();
    }
    Slider.prototype.slide = function(index, duration) {
        this.el.slide(index, duration);
    };

    /* helpers */
    function setAttributes(el, attrs) {
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                el.setAttribute(key, attrs.key);
            }
        }
    }

    return Slider;

}());