---
title: "Skirting ISP Torrent Filtering Reset Requests"
date: 2008-06-07
alias:
  - posts/skirting-isp-torrent-filtering-reset-requests/index.html
  - posts/skirting-isp-torrent-fitlering/index.html
tags:
  - linux
  - software
---

Many ISPs these days employ traffic shaping to make their networks run smoother. In the most basic sense, they give priority to more critical traffic, like VoIP for instance, and slow down less important traffic, like HTTP and Torrents. Lately, many ISPs have been doing their best to slap down any peer-to-peer (p2p) traffic, especially Bittorrent, because users are consuming more bandwidth than the ISPs can handle. This is a result of the ISPs grossly overselling their networks and expecting most consumers to use a tiny fraction of their connection, a practice that worked great until more and more users became heavy consumers thanks to sites like YouTube and technologies like BitTorrent.

Now, I'm not saying that ISPs are doing anything wrong in overselling per se, but I do have a problem with them not properly planning for the future. Now that they have this bandwidth problem, instead of expanding their networks and upgrading to try and meet demands, they are using more and more restrictive filtering, sometimes even resorting to hacker-style packet injection in their traffic, nearly crippling whatever technology it is that people would like to use (and pay to use). Not only is this a very shady thing to do on their part, but in nearly all cases, they hide this fact from consumers and outright deny that anything is going on. They get away with all of this thanks to their monopolies in their select markets. But I won't get in to all of that.

As in any other situation where one party tries to control another party, people are finding that there are many ways to get around this type of filtering. One extremely popular method is to use an encrypting VPN, which essentially encrypts either all of your traffic or just select traffic. This works because filtering relies on reading the data that is being transmitted and using that information to determine how fast that traffic should flow, so by encrypting all that information, the traffic just moves on without any modification. The one major drawback to this method is that it's rarely, if ever, free to do and the encryption overhead usually means that the traffic is slower than it normally would be.

In my personal situation, I use Comcast as my network provider, who has been notorious for their filtering of torrent traffic. More recently, they started to inject reset packets into the traffic, which fools your Bittorrent client into thinking that the users you are connected to have reset the connection causing the client to stop the transfer and attempt to re-establish the connection. Since this is done hundreds of times a minute, it effectively stops any exchange from actually occurring. Luckily, this is easy enough to work around either on your Linux (or and Unix or Unix clone really) machine locally on through a Linux firewall and router. In fact, if you run a custom firmware on a Linux-based router, like the Linksys WRT54GL for example, you may even be able to set up a filtering rule that would apply to your entire network.

This method uses a local firewall, iptables in Linux in this example, to drop these rogue reset requests completely from your Bittorrent traffic and can be added on top of your existing rules if you have any. In this example, you would replace `$TORRENT_CLIENT_PORT` with the port your torrent client is actually using. Be sure you run this command as root or through sudo.

```bash
iptables -A INPUT -p tcp --dport $TORRENT_CLIENT_PORT --tcp-flags RST RST -j DROP
```

What this will allow, if you are on a network that employs this technique, is for you to seed torrents that have already finished downloading. This is great for keeping up your ratio on private trackers and being a good user in general.

On my machine I set up a logging rule (Google how, it's fairly straightforward) so I could actually see the dropped requests and it's really quite amazing how many drop requests it is dropping. It's about 1 per second with only 3 torrents open, sometimes even more. There's something gratifying about knowing how hard they are trying to stop my traffic and knowing that it's now having no effect at all, and as an added bonus, I can get back to being a responsible seeder to the world.
