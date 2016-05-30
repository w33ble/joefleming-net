---
title: "Slim-Jade, A Lightweight PHP Framework Using Jade Templates"
date: 2012-03-29
#urls: "2012/03/29/slim-jade"
tags: "node.js, php, software, web development, javascript"
---

Recently, I put together a landing page for an idea I had to try and test whether or not it was viable. I drove traffic to the page with Microsoft's AdCenter, tracked clicks on some categories and tried to get people to sign up for a mailing list to be informed about when the service goes live. Nothing too mind blowing, but it was both fun and educational.

At the time, I had just started working with Node.js but wasn't really proficient with it. I needed to put my landing pages together quickly, so rather than spend time beocming proficient, I decided to create the landing pages in PHP, a language I'd been using for the last 5+ years. Having used <a href="http://expressjs.com/">Express</a> and falling in love with the Sinatra style, I decided to check out <a href="http://www.slimframework.com/">Slim</a>. Having also used <a href="http://jade-lang.com/">Jade</a> with Express, I didn't want to write HTML anymore.

So what to do? Simple, <a href="https://github.com/w33ble/slim-jade">combine the two</a>! After finding an existing <a href="https://github.com/everzet/jade.php">Jade parser for PHP</a>, I spent some time learning how views were rendered in Slim. Later that day, I had a working landing page running on Slim and using Jade to render views.

And how'd it work out? Pretty well. Slim is <a href="http://www.ruilog.com/blog/view/b6f0e42cf705.html">pretty quick</a>, and as I already said, I really like the Sinatra style design. And of course, writing all my markup in Jade (and using <a href="http://learnboost.github.com/stylus/">Stylus</a> for my css, albeit not automated) was pretty much everything I had hoped for.

Check out <a href="https://github.com/w33ble/slim-jade">Slim-Jade</a>; fork it, edit it, and most importantly, let me know what you think!