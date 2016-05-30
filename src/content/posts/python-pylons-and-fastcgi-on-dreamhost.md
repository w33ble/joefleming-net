---
title: "Python, Pylons and FastCGI on DreamHost"
date: 2007-12-02
---

All of the domains that I oversee (and those of most all my friends as well) all live on a server on <a href="http://www.dreamhost.com/">DreamHost</a>. Their plans are amazing; tons of storage space, tons of bandwidth, unlimited domains and emails, shell access and a slick administration tool. That being said, I've always stuck with PHP because it's all I know and it's very simple to get working. That all changed recently when a friend of mine and I decided it would be fun to learn Python.

DreamHost is an amazing hosting company. Not the best or fastest servers in the world, but by FAR the cheapest and plenty enough for our needs (and apparently the needs of MANY others too). I learned this weekend that their support for running python over their FastCGI (which you have to use) doesn't work as advertised though. And even when I scoured the 'net for answers they all said the same thing. The defacto tutorial seems to be <a href="http://blog.micampe.it/articles/2006/11/26/a-tale-of-pylons-python-and-fastcgi-on-dreamhost">A tale of Pylons, Python and FastCGI on Dreamhost</a>, referenced by several sources and many people in the forums. Sadly, that tutorial doesn't work as-is, if it ever did. It's extremely close, but not complete. I also found a tutorial for <a href="http://blog.localkinegrinds.com/2007/08/20/custom-python-installation-for-django-on-dreamhost/">rolling your own Python</a> and combined the two (along with <a href="http://forum.dreamhosters.com/programming/79205-Help-with-hello-world-FCGI.htm">this forum post</a>) to get it all working. This worked for me and I'm guessing it'll work for a lot of other people trying to run Python on a DreamHost server (and not using Django I should add).

Before we jump into it, I should note that you will need an account with shell access (one you can SSH in to). Since we're compiling things, you can't just use FTP. If you're scared of the command line, there's not much help for you. This is mostly copy and paste here though, so try and play along anyway.

First, we might as well roll our own version of Python. We could use what's on their servers, but it's a little out of date and rolling your own will allow you to more easily tweak things to your needs and install things you need. Thanks to the link above, this couldn't be simpler. Start by SSHing into your account, then from your home directory, execute the following.

```bash
mkdir opt
mkdir downloads
cd downloads
wget http://www.python.org/ftp/python/2.5.1/Python-2.5.1.tgz
tar xvzf Python-2.5.1.tgz
```

As pointed out on Ryan Kanno's page, this will create 2 directories (opt and downloads), download a copy of Python (version 2.5.1) to the download directory and uncompress the file. You're going to install everything in opt in your home directory just because that's the way he did it, but you can change that to anything you want. Just make sure that if you DO change it, you also change it in the next set.

```bash
cd Python-2.5.1
./configure --prefix=$HOME/opt/ --enable-unicode=ucs4 && make && make install
```

What this does is configure and compile your new version of Python and install it in the opt directory we made before. Again, if you changed the directory, change it here too. If you get errors, the compilation will stop without installing. Everything went smooth for me, so if you have problems, hit Google or the discussions over at the <a href="http://discussion.dreamhost.com/wwwthreads.pl">DreamHost Forums</a>. Next, we need a way to let Python talk to MySQL (unless you aren't using a database, but you probably are, so just continue on).

```bash
cd ..
wget http://internap.dl.sourceforge.net/sourceforge/mysql-python/MySQL-python-1.2.2.tar.gz
tar xvzf MySQL-python-1.2.2.tar.g
cd MySQL-python-1.2.2
python setup.py install
```

Couldn't be simpler. The last step is to make sure we're going to be using the proper version of python when we are logged in. You can copy and paste the code, or if you understand how to add things to your PATH on your own, do it by hand.

```bash
echo "export PATH=\$HOME/opt/bin/:\$PATH" >> ~/.bash_profile
source ~/.bash_profile
which python
```

The last commend should echo `/home/&lt;username&gt;/opt/bin/python` if you left the directory structure alone. If you you see `/usr/bin/python` then your PATH is wrong. Try again or Google how the PATH works and fix it. You can also remove the download directory if you so choose.

```bash
cd ~
rm -Rf downloads
```

We're now ready to switch over to Michele Campeotto's page. You could set up virtual-python as suggested there, but I'm a fan of compiling and this makes sure that upgrading and maintaining your own versions is simple and that any DreamHost upgrades won't break your code. The flip side is that YOU are in charge of keeping up with upgrades, but I personally don't mind that. The call is yours. Anyway, we want to step in where Pylons is installed, so let's go ahead and do that.

```bash
easy_install Pylons
easy_install Flup
```

Easy once Python is installed isn't it? If you paid attention here, I also added Flup here. We're going to use Flup instead of the fcgi.py file referenced over there. I'm not sure why, but that method refused to work for me, but Flup worked without any problems. You can also install QuickWiki to test out Pylons if you'd like, or just jump into development. **The important differences are in the dispatch.fcgi file**.

```bash
#!/home/&lt;username&gt;/opt/bin/python

import sys

from paste.deploy import loadapp
from flup.server.fcgi_fork import WSGIServer

app = loadapp('config:/home/<username>/<domain>/wiki.ini')
WSGIServer(app).run()
```

Note that I added the line `import sys` there. I've also used `from flup.server.fcgi_fork import WSGIServer` so that we use Flup and not fcgi.py. These are the vital differences between a working Python install and a non-working one. I've been bashing my head against the wall trying to make this work for the last 24 hours and it's finally done. Now I can learn Python and Pylons :). Here's a simple "Hello World" example in the event that you don't want to install Pylons, QuickWiki or anything else.

```bash
#!/home/&lt;username&gt;/opt/bin/python

import sys
from flup.server.fcgi_fork import WSGIServer

def myapp(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    return ['Hello, from python!\n']

WSGIServer(myapp).run()
```

Is this the best solution to make Python and Pylons work on a DreamHost server? I have no idea. Are there any security implications with importing sys? Again, no idea. I couldn't be any newer to all of this myself, so you tell me. For now, I'm just happy things work and I hope this helps out some other people as well.