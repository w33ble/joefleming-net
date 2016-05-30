---
title: "Git Flow"
date: 2012-06-07
#urls: "2012/06/07/git-flow"
tags: "git, development"
icon: git
---

[Git flow](https://github.com/nvie/gitflow) is basically just a shell script that automates some parts of git. But the parts that it automates make it pure bliss to use. From Jeff Kreeftmeijer's [blog post](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/) on the subject:

> I’m astounded that some people never heard of it before, so in this article I’ll try to tell you why it can make you happy and cheerful all day.

That post is decent introduction in to how to use git flow. The idea is simple; everything is developed in the develop branch, but you work in smaller sets on features, which get their own branch until they are merged back in to the develop branch. When you're ready to do a feature freeze and start squashing bugs, you create a release branch, and once the code is ready to go live, changes in that branch get merged with master and back to develop. If something breaks on production, you hotfix it and merge those changes back to develop as well. This graph, taken from [this excellent presentation](http://buildamodule.com/video/change-management-and-version-control-deploying-releases-features-and-fixes-with-git-how-to-use-a-scalable-git-branching-model-called-gitflow), is a pretty solid summary of the flow:

![Git flow timeline](/images/posts/git-flow-timeline.png)

Now, you may be thinking, "all this branching and merging really sounds like a pain in the ass!" It does *sound* that way, but I assure you, it's not. Here's the rundown:

```bash
git flow feature start login
//add a login to your product
git flow feature finish login
```

The whole time you were working on adding a login, everyone else was updating the develop branch, maybe there was a feature freeze and others were preparing for release, whatever. Say you needed to work on something in the develop branch or help prepare for the release; just check out the branch you need to work on and come back to your feature/login branch later. When you're done, git flow will remove the branch and auto-merge everything for you.

For me, even just using it as a reminder to to create a branch when I start work on something new is invaluable. Since the tool does all the merging and everything for me, there's really no reason not to work that way, and in fact, a lot of reasons TO work that way, not the least of which is being able to easily roll back by simply removing the feature branch.

I started using git flow a couple weeks ago and have since introduced 2 other developers to the project. Much like myself, both of them found it really handy to work this way. Check it out, I think you'll really dig the workflow.