---
title: Asynchronous File Downloads in PHP
date: 2009-10-16
alias:
  - posts/asynchronous-file-downloads-in-php/index.html
  - posts/asynchronous-php/index.html
tags:
  - webdev
  - php
  - software
---

I needed to "asynchronous PHP" recently and it took me a little while to find the solution. What my script basically does is generate a PDF file for the user to download based on some parameters they have chosen. The problem was, the PDF generate take a while and during that time I needed to show the user a screen explaining that the file was being generated, which would also show the download link once the generation was complete. My setup is as follows:

**generate.php**: This script is where the user is sent when they click "download" on the parameter choice page. This is where the asynchronous magic has to happen. From here, the user is immediately sent to *download.php*.

**download.php**: This script gives the user either a "please wait" message of a "click here to download" message, depending on where the target PDF has been generated yet.

My problem was, even though was added the header redirect code (shown below) to *generate.php*, the browser would still wait for the PDF to be generated before sending the user to *download.php*. In other words, it was only synchronous PHP, which didn't help me at all.

```php
header("Location: download.php");
```

Thanks to [this comment](http://www.php.net/manual/en/features.connection-handling.php#89177) on php.net, I was able to make it work! Basically, you need to tell the browser that you are done sending it data, even though the PHP script will keep executing. Code below:

```php
//redirects the browser to the new url, but continues processing in the background
function redirect_and_continue($sURL) {
    header( "Location: ".$sURL );
    ob_end_clean();
    header("Connection: close");
    ignore_user_abort();
    ob_start();
    header("Content-Length: 0");
    ob_end_flush();
    flush();
    session_write_close();
}
```

So, the user is sent to *generate.php*, which immediately calls `redirect_and_continue('download.php')`, redirecting the user to *download.php* while still continuing to execute *generate.php* (and make the PDF file). Once the user is at *download.php*, the script checks for the existence of the generated PDF file (as indicated by the filename sent through the session) and uses a [meta refresh tag](http://en.wikipedia.org/wiki/Meta_refresh) in the HTML to keep reloading *download.php*. Once the PDF file exists, it provides the user with a link to the PDF file for download.
