---
title: Choosing Default Sound Card in Ubuntu
date: 2008-01-13
alias: posts/choosing-default-sound-card-in-ubuntu/index.html
tags:
  - linux
  - software
---

On my machine I have a SoundBlaster Live card as well as an onboard VIA sound chip. Since Linux ignores the system BIOS, disabling the onboard sound doesn't do anything. Obviously I don't want to use the onboard sound card or I wouldn't have bothered putting the SBLive card in in the first place.

Simple fix; we're going to change the default card to the SBLive card! This may not only apply to Ubuntu, but it's the only Linux distro I tried it in (since it's what I run). I think any distro using ALSA will work the same.

```sh
$ asoundconf list

Names of available sound cards:
V8237
Live
```

Your list may differ, but you should be able to find the card you want. In my case, it's the Live card. So....

```sh
asoundconf set-default-card Live
```

Note that I did not use `sudo` to list or change anything, it's a user setting. Now, restart any sound applications and you should be up and running. This should live through reboot as well.
