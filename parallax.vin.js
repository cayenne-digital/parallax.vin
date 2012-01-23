/**
 * Plugin: Parallax Vin
 * Version 1.0
 * Author: Vincenzo Acinapura
 * Inspired By: Ian Lunn
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {
  
  $.fn.parallax = function() {
    
    var collection   = this,
        $window      = $(window),
        windowHeight = $window.height();

    function inView(scrollTop, elements) {
      elements.each(function() {
        var el     = $(this),
            top    = el.offset().top,
            height = (!!el.attr('data-outer-height')) ? el.outerHeight(true) : el.height();

        if (
          /* above & in view */ ((top + height) >= scrollTop && (top + height - windowHeight) < scrollTop) ||
          /* full view */       (top <= scrollTop && (top + height) >= scrollTop && (top - windowHeight) < scrollTop && (top + height - windowHeight) > scrollTop) ||
          /* below & in view */ ((top + height) > scrollTop && (top - windowHeight) < scrollTop && top > scrollTop)
        ) {
          move(el, scrollTop, height);
        }

      });
    }
    
    function newPos(xpos, windowHeight, scrollTop, adjuster, inertia, moveSelf) {
      ypos = Math.round((-((windowHeight + scrollTop) - adjuster) * inertia)) + "px";
      return (moveSelf) ? ypos : xpos + " " + ypos;
    }
    
    function move(el, scrollTop, height) {
      var xpos        = el.attr('data-xpos') || "50%",
          adjuster    = el.attr('data-adjuster') || 0,
          inertia     = el.attr('data-inertia') || 0.1,
          outerHeight = el.attr('data-outer-height') || false,
          moveSelf    = el.attr('data-move-self') || false,
          height      = el.height(),
          ypos        = newPos(xpos, height, scrollTop, adjuster, inertia, moveSelf);
      
      if (moveSelf) {
        el.css({ position: 'relative', 'top': ypos });
      } else {
        el.css({ 'backgroundPosition': ypos });
      }
    }
    
    $window.bind('scroll', function() { inView($window.scrollTop(), collection); }).scroll();
    
    return this;
  }
  
})(jQuery);
