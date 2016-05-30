---
title: "Remote Backups with Amazon's S3"
date: 2009-02-09
#urls: "2009/02/09/remote-backups-with-amazons-s3"
tags: "Computers &amp; Technology,Linux,Open Source,Software,software"
---

Recently, my SATA controller on my RAID box failed, silently corrupting my entire array. Fun stuff, I assure you. Luckily, I had backed up the array about a month before the failure and was keeping a nightly rsync running. I had a few things that weren't included in the rsync backup, but I didn't really lose much data. So, again, backups saved my ass!

But, I've been aware for a while that regardless of how much I back up, I still have everything in one place. If there were a fire or a robbery, I'd be completely SOL. This fact has prompted me to look for some free or very low cost online file storage services. Most of the ones I found required you to run their software for them to work. This wasn't very desirable for several reasons, the most important being that I run Linux and most of the services didn't have a Linux client to use. But even more than that, I wanted to be the one in change of the backups, something that would allow me to just set up a cron job that would encrypt my data and ideally use rsync (via <a href="http://www.ibm.com/developerworks/aix/library/au-filesync/?S_TACT=105AGY06&S_CMP=HP#N1014E">this script</a>) to send that data. Unfortunately, I still haven't found that, but I did find service that is both cheap and easy to use; <a href="http://aws.amazon.com/s3/">Amazon's Simple Storage Service</a>!

To be fair, I didn't find it, I was tipped off to it by a friend. I had heard of it, but never even considered using it for backups. Looking at the prices though, I couldn't resist. For just $0.15/month per GB stored and $0.10 per GB transfered, I would theoretically keep weekly incremental backups of 2GB worth of data for $0.70/month or less!

UPDATE: Standard storage is now $0.03 per GB, and Infrequent Access is $0.0125 per GB. Using IA, I've put a bunch more stuff on S3, and my monthly spend is like $0.50 now.

I was also pointed to some pretty handy Firefox extensions <a href="https://addons.mozilla.org/en-US/firefox/addon/6955">s3://</a> and <a href="https://addons.mozilla.org/en-US/firefox/addon/3247">S3Fox</a>. S3Fox is much cooler than s3://, but using it on my machine was causing X to use 100% of the cpu for some reason, so it wasn't really usable for me. s3:// suited me just fine, allowing me to create "buckets" and browse, upload and remove my files from those buckets. It also saved the login info so all I need to do is slap the full S3 path in the address bar (like s3://mybucket/) and I was off. Now that was convenient!

UPDATE: I just use transmit now, it's really seemless and feels like FTP.

Next up, I needed a way to script my backups. I was planning to use the s3fs Fuse library but I thought that might be overkill. Plus, for whatever reason, I'm just not ready to play with Fuse; it's super cool, but I just didn't feel like setting it up. Plus, I found <a href="http://s3tools.org/s3cmd">s3cmd</a>. Like s3://, it stores your login info to ease login and access of your files, but it offers one more step that is vital (at least to me); encryption!

```bash
s3cmd -e put myfile s3://mybucket
```

This will encrypt `myfile` locally and upload encrypted version to my bucket on S3. `s3cmd` uses symetric gpg and stores the password when you configure your AWS login information. Best of all, it transparently decrypts the file(s) when you download them from your s3 account. You don't even have to tell `s3cmd` that the file is encrypted, it automatically knows. Amazing!

So, while I wish I had rsync access to the s3 service, I can make it meet my needs with a little tar magic. Since tar has an option to only grab files that have been changed since a specific date, I can leave my huge, base archive up there and just create a weekly tar file of all of the changed files since the last weekly tar file. So, I have my backup from today (2/9) and in a week (2/16) I'll create a backup of all files that have changed since today (2/9). A week from then (2/23), I'll create an archive of all the files that have changed since previous week (2/16) and so on. When the incremental backups start to get too large, I'll simply create a new base backup and start the process all over again. Should work out swimmingly!