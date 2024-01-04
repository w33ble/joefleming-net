---
title: Using Semantic Commit Messages
date: 2017-08-18
alias: posts/using-semantic-commit-messages/index.html
tags:
  - software
  - webdev
---

I was recently exploring the world of monorepos and trying to see what tools were available for working with them. Many repos seem to use [Lerna](https://github.com/lerna/lerna) for this, at least in the node world, so I was reading the docs to learn more about it.

One of the nice things Lerna handles is package versioning, and there was a lot of talk about using [semantic-release](https://github.com/semantic-release/semantic-release) to automate this, which sounded really interesting in general. The idea is pretty simple; you make a small tweak to the way you write commit messages, and as a result, you can use tools to handle versioning and changelog generation.

For me, when I release something, I need to review all the changes since the last version, summarize them in a CHANGELOG file, and then decide if this is a patch, minor, or major release. It's always manual, and usually pretty cumbersome so, removing that step is quite appealing.

So what does this look like? It's pretty simple, you just add a prefix to your commit messages about what the commit does. For example, let's say I'm adding some new feature to a CLI module that allows a new argument to be used. You'd write the commit as something like this:

```text
feat: add -y flag to skip interactive prompts
```

The import part is the leading `feat:` part, short for feature. If you were fixing a bug, use the `fix:` prefix. For breaking changes, add `BREAKING CHANGE` to the message body. There's also a `chore:` prefix for handling things like writing tests or development related changes.

You can actually use whatever prefixes you want (the [Angular repo uses a bunch of their own](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit), and then configure the tools for the tags you're using, but these are simple, seem pretty standard, and are easy to learn. They also map well to the [semantic versioning rules](http://semver.org/), and this is why you can use tools to determine the version for the next release.

One thing to note is that following this convention doesn't get in the way of other people, so you can start using this everywhere right now (unless you already have other commit message rules I guess...). And if you need to win over your co-workers, showing them how this small change can automate away some menial work would likely be pretty convincing.

Worried about enforcing these commit rules? Fear not, there are tools for that too, but keep in mind they are another small barrier for external contributors. Alternatively, if you are squash merging branches or pull requests, you can simple add the prefix and body message to the squash commit and not burden others.

So there you have it, semantic commits. It's a simple idea that you can start using right now that can have some nice future benefits.
