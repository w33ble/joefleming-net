---
title: Tips for Publishing Modules to npm
date: 2016-05-05
---

I've been pushing some modules up to npm recently, and I've encountered some small issues along the way. I figured I might as well share a couple of tricks I use to make publishing modules easier.

First, if you've got some scripts you need to execute before publishing, such as running tests or transpiling or building your code, the `prepublish` npm hook is a natural solution. It's easy to set up, it works reliably, and it stops the publishing if your script fails. Unfortunately, [prepublish is also executed at install time](https://github.com/npm/npm/issues/3059), apparently by design, for some crazy reason that makes sense primarily to the people in charge. This is annoying for people using your module, especially when the `devDependencies` may not be there.

Fortunately, npm also holds the solution, in the way of modules. There's a few that will help, but I've been partial to [in-publish](https://www.npmjs.org/package/in-publish). Using it is simple enough, you simply wrap your scripts with `in-publish` and `not-in-publish`, like so:

```js
"prepublish": "in-publish && npm run test || not-in-publish"
```

This will cause prepublish to behave like you probably expect, and only run when you use `npm publish`.

My second involves `.npmignore`, which you should be using to prevent pushing things that aren't actually required to use your module, like your tests, into your package on npm. Naturally, you'll want to see what you're about to publish to npm before you actually do it; enter [unignored](https://www.npmjs.org/package/unignored).

Install it globally and run it in your source path, and it will show you a list of all the files you're about to publish in your package:

```bash
$ unignored 
lib/util.js
index.js
package.json
README.md
```

For best results, I recommend using *unignored* together with *in-publish*.

Happy publishing!