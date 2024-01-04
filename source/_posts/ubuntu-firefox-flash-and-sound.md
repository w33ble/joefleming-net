---
title: Ubuntu, Firefox, Flash and Sound
date: 2007-12-04
alias: posts/ubuntu-firefox-flash-and-sound/index.html
tags:
  - software
  - linux
---

If you Google "ubuntu flash sound" you'll find a LOT of information about flash sound problems and how to fix them. The consensus seems to be installing alsa-oss and configuring Firefox to use it. However, try as I may, I couldn't get it to work. Then I read somewhere that you needed to set other programs to use Alsa instead of OSS, and that did the trick. YouTube seems to lock up Firefox from time to time so I'm still waiting on a more permanent fix, but this works well enough for now.

In the event you don't feel like looking elsewhere for the installation process, I'll post it here. As with nearly every other tutorial you'll find here, you'll need to fire up the terminal.

```bash
sudo apt-get install alsa-oss
echo "FIREFOX_DSP=\"none\"" >> $HOME/.mozilla/firefox/<profile>/rc
```

In the place of `<profile>`, use your profile directory. This will be different for each machine. Now, simple set all of your programs that use sound (XMMS, Rythmbox, Audacity, etc.) to use Alsa and you should be all set.
