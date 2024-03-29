---
title: Building a Better CAPTCHA
date: 2009-01-02
tags:
  - webdev
  - software
---

CAPTCHAs can be good for stopping SPAM, but the last thing most of them are are usable. Don't take my word for it, [it's a fact](http://www.johnmwillis.com/other/top-10-worst-captchas/). One of the most interesting alternative I ever saw was a [HotOrNot mashup](http://valleywag.gawker.com/246656/tech/hot-or-not/a-face-only-a-bot-could-love) where you had to pick the three best looking ladies to prove you are a human. It was both usable and easy for a normal person, like my Grandparents, to use. That's pretty unique and hard to come by, and that's why I liked it.

One of the other easier CAPTCHAs I've used at work is little dynamic images that asks you to do a little simple math. It's an idea I saw on another site so I thought I would give it a try and it's been extremely effective despite it's ease of being broken. Surprisingly, it has completely stopped all SPAM coming through our contact form.

Another one I tried, much less effectively, is a colored word and a dropdown with a number of colors to choose from. It literally asks "What color is this text?" and offers a number of possibilities. This, however, was not effective for more than a week or so. The form still sees about one or two SPAM messages a day, which is especially strange because it's a site that sees far less traffic. I think if I added more colors that weren't even valid selections and changed the order it might be more effective, but I still need to find something better.

I'm thinking a system that would show three images and ask which one doesn't belong could be usable, but it's a little more difficult to implement; where do I get the images, how do I randomize the data, etc. I really like the HotOrNot CAPTCHA because the images always change and all of the images and data are crowdsourced, nothing for you to manage.

So, what can one do? Sadly, I don't have an answer, but there is a lot of work being done on the topic. I think I need to just keep looking and mull this all over for a bit. We'll see what I can find or come up with.
