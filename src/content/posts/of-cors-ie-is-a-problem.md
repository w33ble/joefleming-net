---
title: "Of CORS IE is a Problem"
date: 2012-05-24
#urls: "?p=295"
tags: "Computers &amp; Technology,Node.js,security,Software,web,web browsers,Web Development"
ignored: true
---

I'm in the middle of building a site in Node that's driven by a REST API, and the plan for the customer-facing site is to make it consume this API via Backbone. Of course, I'll be hosting the API on it's own subdomain and the site on the root domain. So now I've got a problem; cross-domain XHR.

I've seen a lot about <a href="http://www.w3.org/TR/cors/">CORS</a> lately, and after playing with it a little, I understand why. CORS allows your API to respond to the browser and say that cross-domain scripting is allowed by adding a few simple lines. In my case, I included the following in Express:

```js
res.header("Access-Control-Allow-Origin", "*")
res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, auth-token, user-token")
res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
```

This allows all the HTTP verbs I need, the couple custom header values I need and works across any domain. Mock up a test, fire up Chrome and Firefox and revel in the awesomeness. This is something that's been supported for a while too. <a href="http://caniuse.com/cors">Check it out</a>, Chrome 5+, Firefox 3.5+, Safari 4+, IE 8+... I can work with this. But wait a second, what's this "Partial support" in IE 8 and 9?

So, it turns out all's not exactly well. IE 9 and lower don't ACTUALLY support cross-domain XHR. IE8 and 9 use <a href="http://msdn.microsoft.com/en-us/library/cc288060(VS.85).aspx">XDomainRequest</a>, which is a similar, but not the same, call. OK, so I can create my own jQuery ajaxTransport and override calls in IE, right? Easy peasy! Of course, like all IE workarounds, this isn't entirely true, and it's not that easy. XDomainRequest only supports GET and POST, none of the other verbs. Cruse my insistance on REST compliance.

So now what? EasyXDM looks like a decent choice, but do I really need something that complex? Fortunately, since I'm on the same second level domain, I don't. Instead, iFrames and document.domain will do the trick.

The gist of it is, you load a static page from the API domain in a hidden iFrame on the client page and set the document.domain to the client domain on both pages. Then, you can do XHR requests in the child (API) and read the responses in the parent (client). This only works with third level domains though; ie, subdomains. For example, I can access api.domain.com from within www.domain.com, but I couldn't use this to access api.domain.com from www.anotherdomain.com.

Foursquare had a <a href="http://engineering.foursquare.com/2011/12/08/web-sites-are-clients-too/">blog post</a> late last year where they scratched the surface of how they did this. More accurately, they mentioned that they <em>do it</em> and they use document.domain, but that's about as far as they went with it. Fortunately, <a href="http://engineering.aioha.com/post/15082655842/building-a-web-client-like-pros">this blog</a> has distilled the magic.