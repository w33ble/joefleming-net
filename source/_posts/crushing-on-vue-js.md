---
title: Crushing on Vue.js
date: 2016-12-06
alias: posts/crushing-on-vue-js/index.html
tags:
  - vuejs
  - javascript
  - webdev
---

I've been seeing a lot of chatter about [Vue.js](http://vuejs.org/) lately, especially since the 2.0 release. When I looked at the docs and API, it seemed very approachable. I had a feeling that Vue would be a pleasure to work with, so I reached for it on a small project recently. My suspicions have been confirmed, I like Vue a lot!

Using Vue immediately brought me back to my early days of using React. You could just drop a script file into a page and get going. It was easy to pick up, it made sense, and I had a pretty good handle on it after an evening if kicking the tires. Only I thought Vue was even easier to get started with.

I like Vue more than anything else I've used before it, but until recently I've been stuck trying to articulate why. While attending [CSSDay.io](http://cssday.io/) this past weekend, watching talks and chatting with attendees, I think I have my reason, or at least one of them.

Vue, to me, feels like a mash-up of the good parts of Angular 1 and React. Like Angular, and unlike React, I don't have to re-write any of my markup for the library to understand it, I just sprinkle in some extra markup and my page becomes reactive. But unlike Angular, there's no magic, and I resort to the React-style render function if I really need to. There's also no digest loop, no module stuff to worry about, and best of all, it actually throws when I make mistakes! I can't tell you how excited I am by that last one!!

I think [Miriam Suzanne](https://twitter.com/mirisuzanne) actually summed up my feelings well in a totally unrelated presentation at CSSDay by saying (and I'm paraphrasing here) that what we all really want from our tools is a a superset of what we're already using. And I think that's why I like Vue so much. It is, or at least it really feels like, a superset of HTML.

That idea is evidenced really well in [this video](https://www.youtube.com/watch?v=PZ5pYNWZLJo) showing how to wire up Boostrap's dynamic tab component with Vue. The author copies the Bootstrap markup, changing nothing (aside from removing some tags to make the example more readable). Then, he wires up the functionlity with Vue to produce an easy to understand component.

I always throught of React as superpowered Web Components, and that was one of the things I loved about it. But I think Vue does a better job, because you actually get to use real HTML. As great as React is, JSX is not HTML, no matter how good a job it does at trying to hide that fact.

Vue's growth has been explosive lately, and I don't think we'll see it slow down. It's now my go-to, and I'm quick to recommend anyone give it a try. If you haven't already, go take a few hours and build something in Vue, I think you'll be pleasantly surprised!
