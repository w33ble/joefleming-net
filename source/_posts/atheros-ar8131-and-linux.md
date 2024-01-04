---
title: Atheros AR8131 and Linux
date: 2010-05-26
alias: posts/atheros-ar8131-and-linux/index.html
tags:
  - software
  - linux
---

A while back I picked up an ECS 945GCD-M motherboard to replace my dead VIA board that was running my RAID server. The board is pretty nice, sitting there completely silent, running 64-bit Ubuntu and packing far more power than the board it was replacing. But it has one glaring problem; the network card on the thing didn't work out of the box in Linux. I had been running a cheap USB network card I had laying around, but it was slow and I hated that I couldn't get it working. So, I set out to make the onboard Atheros AR8131M chipset work.

Google will give you a plethora of guides for compiling the drivers ([This one is probably the best](http://ubuntuforums.org/showthread.php?t=1255082)), but I just couldn't get things to load. It was also never clear what version of the drivers I should be trying to run. Most tutorials made reference to 1.0.0.9, some to 1.0.0.10, but the current version (at the time of this writing) is 1.0.1.9. In the end, though, that's the version I did manage to get working. Here's how I did it:

- Grab the v1.0.1.9 driver from the [here](/files/AR81Family-Linux-v1.0.1.9.tar.gz)
- UPDATE: [Version 1.0.1.14 is here](/files/AR81Family-linux-v1.0.1.14.zip)
- Locate the file on your computer, then make a new directory (name it anything, *AR8131* will work) and move that file there
- Decompress the file
- Enter the resulting *src* directory

Once you're in there, it's time to start that terminal magic! One note; if you've already added another network card to your machine, the Atheros card may be eth1, not eth0. This was the case for me, and I'll treat all the instructions here as though that's the case for you too. If it's not, just change eth1 to eth0.

```bash
make && sudo make install
sudo modprobe atl1e
sudo ifconfig eth1 up
sudo dhclient eth1
```

UPDATE: If you're getting an error saying `missing autoconf.h`, try following the instructons [from this post](http://ubuntuforums.org/showthread.php?t=1597605&p=10049520#post10049520). It's kind of a dirty hack, but it works.

At this point, the machine will try to assign an IP address for the card. This may or may not work; for me, it did not. To get mine working, I simply restarted the networking init script. Before that though, let's add the following to */etc/network/interfaces*

```text
# The secondary network interface
auto eth1
iface eth1 inet dhcp
```

And lastly, restart the network on the machine (you CAN reboot, but there's no need) via `sudo /etc/init.d/networking restart`.

At this point, you should have your network card up and running with an IP address assigned by your DHCP server or router. If not, keep hunting I guess, but you should at least be very close!
