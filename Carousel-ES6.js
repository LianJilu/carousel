($ => {
    class Carousel {
        constructor (el, options = {}) {
            this.options = options
            this.$el = $(el)
            this.location = 0
            const $el = this.$el;
            this.cardNum = $el.find(".carousel-card").length
            this.$btnNext = $el.find(".carousel-control_next")
            this.$btnPrev = $el.find(".carousel-control_prev")

            const cardNum = this.cardNum
            const visualCardNum = this.getVisualCardNum()

            this.$btnPrev.addClass("disable")
            if (visualCardNum >= cardNum){
                this.$btnNext.addClass("disable")
                return
            }

            this.$btnNext.on("click.carousel", $.proxy(this.next, this));
            this.$btnPrev.on("click.carousel", $.proxy(this.prev, this));
        }

        getCardLeng() {
            const $card = this.$el.find(".carousel-card:first");
            if (this.option.vertical){
                return $card.outerHeight(true);
            }else{
                return $card.outerWidth(true);
            }
        }

        getVisualLeng () {
            const $viewPort = this.$el.find(".carousel-viewport");
            if (this.option.vertical){
                return $viewPort.innerHeight();
            }else{
                return $viewPort.innerWidth();
            }
        }

        getVisualCardNum() {
            const cardLength = this.getCardLeng();
            const visualLength = this.getVisualLeng();
            const visualCardNum = Math.ceil(visualLength / cardLength);
            return visualCardNum;
        }

        move() {
            const $el = this.$el;
            const $shelf = this.$el.find(".carousel-shelf");
            const cardLength = this.getCardLeng();
            const relateLength = cardLength * relateLocation;
            const duration = this.option.duration || 400;

            const e = $.Event("moved.carousel");

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

        next() {
            const location = this.location;
            const cardNum = this.cardNum;
            const visualCardNum = this.getVisualCardNum();
            const scrollableNum = cardNum - visualCardNum - location > 0 ? cardNum - visualCardNum - location : 0;
            const $btnNext = this.$btnNext;
            const $btnPrev = this.$btnPrev;
            let relateLocation = 1;

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

        prev() {
            const location = this.location;
            const $btnNext = this.$btnNext;
            const $btnPrev = this.$btnPrev;
            const visualCardNum = this.getVisualCardNum();
            let relateLocation = 1;

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
    }

    function Plugin(option){
        return this.each(function(){
            const $this = $(this);
            let data = $this.data("carousel");

            if (!data) $this.data("carousel",(data = new Carousel(this, option)));
        })
    }

    let old = $.fn.carousel;

    $.fn.carousel = Plugin;
    $.fn.carousel.Constructor = Carousel;

    $.fn.carousel.noConflict = function(){
        $.fn.carousel = old;
        return this;
    }

})(jQqury)