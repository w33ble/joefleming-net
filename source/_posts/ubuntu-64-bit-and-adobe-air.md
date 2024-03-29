---
title: Ubuntu 64-bit and Adobe Air
date: 2009-06-14
alias: posts/ubuntu-64-bit-and-adobe-air/index.html
tags:
  - software
  - linux
---

*UPDATE 2009-10-01*: I've just gotten Adobe Air running on my Ubuntu 9.04 (Jaunty) install. Apparently Adobe updated their <a href="http://kb2.adobe.com/cps/408/kb408084.html">installation instructions</a> to include all the required steps now. Good for them!

There I was, running 64-bit Ubunutu and trying to get Adobe AIR to install. The problem is, AIR is written for 32-bit systems, so it needs some extra help installing on 64-bit Ubuntu. I managed to get it running, with a little help from <a href="http://kb2.adobe.com/cps/408/kb408084.html">Adobe's site</a> and grabbing getlibs <a href="http://frozenfox.freehostia.com/cappy/">here</a> (their link was broken), everything looked good. That was, until I tried to install an AIR application.

Specifically, I was trying to get <a href="http://tweetdeck.com">TweetDeck</a> running. The application would launch, but none of the buttons would do anything. I also tried running <a href="http://www.alertthingy.com/">AlertyThingy</a>, which would open and allow me to start using it, but wouldn't actually let me add any channels. I was pretty frustrated.

Then I got the idea to run it from the terminal and see if the application was spitting out any errors. It was!

```bash
$ /opt/TweetDeck/bin/TweetDeck
libgnome-keyring.so: cannot open shared object file: No such file or directory"
```

OK, so apparently I needed to install the 32-bit version of the libgnome-keyring libs. Of course, I wasn't sure how to do this; enter Google. Apparently I wasn't the only one trying to get Tweetdeck running on a 64-bit Ubuntu system. I found the instructions on <a href="http://beegod.org/tweetdeck-on-hardy-heron-64bit">this blog</a>, down near the bottom.

> As I already have GetLibs installed I thought this should be fairly easy to fix by grabbing the missing 32bit libs
>
> $ sudo getlibs -l libgnome-keyring.so
>
> Still no luck - TweetDeck seems to be looking for libgnome-keyring.so.0
>
> Ok then:
>
> $ sudo getlibs -l libgnome-keyring.so.0
>
> still no work so I look in the lib32 folder and see that libgnome-keyring.so.0 is a broken simlink linking to the non-existant libgnome-keyring.so.0.1.1 so I try
>
> $ sudo getlibs -l libgnome-keyring.so.0.1.1
>
> And presto, the simlink is fixed. On running my shell script to start the SDK TweetDeck workaround it pops up asking for Twitter logon details and in I go, perfect.

Exactly the way it worked for me as well. So, now I'm using TweetDeck, and I have to say, the application is pretty awesome!  And of course, if you're on Twitter, <a href="http://twitter.com/w33ble">hit me up</a>.
