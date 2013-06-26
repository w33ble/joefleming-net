---
title: Use Lo-Dash Instead of Underscore
date: 2013-06-21
tags: "software, web development, javascript"
icon: javascript
---

I've been using [Lo-Dash](http://lodash.com/) in place of underscore for a while now, because it's faster, it has AMD support, and it has extra functionality that Underscore lacks. Because it's 100% compatible, if I have a library that requires Underscore (Backbone, for example) or an existing code base that already uses Underscore, I get all that performance for free just by dropping Lo-Dash in its place. That's great!

About a month ago, [lazy.js](http://dtao.github.io/lazy.js/) made the some noise with its claims to be "Like Underscore, but lazier" and some really impressive speed comparisons. That's enough to spark some interest, and it seems like an interesting library. But something else even more useful stuck out when I went to read more about it. Let's take a look at the first speed comparison graph on their site.

![performance](/images/posts/2013-lodash-ops.jpg)

Lazy.js's speed is really impressive, but you should also notice that Lo-Dash is consistently higher than Underscore, and usually by a lot. Like 4-5x or more a lot. Now, take a look at the scale on the left, which is operations per second. Those bars are small, but the numbers they represent are HUGE! It's the difference between several hundred thousand ops/sec and several million ops/sec.

Yes, Lazy.js consistently smokes Lo-Dash, but there's no mention of it being usable in place of Underscore, let alone tested for compatibility. On the other hand, Lo-Dash consitantly smokes Underscore and *is* fully tested and compatible with it.

There's no contest here. If you're using Underscore, anywhere (Node.js included), spend a few minutes right now and switch over to Lo-Dash. There's no reason not to, and a few great reasons (speed being the best) that you should, and you get those benefits for free!

UPDATE: John-David Dalton, author of Lo-Dash, and JS speed fanatic, [tweeted me](https://twitter.com/jdalton/status/348271845549678592) to point out that lazy evaluation may be [coming to Lo-Dash](https://github.com/bestiejs/lodash/issues/274) in the future. Quite exciting!