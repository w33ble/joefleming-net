---
title: Nginx, SSL, and Cloudflare baby
date: 2018-06-04
alias: posts/nginx-ssl-and-cloudflare/index.html
tags:
  - software
  - webdev
  - linux
---

Last week I was migrating servers, from a dirt cheap annual plan to a basically just as cheap [cloud hosting plan on Hetzner](https://www.hetzner.com/cloud). I was pretty excited to start using Docker for hosting, not for everything, but as an easy way to spin up services. I could have done it on my old host, but messing up would have meant opening a ticket and waiting for a new server, something that I don't have to do on Hetzner. Their setup is more like Digital Ocean or Linode, where they bill hourly and you can provision new servers with a button in their web interface.

Anyway, I got things working pretty quickly, and decided maybe it was time I finally got around to setting up SSL for the sites and tools I'm hosting. Of course, Letsencrypt was a no-brainer, and [certbot](https://certbot.eff.org/) made that pretty simple to set up. However, I didn't want to use most of the automation build in, mostly because I wanted to understand how it worked, and because that site doesn't list instructions for Ubuntu 18.04, which is what I'm running.

A quick search turned up [this article from Justin Silver](https://www.justinsilver.com/technology/linux/letsencrypt-free-ssl-certificates-nginx/), which is also where I learned about the magic of snippets and includes in Nginx. My setup is pretty simple, I use Nginx as a reverse proxy to connect port 80 to other various ports based on domain name. My plan was to terminate SSL at Nginx and not change any of my sites, which worked exactly as expected. Well... mostly.

I had a rule that would re-write requests to `www.whatever.tld` to simply `whatever.tld`, and I set up my cert for the non-www version of the domains. That's been around forever, and worked well. The next logical rule to add was to "upgrade" HTTP requests by redirecting them to the HTTPS version. Generally speaking, that's simple too, you just have something like this:

```yml
server {
  listen 80;
  server_name whatever.tld;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl;
  server_name whatever.tld;
  # ...other rules
}
```

So I added that, and requests to HTTP did in fact start returning 301's. The problem was that requests to the HTTPS endpoint were also returning 301's to the same URL, so the request would just infinitely get redirected to itself and the browser would eventually just give up. But how could that be? The redirect was only listening on port 80. I even changed the rule to test for the scheme:

```yml
server {
  listen 80;
  server_name whatever.tld;

  if ($scheme = http) {
    return 301 https://$server_name$request_uri;
  }
}
```

And still, redirect loops. Then it dawned on me; I have all my sites set up behind Cloudflare reverse proxies. Not so much because I need it, but because I have all my DNS records set up there as well, because their DNS interface is second to none. And at that point, why not enable their secure proxy?

Turns out that, by default, Cloudflare operates in what they call *Flexible* mode. It took me a while to figure out what that meant or how it affected me, but I found [this support article](https://support.cloudflare.com/hc/en-us/articles/200170416-What-do-the-SSL-options-mean-). It describes it as "A Secure connection between your visitor and Cloudflare, but no secure connection between Cloudflare and your web server." This means that HTTPS requests work, but Cloudflare will **always** send the traffic to your server as HTTP, over port 80, even if you have a valid cert.

Once I had all that information, the answer was pretty simple; switch the crypto config to Full SSL, or Full SSL (Strict). The later requires a valid cert, which is fine since Letsencrypt is a valid CA, so that's what I went with.

![cloudflare crypto settings](/images/posts/2018-cloudflare-crypto.png)

And with that, it all works! As you can see, this site is now behind HTTPS, and the cert is valid. So if you're also trying to set up SSL on a site you have behind Cloudflare, save yourself some headache and check your crypto setting on the domain.
