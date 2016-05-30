---
title: "Ubuntu, Node and Heroku"
date: 2011-11-03
#urls: "2011/11/03/ubuntu-node-and-heroku"
tags: "development, heroku, ubuntu, software"
icon: ubuntu
---

I recently started playing with <a href="http://nodejs.org/">Node.js</a>, and while I can play locally just fine, I wanted to make sure I had a place to host once I had something worth hosting. Enter <a href="http://www.heroku.com/">Heroku</a>. Why? Because it's free to host until you draw some real traffic, it has a really cool addon ecosystem with a great collection of services and I knew other people using it so I could turn to them if I had problems.

In order to get your application on their service, you need to install their command line tool, which requires Ruby. No problem, just install it all with apt-get and you're good to go, right? Short answer, yes. Long answer, No. You'll be using an unsupported version (the version of ruby in the Ubuntu repos is aged), so while it might work now, it may not in the future. If you do like I did, you'll also end up with 1.8 and 1.9 on your machine, and while that didn't cause any problems, it seemed silly.

Poking around, I found <a href="http://aslamnajeebdeen.com/blog/how-to-uninstall-remove-ruby-gems">this article</a> which lays out how to use RVM to both install a newer version of Ruby as well as easily update it in the future. So, here's the whole shebang:

```bash
mkdir ~/src
cd ~/src
sudo apt-get install build-essential libssl-dev git-core git # some dependencies before we start
git clone https://github.com/joyent/node.git
cd node
git checkout v0.4.7 # heroku only support 0.4.7 now, change this as that changes
./configure && make && make install # I opted to use checkinstall, but this keeps it simple # now we move on to RVM and Ruby
bash < <(curl -s https://rvm.beginrescueend.com/install/rvm)
echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"' >> ~/.bashrc
. ~/.bashrc
rvm requirements # towards bottom, you will see "Additional Dependencies" and "For Ruby" -- copy everything from apt-get on
sudo apt-get install build-essential openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion # likely a bit different for you, but you get the idea
rvm install 1.9.2
rvm --default use 1.9.2
ruby -v # make sure ruby is in fact working, should give you some form of 1.9.2
gem install heroku
```

And that's it. You now have a local version of Ruby and Rubygems for you to use. If you want to keep your version of Node local as well, you can use the `--prefix` when compiling, as explained in the <a href="https://github.com/joyent/node/wiki/Installation">Node wiki</a>.

Now you're ready to continue along with the <a href="http://devcenter.heroku.com/articles/node-js#write_your_app">Heroku docs</a> and get your Node app deployed on their server.