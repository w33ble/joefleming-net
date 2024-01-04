---
title: More Git Magic
date: 2012-06-03
alias: posts/more-git-magic/index.html
tags:
  - software
---

I recently had a chance to watch Gary Bernhardt's [git workflow](https://www.destroyallsoftware.com/screencasts/catalog/git-workflow) video and was blown away by a lot of the aliases he has set up (and by his workflow!). One of the coolest and most useful things he had setup was a log viewer that showed commits, their paths, the author, when it happened, comments and the branch they are attached to. Example:

![git oneliner with tree](/images/posts/2012-git-log.png)

You can see my [git-flow](https://github.com/nvie/gitflow) (an awesome project on it's own, blog post forthcoming) workflow in there on the left; see how the repo was branched and merged back in? As I said, crazy useful.

Setting this up was pretty simple too. Simply grab Gary's [.gitconfig](https://github.com/garybernhardt/dotfiles/blob/master/.gitconfig) and [.githelpers](https://github.com/garybernhardt/dotfiles/blob/master/.githelpers) dot files and toss them in your home path. Or, better yet, just copy everything but the [user] data from the .gitconfig and toss it in yours. Then fire off a `git ra` and marvel are the glory!
