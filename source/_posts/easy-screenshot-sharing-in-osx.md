---
title: Easy Screenshot Sharing in OSX
date: 2012-05-28
alias: posts/easy-screenshot-sharing-in-osx/index.html
tags:
	- software
---

Now that I'm {% post_link my-move-to-mac 'using a Mac' %}, the [screenshot uploader](https://github.com/w33ble/screenshot-uploader) I wrote isn't all that helpful. Shame, I was really enjoying the quick and easy screenshot sharing. Fortunately, OSX has some built-in hotkeys for taking screenshots. What's more, you can change where they save. What's even *more*, you can add scripted actions to folders with Applescript. Mix in a little Dropbox, and BAM, I'm sharing screenshots with the greatest of ease!

The flow goes like this: Capture screenshot (selection, window, screen, whatever), it gets saved to my Dropbox Public folder, the link gets copied into my clipboard, and I get a Growl notification when it's all ready to go. Here's how.

First, [change the screenshot save location](http://osxdaily.com/2011/01/26/change-the-screenshot-save-file-location-in-mac-os-x/):

```sh
defaults write com.apple.screencapture location ~/Dropbox/Public
killall SystemUIServer
```

Next, [create an Applescript](http://forums.dropbox.com/topic.php?id=4659) file to copy the URL of new files:

```applescript
on adding folder items to this_folder after receiving added_items
 try
  set the item_count to the number of items in the added_items
  if the item_count is equal to 1 then
   set theFile to item 1 of added_items
   set theRawFilename to ("" & theFile)

   set tid to AppleScript's text item delimiters
   set AppleScript's text item delimiters to ":"
   set theFileName to (text item 6 of theRawFilename) as text
   set AppleScript's text item delimiters to tid

   set theWebSafeFileName to switchText from theFileName to "%20" instead of " "

   set theURL to "http://dl.getdropbox.com/u/8469532/" & theWebSafeFileName
   set the clipboard to theURL as text

   tell application "GrowlHelperApp"

    -- Make a list of all the notification types
    -- that this script will ever send:
    set the allNotificationsList to ¬
     {"Public URL"}

    set the enabledNotificationsList to allNotificationsList

    -- Register our script with growl.
    -- You can optionally (as here) set a default icon
    -- for this script's notifications.
    register as application ¬
     "CopyDropboxURL" all notifications allNotificationsList ¬
     default notifications enabledNotificationsList ¬
     icon of application "Dropbox"

    notify with name ¬
     "Public URL" title ¬
     "Dropbox Public Folder Updated" description ¬
     (theURL & " copied to clipboard.") application name "CopyDropboxURL"

   end tell
  end if
 end try
end adding folder items to

to switchText from t to r instead of s
 set d to text item delimiters
 set text item delimiters to s
 set t to t's text items
 set text item delimiters to r
 tell t to set t to item 1 & ({""} & rest)
 set text item delimiters to d
 t
end switchText
```

That's it! Snap a screenshot (or drop a file in your Public folder, it all works the same), wait for the Growl notification, and paste away!
