---
title: Tweaking Gnome for Low-Resolution Displays
date: 2010-05-13
alias: posts/tweaking-gnome-for-low-resolution-displays/index.html
tags:
  - linux
  - software
---

I'm a fan of Ubuntu, and I'm kind of lazy about setting up my desktop, which means I'm using Gnome as my window manager. Over the years I've grown to like it... it's not perfect, but it's livable and works pretty well. One of the problems I've always had with it, though, is all of the window elements in it are huge. This makes it look kind of childish and eats up a lot of screen real estate on the 1280x800 display on my laptop. I couldn't even imaging running it on a lower resolution!

I was discussing this with my friend [Jason](http://jasonsidabras.com/) and he recommended playing with the font sizes. Sure enough, that did the trick! It seems that the reason everything is so big is that the default font sizes are 10pt. I shrank them down and MAN does it look nice now!

You can edit these values one ways; via gconf-editor or via gconftool-2 on the command line. I won't post the gconf-editor direction since, if you know your way around it, you can extrapolate the parts you want to edit via the gconftool-2 commands. The following settings worked extremely well for me, but you can adjust the font faces and sizes as you see fit.

```text
gconftool-2 --type string --set /apps/metacity/general/titlebar_font "Sans Bold 8"
gconftool-2 --type string --set /desktop/gnome/interface/font_name "Sans 9"
gconftool-2 --type string --set /desktop/gnome/interface/monospace_font_name "Monospace 9"
```

This will adjust the title bar, all normal window text and all monospace text, respectively. Again, these numbers looked the best to me, but you can make them even smaller (or bigger) to fit your needs. I did these adjustments on my 1680x1050 display as well, and it looks amazing. Then again, I love small text!

Another way to free up screen space is to auto-hide the panel(s) you have. Now, I know this is cumbersome with the default settings because it's slow to respond and expand, but you can tweak that stuff too. Here's what I have set:

```text
gconftool-2 --type boolean --set /apps/panel/toplevels/top_panel_screen0/auto_hide 1
gconftool-2 --type boolean --set /apps/panel/toplevels/top_panel_screen0/enable_animations 1
gconftool-2 --type string --set /apps/panel/toplevels/top_panel_screen0/animation_speed fast
gconftool-2 --type string --set /apps/panel/toplevels/top_panel_screen0/hide_delay 500
gconftool-2 --type string --set /apps/panel/toplevels/top_panel_screen0/unhide_delay 100
```

Now, it opens much faster, animates much faster and goes away much faster. the hide_delay is fast enough that if I'm sloppy with the pointer, it still doesn't disappear when I don't want it to. Still annoying? play around with the hide and unhide delays until it works for you. Still too slow to pop in? Set enable_animations to 0 and it'll come on the screen instantly.

As an added piece of advice, if your panel is over-crowded with junk, you can add another panel (or 2 or 3...) to separate out tasks. For example, I have a small, hidden, non-expanding panel I keep in the bottom left of the screen on which I have my timer-applet and my hamster-applet. Additionally, if you have something on your panel that you always want to see on your screen, add it to another panel that you don't hide.
