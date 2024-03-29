---
title: Ubuntu 64-bit, Firefox and Flash
date: 2009-04-23
alias: posts/ubuntu-64-bit-firefox-and-flash/index.html
tags:
  - software
  - linux
---

OK, so you have this sweet new computer ({% post_link my-sweet-new-laptop 'much like myself' %}) running 64-bit Ubuntu like a champ. Except for one thing; Flash elements on webpages keep flaking out. That is, from time to time, instead of seeing the Flash content, you see a grey box that doesn't do anything. It just sits there, mocking you, until you close and re-open either the tab, or in most cases, the whole browser. Not cool.

I had this happen in both Firefox and Opera. As it turns out, the problem is related to the machine running a 32-bit version of flash with a 64-bit version of the browser. There are 2 ways to fix this: run a 32-bit browser or run 64-bit flash. But, why would you run a 32-bit browser on your sweet 64-bit machine? Well, because there isn't a 64-bit version of flash... or at least, there wasn't [until recently](http://labs.adobe.com/technologies/flashplayer10/releasenotes_64bit.html).

I was tired of this problem so I hit Google and looked for a solution. Sure enough, [I found one](http://news.softpedia.com/news/How-to-Install-Adobe-Flash-Player-64-bit-on-Ubuntu-8-10-98076.shtml)! Now, I will warn you that the 64-bit Flash is still in Alpha, but i've been running it for a few weeks now without any problems. Here's how you can too.

Before we begin, **CLOSE FIREFOX**!! That guide will tell you the same thing. I had a friend who borked his entire Flash setup and I have a feeling this is why that happened. Grab the files, write down the instructions, close Firefox and go for it. Personally, I just opened the instructions in Opera and everything worked out just fine.

Start by removing the existing 32-bit version of Flash. If you haven't yet installed it, you can skip to the next part. To uninstall it, fire up the Synaptic Package Manager, search for *nsplugin* and select *Mark for Complete Removal*. It will confirm that you also want to remove flashplugin-nonfree, click Mark and then Apply.

Next, download the [alpha 64-bit Flash 10 player](http://labs.adobe.com/downloads/flashplayer10.html) from Adobe. One last warning: this is alpha software, and I make no guarantees that it will work, or even not ruin everything, nor does Adobe. Note the filename; in my case, it was *libflashplayer-10.0.22.87.linux-x86_64.so.tar.gz*, so that's what I'll use in the console instructions below.

Finally, we need to extract the files and put them in the proper places. The guide will tell you to do this through the X interface, but that's not my style. Here's how to do it from a terminal, assuming you downloaded the flash tarball to your Desktop.

```bash
cd ~/Desktop
tar zxvf libflashplayer-10.0.22.87.linux-x86_64.so.tar.gz
mkdir ~/.mozilla/plugins
mv libflashplayer.so ~/.mozilla/plugins
```

That's it. Now start Firefox back up and you're good to go! As I said, this fixed my problem completely, so hopefully it'll fix yours as well. While we're on the topic, I also highly recommend using [FlashBlock](https://addons.mozilla.org/en-US/firefox/addon/433) so cut down on flash ads, useless video loading and just generally enhance your browsing experience. And don't worry, you can whitelist whatever sites you want so you won't have to keep making extra clicks to watch videos on Youtube and the like.
