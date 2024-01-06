---
title: Trying out Hexo
date: 2023-01-05
tags:
  - software
  - webdev
---

This site doesn't have a lot of posts, and there are massive gaps between them, but it does go back quite a while and I've always been happy that I managed not to lose anything, migrating all the content to Markdown precisely to make that possible. I set this up on Metalsmith {% post_link moving-to-metalsmith 'a while ago' %} and it had been working well enough, but I wasn't actually hosting a static version of the site. Instead, I had it running on NodeJS through Express, primarily because I wanted to log requests and had plans to monitor the metrics from these logs. Of course, I never did that, not even once.

It's been running on a VPS (shoutout Hetzner Cloud) along with several other things, but the machine started acting up and some of the services stopped running. I'm looking to migrate everything to a new setup and experiment with more tools (and less websites), so this made for good motivation to actually do the static site thing and drop the site somewhere else. I could have stayed with Metalsmith, but it was also a nice opportunity to play with something new. I was planning to try [Hugo](https://gohugo.io/) out, but I found it a little too complicated to get started with and I wasn't confident that I could resolve any issues I might encounter. Moving down the list of popularity a notch, I tried [Hexo](https://hexo.io/), which I ended up sticking with. It's easy to get started with, pretty simple to customize, and also very simple to just deploy to Github Pages in an actions workflow.

So far, so good. It's fast and easy to use, the only weird part is how you cross-link posts using `post_link` from the tags plugin, but I can live with that. That's one less thing on my server, and one step closer to rebuilding and repurposing it.
