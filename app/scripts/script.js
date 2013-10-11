/*global $, window, CanvasLoader, jQuery */
/*jslint browser:true, devel:true */

var GC = {
  offset: {},
  mip: {},
  mouseDown: false,
  mouseDownStart: {},
  mouseUpEnd: {}
};

$(function() {
  'use strict';

 // e-egg.
  jQuery(document).on('wheel mousewheel keydown', function (e, delta) {
      var newval,
          num = $('#gerraCanvas').css('zoom');
          console.log('num:', num);
      delta = delta || e.originalEvent.deltaY * -1 || e.originalEvent.wheelDelta;

      if (delta > 0 || e.which == 38) {
          newval = parseFloat(num) + (e.shiftKey ? 0.5 : 0.1);
      } else if (delta < 0 || e.which == 40) {
          newval = parseFloat(num) - (e.shiftKey ? 0.5 : 0.1);
      } else {
          return true;
      }


      console.log('->>', delta, newval);
      $('#gerraCanvas').css('zoom', newval)
      e.preventDefault();
  });



  $('#gerraViewPort').dragscrollable({
    dragSelector: '#gerraCanvas',
    acceptPropagatedEvent: false
  });

  //GC = $('#gerraViewPort').GerraCanvas();

  GC.offset = $('#gerraViewPort').offset();

  $(document).on('mousedown', '#gerraViewPort', function() {
    GC.mouseDown = true;
    GC.mouseDownStart = $.extend({}, GC.mip.pageCoords);
  });

  $('#gerraViewPort').mouseup(function() {
    GC.mouseDown = false;
    GC.mouseUpEnd = $.extend({}, GC.mip.pageCoords);
    console.log(GC.mouseDownStart.x - GC.mouseUpEnd.x, GC.mouseDownStart.y - GC.mouseUpEnd.y)
  });


  $('#gerraViewPort').on('mousewheel', function(e) {
    var zoom = e.originalEvent.wheelDelta / 120;
    var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));
    console.log(zoom, delta);

  });

  $('#gerraViewPort').mousemove(function(e) {

    GC.mip = {
      pageCoords: {
        x: e.pageX - GC.offset.left,
        y: e.pageY - GC.offset.top
      },
      clientCoords: {
        x: e.clientX,
        y: e.clientY
      }
    };

    var pageCoords = "( " + GC.mip.pageCoords.x + ", " + GC.mip.pageCoords.y + " )";
    var clientCoords = "( " + GC.mip.clientCoords.x + ", " + GC.mip.clientCoords.y + " )";

    $(".first").text("( e.pageX, e.pageY ) - " + pageCoords);
    $(".last").text("( e.clientX, e.clientY ) - " + clientCoords);
    console.log(GC.mouseDown);
  });


  $('.move').on('click', function(e) {
    e.preventDefault();
    var canvas = $('#gerraCanvas');
    canvas.css('top', '+=-99px');
    canvas.css('left', '-1002px');
  });

});