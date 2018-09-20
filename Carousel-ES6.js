
class Carousel {
    constructor (el, options = {}) {
        this.options = options
        this.el = el
        this.location = 0
        const $el = this.el;
        this.cardNum = $el.querySelectorAll(".carousel-card").length
        this.btnNext = $el.querySelector(".carousel-control_next")
        this.btnPrev = $el.querySelector(".carousel-control_prev")

        const cardNum = this.cardNum
        const visualCardNum = this.getVisualCardNum()

        this.btnPrev.classList.add("disable")
        if (visualCardNum >= cardNum){
            this.btnNext.classList.add("disable")
            return
        }

        this.btnNext.on("click.carousel", $.proxy(this.next, this));
        this.btnPrev.on("click.carousel", $.proxy(this.prev, this));
    }

    getCardLeng() {
        const $card = this.$el.find(".carousel-card:first");
        if (this.options.vertical){
            return $card.outerHeight(true);
        }else{
            return $card.outerWidth(true);
        }
    }

    getVisualLeng () {
        const $viewPort = this.$el.find(".carousel-viewport");
        if (this.options.vertical){
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

    move(relateLocation) {
        const $el = this.$el;
        const $shelf = this.$el.find(".carousel-shelf");
        const cardLength = this.getCardLeng();
        const relateLength = cardLength * relateLocation;
        const duration = this.options.duration || 400;
        const absoluteLength = cardLength * this.location;

        const e = $.Event("moved.carousel");

        if (this.options.vertical){
            // $shelf.animate({top: "+=" + relateLength}, duration, function(){
            //     $el.trigger(e);
            // });
            $shelf[0].style.top = -absoluteLength + "px";
        } else {
            // $shelf.animate({left: "+=" + relateLength}, duration, function(){
            //     $el.trigger(e);
            // });
            $shelf[0].style.left = -absoluteLength + "px";
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

        if (this.options.multi){
            if (scrollableNum > visualCardNum) {
                relateLocation = visualCardNum;
            } else {
                relateLocation = scrollableNum;
            }
        }

        this.location = location + relateLocation;
        this.move();
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
        
        if (this.options.multi) {
            if (location > visualCardNum) {
                relateLocation = visualCardNum;
            } else {
                relateLocation = location;
            }
        }
        
        this.location = location - relateLocation;
        this.move();
        if (this.location === 0) $btnPrev.addClass("disable");
        $btnNext.removeClass("disable");
    }
}
