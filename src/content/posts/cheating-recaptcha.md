---
title: "Cheating reCAPTCHA"
date: 2012-12-02
#urls: "2012/12/02/hacking-recaptcha"
tags: ""
---

This isn't a post about bypassing [reCAPTCHA](http://www.google.com/recaptcha), but rather, some fun information about the service. I've mentioned this to a number of people, and I have yet to run in to someone else who already knew this. Hopefully you'll find it fun too. I don't recall how I know this, but apparently it's not exactly common knowledge.

- Google bought reCAPTCHA
- Google is crowd-sourcing cleanup on the book scanning project
- reCAPTCHA is being used to do the crowd sourcing

Case in point:

![reCAPTCHA](/images/posts/2012-recaptcha.png)

You've seen this type of captcha all over the place I'm sure, and it seems to be the Right Way™ to do captchas. I know it used to work very well, and I trust since everyone still uses the service that it still works well. Here's the fun bit; **you only have to correctly identify one of those words**. Put another way, you can enter anything you want for one word as long as you get the other, proper word right.

So how do you tell which one you have to solve correctly? It's a little hit or miss, but usually it's the harder one to read, the one that's all wavy and is usually not a word but instead just a random string of letters. In this case, I only need to get *andignsu* right, the other word is used to either aid or confirm Google's book scanning OCR algorithm. Typing in, say *andignsu butterflies* would count as a success.

And there you go, now you know how to hack reCAPTCHA and successfully make it through without properly solving it. Great nerdy fun!