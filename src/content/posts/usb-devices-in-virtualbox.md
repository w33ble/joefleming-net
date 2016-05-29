---
title: "USB Devices in VirtualBox"
date: 2007-09-06
---

I've been using [VirtualBox](http://www.virtualbox.org/) for a while now after finding it in Automatix in Ubuntu. Anyway, until now, I've been perfectly happy not using USB devices with it. For the most part, I still am, but I was curious how hard it was to set up, so I looked it up. Here's what I found (originally posted [here](http://ubuntuforums.org/showpost.php?p=2202027&postcount=18)).

- Install the other OS
- Create a group called "usbfs" and add yourself to it: `groupadd usbfs; usermod -aG usbfs <username>`
- Edit /etc/fstab and add the following, changing the group ID to match that of the usbfs group you just added (tail /etc/group): `none /proc/bus/usb usbfs devgid=1002,devmode=664 0 0 # 1002 is the USB group ID`
- In terminal, issue the following command to see available USB devices: `VBoxManage list usbhost`
- Use the output of this command to set up the filters for USB devices under VirtualBox.
- Reboot your machine. This is required to both recognize the new group and new mounting options

*USB DEVICES HAVE TO BE UNMOUNTED BEFORE THE VIRTUAL MACHINE CAN RECOGNIZE THEM*

There it is. Now, simply unmount the USB device from the host OS before booting the guest and you're good to go.