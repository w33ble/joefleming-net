---
title: Fallout 3 Terminal Hacker
date: 2009-01-30
tags:
  - games
  - javascript
  - software
---

I recently started playing the game Fallout 3 a little more and I came across a terminal I could actually attempt to hack. After a few failed attempts at it, I thought I would poke around on the Internet and see if anyone had any guides for hacking the things. Instead, I found [this online terminal hacker](http://mediumexposure.com/dev/f3hack/), among others (this was the best one though). I thought, "man, that's pretty slick, but I wish I has something that I could run locally in the event my Internet was down." I poked around online a little and found a bunch of people claiming to be prepping downloadable, standalone versions, but nobody had yet delivered. Then I thought, "I bet I could write me own," and that's exactly what I did.

The rules for hacking the terminals are:

- You get 4 tries, after which you can never try again
- If you exit before the 4 tries are up, your available tries reset to 4, but you also get a new puzzle
- For each word you pick, you will be told how many matching letters you got
- That count is how many matching letters there are in the SAME position of the correct word

Originally, I was going to write it in Python. That way I could potentially execute it from anywhere I could install the Python interpreter and it would give me a reason to dive in to Python. Then I decided I wanted it done quick, and in an even more portable way; as a raw HTML page. [So, I decided to write my version in Javascript on a static HTML page.](/files/fallout3terminalhacker.html)

I used the one over at mediumexposure.com as a benchmark and honed mine down a bit (I didn't catch that last rule when I was playing the game, which is why I could never figure the puzzles out). I will admit, mine isn't as smart as his since it doesn't take past guesses and matches into account, only the most recent guess and the remaining list of possible words. So, there's a chance mine won't guess correctly in the 4 attempts, but in the handful of tests I ran, I always managed to get it.

Now, I know what you might be thinking. "Hey, this is just another online file, how is this portable? How can I run it from my machine?!" Simple, save the html file to your computer and open it locally. All of the magic happens in the Javascript code (which I commented so you can follow along), which will run from your machine without the need for any extrernal processing or server. Go ahead, give it a spin and be sure let me know what you think in the comments. It's a work in progress, so when I make it smarter, I'll update the file and post again. Enjoy!
