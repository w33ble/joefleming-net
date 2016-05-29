---
title: Grunt, for a Painless Build Process
date: 2013-04-27
tag: software, development, web development, node, grunt
---

In the world of web development, build processes are becoming a must. For one thing, abstractions are quickly becoming the norm, particularly with CSS, because Less, Sass and Stylus offer so much more than vanilla CSS that they are worth adding a build process just to use them.

Client-side templates, like Handlebars and Underscore are also growing in popularity as websites are increasingly being written as a UI for APIs, and while templates may not *need* to be pre-compiled, doing so goes a long way toward speeding up your site. And it's so easy to do that there's no reason not to, especially once you're site has any traffic.

Makefiles and asset pipelines go a long way to easing build pains, but adding a real build process to your development process will make your life a LOT easier. Enter [Grunt](http://gruntjs.com/).

Grunt is pretty easy to get started with. Install some [plugins](http://gruntjs.com/plugins), write a few lines of config, and you're up and running. Since most of the plugin configurations follow the same patterns, you can be productive with Grunt very quickly. And once you get used to using it, you'll start using it everywhere.

One hugely useful plugin is the [watch process](https://github.com/gruntjs/grunt-contrib-watch), with which you can auto-build your project as you make changes to it. You don't have to worry about running your build process by hand, it just happens as you work. It's magic! And you can segment your watch processes too, so only specific parts get built as changes are made; so your Coffeescript isn't rebuilt when you make a change too your Stylus, for example.

Using Grunt also allows you to do things like lint your code as you make changes, alerting you to bad syntax and any other rules you've configured as you work. Plugins will lint you Javascript, Coffeescript and even your CSS, and stop the build process and alert you if there's an issue. This can be invaluable when you're working with a team and need to enforce syntax guidelines; simply create one configuration file that's part of the repository and now your team is all working with the same rules.

If you're writing tests for you code, you can do the same thing with those as well, running your tests as you work and alerting you to breaking changes as they happen. And again, it'll only run tests against code that has changed, so it happens very quickly, and without you even needing to think about it.

You can also set up tasks for building a dist package of your project, in which you concatenate and minify all of your resources down to as few files as possible. Because the Grunt config file supports referencing configuration settings from unrelated tasks as variables, this becomes a pretty easy process if you're already using Grunt to lint, precompile and build your assets.

Grunt is especially handy because it's a build system written in Node.js, and Node is well-support on Linux, OS X and Windows. This is important, as it means your build process becomes very portable. And since most of what you'll be using Grunt for is front-end assets, Grunt is useful for just about any project, regardless of the technology stack. For example, I've been using it for client projects written in PHP to build front-end templates and compile Less.

If you're doing any web or any other development in which you are building or pre-compiling assets or performing tasks regularly as you work, check out Grunt, it'll very likely save you a lot of time and make your workflow a whole lot smoother.
