---
title: Cross Platform Tooling with Grunt
date: 2013-08-05
alias: posts/cross-platform-tooling-with-grunt/index.html
tags:
  - software
  - webdev
  - javascript
  - nodejs
---

Recently, I've been working on building a little web application for managing events (more on that in the future). As part of that, I started to explore good ways to handle the presentation layer. [Topcoat](http://topcoat.io/) looks really interesting, and [Pure](http://purecss.io/) seems like it has some utility as well, but both required some time on my part to get up to speed on. I've spent way too much time messing around with infrustructure stuff already, so I decided to try focusing on moving quickly instead, which right now means using [Bootstrap](http://getbootstrap.com/). If I decouple the site's logic from the markup, changing it the future won't be a big deal, and Bootstrap will allow me to get moving quickly.

Of course, I didn't want to just use the default styling, so I grabbed a theme from [Bootswatch](http://bootswatch.com/) as a base to work from. This led me down the path of how to create my own customized Bootstrap build, which very quickly led me to [Swatchmaker](https://github.com/thomaspark/bootswatch/tree/gh-pages/swatchmaker), part of the same project. It's a pretty easy structure and a pretty simple way to create your custom Bootstrap build, which is all I really needed.

Even more recently, while working with a designer using Windows on a Bootstrap project, I wanted a clean way for him to create a custom build without having to just override Bootstrap with another (huge) CSS file. Since the Swatchmaker relied on a Makefile to kick things off and do the work, this wasn't really a suitable solution. So, I did the only thing I could do; I built [Bootswatcher](https://github.com/w33ble/bootswatcher), a tool heavily modeled after Swatchmaker, but which relies on Bower and Grunt to do the work.

This did 2 really handy things. First, since both these applications are just Node.js packages, and Node runs quite well on Windows, it made this tool workable on Windows and left me with a reliable, cross-platform Bootstrap customizaiton tool. Second, Swatchmaker relied on a Ruby for its watch process, but since Grunt has its own watch process, this removed the Ruby dependency, so it all runs with Node.

Nothing too revolutionary, but my takeaway was this; Grunt and Bower are super useful tools in their own right, but by using them to leverage Node's cross-platform abilities, they become even more useful. This is especially true for tools you plan to distribute to others as open source, or in a corporate environment where multiple operating systems may be in use.
