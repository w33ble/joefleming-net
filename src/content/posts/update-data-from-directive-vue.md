---
title: Updating state from a directive in Vuejs
date: 2017-07-28
tags: web development, javascript, vuejs
---

This week, one of the local devs in a [local Slack group](https://azwebdevs.org/) has been asking about integrating Vue into some legacy code. In particaular, he was trying to build a Vue component that used some existing jQuery plugin code; a select box wrapped in [chosen](https://julesjanssen.github.io/chosen/). He wanted to wrap this functionality in a directive, and write something like this within the Vue component:

```html
<select v-chosen="dataProp">...</select>
```

The idea here is that this chosen directive would update the local `data.dataProp` value when a user interacted with the select. It seemed pretty straightforward, but according to the [custom directive docs](https://vuejs.org/v2/guide/custom-directive.html) (and the warning he was getting):

> Apart from el, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element’s dataset.

So while he got the value from the `binding` property, he wasn't allowed to change it. Not knowing how to do this the "right way," he asked in the Slack group, and as I've become kind of the local "Vue guy", pinged me specifically. I've never written a directive before, but it made me curious; the `v-model` directive does exactly this, keeping a local value in sync as the user interacts with an input, so if directives are meant to be read-only, how does that happen?

I dug through the source code a little, but it's kind of tricky to follow. A little searching led me to [this stack overflow post](https://stackoverflow.com/questions/40009197/update-model-from-custom-directive-vuejs), which shows the value being changed using the `vnode.context` property. Unfortunately, the vnode documentation is pretty much non-existent, but it does link to [the source code](https://github.com/vuejs/vue/blob/fed602b90be89a43b4ec41b5a2e0a526d3a5f4a2/src/core/vdom/vnode.js), which uses Flow type definitions. In the case of `context`, the type is listed as "Component", with a comment that reads "rendered in this component's scope". 

My assumption now was that `vnode.context` was actually a reference to the Vue component instance. Recalling the [Vue instance docs](https://vuejs.org/v2/guide/instance.html#Properties-and-Methods) show that you can update a value externally if you have access to the instance, and given that assumption, I recommended trying to set the value that way. And it worked!

The tricky part, then, is parsing the `binding.expression` value (ie. the string value given to the directive) and turning that back into the object path to use on `vnode.context`. This is outlined in the stack overflow post as well, but only handles dot notation. Fortunately, for his needs, that was good enough.

I'm left wondering if using a [mixin](https://vuejs.org/v2/guide/mixins.html) here would be a better choice, and hopefully some time soon I'll sit down and try it out. But if you're trying to update a component's value from within a directive, don't use `binding.value`, `vnode.context` is the answer.