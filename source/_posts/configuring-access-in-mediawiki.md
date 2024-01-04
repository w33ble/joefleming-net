---
title: Configuring Access in MediaWiki
date: 2007-04-12
alias: posts/configuring-access-in-mediawiki/index.html
tags:
  - software
  - webdev
---

I've set up [Mediawiki](http://www.mediawiki.org) in a few times now, both at work and for personal use. Each time I do it, I end up having to learn how to set up access restriction again. That is, creating custom namespaces and restricting access to those namespaces to people that belong in specific groups.

The reason I do this is to keep of people out of articles that only privileged users should really be seeing. Articles about server configurations, software development, new ideas for sites, etc. Making a hidden namespace and allowing only specific groups to access it is the simplest way to go about this task.

Doing this is pretty straightforward.  I won't get in to all the specifics though; instead I'll post links to the exact information you'll need to pull it off.

- [User Rights](http://www.mediawiki.org/wiki/LocalSettings.php#User_rights)
- [Custom Namespaces](http://www.mediawiki.org/wiki/LocalSettings.php#Custom_namespaces)
- [Group Permissions](http://www.mediawiki.org/wiki/Manual:%24wgGroupPermissions)
- [Setting permissions for a Group on a whole new Namespace](http://meta.wikimedia.org/wiki/Preventing_Access#Setting_permissions_for_a_Group_on_a_whole_new_Namespace)

There you have it, nice and easy! Now I just need to fix/reinstall our personal wiki...
