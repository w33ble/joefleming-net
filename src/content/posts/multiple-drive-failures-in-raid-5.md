---
title: "Multiple Drive Failures in RAID-5"
date: 2009-01-29
#urls: "2009/01/29/multiple-drive-failures-in-raid-5"
tags: "hardware, linux, software"
icon: harddrive
---

I have a server set up with a RAID-5 array that I use to back up pretty much all of the data I have. Sure I have a bunch of things burned to DVD, but at only 4.3GB a pop, that can very quickly add up to a number of DVDs, and in fact already has. My server is actually an upgraded version of my old machine, running 4 500GB drives in a RAID-5 configuration. Since I'm cheap and don't care all too much about performance, I use software RAID in Debian with mdadm running the show.

A short while ago, I had a drive that started clicking every time I would transfer large amounts of data to of from the box. Since all of the drives are mounted on the same bracket, it was nearly impossible to tell which drive was actually doing the clicking. I had a spare that I picked up a while back, so I figured I would wait for the drive to fail and then simply replace it. The problem was, when the drive finally did fail, another drive also failed with it, and if you know anything about RAID-5, you know it can only handle 1 drive failing at a time. Things were looking bad.

I noticed, however, that both of the drives failed at the same time, which made me think that only the first drive was an actual failure and that either mdadm, the drive controller or something else cause the system to think that the other drive also failed. This was my only hope, so I set forth re-adding the second failed drive to the array and crossing my fingers.

In my case, /dev/sdc1 and /dev/sdd1 were the 2 drives that failed. /dev/sdc went first, so I suspected that /dev/sdd was still ok. After some prodding of the <a href="http://plug.phoenix.az.us/">PLUG</a> mailing list and a little poking around on Google, I was able to solve my problem. First, I needed to see if I could verify that /dev/sdc was really the drive that failed; I did this with mdadm's --examine function.

```bash
sudo mdadm --examine /dev/sda1
sudo mdadm --examine /dev/sdb1
sudo mdadm --examine /dev/sdc1
sudo mdadm --examine /dev/sdd1
```

Why do all of the drives? Well, I was looking for a sign of inconsistency or other problems. Sure enough, the superblock data on /dev/sdc was different from the other 3 drives, leaving me pretty confident that my plan would work. All I had to do now was replace the drive and figure out how to tell mdadm to use /dev/sdd1 even though it thought the drive was a goner.

Since I use 4 of the same drives and for whatever reason the /dev label don't match up with the controller labels (ie. /dev/sda is not on port 1 of the card), I needed to find out the serial numbers of the drives. There are a couple ways to do this, but for whatever reason, only smartctl worked for me. Here's a couple ways to look it up (where /dev/sdX is the device you are trying to find information about, like /dev/sdc in my case):

```bash
sudo hdparm -i /dev/sdX
sudo smartctl -a /dev/sdX
```

Once I knew the serial number, I shut the box down, replaced the drive and booted back up. Now I just needed to format /dev/sdc1, add /dev/sdd1 back to the array, add /dev/sdc1 as a new device to the array.

```bash
sudo fdisk /dev/sdc (set up 100% of the drive as a Linux-raid Autodetect)
sudo mdadm --assemble --force /dev/md0 /dev/sda1 /dev/sdb1 /dev/sdd1
sudo mdadm --manage /dev/md0 --add /dev/sdc1
cat /proc/mdstat
```

That last line shows the status of all mdadm arrays running. When I ran it, it told me that all 4 drives were online and that the array was rebuilding/resyncing all of the information. 9 hours later, I was up and running.

As an aside, I've had *terrible* experiences with 500GB drives. I the past year I've had 2 of them fail on me (both Seagate). I've also had about 3 160GB drives fail on me (2 Seagate, 1 Western Digital) within the past 3 years. In nearly every case, the drives were still under warranty. Because of the rapidly declining quality of hard drives today, I've been keeping my data spread across a number of sources, some even in triplicate. Since this last failure, I've switched from 500GB Seagate drives to 1TB Western Digital drives and I'll have to see how that decision plays out in the long run.

For now, I'm backing up the entire array on to another 1TB drive and I plan to replace the array with a simple RAID-1 array made of 2 1TB drives while still keeping another backup on a 3rd, external 1TB drive. I have a daily cron job that pulls data from all of my machines and even my web server and backs them up in various locations. The moral of the story I guess is that it's good to know how to fix your equipment, but you need to be ready for a catastrophic failure by keeping meticulous backups of your most crucial information.

UPDATE: 1TB WD Black drives have been bulletproof! Even in 24/7 operation for the last few years, I've had no problems with them, and I have about 6 of them in use.