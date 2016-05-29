---
title: Configuring Apache and fcgi for Multiple Wordpress Sites
date: 2013-07-05
tags: software, wordpress, servers
---

For my managed Wordpress hosting service, [WPCurrent](http://wpcurrent.com), I kept running in to an issue with the server running dangerously low on available memory, even after only taking on a handful of sites. This was caused by the fact that I run each site in an fcgi process, which itself runs several Apache instances of the site to keep response times as low as possible. Most of the processes sit idle, just ready to handle new requests. This is good in theory, but these idle processes still consume the full amount of memory required to run the site, and with the default Apache configuration, there can be a lot of instances, and they don't shut down for a long time, which can very quickly lead to memory issues if you are hosting several different sites via fcgi.

The problem is compounded by Wordpress' not insignificant memory footprint. For most sites I was taking on, the apache instances needed to allocate 64MB of RAM to avoid issues, and sites that used a lot of large plugins required up to 128MB. By default, Apache was set up to keep 5 spare processes for each fcgi instance, with a max of 10, meaning a single site might consume as much as 1GB of memory. That doesn't scale well.

My solution ended up being to only keep a couple idle processes, drop the max process count, and also to drastically reduce process timeouts, so the idle processes would close themselves automatically instead of continuing to consume memory. To pull this off, I spent a bunch of time reading through the [Apache prefork docs](https://httpd.apache.org/docs/2.0/mod/prefork.html).

In the end, I ended up with the following in `/etc/apache2/apache.conf` (NOTE: This is on Ubuntu 12.04).

<pre><code>
MaxKeepAliveRequests 60
KeepAliveTimeout 5

&lt;IfModule mpm_prefork_module&gt;
    StartServers 4
    MinSpareServers 2
    MaxSpareServers 4
    MaxClients          70
    MaxRequestsPerChild 100
    MaxMemFree 800
&lt;/IfModule&gt;
</code></pre>

One interesting thing to note is that each Server has a number of SpareServers, so this will actually run between 8 and 16 Apache processes per user. Each process will handle at most 100 requests and then die, causing a new Spare to start up if needed. Processes will remain open for 60 seconds at most, and only stay active for a single user for 5 seconds before handling requests from other users. Lastly [MaxMemFree](https://httpd.apache.org/docs/2.0/mod/mpm_common.html#maxmemfree) isn't quite what it may sound like; this is the most amount of memory that can be consumed before the prefork process is forced to free up more.

Essentially what is happening is idle processes are killed and active processes time out quickly and are very limited in the amount of resources they can consume. This has one big caveat; if your sites run slowly and requests take more than a second or so, requests will start getting very slow under heavy traffic, as they are queued up until a process is free to handle them. [Caching](http://wordpress.org/plugins/wp-super-cache/) will be your savior here, and using a [caching CDN](https://www.cloudflare.com/) will help you out as well.

I am careful not to take on slow sites, as their slowness will be exponentially compounded under load. Because I put in the time to make each site run very quickly (average page loads on sites I'm hosting are around 600ms), this works well for me. The box I'm on now has 4GB of RAM, and even under the higher afternoon and evening loads, I still typically have 1.5GB free.

If you're having problems with your Apache server running cgi/fcgi and running out of memory due to a bunch of spare, idle processes, spend a little time reading up on prefork settings.