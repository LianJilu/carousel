
import Carousel from '../src/Carousel-ES6.js';

+function($){
    function Plugin(option){
        return this.each(function(){
            var $this = $(this);
            var data = $this.data("carousel");

            if (!data) $this.data("carousel",(data = new Carousel(this, option)));
        })
    }

    var old = $.fn.carousel;

    $.fn.carousel = Plugin;
    $.fn.carousel.Constructor = Carousel;

    $.fn.carousel.noConflict = function(){
        $.fn.carousel = old;
        return this;
    }
}(jQuery)
    

