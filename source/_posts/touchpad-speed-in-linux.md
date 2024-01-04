---
title: Touchpad Speed in Linux
date: 2007-04-25
alias: posts/touchpad-speed-in-linux/index.html
tags:
  - linux
  - software
---

I've been running Ubuntu Linux for a few years now and it's by far my favorite distro out there right now. It's simple to use, quick to install and everything works out of the box. I used to run Gentoo but I got tired of compiling everything all the time to install things and spending days on end configuring the machine just to use it. I'm a huge fan of the debian packages now and Ubuntu makes everything that much easier.

That said, the install on my laptop (a Dell Inspiron 8500) has been bugging me for a while. The touchpad on the thing just wasn't sensitive enough and the Ubuntu configuration did nothing to change the speed. Today I did a little Googling and found [this site](http://wiki.osafoundation.org/Journal/UbuntuOnLatitudeD820). On it were some instructions on how to make the Synaptics touchpad faster.

Basically, all you need to do is edit the /etc/X11/xorg.conf file to change the speed settings. Locate the InputDevice section that uses the synaptics driver and add the following lines:

```text
Option  "MinSpeed" "0.5"
Option  "MaxSpeed" "3"
Option  "AccelFactor" "0.05"
```

Note that these numbers are a little different from the site linked, but they feel right on my machine. I am running on a 15" WSXGA+ screen after all, so I have a lot more pixels to traverse. Play with the values a little and see what works for you.

EDIT: Apparently Ubuntu has taken up the HAL system. Jay took the liberty of [posting an update to tweaking your mouse settings](http://jasonsidabras.com/2008/11/14/hardware-abstraction-layer-hal-in-ubuntu-810/). Kudos!
