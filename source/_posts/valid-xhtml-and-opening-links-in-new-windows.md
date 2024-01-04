---
title: Valid XHTML and Opening Links in New Windows
date: 2007-12-16
alias: posts/valid-xhtml-and-opening-links-in-new-windows/index.html
tags:
  - webdev
---

Well, as you can plainly see (assuming you've been here before), the site has gotten a facelift. Now that [Aaron](http://aaronstaves.com/) has his blog up and his looking really nice, I felt compelled to try and jazz up mine a little too. It's not done, but it's nicer than it was. I'll probably add a touch of color to the theme, but it'll work for now. BTW, it's based off the [Milc 3.5](http://weyland.be/wrdprss/index.php/2006/01/05/wordpress-theme-milc3-35/) theme. The code isn't super pretty, but it was a good start.

While I was working with the design, I realized that I needed to send over my old bit of code that opened links in new windows. As anyone trying to make valid XHML pages can tell you, the *target* attribute is no longer valid, so if you want pages to open in a new window and you still want your design to validate properly, you have to do a little scripting. I actually found this script a couple years ago to make MediaWiki links open in new windows and it's served me quite well ever since.

```js
function makeExternal() {
  //make sure the function works
  if (! document.getElementsByTagName) { return; }
  var myRegExp = new RegExp("ext","i");
  var anchors = document.getElementsByTagName("a");
  for (var i=0; i < anchors.length; i++) {
    var anchor = anchors[i];
    if (anchor.getAttribute("alt") && anchor.getAttribute("alt").match(myRegExp) ) { anchor.className+=" external"; anchor.target="_blank"; }
  }
}
```

You run the function at page load and selected links will now open in a new window. To make a link work this way, you add `rel="ext"` to the anchor tag, which is still valid because *rel* is a valid attribute. What's nice is this also sets up a relation between your page and the link; ext being short for external. The script parses all anchors for that *rel* attribute and if it finds *ext* in value, it appends the class 'external' and sets the target attribute of the link to '_blank'. It's a little hacky, but it works like a charm and any browser with a DOM that supports getElementsByTagName.

Note that you don't have to append any class name if you don't want to. I like that I can make the links indicate that they will be opening in a new window by using a little icon as you can see on this site. I like the icon MediaWiki uses a lot, but the way it uses (indicating that it's an external link) doesn't make as much sense as using it to show that a new window will open. That's my take anyway.

This isn't the only way to achieve this result, and Google will provide you with a million other ways, but this is what works for me. Just thought I'd share.

UPDATE: This code is no longer used on this site.
