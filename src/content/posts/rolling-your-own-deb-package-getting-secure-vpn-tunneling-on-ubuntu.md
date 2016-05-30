---
title: "Rolling Your Own .deb Package, Getting Secure VPN Tunneling on Ubuntu"
date: 2008-02-08
tags: "ubuntu, software"
icon: ubuntu
---

As you may or may not know, Ubuntu doesn't include a build environment by default. What this means is that in order to compile program from source, you'll need to get the build environment on your own. This is simple enough though, as outlined below:

```bash
sudo apt-get install build-essential checkinstall
```

This will install 2 things, the build environment (build-essential) and a program that will allow you to install your compiled code as a .deb package (checkinstall). Installing your code as a deb means that you can easily remove it on your own using apt instead of hunting down files and removing them by hand. Instead you just issue *apt-get remove PACKAGE* as root and it's gone.

I learned this while getting a VPN tunnel through <a href="http://www.torrentfreedom.com" rel="ext">Torrent Freedom</a> working. In order to use their service, you have to be running a Beta build of <a href="http://openvpn.net" rel="ext">OpenVPN</a>. Since the version in the Ubuntu repository is NOT the Beta, it won't work with that version. So, you have to roll your own, but it's easier than you might think.

First, go get the package from the OpenVPN site. At the time of this writing, version 2.1 RC7 was the latest Beta build. Once you have it downloaded, open up a terminal, navigate to the path you downloaded it to and uncompress it. I won't go through those steps, you should know this much already if you are trying to use VPN tunneling. Once there, execute the following:

```bash
sudo apt-get liblzo-dev libssl-dev
./configure
make
sudo checkinstall
```

I assume you have installed your build environment at this point. If not, you'll need to do that first before you can compile, This will install the dependencies you need to build OpenVPN, configure the source, create a binary from the source, build a .deb package and finally, install that package. You will be asked some questions when you run checkinstall, but it's nothing too pressing, so simple that I don't even see a need to cover it here.

That's it, now just run your compiled and installed application. If you are interested in running Torrent Freedom (or any other VPN tunnel for that matter), check out their specific instructions on how to get them up and running. For the focus of this post, my work is done.