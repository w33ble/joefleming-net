---
title: "Static Websites Rock"
date: 2013-05-28
tags: "software, php, web development"
---

Lately, I've been attending a lot of Wordpress meetups, because I was hoping that learning how to use Wordpress effectively would allow me to build client sites quickly. But, the more I see of Wordpress, the less I want to use it. It's a large time investment upfront, and once you have a client on Wordpress, you need to train them to use it, and to keep it updated. In the end, you've essentially just handed them a new problem to deal with.

Instead, I've started focusing on making really simple PHP sites using [Slim](http://slimframework.com/) and, when possible, not using a database for anything. I've also been playing with [Redbean](http://redbeanphp.com) and Sqlite, and while that still allows me to eliminate the MySQL step, I rather just avoid the database all together.

However, a thought occurred to me; if all I'm building is static sites, why am I even using PHP? Why not go even father and commit to a static site generation tool and just host static HTML?

## Static Sites?!

Before I get ahead of myself, let me address the question of "why static sites?" At the base level, I don't want to give my clients another problem to deal with. Blogging and CMS platforms approach the problem of content by treating it as data and just slapping and interface on a database. These tools are simple enough to use, but the cost is your need to maintain the tools in addition to your content. If you're not running updates, you run a high risk of getting your site hacked. How often should you perform the updates? Who's going to do it? And it's not uncommon for these updates to break your site, and then what? Pay someone else to fix it? When will they get to you, and how long will your site be down? How much is this fix going to cost? When will it happen again? On and on...

As it turns out, for most sites, generating content on the fly, every time, as users request it, is overkill. Unless you're a content company pushing updates all day long, a CMS is too much for your needs. It makes a lot more sense to simply generate a static version of the site once, as you add new content, and just host that new version.

## What about caching?

So what about caching? Wordpress has a few really good caching plugins, and Varnish is an option too. But, these are really just bandaids. You're going out of your way to undo what Wordpress (or whatever other CMS you're using) does; render your content on the fly.

In order to add caching, now you're adding more stuff to maintain. If you're looking at Varnish or some other server-side option, or even at putting your site behind a cachine CDN service, well congratulations, now you get to learn about server administration. Or, pay someone else to do it for you. And pay for the additional service costs in order to be able to do these things.

## Benefits

With a static site, you no longer have to worry about server performance as much. A really cheap (or free) hosting plan may now be a viable option. It may still be slow, but it'll be much faster than if some script was rendering your content on the fly. And because you don't have that server-side processing happening anymore, you can handle a ton more traffic.

Also, no code means no exploits. You can't be a victim of SQL injection if you don't use SQL. Hackers can't brute force your account if there's no login.

And, by using a static site generator, instead of crafting a static site by hand, you can still do the things you might want from a full blown CMS. For example, showing related articles using metadata, pulling in content from other websites, paginating your content and a bunch of other stuff. Having a "static" site doesn't mean a site that isn't current.

To me, static sites make the most sense for personal websites, and in fact, for most marketing and corporate sites as well. I'd venture to guess than well over half the sites on the net could very easily, and much more appropriately, be static. I'm certainly no exception, and my plan right now is to migrate over to [Docpad](http://docpad.org/).