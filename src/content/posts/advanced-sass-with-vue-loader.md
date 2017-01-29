---
title: Advanced Use of Sass with Vue-Loader
date: 2017-01-29
tags: software, web development, javascript, vuejs
---

As I've [mentioned before](/posts/crushing-on-vue-js/), I've been using Vue.js a bit lately, and really enjoying it. This weekend, I set out to use [Sass](http://sass-lang.com) with [vue-loader](https://vue-loader.vuejs.org/en/), using Webpack 2.2. Getting it working was really simple, just install *node-sass* and *sass-loader*, add `lang="sass"` to your style tag, and everything works.

The problem is, when your styles get built, they get built into your javascript. This is fine for development, but when you create a "build" of your application for hosting, you want at least one separate CSS file with all of your styles in it. CSS loads in parallel with Javascript, and then can also be cached separate from your scripts. Plus, users don't have to wait for all your scripts to load to get styling on the site.

Setting it up looked simple enough, the *vue-loader* docs have a section on [using pre-processors](https://vue-loader.vuejs.org/en/configurations/pre-processors.html), and another section talks about [extracting CSS](https://vue-loader.vuejs.org/en/configurations/extract-css.html), which is exactly what I wanted. However, it wasn't clear how to set up both a pre-processor and the CSS extraction, perhaps because I'm also very new to Webpack. To make matters worse, the site that hosts the Webpack 2 docs was offline, so I couldn't try to make sense of the configuration. I figured the solution was probably a mix of both of the above configurations, and while it took a little trial and error, I did manage to get it working. 

I ended up using the *extract-text-webpack-plugin* package as recommneded in the *vue-loader* docs. First, I modified the the vue component rule with some [advanced loader configuration](https://vue-loader.vuejs.org/en/configurations/advanced.html) for sass files.

```
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          sass: ExtractTextPlugin.extract({
            loader: 'css-loader!sass-loader?indentedSyntax',
            fallbackLoader: 'vue-style-loader',
          }),
        },
      },
    },
  ],
},
```

Then, following the [extract-text-webpack-plugin docs](https://github.com/webpack-contrib/extract-text-webpack-plugin#usage), I added a plugin to extract the styles out into a file. I used the *contenthash* to get a unique file every time the content changed, which is useful for cache busting. This just required one new rule in the plugins configuration.

```js
plugins: [
  new ExtractTextPlugin(path.join('css', 'style.[contenthash].css')),
]
```

Now, I can add sass markup to my Vue components, even using libraries I've added from npm packages, and it all gets compiled into a single css file. For example, I can install [Bulma](http://bulma.io/) via npm, and *@import* it into my own markup.

```html
<style lang="sass">
  @import '~bulma/sass/utilities/_all'
  @import '~bulma/sass/base/_all'
</style>
```

And when I create the build, I get my uniquely named css file, which changes only as I make style changes. Even better, I can use *html-webpack-plugin* to automatically inject that markup in the `<head>` of my built *index.html* file. Pretty slick.

I started working on a [loopback and vue.js boilerplate](https://github.com/w33ble/loopback-vue-app) that now has this feature. When I have it in a state that I'm happy with, I plan to turn all this into a vue-cli template too.