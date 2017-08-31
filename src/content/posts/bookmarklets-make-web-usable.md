---
title: Using Bookmarklets to Make the Web Usable Again
date: 2017-08-30
tags: software, javascript
---

Based on what's going on with most webpages, it's the new hotness for websites to stop users from actually consumingcontent by overlaying useless crap on top of it. Overlays nagging you to join some newsletter before you even have a chance to read what you came for. [Dickbars](https://daringfireball.net/2017/06/medium_dickbars) eating up your precious mobile screen estate nagging you to share this shitty experience with your friends, or download some shitty app. You can't browse the web without seeing this junk everywhere. It's an epidemic. And unlike popups from the days of old, browsers don't (yet) stop these things from showing up.

Medium happens to be the current scapegoat, I think mostly because they claim to be a great reading experience, and then their site eats up a large percentage of your screen with garbage. It's is especially bad on mobile too, where screen space is limited. Take this recent Medium article as captured from my phone:

![Medium Dickbars](/images/posts/2017-medium-dickbars.jpg)

Ugh! Look at all that screen being wasted with garbage like that medium header, this nagging button to install their shitty app, and the social buttons I'll never, ever use! So sad. Here's the same site with the dickbars removed:

![Medium without Dickbars](/images/posts/2017-medium-no-dickbars.jpg)

Look at that beautiful content, in all of its full screen glory! That recovered 6 or 7 lines of text. So much nicer. 

So how'd I do that? Simple, I used a bookmarklet. Sure you could install some extension, or content blocker, assuming your device supported such things. You could even enter readability mode, if your browser supports that, at the cost of losing the site's formatting. But bookmarklets are simpler and work *everywhere*, desktop or mobile. They simply let you execute some javascript from a bookmark, no extensions or special functionality required. 

Want to use a bookmarklet to make your web usable again too? [Here's a link to the one I use](https://gist.github.com/w33ble/e59382ba29a48d5096ea9f6ba998a0fc). Simply copy the minified version of the it and save it as a bookmark, then open it while viewing a page stuffed with dickbars and other annoyances and want them disappear instantly. Any sticky element, anything that's overlayed on the screen, styles that stop the page from scrolling, all gone with a single click!

The web, made usable again, all thanks to a simple bookmark.