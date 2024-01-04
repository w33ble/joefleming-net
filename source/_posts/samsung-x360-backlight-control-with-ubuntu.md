---
title: Samsung X360 Backlight Control with Ubuntu
date: 2010-03-30
alias: posts/samsung-x360-backlight-control-with-ubuntu/index.html
tags:
  - hardware
  - software
  - linux
---

I recently sent my [Samsung X360 laptop](/2009/03/10/my-sweet-new-laptop/) to the shop. The bearing on the fan had gone bad so I sent it in for warranty replacement. Before I sent it, I thought I would wipe out all my data since a lot of it was work-related and I didn't need that information getting out, plus I didn't want to confuse the poor tech with Linux.

When I got it back, I immediately installed Ubuntu's most current version, 9.10 (Karmic Koala). I was really impressed with it; even more-so than with 9.04 in fact. But I ran in to a problem when I was setting it all up; I couldn't get the backlight adjustment to work.

I resorted to the original [Ubuntu Forums article](http://ubuntuforums.org/showthread.php?t=1031764) on it but I quickly found that it no longer worked. LVDS and VGA had been replaced with LVDA1 and VGA1, and changing the command still didn't work; it complained about something which I no longer remember. But, that error (as well as replies to that thread) lead me to [this Launchpad comment](https://bugs.launchpad.net/ubuntu/+source/xserver-xorg-video-intel/+bug/397617/comments/30) about disabling KMS.

Seems KMS is enabled by default for a certain chipset, specifically the Intel i915 chipset. My next questions, of course, were "what is KMS" and "how do I disable it"? Looking around, I found out that KMS, or Kernel Modesetting, could be disabled [like so](http://www.ubuntu.com/getubuntu/releasenotes/910#No%20Xv%20support%20for%20Intel%2082852/855GM%20video%20chips%20with%20KMS). Simply edit `/etc/default/grub` and change *GRUB_CMDLINE_LINUX=""* to *GRUB_CMDLINE_LINUX="nomodeset"*.

Then run

```sh
sudo update-grub
```

Now, reboot and KMS will be disabled. We can now refer back to the original post, adding the following to the startup applications (or just running it from the command line each time, you're call I guess).

```sh
xrandr --output LVDS --set BACKLIGHT 102 --set BACKLIGHT_CONTROL legacy --output VGA --auto
```

This still won't make the brightness buttons on the keyboard work, but it WILL make xbacklight work. As the article points out, you can then set hotkeys for xbacklight commands.

So what do you lose by disabling KMS? Well, according to [this article](http://fedoraproject.org/wiki/Features/KernelModesetting#Summary), KMS offloads the graphics initialization from X to the kernel, which has some benefits. But, the fact remains that it doesn't work on a lot of machines (the Samsung X360, The MacBook and possible MacBook Pro, MSI's U90, U100, and U120 netbooks and the Asus EeePC, to name a handful), so for users with this hardware, you don't lose anything. I've read about some people having success with KMS in newer kernels, but it didn't work for me so I'm not going to bother posting it. I'm hopeful that this will be fixed when 10.04 (Lucid Lynx) is released, but I haven't yet tried the beta release to see.
