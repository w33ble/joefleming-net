---
title: PPTP VPN Routing in Ubuntu using Network Manager
date: 2009-10-01
alias: posts/pptp-vpn-routing-in-ubuntu-using-network-manager/index.html
tags:
  - software
  - linux
---

Back when I was still on Ubuntu 8.10 (Intrepid), I had near endless problems with PPTP VPN access using the network manager. I wasn't alone, and I guess I was pretty fortunate that it worked at all. My problem with it was that routes never worked correctly so ALL of my traffic was routed through the VPN. To be honest, they DID work, but the connection ALWAYS dropped off after a minute, sometimes less, so it was hardly usable. This was exceptionally annoying since everything worked just fine in 8.04 (Hardy)!

Thankfully in 9.04 (Jaunty), things seem to be working again. In fact, as I type this, my traffic is being sent from my local connection, even though I'm connected to the VPN at work. Since this still seems to be a big problem for many people, I thought I would post what worked for me.

First things first, in order to configure PPTP using network-manager, you'll need to install the PPTP plugin for it.

```bash
sudo apt-get install network-manager-pptp
```

After installing it, you will need to at least log off to restart network-manager. For me, I had to reboot. Before I did, I kept getting an error about a lack of secrets, which basically means that it can't connect to the password manager. Rebooting fixed that.

Next comes the configuration. You will need to know the IP address of the VPN server you wish to connect to, as well as your username and password. For me, I also needed to add routes for the internal network, the network that the VPN was on (we have the VPN on its own subnet at work) and the external network that your work has assigned to it. Without those, the connection would never route properly.

If you're reading this and you've come this far, I assume you already know how to get to the configuration, so we'll just skip to some screenshots to help you along. That last step may be optional, but it was a requirement for my configuration to work. YMMV.

![settings](/images/posts/edit-vpn-settings.png)

![connection](/images/posts/edit-vpn-connection.png)

![connection other tab](/images/posts/edit-vpn-connection2.png)

![routes](/images/posts/edit-vpn-routes.png)

Now, select the VPN connection and check out the routes.

```bash
route
```

If all went well, you should see some new routes going to the VPN network and be able to connect to the network resources. Something like this...

```text
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
10.242.1.0      *               255.255.255.255 UH    0      0        0 ppp0
some.domain     192.168.1.1     255.255.255.255 UGH   0      0        0 eth0
some.domain     192.168.1.1     255.255.255.255 UGH   0      0        0 eth0
192.168.1.0     *               255.255.255.0   U     1      0        0 eth0
10.242.1.0      *               255.255.255.0   U     24     0        0 ppp0
10.5.1.0        *               255.255.255.0   U     24     0        0 ppp0
default         192.168.1.1     0.0.0.0         UG    0      0        0 eth0
```

In my example, 10.242.1.0 is the VPN network, 10.5.1.0 is the internal network at work and some.domain is the reverse lookup of their IP address. Of course, 192.168.1.1 is the gateway for my local network. Look at all those beautiful ppp0 connections; working like a charm!

If it doesn't work, try logging off and possibly rebooting again. If it STILL doesn't work.... well, I'm out of ideas. There's always Google and the [Ubuntu forums](http://ubuntuforums.org/). Good luck!
