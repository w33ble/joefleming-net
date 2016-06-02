---
title: Moving to Metalsmith
date: 2016-06-01
---

I posted about my [love for static websites](/posts/static-websites-rock) some time ago, and my feelings haven't changed. My feeling about the tools for making static site, on the other hand, has.

A while back, [I converted this site to Docpad](/posts/wordpress-is-out-docpad-is-in/), which worked well enough, but also came with more cognitive overhead than I'd have liked. I scripted a lot of that away, but it was enough to make me stop writing things, which is unfortunate.

When I recently decided to try rebooting this site, and I thought I'd start by trying to upgrade Docpad and all of my plugins. Of course, `npm update` broke pretty much everything, so I was left with a choice: fix it or start over. I like a lot about Docpad, and I think the in-memory, compile-time document database it uses is really interesting, but it wasn't enough for me to keep it around.

Since all of my posts are HTML and Markdown already, moving it to something else was an easy option, so I looked around to see what else was popular for static site generation. I've been interested in [Metalsmith](http://www.metalsmith.io/) for a while, and it still seemed quite popular, so I thought I'd give it a go. 

I got up and running very quickly. If you are familiar with Express or tools like Grunt and Gulp, Metalsmith will make you feel right at home. It's easy to understand, it's just a file transform tool where files go in one end, get modified, and come out the other. And there are [hundreds of plugins](https://www.npmjs.com/search?q=metalsmith) to help you with that transformation.

I found an easy solution for everything I wanted to do, then started adding new features because the plugins sounded interesting and were very easy to add. Metalsmith plugins themselves are just simple functions that get an object with all the files, the metalsmith instance, and a callback. Writing your own is really simple, you just mutate that files object and call the callback function.

A basic Metalsmith pipeline, which does nothing more than copy files from `src` to `build`, looks like this:

```js
var metalsmith = require('metalsmith');

metalsmith(__dirname)
.source('src')
.destination('build')
.build(function(err) {
	  if (err) throw err;
});
```

You could do this all in a `metalsmith.json` file too, but the code feels cleaner and more powerful, and it's where I'm comfortable.

If you've got some markdown files you'd like to convert to HTML along the way, [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) has you covered. Simply add it to the pipeline and you'll get HTML in `build`.

```js
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');

metalsmith(__dirname)
.source('src')
.destination('build')
.use(markdown())
.build(function(err) {
	  if (err) throw err;
});
```

That's it, can't get much simpler than that. Simply build up your pipeline little by little until you have what you want.

Because the entire pipeline lives in a single file, and is very few lines, there's no cognitive overhead. The plugins themselves are all very simple and small, so the system is very easy to understand. And since they are so small, they have very few dependencies, so upgrading *should* be easier, but I suppose only time will tell.

If you're interested in setting up a static site, or even just need a file transform tool, definitely check out Metalsmith. And if you need an example to get you going, take a look at [this site's source](https://github.com/w33ble/joefleming-net/tree/v2.2.0). 
