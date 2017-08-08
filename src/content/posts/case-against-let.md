---
title: A case against let
date: 2017-08-08
tags: software, web development, javascript
---

Way back in June of 2015, es6 (or es2015 if you prefer) was finalized. One of the new things it brought, and arguably the easiest one to understand, was block-scoped varibles. Namely, `let` and `const`. There are tons of articles around about how they work and how they differ, like [this one from Wes Bos](http://wesbos.com/let-vs-const/), so I won't dive deep into that. The gist is that `const` prevents you from re-assigning a variable, and `let` allows it.

In practice, almost all of your code can use `const`, the need to reassign a variable is actually pretty rare. For example, if you're pulling in dependencies, or defining functions, you want const:

```js
const $ = require('jquery');
const { get, set } = require('lodash');

const myFunc = function () { 
  // stuff
};
```

Why `const`? Because reassigning these things isn't very practical, you wouldn't expect these assignments to change. That is, `$` above should always be the same instance, no matter where you use it in your code.

I actually take a harder stance, which is that you should *never* use `let` in your code. Any time I see `let`, I suspect the author was either either being lazy, or didn't understand the difference between the two. And except for really, *really* rare cases, I contend that code that uses `let` can be written better with `const`. 

So how can you avoid using `let`? The solution, in my experience, is almost always as simple as using a ternary. Let's take a common example (at least in my experience) of where somewhere might use `let`; setting a default value.

```js
let item = {};
if (thing) item = thing.value;
```

There's a default value that you want to change if some condition is met. This is simple to re-write as an inline ternary.

```js
const item = (thing) ? thing.value : {};
```

But what happens when you're dealing with very long varibable names, or reaching deep into an object, and you don't want to (or can't) exceed a specific line length? You could always do the ternary on multiple lines. 

```js
const item = (typeof thing.somePropsInObject.someOtherMethodDeeperInObject === 'function') 
  ? thing.somePropsInObject.someOtherMethodDeeperInObject()
  : null;
```

This might meet the requirements, but it's not great to read. Instead, you could destructure off the value you need early, and just check the value you got. You could even give it a short and more descriptive name in the process.

```js
const { someOtherMethodDeeperInObject: objMethod } = thing.somePropsInObject;
const item = (typeof objMethod === 'function') ? objMethod() : null;
```

Short, simple, pretty easy to understand (especially if you used a more meaningful alias here), and no `let`. 

The other thing I see from time to time is the use a `let` and `forEach`.

```js
let userNames = [];
users.forEach(function (user) {
  userNames.push(user.name);
});
```

This is cringe worthy, but it happens, usually with newer developers who don't yet know about the magic that is [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). This can very easily be written as a one-liner with map.

```js
const userNames = users.map(function (user) { return user.name; });

// even shorter with an arrow function
const userNames = users.map(user => user.name);
```

There's also some tricky stuff I you can do with [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), but that's probably a topic for another post.

The next time you reach for `let`, stop and ask yourself if there's a better way to write what you're writing. I bet there is!