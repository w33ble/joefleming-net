---
title: How I Use Backbone's Router
date: 2013-07-17
tags: software, web development, javascript, backbone
icon: javascript
---

This morning I read an article titled "[Why JavaScript web applications should embrace traditional URLs](http://9elements.com/io/index.php/hybrid-javascript-apps/)", which makes a solid case for not using hashes or hash bangs in your URLs. This was by no means the first article on the topic, but the interesting part was that about half way through, Mathias Schäfer, the author, dives in the query strings and their support in Backbone. Query strings aren't really something I've used with Backbone before, but it was an interesting summary, and goes in to some detail about why they are broken in Backbone.

I recommend reading that article yourself, but the gist was basically that Jeremy Ashkenas, Backbone's author, felt that query strings were best left to the servers, and because Backbone's default routes use hashes that they were too difficult to deal with, so support was dropped completely in version 1.0.0. Mathias makes the point that adding query strings after the hash is perfectly valid, and would only take a little work to build in to Backbone.History, and doing so would help Backbone maintain it's "unopinionated" label.

This got me thinking about how I use Backbone's Router. Mathias has a good point, and I agree, but I think there's a fundamental flaw in his logic; the assumption that legacy browsers (ie. those that don't support pushState) need to use hashes for their route changes. I'm firmly in the "hashes are wrong, always" camp, and don't think that there's *ever* a place for them, even in legacy browsers.

So, how do we handle legacy browsers without hashes? How do we allow them to use our nifty single page apps if we don't give them a way to fall back to the hashed routes? This is really a question of progressive enhancement, but where most people see pushState as that enhancement, I see the whole single page app model as the enhancement.

Setting it this up with Backbone is simple. Using Modernizr, or any other method of testing for pushState support, all you need to do is start Backbone.History thusly:

<pre><code class="hljs javascript">
Backbone.history.start({
  pushState: true,
  hashChange: Modernizr.history ? true : false
});
</code></pre>

From the Backbone docs, "If you'd like to use pushState, but have browsers that don't support it natively use full page refreshes instead, you can add {hashChange: false} to the options." What's this do, exactly? Well, every time you fire a history update (Backbone.Router.navigate or Backbone.History.navigate), it'll force a page refresh on legacy browsers. Simple as that.

But why do it that way? Well, in order to use pushState correctly, the server already needs to be able to handle any route set via pushState, meaning that any change in the URL will have a corresponding, working route on the server, so we can safely reload the page every single time. You may be thinking, "hey, hold on, that sucks! We want to have a fast, single page app, not a page that has to re-render itself with every route update!"" That's true, but this is legacy browser land, and handling things this way requires no extra work on your part if you're already working with pushState.

I'll admit that I haven't been doing this for long, or in a large scale app, but it works well enough in IE8+ and any other browsers that don't support pushState. How's the experience for legacy browsers? Not really any different from any normal website out there. It'll potentially be slower if you're bootstrapping a whole heap of JS, but it'll work, and that's really all that matters.
