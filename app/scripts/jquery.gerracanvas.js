/*global $, window, jQuery */
/*jslint browser:true, devel:true */


(function($) {
  "use strict";

  $.GerraCanvas = function(el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this,
      AppCongif, frames = [],
      cl;

    // Access to jQuery and DOM versions of element
    /**
     * @property {$el}
     * jQuery Dom node attached to the slider inherits all jQuery public functions.
     */

    base.$el = $(el);
    base.el = el;
    base.playing = false;
    // Add a reverse reference to the DOM object
    base.$el.data("GerraCanvas", base);


    base.init = function() {
     window.AppConfig =  AppCongif = $.extend({}, $.GerraCanvas.defaultOptions, options);


      //Bind Events
      base.bindEvents();
    };

    base.bindEvents = function() {
      base.$el.on('click', function(e) {
        base.clicker(e);
      });

      base.$el.on('mousedown', function(){
        console.log('mousedown');
      });
    };

    base.clicker = function(e) {

    };



    base.init();
  };

  $.GerraCanvas.defaultOptions = {

  };

  $.fn.GerraCanvas = function(options) {
    return Object.create(new $.GerraCanvas(this, options));
  };

}(jQuery));

/**
 *
 * Object.create method for perform as a fallback if method not available.
 * The syntax just takes away the illusion that JavaScript uses Classical Inheritance.
 */
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    'use strict';

    function F() {}
    F.prototype = o;
    return new F();
  };
}