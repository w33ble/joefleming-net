---
title: Media Playback in Ubuntu
date: 2008-08-23
alias: posts/media-playback-in-ubuntu/index.html
tags:
  - software
  - linux
---

This all started because I had some Real Media (rm) videos that I wanted to view in Linux. But, like so many other sane people out there, I didn't want anything to do with the official [Real Player for Linux](http://www.real.com/linux). I've never been a fan of Real and I've always thought their software was a bloated mess. Plus, why install yet another media player when I know I can get the job done with the mighty [Mplayer](http://www.mplayerhq.hu)?!

A quick search on Ubuntu Forums yielded [this post](http://ubuntuforums.org/showpost.php?p=5643578&postcount=8). Following the link posted, here's how I got it working from the command line:

```bash
sudo wget http://www.medibuntu.org/sources.list.d/hardy.list -O /etc/apt/sources.list.d medibuntu.list
wget -q http://packages.medibuntu.org/medibuntu-key.gpg -O- | sudo apt-key add - && sudo apt-get update
sudo apt-get install non-free-codecs w32codecs
```

After that, the videos fired right up without a hitch. Brilliant! One thing to note: these codecs may be illegal in the US. I've read warnings about them in the past anyway, though I didn't happen to see any this time around. It's kind of a legal gray area I guess, and while you're not likely to get in trouble for using them, it's something you should probably know. In any event, if you're having problems playing videos in Linux (especially rm files), give this a shot.
