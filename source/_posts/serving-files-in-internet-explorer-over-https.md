---
title: Serving Files in Internet Explorer over HTTPS
date: 2010-05-11
alias: posts/serving-files-in-internet-explorer-over-https/index.html
tags:
  - php
  - software
  - webdev
---

I recently came across a problem where serving a file to Internet Explorer would result in the following error message.

![IE Download Error](/images/posts/ie-download.jpg)

This affected IE6, IE7 and IE8 in my testing. The way I was serving the file was through PHP via [readfile](http://us2.php.net/manual/en/function.readfile.php). Before sending the contents of the file, I was, of course, setting some header parameters so that the browser would handle the file and the user wouldn't just see some binary garbage on their screen. In my case, I was serving a PDF file that was being generated server-side and sent to the client. The basic header parameters are as follows:

```php
// We'll be outputting a PDF
header('Content-type: application/pdf');
// It will be called your_file.pdf
header('Content-Disposition: attachment; filename="your_file.pdf"');
// declare Files Size here (for the sake of peoples sanity, please add this)
header('Content-Length: '.filesize($filename));
```

This works just fine in most situations, but once you introduce a secure connection, IE fails with the above error. Of course, like most IE problems, this doesn't happen in any other browser. Ugh.

Luckily, I noticed some additional parameters in the first example on the readfile page, namely the 'Pragma' parameter. Reading some comments on the header function, I stumbled upon [this one](http://www.php.net/manual/en/function.header.php#88038). It basically, says that once you add HTTPS, you need to also tell IE how to handle caching the file. So now, my headers look like this:

```php
// Force clear cache
header('Pragma: public'); // Fix for IE
header("Expires: 0");  //always expire
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
// We'll be outputting a PDF
header('Content-type: application/pdf');
// It will be called your_file.pdf
header('Content-Disposition: attachment; filename="your_file.pdf"');
// declare Files Size here (for the sake pf peoples sanity, please add this)
header('Content-Length: '.filesize($filename));
```

Directly following these header calls is the readfile call and a call to exit to stop the script from executing anything else and alert the browser that the entire file has been delivered.

It seems like the Pragma parameter controls how browsers handle caching, and adding the other cache parameters to the header are just added enforcement. Now, IE works exactly as expected and I've got happy clients once again!
