---
title: Using Kibana for Site Traffic Analysis
date: 2016-06-09
---

One of the thing I did when I [moved this site over to Metalsmith](/posts/moving-to-metalsmith/) was to put up a very thin Express server and start logging traffic to the site to a [winstond](https://github.com/winstonjs/winstond) log server I set up a little while back. I could use my server logs directly, but I'm already logging a couple of other sites to this log server, and I figured doing it this way would help make that data more portable. Of course now that I have this data, I wanted a way to explore it.

As it happens, I've been working at [Elastic](https://www.elastic.co/) for almost the past 2 years, primarily helping develop [Kibana](https://www.elastic.co/products/kibana), our tool for analysis of data in [Elasticsearch](https://www.elastic.co/products/elasticsearch). What better tool to use to look at my server logs than the tool I hack on for my day job, right?

To get this log data into Elasticsearch, I wrote a script in node that would parse the details I wanted and bulk index it for me. It didn't take long to write, as I've done this a few times with other datasets already, and the actual indexing of the data only took a few seconds - it's only like 10MB of JSON data. 

Once I had this data indexed, I wanted to take a look at which URLs were being hit the most, where traffic was coming from, and since I knew I had a sizable number of 404 responses, what was causing all of those. I built all the visualizations I needed and put them all in a dashboard so I would have a nice overview, like so:

![overview dashboard](/images/posts/kibana-traffic-dashboard.png)

While watching the logs live, I noticed a handful of php requests, and as you'd expect, there were a decent number of requests to `wp-admin.php`. These are just bots crawling websites looking for possible exploit targets, nothing to be worried about. More concerning was the large number of 404's in relation to the rest of the traffic, and the fact that most of them were coming from requests for images.

![failed requests](/images/posts/kibana-failed-requests.png)

Turns out, I forgot to add the post images to the new Metalsmith repo. Whoops! Easy fix and all, but it's a good thing I decided to take a look at this data. There was also a large number of requests to `/feed/`, and since I actually do have an RSS feed, I set up a redirect for that. 

Strangely, I also saw a number of requests from all my old Wordpress permalinks from years ago. 

![wordpress permalinks](/images/posts/kibana-failed-wordpress-permalinks.png)

I figured by now all those links would have died or been updated, but it seems I was wrong. I also noticed that one of the redirects I already had setup had a typo. Again, both easy fixes at least.

Lastly, I noticed that the most popular URL on the site has a lot of crazy referral sources:

![crazy referral hosts](/images/posts/kibana-strange-referral-sources.png)

Normally I'd be worried that the site had been hacked, but it's all static files, and as of recently, everything has been moved to a new server. Guess I've got something to dig in to and find out more.

If you've got some server logs, I encourage you to explore it, you never know what you'll find! Kibana and Elasticsearch make good tools, as they're both free and open source tools, and it's pretty easy to get started with them. No matter what you use though, if you're collecting data, take the time to dig through it.