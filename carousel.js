+function($){
    'use strict'

    function Carousel(el,option){
        this.option = option || {};
        this.$el = $(el);
        var $el = this.$el;
        this.cardNum = $el.find(".carousel-card").length;
        this.location = 0;
        this.$btnNext = $el.find(".carousel-control_next");
        this.$btnPrev = $el.find(".carousel-control_prev");

        var cardNum = this.cardNum;
        var visualCardNum = this.getVisualCardNum();

        this.$btnPrev.addClass("disable");
        if (visualCardNum >= cardNum){
            this.$btnNext.addClass("disable");
            return;
        }

        this.$btnNext.on("click.carousel", $.proxy(this.next, this));
        this.$btnPrev.on("click.carousel", $.proxy(this.prev, this));
    }

    Carousel.prototype.getCardLeng = function(){
        var $card = this.$el.find(".carousel-card:first");
        if (this.option.vertical){
            return $card.outerHeight(true);
        }else{
            return $card.outerWidth(true);
        }
    }

    Carousel.prototype.getVisualLeng = function(){
        var $viewPort = this.$el.find(".carousel-viewport");
        if (this.option.vertical){
            return $viewPort.innerHeight();
        }else{
            return $viewPort.innerWidth();
        }
    }

    Carousel.prototype.getVisualCardNum = function(){
        var cardLength = this.getCardLeng();
        var visualLength = this.getVisualLeng();
        var visualCardNum = Math.ceil(visualLength / cardLength);
        return visualCardNum;
    }

    Carousel.prototype.move = function(relateLocation){
        var $el = this.$el;
        var $shelf = this.$el.find(".carousel-shelf");
        var cardLength = this.getCardLeng();
        var relateLength = cardLength * relateLocation;
        var duration = this.option.duration || 400;

        var e = $.Event("moved.carousel");

        if (this.option.vertical){
            $shelf.animate({top: "+=" + relateLength}, duration, function(){
                $el.trigger(e);
            });
        } else {
            $shelf.animate({left: "+=" + relateLength}, duration, function(){
                $el.trigger(e);
            });
        }
    }

    Carousel.prototype.next = function(){
        var location = this.location;
        var cardNum = this.cardNum;
        var visualCardNum = this.getVisualCardNum();
        var scrollableNum = cardNum - visualCardNum - location > 0 ? cardNum - visualCardNum - location : 0;
        var $btnNext = this.$btnNext;
        var $btnPrev = this.$btnPrev;
        var relateLocation = 1;

        if ($btnNext.is(".disable")) return;

        if (this.option.multi){
            if (scrollableNum > visualCardNum) {
                relateLocation = visualCardNum;
            } else {
                relateLocation = scrollableNum;
            }
        }

        this.move(-relateLocation);
        this.location = location + relateLocation;
        if (this.location === scrollableNum) $btnNext.addClass("disable");
        $btnPrev.removeClass("disable");
    }

    Carousel.prototype.prev = function(){
        var location = this.location;
        var $btnNext = this.$btnNext;
        var $btnPrev = this.$btnPrev;
        var visualCardNum = this.getVisualCardNum();
        var relateLocation = 1;

        if ($btnPrev.is(".disable")) return;
        
        if (this.option.multi) {
            if (location > visualCardNum) {
                relateLocation = visualCardNum;
            } else {
                relateLocation = location;
            }
        }
        this.move(relateLocation);
        this.location = location - relateLocation;
        if (this.location === 0) $btnPrev.addClass("disable");
        $btnNext.removeClass("disable");
    }

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