---
title: example code
date: 2016-05-29
---


```php
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

```js
Backbone.history.start({
  pushState: true,
  hashChange: Modernizr.history ? true : false
});
```

```
var something;

console.log('i am the code');
```

```
scp ~/Downloads/*.torrent seed:watch && rm ~/Downloads/*.torrent
scp ~/Downloads/*.torrent seed:watch && rm ~/Downloads/*.torrent2
scp ~/Downloads/*.torrent seed:watch && rm ~/Downloads/*.torrent3
```