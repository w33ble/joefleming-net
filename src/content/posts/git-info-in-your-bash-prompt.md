---
title: "Git Info in your Bash Prompt"
date: 2012-05-24
#urls: "2012/05/24/git-info-in-your-bash-prompt"
tags: "git, bash, software, development"
icon: git
---

I was hanging out with a <a href="http://twitter.com/0lu">very cool fellow developer</a>, and while he was showing me something on his computer, I happened to notice that his shell prompt changed when he entered his git repo. The prompt showed what branch was currently loaded, like so:

![show me the repo](/images/posts/2012-git-bash.png)

Pretty boss, right?! He told me it was part of <a href="https://github.com/robbyrussell/oh-my-zsh">oh-my-zsh</a> and that I needed to install that ASAP. Being a long-time user and fan of bash, and someone who does a fair amount of bash scripting on the shell directly, I was hesitant to switch because it would mean learning a new scripting language. It occurred to me, however, that there was likely a way to get the same thing in bash.

A cursory look revealed <a href="https://github.com/revans/bash-it">bash-it</a>, which claimed to be "shameless ripoff of oh-my-zsh." Perfect! Unfortunately, not so much. Most of the stuff that it offered I didn't want, and using it would mean more modifications to my <a href="https://github.com/w33ble/dotfiles">dotfiles</a>. But, the git part <em>did</em> work, and it was easy to copy.

Here's how to add it to your own bash shell. Add this code to your .bash_profile or .bashrc (all these years in Linux and I still don't know the difference) and you're set.

```bash
function parse_git_branch {
    ref=$(git symbolic-ref HEAD 2> /dev/null) || return
    echo "("${ref#refs/heads/}")"
}
```

Now, in the PS1, add a call to that function, like so.

```bash
export PS1="\u@\h : \w \$(parse_git_branch) $ "
```

Yours likely looks different than mine, but the important bit is `\$(parse_git_branch)`. If you don't have a PS1 set, you can copy and paste that one. Now, when you enter a path that is a git repo, it'll show the branch you're currently using in the prompt. Sounds quite simple, but it's really handy, especially if you do your git work on the command line!

But what if you want the prompt to also show you if you've got uncommitted changes, untracked files or even if you haven't pushed your changes to remote? Fortunately, that's all pretty easy to add too! Check it:

```bash
function parse_git_branch {
    git rev-parse --git-dir > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        git_status="$(git status 2> /dev/null)"
        branch_pattern="^# On branch ([^${IFS}]*)"
        detached_branch_pattern="# Not currently on any branch"
        remote_pattern="# Your branch is (.*) of"
        diverge_pattern="# Your branch and (.*) have diverged"
        untracked_pattern="# Untracked files:"
        new_pattern="new file:"
        not_staged_pattern="Changes not staged for commit"

        #files not staged for commit
        if [[ ${git_status}} =~ ${not_staged_pattern} ]]; then
            state="✔"
        fi
        # add an else if or two here if you want to get more specific
        # show if we're ahead or behind HEAD
        if [[ ${git_status} =~ ${remote_pattern} ]]; then
            if [[ ${BASH_REMATCH[1]} == "ahead" ]]; then
                remote="↑"
            else
                remote="↓"
            fi
        fi
        #new files
        if [[ ${git_status} =~ ${new_pattern} ]]; then
            remote="+"
        fi
        #untracked files
        if [[ ${git_status} =~ ${untracked_pattern} ]]; then
            remote="✖"
        fi
        #diverged branch
        if [[ ${git_status} =~ ${diverge_pattern} ]]; then
            remote="↕"
        fi
        #branch name
        if [[ ${git_status} =~ ${branch_pattern} ]]; then
            branch=${BASH_REMATCH[1]}
        #detached branch
        elif [[ ${git_status} =~ ${detached_branch_pattern} ]]; then
            branch="NO BRANCH"
        fi

        echo " ( ${branch} ${state}${remote})"
    fi
    return
}
```

One word of warning; if you have a repo with a lot of files in it, this will run pretty slow. But, there you have it. Hope that helps!