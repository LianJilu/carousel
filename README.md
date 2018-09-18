# Carousel

Carousel is a jQuery plugin to scroll elements by manual, it can scroll horizontal or vertical and scroll one-item or multi.

滚动条插件，可支持横向、竖向，单个或者是可视数量的手动滚动。

## Demos

[https://lianjilu.github.io/carousel](https://lianjilu.github.io/carousel)

## How to get it

## Usage

**dependency**: [jQuery](https://jquery.com/download/)

```javascript
$(elements).carousel(options)
```

The HTML structure should be look like this

```html
<div id="carousel1" class="carousel">
    <div class="carousel-viewport">
        <button type="button" class="carousel-control_prev">prev</button>
        <div class="carousel-shelf">
            <div class="carousel-card"><img src="demo.jpg" alt=""></div
            ><div class="carousel-card"><img src="demo.jpg" alt=""></div
            ><div class="carousel-card"><img src="demo.jpg" alt=""></div
            ><div class="carousel-card"><img src="demo.jpg" alt=""></div
            ><div class="carousel-card"><img src="demo.jpg" alt=""></div>
        </div>
        <button type="button" class="carousel-control_next">next</button>
    </div>
</div>
```

## Options

Type: PlainObject

A map of additional options to pass to the method.

* **vertical** (default: false)

    Type: Boolean

    Is the shelf vertical list.

* **multi** (default: false)

    Type: Boolean

    Scroll one-by-one or a list item when trigger scroll events.

* **duration** (defalut: 400)

    Type: Number or String

    A string or number determining how long the animation will run, this is [jQuery's animate](https://api.jquery.com/animate/#animate-properties-duration-easing-complete).

## LICENSE

[The MIT License](https://github.com/lianjilu/carousel/blob/master/LICENSE)
