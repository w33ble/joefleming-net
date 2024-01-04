---
title: Slim-Jade, A Lightweight PHP Framework Using Jade Templates
date: 2012-03-29
alias:
  - posts/slim-jade/index.html
  - posts/slim-jade-a-light-weight-php-framework-using-jade-templates/index.html
  - posts/slim-jade-a-lightweight-php-framework-using-jade-templates/index.html
tags:
  - nodejs
  - php
  - software
  - webdev
  - javascript
---

Recently, I put together a landing page for an idea I had to try and test whether or not it was viable. I drove traffic to the page with Microsoft's AdCenter, tracked clicks on some categories and tried to get people to sign up for a mailing list to be informed about when the service goes live. Nothing too mind blowing, but it was both fun and educational.

At the time, I had just started working with Node.js but wasn't really proficient with it. I needed to put my landing pages together quickly, so rather than spend time beocming proficient, I decided to create the landing pages in PHP, a language I'd been using for the last 5+ years. Having used [Express](http://expressjs.com/) and falling in love with the Sinatra style, I decided to check out [Slim](http://www.slimframework.com/). Having also used [Jade](http://jade-lang.com/) with Express, I didn't want to write HTML anymore.

So what to do? Simple, [combine the two](https://github.com/w33ble/slim-jade)! After finding an existing [Jade parser for PHP](https://github.com/everzet/jade.php), I spent some time learning how views were rendered in Slim. Later that day, I had a working landing page running on Slim and using Jade to render views.

And how'd it work out? Pretty well. Slim is [pretty quick](http://www.ruilog.com/blog/view/b6f0e42cf705.html), and as I already said, I really like the Sinatra style design. And of course, writing all my markup in Jade (and using [Stylus](http://learnboost.github.com/stylus/) for my css, albeit not automated) was pretty much everything I had hoped for.

Check out [Slim-Jade](https://github.com/w33ble/slim-jade); fork it, edit it, and most importantly, let me know what you think!
