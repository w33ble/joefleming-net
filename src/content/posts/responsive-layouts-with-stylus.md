---
title: "Responsive Layouts with Stylus"
date: 2013-02-14
#tags: "development,web development"
icon: stylus-css
---

When I tell people they should be using CSS pre-processors like [Stylus](http://learnboost.github.com/stylus/), [Sass](http://sass-lang.com/) or [Less](http://lesscss.org/), I inevitably need to explain why. This can be tricky if you are talking to someone that hasn't used CSS much. Typically, discussions evolve around variables and mixins, and usually that's enough to interest people. More recently though, I've found that using pre-processors makes doing responsive design REALLY easy! I'll focus on Stylus here, but the same applies to the other two as well.

Typically, when someone wants to make a responsive site, they start with a grid system, and their HTML ends up looking like this.

```html
<div class="row">
  <div class="columns-4">4 columns wide</div>
  <div class="columns-8">8 columns wide</div>
</div>
```

This is ugly, and a terrible reminder of the days of table layouts. Why should we mix all this layout logic in with our markup? Well, quite simply, we shouldn't! Ideally we'd keep our concerns separated and keep this layout logic in our layout definitions; namely, in our CSS. But writing all this by hand is annoying. Enter pre-processors.

<p>I've been using the [Semantic Grid System](http://semantic.gs) lately and I really like the idea. You set your page width as a variable, column count as a variable, and use mixing to specify how many columns an element uses. So then we get back to something like this.

```html
<section id="page-content">
  <div id="sidebar">sidebar goes here</div>
  <div id="content">page content goes here</div>
</section>
```

```css
#sidebar { columns(4); }
#content { columns(8); }
```

Now we're getting somewhere! So what about responsive layouts? Well, the Semantic GS isn't all that suited for the traditional responsive layout (that is, when you look at it on a phone, all "columns" become "rows"), but that's not really such a bad thing. For me, I rarely want my mobile view to be a list of items, I still want some parts side by side. With some clever mixin and variable use, we can do this.

```stylus
@import "lib/grid" //semantic.gs, sans the body style

// Semantic GridSystem settings
total-width = 100%

// Device media queries
tablet = "(min-width: 768px) and (max-width: 979px)"
phone = "(max-width: 767px)"

// Device specific mixins
hideOn(device)
  display: inherit // bug in stylus, we need a core rule
  @media device
    display: none !important

showOn(device)
  display: none
  @media device
    display: inherit !important

// Site styles

body
  width: 100%
  clearfix()

#sidebar
  column(4)
  hideOn('phone')
  background-color: red

#content
  column(8)
  @media phone
    column(12)
  background-color: yellow
```

Here, I define variables for device display sizes and use those variables to control the size of elements on those screens. I also use the hideOn and showOn mixins to hide and show elements on a screen. So now, when I view this page on a phone, the content is the only part shown and the sidebar is hidden. I can also use these to specify padding and the like for different displays.

Of course, this should be expanded to work with more than 2 display sizes, but it's a working example.
