---
title: "Wordpress is out, Docpad is in"
date: 2013-06-15
tags: "website, docpad, wordpress, node.js, software, javascript, coffeescript"
icon: docpad
---

I've tried to [leave Wordpress](/posts/farewell-wordpress) in the past in favor of something that would be more pleasant to use. It's been a long search, but I never found anything that fit the bill. Other CMS systems were just as painful to use, and rolling my own just wasn't appealing enough to actually happen.

This search has been going on for many years now, and a lot has changed since it started. I'm not longer interested in working with PHP, so that rules out a lot of solutions. [Markdown](http://daringfireball.net/projects/markdown/) has become popular, and I find it really pleasant to compose in. And a shift to static site generation has been happening, and I think with good reason, so I wanted to follow that trend.

Things like [Jekyll](http://jekyllrb.com/) and [Octopress](http://octopress.org/) have come up a lot as great choices for creating static websites (especially the later), but I didn't want to have to spend time learning Ruby, a language I'm not particularly interested in using. I've also heard that getting those systems running can be a pain. So I never really committed the time to learn either one, always searching for something in a language I knew, or at least one I wanted to learn and use.

Then one day, I stumbled upon [Docpad](http://docpad.org/). It's a static site generator, but it's written in Node.js, and the code base and a lot of examples are written in Coffeescript, both things I like using. I was intrigued, so I watched some intro videos and was blown away. Docpad looked super flexible for generating static sites, but it also allowed you to add dynamic pages to the mix. So, if I wanted to add a user login page or have a page that updates itself on each visit, I could, without adding another technology to the mix.

It's also great for crafting sites that re-render periodically, but are static most of the time. Say, for example, that you want to pull in your Twitter feed, your posted YouTube or Vimeo content, your Flickr or Tumblr photo stream, an RSS feed from another news source or whatever else. Chances are, you probably don't need this content to be real time, it just needs to be current enough to be relevant. You could tell Docpad to re-generate the site in specific time intervals; every half hour, every hour, every day, whatever you want. This prevents you from having to bear the burden of a site that is built on every page hit but still allows you to have live(ish), changing content on the fly.

Docpad also has [renderers](http://docpad.org/docs/plugins#renderers) to render almost anything, and you can mix and match and use whatever you want when creating content. For example, all the content I brought over from Wordpress I just put in as normal HTML. This post and most future posts will be written in Markdown. All the layouts and some posts are written in Jade. But any of those pieces could just as easily be eco, coffeecup, teacup, haml, handlebars, hell, even PHP. You can use the best tool for whatever content you are creating, and it all works together by simply installing the appropriate plugin. And it's not just content compilation either, there are plugins for less, sass and stylus for your CSS and coffeescript and typescript for your JS, among others.

There's also [helpers](http://docpad.org/docs/plugins#helpers) for a ton of different things. I'm using Feedr, a nice plugin to pull in RSS and JSON data, to pull in Github info, and will eventually add my Twitter feed (and perhaps other stuff) and have the site update every hour.

The other really slick part is that all of your content can have metadata, and you can query that metadata on site generation. Since I pulled in all the tags from my old posts and I've been cleaning them up and adding new tags to new posts, I can (and will) show related articles on each post based on those tags. Another example is that I can stage and expire content based on metadata as well, so I can sit down a write a bunch of articles and have them get put online in the future, or have news that automatically expires.

So, all that to say, Wordpress is finally history. No more updates to install and no more slow page loads. And if you want to see what it looks like, check out [the repo](https://github.com/w33ble/joefleming-net).

I couldn't be happier!